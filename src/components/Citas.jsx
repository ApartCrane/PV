import React from 'react'
import { withRouter } from "react-router-dom";
import { auth } from '../firebase'
import CCitas from './crud/CCitas';

const Citas = (props) => {

    const [user, setUser] = React.useState(null)
    
    React.useEffect(()=>{
        if(auth.currentUser){
            console.log('existe');
            setUser(auth.currentUser)
        }else{
            console.log('No mano');
            props.history.push('/login')
        }
    }, [props.history] )
    
    return (
        <div>
            {
                user && (
                    <CCitas user={user} />
                )
            }
        </div>
    )
}

export default  withRouter(Citas)