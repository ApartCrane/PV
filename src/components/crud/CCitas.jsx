import React, { useState } from 'react'
import { saveAs } from 'file-saver'
import { db } from '../../firebase'
import swal from 'sweetalert'

const CCitas = () => {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [motivo, setMotivo] = React.useState('')
  const [anticipo, setAnticipo] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')
  const [myValue, setMyValue] = useState('')



  const createFile = () => {

    const blob = new Blob(["Ticket de Cita CARTEM   " +
      " " +
      "El siguiente ticket tiene el motivo de: " +
      myValue +
      "" +
      ".Sera necesario entregar este ticket para la entrega de productos. La empresa no se hace responsable en caso de perdida" +
      "                         "
    ],
      { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'mi-archivo.txt');
  }

  const readFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();

    fileReader.readAsText(file);

    fileReader.onload = () => {
      console.log(fileReader.result);
      setMyValue(fileReader.result);
    }

    fileReader.onerror = () => {
      console.log(fileReader.error);
    }
  }

  React.useEffect(() => {

    const obtenerdatos = async () => {
      try {

        const data = await db.collection('citas').get()
        console.log(data.docs)
        const arrayData = data.docs.map(doc => ({
          id: doc.id, ...doc.data()
        }))
        console.log(arrayData);
        setTareas(arrayData)

      } catch (error) {
        console.log(error);
      }
    }
    obtenerdatos()
  }, [])
  const msjError = () => {
    swal({
      title: "Revisa el formulario",
      text: "Faltan datos por llenar ",
      icon: "warning",
      button: "Aceptar",

    });
  }
  const msjEdit = () => {
    swal({
      title: "Actualizacion Exitosa",
      text: "Se realizo de manera satisfactoria ",
      icon: "success",
      button: "Aceptar",

    });
  }
  const msjSiu = () => {
    swal({
      title: "Registro exitoso",
      text: "Se han guardado los datos de manera satisfactoria",
      icon: "success",
      button: "Aceptar",
      button: "No"
    });
  }
  const msjBorrar = () => {
    swal({
      title: "Estas seguro?",
      text: "Si lo eliminas, no se podra recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          swal("Se ha eliminado de manera satisfactoria!", {
            icon: "success",

          });
        }
      });
  }
  const agregar = async (e) => {
    e.preventDefault()


    if (!anticipo.trim() | !motivo.trim() | !telefono.trim() | !tarea.trim()) {
      console.log('revisar los datos');
      msjError();
      return;
    }
    console.log(tarea);
    console.log(telefono);
    console.log(motivo);
    console.log(anticipo);


    try {

      const nuevaTarea = {
        tarea: tarea,
        telefono: telefono,
        motivo: motivo,
        anticipo: anticipo,

      }

      const data = await db.collection('citas').add(nuevaTarea)
      setTareas([
        ...tareas,
        { ...nuevaTarea, id: data.id }
      ])
      setTelefono([
        ...telefono,
        { ...nuevaTarea, id: data.id }
      ])
      setMotivo([
        ...motivo,
        { ...nuevaTarea, id: data.id }
      ])
      setAnticipo([
        ...anticipo,
        { ...nuevaTarea, id: data.id }
      ])

      setTarea('')
      setAnticipo('')
      setTelefono('')
      setMotivo('')

      msjSiu();
    } catch (error) {

    }
  }

  const eliminar = async (id) => {
    try {

      await db.collection('citas').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error);
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.tarea)
    setTelefono(item.telefono)
    setMotivo(item.motivo)
    setAnticipo(item.direccion)

    setId(item.id)
  }
  const editar = async (e) => {
    e.preventDefault()

    if (!anticipo.trim() | !motivo.trim() | !telefono.trim() | !tarea.trim()) {
      console.log('revisar los datos');
      msjError();
      return;
    }

    try {

      await db.collection('citas').doc(id).update({
        tarea: tarea,
        telefono: telefono,
        motivo: motivo,
        anticipo: anticipo,

      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? { id: item.id, telefono: telefono, tareas: tarea, motivo: motivo, anticipo: anticipo } : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setTelefono('')
      setMotivo('')
      setAnticipo('')

      setId('')
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div>
      <div className='row'>
        <div className='col-3' >
          <h3>Escriba el motivo del Ticket de Cita</h3>
          <textarea
            cols='30'
            rows='10'
            placeholder='Se dejo $110 para una funda para el Samsung s10+'
            value={myValue}
            onChange={(e) => setMyValue(e.target.value)}
          ></textarea>

          <br />
          <button className='btn btn-success'
            onClick={createFile}
          >
            Guardar archivo
          </button>
        </div>
        <div className='col-6'>
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Motivo</th>
                <th scope="col">Anticipo</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                tareas.map(item => (
                  <tr
                    key={item.id}
                  >

                    <td
                      key={item.id}>
                      {item.tarea}
                    </td>
                    <td
                      key={item.id}>
                      {item.telefono}
                    </td>
                    <td
                      key={item.id}>
                      {item.motivo}
                    </td>

                    <td
                      key={item.id}>
                      ${item.anticipo}
                    </td>
                    <td>
                      
                    <button className="btn btn-danger btn-sm float-right mr-2"
                        onClick={() =>
                          eliminar(item.id)
                        }
                      >

                        <img src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png" className="img-fluid" alt="Responsive image" width="15" />
                      </button>
                      
                        
                      <button className="btn btn-warning btn-sm float-right mr-2 mt-1 "
                        onClick={() => activarEdicion(item)}
                      >
                        <img src="https://cdn-icons-png.flaticon.com/512/1828/1828911.png" className="img-fluid" alt="Responsive image" width="15" />
                      </button>
                    </td>


                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <div className='col-3' >
          <form onSubmit={modoEdicion ? editar : agregar}>

            <h3>
              {
                modoEdicion ? 'Editar Cita' : 'Agregar Cita'
              }
            </h3>
          </form>
          <form onSubmit={modoEdicion ? editar : agregar}>

            <label>Nombre</label>
            <input type="text"
              placeholder="Juan Perez..."
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            <label>Telefono</label>
            <input type="number"
              placeholder="777..."
              className="form-control mb-2"
              onChange={e => setTelefono(e.target.value)}
              value={telefono}
            />

            <label>Motivo</label>
            <input type="text"
              placeholder="Reparacion..."
              className="form-control mb-2"
              onChange={e => setMotivo(e.target.value)}
              value={motivo}
            />
            <label>Anticipo</label>
            <input type="number"
              placeholder="$ "
              className="form-control mb-2"
              onChange={e => setAnticipo(e.target.value)}
              value={anticipo}
            />



            <button className={
              modoEdicion ? 'btn btn-warning btn-block mt-2' : 'btn btn-dark btn-block mt-2'
            }
              type="submit"
            >
              {
                modoEdicion ? 'Editar' : 'Agregar'
              }
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CCitas