import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from './../axios';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function UserForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const {setNotification} = useStateContext
    const [user,setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [errors,setErrors] = useState('')
    const [loading,setLoading] = useState(false)
    
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
            .then(({data})=> {
                setLoading(false)
                setUser(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
   }

   const onSubmit = (event) => {
        event.preventDefault()
        if (user.id) {
            axiosClient.put(`/users/${user.id}`, user)
            .then(() => {
                setNotification('Utilisateur mis à jour avec succès')
                navigate('/users')
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        } else {
            axiosClient.post(`/users`, user)
            .then(() => {
                setNotification('Utilisateur ajouter avec succès')
                navigate('/users')
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        }
   }

    return (
        <>       
            {user.id && <h1>Mise à jour de l'utilisateur {user.name}</h1>}
            {!user.id && <h1>Nouveau Utilisateur</h1>}
            <div className="card animated fadeInDown">
                {
                    loading && (
                        <div className="text-center">Chargement...</div>
                    )
                }
                {
                    errors && <div className="alert">
                        {Object.keys(errors).map(key => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                }

                {
                    !loading && (
                        <form onSubmit={onSubmit}>
                            <input value={user.name} onChange={e => setUser({...user,name: e.target.value})} type='text' placeholder='Nom et prénoms' />
                            <input value={user.email} onChange={e => setUser({...user,email: e.target.value})} type='email' placeholder='Email' />
                            <input onChange={e => setUser({...user,password: e.target.value})} type='password' placeholder='Mot de Passe' />
                            <input onChange={e => setUser({...user,password_confirmation: e.target.value})} type='password' placeholder='Confirmation mot de passe' />
                            <button className='button-ajout'>Save</button>
                        </form>
                    )
                }
            </div>
        </>
    )
}