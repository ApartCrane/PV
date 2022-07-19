import React from 'react'
import { db } from '../../firebase'
import swal from 'sweetalert'

const CProductos = (props) => {

  const [tareas, setTareas] = React.useState([])
  const [tarea, setTarea] = React.useState('')
  const [horas, setHoras] = React.useState('')
  const [precio, setPrecio] = React.useState('')
  const [costo, setCosto] = React.useState('')
  const [existencia, setExistencia] = React.useState('')

  //const [horario, setHorario] = React.useState('')
  const [categoria, setCategoria] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')



  React.useEffect(() => {

    const obtenerdatos = async () => {
      try {

        const data = await db.collection('productos').get()
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
  const msjEdit = () => {
    swal({
      title: "Actualizacion Exitosa",
      text: "Se realizo de manera satisfactoria ",
      icon: "success",
      button: "Aceptar",

    });
  }

  const agregar = async (e) => {
    e.preventDefault()


    if (!categoria.trim() | !existencia.trim() | !costo.trim() | !precio.trim() | !horas.trim() | !tarea.trim()) {
      console.log('revisar los datos');
      msjError();
      return;
    }
    console.log(tarea);
    console.log(horas);
    console.log(precio);
    console.log(existencia);
    console.log(categoria);
    console.log(costo);

    try {

      const nuevaTarea = {
        tarea: tarea,
        horas: horas,
        precio: precio,
        costo: costo,
        existencia: existencia,
        categoria: categoria,
      }

      const data = await db.collection('productos').add(nuevaTarea)
      setTareas([
        ...tareas,
        { ...nuevaTarea, id: data.id }
      ])
      setHoras([
        ...horas,
        { ...nuevaTarea, id: data.id }
      ])
      setPrecio([
        ...precio,
        { ...nuevaTarea, id: data.id }
      ])
      setCosto([
        ...costo,
        { ...nuevaTarea, id: data.id }
      ])
      setExistencia([
        ...existencia,
        { ...nuevaTarea, id: data.id }
      ])
      setCategoria([
        ...categoria,
        { ...nuevaTarea, id: data.id }
      ])
      setTarea('')
      setExistencia('')
      setHoras('')
      setPrecio('')
      setCosto('')
      setCategoria('')
      msjSiu();
    } catch (error) {

    }
  }

  const eliminar = async (id) => {
    try {

      await db.collection('productos').doc(id).delete()

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
    setPrecio(item.precio)
    setCosto(item.costo)
    setExistencia(item.existencia)
    setCategoria(item.categoria)
    setId(item.id)
  }

  const editar = async (e) => {
    e.preventDefault()

    if (!categoria.trim() | !existencia.trim() | !precio.trim() | !costo.trim() | !horas.trim() | !tarea.trim()) {
      console.log('revisar los datos');
      msjError();
      return;
    }

    try {

      await db.collection('productos').doc(id).update({
        tarea: tarea,
        horas: horas,
        precio: precio,
        costo: costo,
        existencia: existencia,
        categoria: categoria,
      })
      const arrayEditado = tareas.map(item => (
        item.id === id ? { id: item.id, horas: horas, tareas: tarea, precio: precio, existencia: existencia, categoria: categoria } : item
      ))
      setTareas(arrayEditado)
      setModoEdicion(false)
      setTarea('')
      setHoras('')
      setPrecio('')
      setCosto('')
      setExistencia('')
      setCategoria('')
      setId('')
      msjEdit();

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
                <th scope="col">Codigo</th>
                <th scope="col">Descripcion</th>
                <th scope="col">Precio</th>
                <th scope="col">Costo</th>
                <th scope="col">Existencia</th>
                <th scope="col">Departamento</th>
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
                      ${item.precio}
                    </td>
                    <td
                      key={item.id}>
                      ${item.costo}
                    </td>
                    <td
                      key={item.id}>
                      {item.existencia}
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

        <div className=" col-3 " >
          <form onSubmit={modoEdicion ? editar : agregar}>

            <h3>
              {
                modoEdicion ? 'Editar Producto' : 'Agregar Producto'
              }
            </h3>
          </form>
          <form onSubmit={modoEdicion ? editar : agregar}>

            <label>Código</label>
            <input type="text"
              placeholder="IIngresa Código"
              className="form-control mb-2"
              onChange={e => setTarea(e.target.value)}
              value={tarea}
            />

            <label>Descripción</label>
            <input type="text"
              placeholder="Ingresa Descripcción"
              className="form-control mb-2"
              onChange={e => setHoras(e.target.value)}
              value={horas}
            />

            <label>Precio</label>
            <input type="number"
              placeholder="10"
              className="form-control mb-2"
              onChange={e => setPrecio(e.target.value)}
              value={precio}
            />

            <label>Costo</label>
            <input type="number"
              placeholder="10"
              className="form-control mb-2"
              onChange={e => setCosto(e.target.value)}
              value={costo}
            />

            <label>Existencia</label>
            <input type="number"
              placeholder="10"
              className="form-control mb-2"
              onChange={e => setExistencia(e.target.value)}
              value={existencia}
            />

            <label>Categoria</label>
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

export default CProductos