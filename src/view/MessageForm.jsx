import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from '../axios.js';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function MessageForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const {setNotification} = useStateContext()
    const [message,setMessage] = useState({
        id: null,
        content: '',
        type: '',
        genre: '',
    })
    const [errors,setErrors] = useState('')
    const [loading,setLoading] = useState(false)
    
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/messages/${id}`)
            .then(({data})=> {
                setLoading(false)
                setMessage(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
   }

   const onSubmit = (event) => {
        event.preventDefault()
        if (message.id) {
            axiosClient.put(`/messages/${message.id}`, message)
            .then(() => {
                setNotification('Message mis à jour avec succès')
                navigate('/messages')
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        } else {
            axiosClient.post(`/messages`, message)
            .then(() => {
                setNotification('Message ajouter avec succès')
                navigate('/messages')
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
            {message.id && <h1>Mise à jour du message de genre {message.genre}</h1>}
            {!message.id && <h1>Nouveau message</h1>}
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
                            <input value={message.content} onChange={e => setMessage({...message,content: e.target.value})} type='text' placeholder='contenu du message' />
                            <select name="type" onChange={e => setMessage({...message,type: e.target.value})}>
                                <option selected>choisir</option>
                                <option value="text">text</option>
                            </select>
                            <select name="genre" onChange={e => setMessage({...message,genre: e.target.value})}>
                                <option selected>choisir</option>
                                <option value="accueil">accueil</option>
                                <option value="transfert">transfert</option>
                                <option value="clôture">clôture</option>
                            </select>
                            <button className='button-ajout'>Save</button>
                        </form>
                    )
                }
            </div>
        </>
    )
}