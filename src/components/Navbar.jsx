import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../firebase'
import { withRouter } from "react-router-dom";

const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/admin" className="navbar-brand">
                <img src='https://img1.wsimg.com/isteam/ip/aedfccc8-cab1-4a06-819b-aff6ee7d5cef/erizo%20negro.png/:/rs=w:296,h:158,cg:true,m/cr=w:296,h:158/qt=q:95' width='100' />
            </Link>
            <div>
                <div className="d-flex">

                    {
                        props.firebaseUser !== null ? (
                            <NavLink
                                className="btn btn-dark mr-2"
                                to="/ventas"
                            >
                                Ventas
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ?(
                            <NavLink
                                className='btn btn-dark mr-2'
                                to="/citas"
                            >
                                Citas
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            <NavLink
                                className="btn btn-dark mr-2"
                                to="/admin"
                            >
                                Admin
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            <NavLink
                                className="btn btn-dark mr-2"
                                to="/productos"
                            >
                                Productos
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            <NavLink
                                className="btn btn-dark mr-2"
                                to="/proveedores"
                            >
                                Proveedores
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            <NavLink
                                className="btn btn-dark mr-2"
                                to="/clientes"
                            >
                                Clientes
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            <NavLink
                                className="btn btn-dark mr-2"
                                to="/carrito"
                            >
                                <img className="img-fluid" alt="Responsive image" src="https://cdn-icons-png.flaticon.com/512/891/891462.png" width="25" />
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            <button
                                className="btn btn-dark"
                                onClick={() => cerrarSesion()}
                            >

                                <img className="img-fluid" alt="Responsive image" src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png" width="25" />
                            </button>
                        ) : (
                            <NavLink
                                className="btn btn-dark"
                                to="/login"
                            >
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)