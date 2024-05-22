import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from './../axios';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function ProduitForm(){
    const {id} = useParams()
    const navigate = useNavigate()
    const {setNotification} = useStateContext()
    const [produit,setProduit] = useState({
        id: null,
        nom: '',
        description:'',
        categorie: '',
        prix: '',
        marque: '',
        lien_redirection: '',
    })
    const [errors,setErrors] = useState('')
    const [loading,setLoading] = useState(false)
    
    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/produits/${id}`)
            .then(({data}) => {
                setLoading(false)
                setProduit(data)
            })
            .catch(() => {
                setLoading(false)
            })
        }, [])
   }

   const onSubmit = (event) => {
        event.preventDefault()
        if (produit.id) {
            axiosClient.put(`/produits/${produit.id}`, produit)
            .then(() => {
                setNotification('Produit mis à jour avec succès')
                navigate('/produits')
            })
            .catch(err => {
                const response = err.response
                if (response && response.status === 422) {
                    setErrors(response.data.errors)
                }
            })
        } else {
            axiosClient.post(`/produits`, produit)
            .then(() => {
                setNotification('Produit ajouter avec succès')
                navigate('/produits')
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
            {produit.id && <h1>Mise à jour de {produit.nom}</h1>}
            {!produit.id && <h1>Nouveau Produit</h1>}
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
                        <div className="login-signup-form animated fadeInDown">
                            <div  className='form'>
                                <form onSubmit={onSubmit}>
                                    <input value={produit.nom} onChange={e => setProduit({...produit,nom: e.target.value})} type='text' placeholder='Nom du produit' />
                                    <input value={produit.description} onChange={e => setProduit({...produit,description: e.target.value})} type='text' placeholder='descriptioon' />
                                    <input value={produit.categorie} onChange={e => setProduit({...produit,categorie: e.target.value})} type='text' placeholder='categorie' />
                                    <input value={produit.prix} onChange={e => setProduit({...produit,prix: e.target.value})} type='text' placeholder='prix' />
                                    <input value={produit.marque} onChange={e => setProduit({...produit,marque: e.target.value})} type='text' placeholder='marque du produit' />
                                    <input value={produit.lien_redirection} onChange={e => setProduit({...produit,lien_redirection: e.target.value})} type='text' placeholder='lien_redirection' />
                                    <button className='button-ajout'>Save</button>
                                </form>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}