import { useState, useEffect } from 'react';
import axiosClient from '../axios';
import { Link } from 'react-router-dom';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function Questions(){
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getQuestions()
    }, [])

    const onDelete = (p) => {
        if(window.confirm('Vous êtes sure de supprimer cette question?')) {
            return
        }

        axiosClient.delete(`/questions/${p.id}`)
        .then(() => {
            setNotification('Question supprimer avec succès')
            getQuestions()
        })
    }
    const getQuestions = async() => {
        setLoading(true)
        await axiosClient.get('/questions')
        .then(({data}) => {
            setLoading(false)
            setQuestions(data.data)
        })
    } 

    return (
        <>       
            <div className='d-flex justify-content-between align-items-center'>
                <h1>Questions/Reponses</h1>
                <Link to='/questions/new' className='btn-add'>Ajouter</Link>
            </div>
            <div className='card text-center animated fadeInDown'>
                <table>
                    <thead>
                        <th>Id</th>
                        <th>question</th>
                        <th>reponse</th>
                        <th>categorie</th>
                        <th>langue</th>
                        <th>statut</th>
                        <th>date de création</th>
                        <th>Actions</th>
                    </thead>
                    {
                        loading &&
                        <tbody>
                            <tr>
                                <td colSpan="10" className="text-center">
                                    Chargement...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {
                        !loading &&
                        <tbody>
                            {questions.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.quetion}</td>
                                    <td>{p.reponse}</td>
                                    <td>{p.categorie}</td>
                                    <td>{p.langue}</td>
                                    <td>{p.statut_question}</td>
                                    <td>{p.created_at}</td>

                                    <td>
                                        <Link to={'/questions/'+p.id} className='btn-edit'>Editer</Link>&nbsp;
                                        <button onClick={(ev) => onDelete(p)} className="btn-delete">Supprimer</button>
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