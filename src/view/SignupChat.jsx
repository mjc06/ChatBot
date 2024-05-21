import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios.js';
import {useStateContext} from '../contexts/ContextProvider.jsx'


export default function SignupChat(){
    const nameRef = useRef()
    const emailRef = useRef()
    const typeRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmationRef = useRef()
    const [errors,setErrors] = useState()
    const {setUser, setToken} = useStateContext()
    const csrfToken = () => axiosClient.get('http://chatbot-client.test/sanctum/csrf-cookie');


    const onSubmit = async(event) => {
        event.preventDefault()
        const info = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            type: typeRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        await csrfToken()
        axiosClient.post('/signup',info)
        .then(({data}) => {
            setUser(data.user)
            setToken(data.token)
        })
        .catch(err => {
            const response = err.response
            if (response && response.status === 422) {
                console.log(response.data.errors);
                setErrors(response.data.errors)
            }
        })
        
    }
    
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">S'inscrire</h1>
                    {
                        errors && <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    <input ref={nameRef} type='text' placeholder='Nom et prénoms' />
                    <input ref={emailRef} type='email' placeholder='Email' />
                    <select disabled="disabled" ref={typeRef} placeholder='type'>
                        <option selected defaultvalue="user">user</option>
                    </select>
                    <input ref={passwordRef} type='password' placeholder='Mot de Passe' />
                    <input ref={passwordConfirmationRef} type='password' placeholder='Confirmation mot de passe' />
                    <button className='btn btn-block'>S'inscrire</button>
                    <p className='message' >
                        Déjà membre? <Link to='/login'>Se connecter</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}