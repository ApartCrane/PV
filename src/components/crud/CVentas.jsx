import React from 'react'
import { db } from '../../firebase'

const CVentas = (props) => {

    const [tareas, setTareas] = React.useState([])

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

    return (
        <>
            <div className='container' >
                <nav class="navbar navbar-light bg-light">
                    <form class="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
                    </form>
                </nav>
                <div className='row' >
                    {
                        tareas.map(item => (
                            <div className='col-md-3' >
                                <div class='card'>

                                    <img key={item.id}

                                        src='https://img1.wsimg.com/isteam/ip/aedfccc8-cab1-4a06-819b-aff6ee7d5cef/erizo%20negro.png/:/rs=w:296,h:158,cg:true,m/cr=w:296,h:158/qt=q:95' className='card-img-top' width="20" />

                                    <div className="card-body" key={item.id} >
                                        <h5 className='card-title' key={item.id} >{item.horas}</h5>
                                        <p className='card-text' key={item.id} >
                                            {item.tarea}
                                            <br />
                                           ${item.precio}
                                        </p>
                                        <a href='#' className='btn btn-info btn-lg ' >
                                            <img src="https://cdn-icons-png.flaticon.com/512/833/833314.png" width="25" alt="" />
                                        </a>
                                        
                                    </div>
                                </div>
                                <br />
                            </div>
                        ))

                    }
                </div>
            </div>

        </>
    )
}

export default CVentas