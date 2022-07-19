import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'
import {auth } from './firebase'
import Ventas from './components/Ventas'
import Productos from './components/Productos'
import Proveedores from './components/Proveedores'
import Inicio from './components/Inicio'
import Clientes from './components/Clientes'
import Carrito from './components/Carrito'
import Citas from './components/Citas'


const App = () => {

    const [firebaseUser, setFirebaseUser] = React.useState(false)

    React.useEffect(() => {
        auth.onAuthStateChanged(user => {
            console.log(user)
            if(user){
                setFirebaseUser(user)
            }else{
                setFirebaseUser(null)
            }
        })
    }, [])

    return firebaseUser !== false ? (
        <Router>
            <div className="container">
                <Navbar firebaseUser={firebaseUser}/>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/citas" exact>
                        <Citas/>
                    </Route>
                    <Route path="/admin" exact>
                        <Admin />
                    </Route>
                    <Route path="/ventas" exact>
                        <Ventas/>
                    </Route>
                    <Route path="/productos" exact>
                        <Productos/>
                    </Route>
                    <Route path="/proveedores" exact>
                        <Proveedores/>
                    </Route>
                    <Route path="/clientes" exact>
                        <Clientes/>
                    </Route>
                    <Route path="/" exact>
                        <Inicio/>
                    </Route>
                    <Route path="/carrito" exact>
                        <Carrito/>
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    ): (
        <div>Cargando...</div>
    )
}

export default App
