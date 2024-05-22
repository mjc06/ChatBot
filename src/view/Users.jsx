import { useState, useEffect } from 'react';
import axiosClient from './../axios';
import { Link } from 'react-router-dom';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function Users(){
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getUsers()
    }, [])

    const onDelete = (p) => {
        if(window.confirm('Vous êtes sure de supprimer cet utilisateur?')) {
            return
        }

        axiosClient.delete(`/users/${p.id}`)
        .then(() => {
            setNotification('Utilisateur supprimer avec succès')
            getUsers()
        })
    }
    const getUsers = async() => {
        setLoading(true)
        await axiosClient.get('/users')
        .then(({data}) => {
            setLoading(false)
            setUsers(data.data)
        })
    } 

    return (
        <>       
            <div className='d-flex justify-content-between align-items-center'>
                <h1>Utilisateurs</h1>
                <Link to='/users/new' className='btn-add'>Ajouter un membre</Link>
            </div>
            <div className='card text-center animated fadeInDown'>
                <table>
                    <thead>
                        <th>Id</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Date de création</th>
                        <th>Actions</th>
                    </thead>
                    {
                        loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Chargement...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {
                        !loading &&
                        <tbody>
                            {users.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.name}</td>
                                    <td>{p.email}</td>
                                    <td>{p.created_at}</td>
                                    <td>
                                        <Link to={'/users/'+p.id} className='btn-edit'>Edit</Link>&nbsp;
                                        {/* <button onClick={(ev) => onDelete(p)} className="btn-delete">Delete</button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }    
                </table>
            </div>
        </>
    )
}