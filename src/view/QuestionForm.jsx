import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from '../axios.js';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function QuestionForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const {setNotification} = useStateContext()
    const [question,setQuestion] = useState({
        id: null,
        question: '',
        reponse: '',
        categorie: '',
        langue: '',
        statut_question: '',
    })
    const [errors,setErrors] = useState('')
    const [loading,setLoading] = useState(false)
    
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/questions/${id}`)
            .then(({data})=> {
                setLoading(false)
                setQuestion(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
   }

   const onSubmit = (event) => {
        event.preventDefault()
        if (question.id) {
            axiosClient.put(`/questions/${question.id}`, question)
            .then(() => {
                setNotification('Question mis à jour avec succès')
                navigate('/questions')
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        } else {
            axiosClient.post(`/questions`, question)
            .then(() => {
                setNotification('Question ajouter avec succès')
                navigate('/questions')
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
            {question.id && <h1>Mise à jour de la question {question.nom}</h1>}
            {!question.id && <h1>Nouvelle Question</h1>}
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
                            <input value={question.question} onChange={e => setQuestion({...question,question: e.target.value})} type='text' placeholder='question' />
                            <input value={question.reponse} onChange={e => setQuestion({...question,reponse: e.target.value})} type='text' placeholder='reponse' />
                            <input value={question.categorie} onChange={e => setQuestion({...question,categorie: e.target.value})} type='text' placeholder='categorie' />
                            <input value={question.langue} onChange={e => setQuestion({...question,langue: e.target.value})} type='text' placeholder='langue' />
                            <input value={question.statut_question} onChange={e => setQuestion({...question,statut_question: e.target.value})} type='text' placeholder='Tapez active or non active' />
                            <button className='button-ajout'>Save</button>
                        </form>
                    )
                }
            </div>
        </>
    )
}