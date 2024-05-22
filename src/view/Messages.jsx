import { useState, useEffect } from 'react';
import axiosClient from '../axios';
import { Link } from 'react-router-dom';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function Messages(){
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getMessages()
    }, [])

    const onDelete = (p) => {
        if(window.confirm('Vous êtes sure de supprimer ce message?')) {
            return
        }

        axiosClient.delete(`/messages/${p.id}`)
        .then(() => {
            setNotification('Message supprimer avec succès')
            getMessages()
        })
    }
    const getMessages = async() => {
        setLoading(true)
        await axiosClient.get('/messages')
        .then(({data}) => {
            setLoading(false)
            setMessages(data.data)
        })
    } 

    return (
        <>       
            <div className='d-flex justify-content-between align-items-center'>
                <h1>Messages</h1>
                <Link to='/messages/new' className='btn-add'>Ajouter</Link>
            </div>
            <div className='card text-center animated fadeInDown'>
                <table>
                    <thead>
                        <th>Id</th>
                        {/* <th>content</th> */}
                        <th>type</th>
                        <th>genre</th>
                        <th>date de création</th>
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
                            {messages.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    {/* <td>{p.content}</td> */}
                                    <td>{p.type}</td>
                                    <td>{p.genre}</td>
                                    <td>{p.created_at}</td>

                                    <td>
                                        <Link to={'/messages/'+p.id} className='btn-edit'>Editer</Link>&nbsp;
                                        {/* <button onClick={(ev) => onDelete(p)} className="btn-delete">Supprimer</button> */}
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