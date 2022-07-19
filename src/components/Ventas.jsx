import React from 'react'
import { withRouter } from "react-router-dom";
import {auth} from '../firebase'
import CVentas from './crud/CVentas';

const Ventas = (props) => {

  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    if(auth.currentUser){
        console.log('existe')
        setUser(auth.currentUser)
    }else{
        console.log('no existe')
        props.history.push('/login')
    }
}, [props.history])
  
  return (
    <div>
        {
          user && (
            <CVentas user={user} />
          )
        }
    </div>
  )
}

export default withRouter(Ventas)