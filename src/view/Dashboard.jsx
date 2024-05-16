import {useStateContext} from '../contexts/ContextProvider.jsx'
import { Navigate, Link } from 'react-router-dom';

export default function Dashboard(){
    const {user,token,setToke,setUser} = useStateContext()

    return (
        <div>
            <p className='text-center'>Dashboard</p>
            
            {
                user.type === 'user' &&
                (<div className='d-flex justify-content-center align-items-center py-3'>
                    <Link to="/support/client" className="d-flex align-items-center p link-body-emphasis text-decoration-none" aria-expanded="false">
                        <u>Accéder au chat ici</u>
                    </Link>
                </div>)
            }
        </div>
    )
}