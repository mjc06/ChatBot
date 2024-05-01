import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from './../axios';
import {useStateContext} from '../contexts/ContextProvider.jsx'

export default function Login(){
    const emailRef = useRef()
    const passwordRef = useRef()
    const [errors,setErrors] = useState(null)
    const {setUser, setToken} = useStateContext()

    const onSubmit = (event) => {
        event.preventDefault()

        const info = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        axiosClient.post('/login',info)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response
            if (response && response.status === 422) {
                if (response.data.errors){
                    setErrors(response.data.errors)
                }
                else {
                    setErrors({
                        email: [response.data.message]
                    })
                }
            }
        })
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Se connecter</h1>
                    {
                        errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={emailRef} type='email' placeholder='email' />
                    <input ref={passwordRef} type='password' placeholder='Password' />
                    <button className='btn btn-block'>Connexion</button>
                    <p className='message' >
                        S'inscrire? <Link to='/signup'>Créer un compte</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}