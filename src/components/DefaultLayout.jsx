import { useEffect } from 'react';
import { Outlet, Navigate, Link } from 'react-router-dom';
import {useStateContext} from '../contexts/ContextProvider.jsx'
import axiosClient from './../axios';
import ChatAssistant from './../view/ChatAssistant';


export default function DefaultLayout(){
    const {user,token,notification,setUser,setToken} = useStateContext()

    if(!token) {
        return <Navigate to={'/login'} />
    }

    const onLogOut = (event) => {
        event.preventDefault();

        axiosClient.post('/logout')
        .then(() => {
            setUser({})
            setToken(null)
        })
    }
    
    useEffect(() => {
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])

    return (
        <>
            {
                (user.type === 'admin' || user.type === 'conseiller') &&
                (<div className="container-fluid">
                    <div className="d-flex justify-content-between align-items-center p-2 mb-3 bg-white border-none sticky-top box-shadow-header">
                        <div className="flex-grow-5">
                            <Link to="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                                {/* <svg className="bi pe-none me-2" width="40" height="32"><use xlinkHref="#bootstrap"/></svg> */}
                                <span className="fs-4">Support client</span>
                            </Link>
                        </div>
                        <div className="flex-grow-2">
                            <ChatAssistant></ChatAssistant>
                        </div>

                        <div className="flex-grow-3">
                            <div className="d-flex align-items-center">
                                {/* <ChatAssistant></ChatAssistant> */}
                                &nbsp;&nbsp;
                                <div className="text-end me-1">
                                    <div className="dropdown">
                                        <Link to="" className="d-flex align-items-center link-body-emphasis text-decoration-none " data-bs-toggle="dropdown" aria-expanded="false">                               
                                            <button className="button-ajout">
                                                Voir&nbsp;
                                                <i className="bi bi-plus-lg" ></i>
                                            </button>
                                        </Link>
                                        <ul className="dropdown-menu text-small">
                                            <li><Link className="dropdown-item" to="/produits/new">AJouter Produits</Link></li>
                                            <li><Link className="dropdown-item" to="/questions/new"> AJouter Questions/<br/>Reponses</Link></li>                                
                                            <li><Link className="dropdown-item" to="/messages/new">AJouter Messages</Link></li>                                
                                        </ul>
                                    </div>
                                </div>
                                &nbsp;&nbsp;
                                <div className="text-end">
                                    <div className="dropdown">
                                        <Link to="" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                                            <strong>{user.name}</strong>
                                        </Link>
                                        <ul className="dropdown-menu text-small shadow border-none">
                                            <li><Link className="dropdown-item" onClick={onLogOut} to="">Sign out</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>       
                    <div className="hr-header"/>
                    <div className="d-flex justify-content-between">                
                        <div className="col-md-3 bg-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="d-none">
                                <symbol id="bootstrap" viewBox="0 0 118 94">
                                    <title>Bootstrap</title>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"></path>
                                </symbol>
                                <symbol id="home" viewBox="0 0 16 16">
                                    <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z"/>
                                </symbol>
                                <symbol id="speedometer2" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                                    <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
                                </symbol>
                                <symbol id="table" viewBox="0 0 16 16">
                                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
                                </symbol>
                                <symbol id="people-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </symbol>
                                <symbol id="grid" viewBox="0 0 16 16">
                                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
                                </symbol>
                            </svg>

                            <aside className="d-flex flex-nowrap text-md-center margin-top-sidebar position-fixed top-0 bottom-0">
                                <div className="d-flex flex-column flex-shrink-0 p-3">
                                    <ul className="nav nav-pills flex-column mb-auto">
                                        
                                        {/* <li>
                                            <Link to="/dashboard" className="nav-link link-body-emphasis">
                                                <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#speedometer2"/></svg>
                                                Dashboard
                                            </Link>
                                        </li> */}
                                        {
                                            user.type == 'admin' && 
                                            <li>
                                                <Link to="/messages" className="nav-link link-body-emphasis">
                                                    <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"/></svg>
                                                    Messages
                                                </Link>
                                            </li>
                                        }
                                        <li>
                                            <Link to="/produits" className="nav-link link-body-emphasis">
                                                <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"/></svg>
                                                Produits
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link to="/sessions" className="nav-link link-body-emphasis">
                                                <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#table"/></svg>
                                                Session
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link to="/questions" className="nav-link link-body-emphasis">
                                                <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#grid"/></svg>
                                                FAQ
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/users" className="nav-link link-body-emphasis">
                                                <svg className="bi pe-none me-2" width="16" height="16"><use xlinkHref="#people-circle"/></svg>
                                                users
                                            </Link>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </aside>
                        </div>
                        <div className="col-md-9">
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    </div>

                    {notification && 
                        <div className="notification">
                            {notification}
                        </div>
                    }
                </div>)
            }    

            {
                user.type === 'user' &&

                (
                    <>
                        <div className='d-flex justify-content-end py-2 me-3'>
                            <div className="dropdown">
                                <Link to="" className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
                                    <strong>{user.name}</strong>
                                </Link>
                                <ul className="dropdown-menu text-small shadow border-none">
                                    <li><Link className="dropdown-item" to="">New project...</Link></li>
                                    <li><Link className="dropdown-item" to="">Settings</Link></li>
                                    <li><Link className="dropdown-item" to="">Profile</Link></li>
                                    <li><hr className="dropdown-divider"/></li>
                                    <li><Link className="dropdown-item" onClick={onLogOut} to="">Déconnexion</Link></li>
                                </ul>
                            </div>
                        </div>

                        (<div className='d-flex justify-content-center align-items-center py-3'>
                            <p className="p">
                                Bienvenue {user.name} 
                            </p>
                        </div>)

                        <main className='d-flex justify-content-center align-items-center'>
                            <Outlet />
                        </main>
                    </>
                )
            }
            
        </>
    )
}



