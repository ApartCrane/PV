import React from 'react'
import {db} from '../../firebase'
import swal from 'sweetalert'

const CProveedores = (props)=> {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [horas, setHoras] = React.useState('')
  const [telefono, setTelefono] = React.useState('')
  const [correo, setCorreo] = React.useState('')
  const [horario, setHorario] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')



  React.useEffect(() => {

    const obtenerdatos = async () => {
      try {
       
        const data = await db.collection('proveedores').get()
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

  const msjError=()=>{
    swal({
      title: "Revisa el formulario",
      text:"Faltan datos por llenar ",
      icon:"warning",
      button: "Aceptar",
      
    });
  }
  const msjSiu=()=>{
    swal({
      title: "Registro exitoso",
      text:"Se han guardado los datos de manera satisfactoria",
      icon:"success",
      button: "Aceptar",
      button: "No"
    });
  }
  const msjBorrar=()=>{
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

    
    if(!horario.trim() | !correo.trim() | !telefono.trim() | !horas.trim() | !tarea.trim() ){
      console.log('revisar los datos');
      msjError();
      return;
    }
    console.log(tarea);
    console.log(horas);
    console.log(telefono);
    console.log(correo);
    console.log(horario);

    try {
      
      const nuevaTarea = {
        tarea: tarea,
        horas: horas,
        telefono: telefono,
        correo: correo,
        horario:horario,
      }

      const data = await db.collection('proveedores').add(nuevaTarea)
      setTareas([
        ...tareas,
        { ...nuevaTarea, id: data.id }
      ])
      setHoras([
        ...horas,
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
      setHorario([
        ...horario,
        { ...nuevaTarea, id: data.id }
      ])
      setTarea('')
      setCorreo('')
      setHorario('')
      setTelefono('')
      setHoras('')
      msjSiu();
    } catch (error) {

    }
  }

  const eliminar = async (id) => {
    try {
      
      await db.collection('proveedores').doc(id).delete()

      const arrayFiltrado = tareas.filter(item => item.id !== id)
      setTareas(arrayFiltrado)

    } catch (error) {
      console.log(error);
    }
  }

  const activarEdicion = (item) => {
    setModoEdicion(true)
    setTarea(item.tarea)
    setHoras(item.horas)
    setTelefono(item.telefono)
    setCorreo(item.correo)
    setHorario(item.horario)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()

    if(!horario.trim() | !correo.trim() | !telefono.trim() | !horas.trim() | !tarea.trim() ){
      console.log('revisar los datos');
      msjError();
      return;
    }

    try {
      
      await db.collection('proveedores').doc(id).update({
        tarea: tarea,
        horas: horas,
        telefono: telefono,
        correo: correo,
        horario:horario,
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? { id: item.id, horas: horas, tareas: tarea, telefono: telefono, correo: correo, horario: horario } : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setHoras('')
      setTelefono('')
      setCorreo('')
      setHorario('')
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
                <th scope="col">Direccion</th>
                <th scope="col">Telefono</th>
                <th scope="col">Correo</th>
                <th scope="col">Horario</th>
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
                      {item.horas}
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
                      {item.horario}
                      
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
        
        <div className=" col-3 " >
          <form onSubmit={modoEdicion ? editar : agregar}>

            <h3>
              {
                modoEdicion ? 'Editar Proveedor' : 'Agregar Proveedor'
              }
            </h3>
          </form>
          <form onSubmit={modoEdicion ? editar : agregar}>

            <label>Nombre</label>
            <input type="text"
              placeholder="Juan Perez"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            <label>Direccion</label>
            <input type="text"
              placeholder="Aja Del Aja"
              className="form-control mb-2"
              onChange={e => setHoras(e.target.value)}
              value={horas}
            />

            <label>Telefono</label>
            <input type="number"
              placeholder="123"
              className="form-control mb-2"
              onChange={e => setTelefono(e.target.value)}
              value={telefono}
            />

            <label>Correo</label>
            <input type="email"
              placeholder="provedoores@gmail.com"
              className="form-control mb-2"
              onChange={e => setCorreo(e.target.value)}
              value={correo}
            />

            <label>Horarios</label>
            <input type="text"
              placeholder="12:00-16:00"
              className="form-control mb-2"
              onChange={e => setHorario(e.target.value)}
              value={horario}
            />

            <button className={
              modoEdicion ? 'btn btn-warning btn-block' : 'btn btn-dark btn-block'
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

export default CProveedores