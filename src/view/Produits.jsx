import { useState, useEffect } from 'react';
import axiosClient from '../axios';
import { Link } from 'react-router-dom';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function Produits(){
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getProduits()
    }, [])

    const onDelete = (p) => {
        if(window.confirm('Vous êtes sure de supprimer ce produit?')) {
            return
        }

        axiosClient.delete(`/produits/${p.id}`)
        .then(() => {
            setNotification('Produit supprimer avec succès')
            getProduits()
        })
    }
    const getProduits = async() => {
        setLoading(true)
        await axiosClient.get('/produits')
        .then(({data}) => {
            setLoading(false)
            setProduits(data.data)
        })
    } 

    return (
        <>       
            <div className='d-flex justify-content-between align-items-center'>
                <h1>Produits</h1>
                <Link to='/produits/new' className='btn-add'>Ajouter</Link>
            </div>
            <div className='card text-center animated fadeInDown'>
                <table>
                    <thead>
                        <th>Id</th>
                        <th>nom</th>
                        <th>description</th>,
                        <th>categorie</th>,
                        <th>prix</th>,
                        <th>marque</th>,
                        <th>lien redirection</th>,
                        <th>Date de création</th>,
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
                            {produits.map(p => (
                                <tr key={p.id}>
                                    <td>{p.id}</td>
                                    <td>{p.nom}</td>,
                                    <td>{p.description}</td>,
                                    <td>{p.categorie}</td>,
                                    <td>{p.prix}</td>,
                                    <td>{p.marque}</td>,
                                    <td>{p.lien_redirection}</td>,
                                    <td>{p.created_at}</td>,
                                    <td>
                                        <Link to={'/produits/'+p.id} className='btn-edit'>Editer</Link>&nbsp;
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