import React from 'react'
import { withRouter } from 'react-router-dom'
import { auth } from '../firebase'
import CProveedores from './crud/CProveedores'
import Firestore from './Firestore'

const Proveedores = (props) => {

  const [user,setUser] = React.useState(null)

  React.useEffect(() =>{
    if(auth.currentUser){
      console.log('existe')
      setUser(auth.currentUser)
    }else{
      console.log('no existe');
      props.history.push('/login')
    }
  }, [props.history])

  return (
    <div>
        {
          user && (
            <CProveedores user={user} />
          )
        }
    </div>
  )
}

export default Proveedores