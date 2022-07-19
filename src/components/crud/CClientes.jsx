import React from 'react'
import { db } from '../../firebase'
import swal from 'sweetalert'

const CClientes = (props) => {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [direccion, setDireccion] = React.useState('')
  const [categoria, setCategoria] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')



  React.useEffect(() => {

    const obtenerdatos = async () => {
      try {

        const data = await db.collection('clientes').get()
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


    if (!categoria.trim() | !direccion.trim() | !correo.trim() | !telefono.trim() | !tarea.trim()) {
      console.log('revisar los datos');
      msjError();
      return;
    }
    console.log(tarea);
    console.log(telefono);
    console.log(correo);
    console.log(direccion);
    console.log(categoria);

    try {

      const nuevaTarea = {
        tarea: tarea,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        categoria: categoria,
      }

      const data = await db.collection('clientes').add(nuevaTarea)
      setTareas([
        ...tareas,
        { ...nuevaTarea, id: data.id }
      ])
      setTelefono([
        ...telefono,
        { ...nuevaTarea, id: data.id }
      ])
      setCorreo([
        ...correo,
        { ...nuevaTarea, id: data.id }
      ])
      setDireccion([
        ...direccion,
        { ...nuevaTarea, id: data.id }
      ])
      setCategoria([
        ...categoria,
        { ...nuevaTarea, id: data.id }
      ])
      setTarea('')
      setDireccion('')
      setTelefono('')
      setCorreo('')
      setCategoria('')
      msjSiu();
    } catch (error) {

    }
  }

  const eliminar = async (id) => {
    try {

      await db.collection('clientes').doc(id).delete()

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
    setCorreo(item.precio)
    setDireccion(item.direccion)
    setCategoria(item.categoria)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()

    if (!categoria.trim() | !direccion.trim() | !correo.trim() | !telefono.trim() | !tarea.trim()) {
      console.log('revisar los datos');
      msjError();
      return;
    }

    try {

      await db.collection('clientes').doc(id).update({
        tarea: tarea,
        telefono: telefono,
        correo: correo,
        direccion: direccion,
        categoria: categoria,
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? { id: item.id, telefono: telefono, tareas: tarea, correo: correo, direccion: direccion, categoria: categoria } : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setTelefono('')
      setCorreo('')
      setDireccion('')
      setCategoria('')
      setId('')
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="">
      <div className="row " >
        <div className="col-9" >
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo</th>
                <th scope="col">Direccion</th>
                <th scope="col">Interes</th>
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
                      {item.correo}
                    </td>
                    <td
                      key={item.id}>
                      {item.direccion}
                    </td>

                    <td
                      key={item.id}>
                      {item.categoria}

                      <button className="btn btn-danger btn-sm float-right"
                        onClick={() =>
                          eliminar(item.id)
                        }
                      >

                        <img src="https://cdn-icons-png.flaticon.com/512/3096/3096687.png" className="img-fluid" alt="Responsive image" width="15" />
                      </button>

                      <button className="btn btn-warning btn-sm float-right mr-2 "
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
        </div >

        <div className=" col-3 fixed" >
          <form onSubmit={modoEdicion ? editar : agregar}>

            <h3>
              {
                modoEdicion ? 'Editar Cliente' : 'Agregar Cliente'
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

            <label>Correo</label>
            <input type="email"
              placeholder="cartem@..."
              className="form-control mb-2"
              onChange={e => setCorreo(e.target.value)}
              value={correo}
            />
            <label>Direccion</label>
            <input type="text"
              placeholder="Priv..."
              className="form-control mb-2"
              onChange={e => setDireccion(e.target.value)}
              value={direccion}
            />

            <label>Interes</label>
            <select className="custom-select"
              onChange={e => setCategoria(e.target.value)}
              value={categoria}
            >
              <option selected>Seleccione...</option>
              <option value="Accesorios Para Carro">Accesorios Para Carro</option>
              <option value="Accesorios Para Moto">Accesorios Para Moto</option>
              <option value="Audifonos">Audifonos</option>
              <option value="Cables USB">Cables USB</option>
              <option value="Cargadore">Cargadores</option>
              <option value="Herramientas">Herramientas</option>
              <option value="Micas de Cristal">Micas de Cristal</option>
              <option value="Modas y Regalos">Modas y Regalos</option>
              <option value="Perifericos PC">Perifericos PC</option>
              <option value="Protectores">Protectores</option>
              <option value="Smoke Shop">Smoke Shop</option>
            </select>

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
      <div>
      </div>
    </div>
  );
}

export default CClientes