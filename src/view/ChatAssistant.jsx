import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {useStateContext} from '../contexts/ContextProvider.jsx'
import axiosClient from './../axios';

export default function Chat(){
    const {user, token, setUser, setToken} = useStateContext()
    const [chatClient,setChatClient] = useState({        
        id: null,
        content: '',
        type: 'text',
        genre: 'simple',
        user_id: user ? user.id : null,
        session_id: user ? user.session_id : null,
        statut: 'envoyé',
        auteur: 'client'
    });
    const [chatService,setChatService] = useState({
        elementA:{
            id: null,
            content: '',
            type: 'text',
            genre: 'simple',
            user_id: null,
            session_id: user ? user.session_id : null,
            statut: 'envoyé',
            auteur: 'bot'
        },
        elementB:{
            id: null,
            content: '',
            type: 'text',
            genre: 'simple',
            user_id: null,
            session_id: user ? user.session_id : null,
            statut: 'envoyé',
            auteur: 'bot'
        },
        elementC:{
            id: null,
            content: '',
            type: 'text',
            genre: 'simple',
            user_id: null,
            session_id: user ? user.session_id : null,
            statut: 'envoyé',
            auteur: 'bot'
        }
    });
    const [loading,setLoading] = useState(false);
    const [statut, setStatut] = useState(false);
    const [chatMan,setChatMan] = useState([]);
    const [chatUser,setChatUser] = useState([]);
    const [errors,setErrors] = useState('');
    const [displayMessage,setDisplayMessage] = useState(null);
    const chatEndRef = useRef(null);
    const [statutRedirectClient,setStatutRedirectClient] = useState(false);
    const [loadingDiscussion,setLoadingDiscussion] = useState(false);
    const csrfToken = () => axiosClient.get('http://chatbot-client.test/sanctum/csrf-cookie');



    
    useEffect(() => {
        if(!token){
            return <Navigate to={'/signup-chat'} />
        }
    }, []);      

    // useEffect(() => {
    //     const getAllMessageInDiscussion = async() => {
    //         // setLoadingDiscussion(true)
    //         try {
    //             const { data } = await axiosClient.get(`/sessions/messages/${user.session_id}`)
    //             console.log(data);

    //             // setLoading(false)
    //             data.messages.forEach(element => {
    //                 if (element.auteur === 'client') {
    //                     setChatUser(prev => [
    //                         ...prev, 
    //                         {
    //                             id: Math.ceil(Math.random() * 3600),
    //                             ask: element.content,
    //                         }
    //                     ]);
    //                 }
    //                  else {
    //                     setChatUser(prev => {
    //                         if (prev.length > 0) {
    //                             const updatedChatUser = [...prev];
    //                             updatedChatUser[updatedChatUser.length - 1].answer = element.content;
    //                             return updatedChatUser;
    //                         }
    //                         return prev;
    //                     });
    //                 }
    //             });           
    //         } catch (error) {
    //             console.error('Error saving user message:', error);
    //         }
    //     }
    //     getAllMessageInDiscussion()
    // }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chatUser]);      


    // console.log(user);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({behavior: 'smooth'})
    }
    
    const onCloseChat = (e) => {
        e.preventDefault()
        document.querySelector('.my-card').classList.add('d-none')
        document.querySelector('.my-card').classList.add('fadeInUp')
        document.querySelector('.build-discussion').classList.remove('d-none')
        document.querySelector('.build-discussion').classList.remove('fadeInDown')
    }

    const onBuildDiscussion = (e) => {
        e.preventDefault()
        
        document.querySelector('.build-discussion').classList.add('d-none')
        document.querySelector('.build-discussion').classList.add('fadeInUp')
        document.querySelector('.my-card').classList.remove('d-none')
        document.querySelector('.my-card').classList.remove('fadeInDown')
    }

    const onSubmitChat = async(e) => {
        e.preventDefault()
        
        await csrfToken()

        try {
            setChatClient({
                ...chatClient,
                auteur: 'editeur',
            })
            const { data } = await axiosClient.post('/messages', chatClient);
            
            setChatClient({
                ...chatClient, 
                content: '',
            })
        } catch (error) {
            console.error('Error saving user message:', error);
        }

        try {
            setChatClient({
                ...chatClient,
                auteur: 'editeur',
            })
            const { data } = await axiosClient.post('/messages', chatClient);
            
            setChatClient({
                ...chatClient, 
                content: '',
            })
        } catch (error) {
            console.error('Error saving user message:', error);
        }
    }

    return (
        <>
            <div className='my-card animated d-none'>
                <div className='my-card-container'>
                    <div className='my-card-header'>    
                        <div className='mch1'>
                            <h5>Assistance client</h5>
                        </div>
                        <div className='mch2'>
                            <i className='bi bi-x-lg' onClick={onCloseChat}></i>
                        </div>
                    </div>
                    
                    <div className='my-card-body'>                    
                        {
                            chatUser.map(msg => 
                                (<div key={msg.id}>                            
                                    {
                                        msg.ask && 
                                        (<div className='mcb2'>
                                            <p className='' >{msg.ask}</p>&nbsp;
                                            <i className='bi bi-person-circle text-warning'></i>
                                        </div>)
                                    }

                                    {
                                        (msg.answer && (displayMessage == 1) && loading) &&
                                        (
                                            <div className='mcb1'>
                                                <i className='bi bi-person-circle text-warning'></i>&nbsp;
                                                <p className='' >{msg.answer}</p>
                                            </div> 
                                        )
                                    }
                                    {
                                        (msg.answer && msg.answerA && (displayMessage == 2) && loading) &&
                                        (
                                            <>
                                                <div className='mcb1'>
                                                    <i className='bi bi-person-circle text-warning'></i>&nbsp;
                                                    <p className='' >{msg.answer}</p>
                                                </div> 
                                                <div className='mcb1'>
                                                    <i className='bi bi-person-circle text-warning'></i>&nbsp;
                                                    <p className='' >{msg.answerA}</p>
                                                </div> 
                                            </>
                                        )
                                    }
                                    {
                                        (msg.answer && msg.answerA && msg.answerB && (displayMessage === 3) && loading) &&
                                        (
                                            <>
                                                <div className='mcb1'>
                                                    <i className='bi bi-person-circle text-warning'></i>&nbsp;
                                                    <p className='' >{msg.answer}</p>
                                                </div> 
                                                <div className='mcb1'>
                                                    <i className='bi bi-person-circle text-warning'></i>&nbsp;
                                                    <p className='' >{msg.answerA}</p>
                                                </div> 
                                                <div className='mcb1'>
                                                    <i className='bi bi-person-circle text-warning'></i>&nbsp;
                                                    <p className='' >{msg.answerB}</p>
                                                </div> 
                                            </>
                                        )
                                    }
                                </div>)
                            )
                        }
                        <div ref={chatEndRef} />
                    </div>

                    

                    <form className='my-card-footer' onSubmit={onSubmitChat}>
                        <div className='mcf1'>
                            <input type='text' name='content' value={chatClient.content} onChange={e => setChatClient({...chatClient,content: e.target.value})} placeholder='Tapez votre message' />
                        </div>
                        <div className='mcf2'>
                            <i type="submit" className='bi bi-send-fill'></i>
                        </div>
                    </form>
                </div>
            </div>
            <div className='build-discussion'>
                <i
                    onClick={onBuildDiscussion}
                    className="bi bi-chat-right-dots-fill"
                ></i>
            </div>
        </>
    );
}


















// Bonjour et bienvenue dans votre espace chat client, Je suis chat man! Avez-vous une question qui aurait besoin de réponses ? (Répondez par Oui ou Non)
// Je ne pourrais vous satisfaire sur ce point. Patientez un instant, je vous met en contact avec l'un de nos conseillers clientèle pour une meilleure assistance. Merci!
// Je suis heureux de vous avoir puis aidez. Vous êtes la bienvenue pour tout autre préoccupation. Merci et à la prochaine !







// // import React, { useState, useEffect } from 'react';
// // import ChatBot from "react-simple-chatbot"
// // import { ThemeProvider } from 'styled-components';
// // import axiosClient from './../axios';

// // export default function Chat(){
// //     const [welcomeSms, setWelcomeSms] = useState('');

// //     useEffect(() => {
// //         getWelcomeSms();
// //     }, []);

// //     const getWelcomeSms = async () => {
// //         try {
// //             await axiosClient.get('/start')
// //             .then((response) => {
// //                 console.log(response.data);
// //                 setWelcomeSms(response.data)
// //                 console.log(welcomeSms)
// //             })
            
// //         } catch (error) {
// //             console.error('Error fetching welcome message:', error);
// //         }
// //     } 

// //     const startConversation = (paramsA,paramsB) => {
// //         try {
// //             axiosClient.post('/botman',params)
// //             .then((response) => {
// //                 console.log(response.data);
// //                 setWelcomeSms(response.data)
// //                 console.log(welcomeSms)
// //             })
// //             return welcomeSms;
            
// //         } catch (error) {
// //             console.error('Error fetching welcome message:', error);
// //         }
// //     } 
    
// //     // welcomeSms || "Bonjour cher client, en quoi puis-je vous aidez ?"
// //     // All available props
// //     const theme = {
// //         textShadow: '2rem',
// //         boxSizing: 'border-box',
// //         background: '#f5f8fb',
// //         fontFamily: 'Open Sans sans-serif',
// //         headerBgColor: 'rgb(235, 71, 35)',
// //         headerFontColor: '#fff',
// //         headerFontSize: '15px',
// //         botBubbleColor: 'rgb(235, 71, 35)',
// //         botFontColor: '#fff',
// //         userBubbleColor: '#fff',
// //         userFontColor: '#4a4a4a',
// //     };

// //     const steps = [
// //         {
// //             id: '1',
// //             user: true,
// //             trigger: 2,
// //         },
// //         // {
// //         //     id: '2',
// //         //     message: ({ previousValue, steps }) => startConversation(previousValue, steps),
// //         //     trigger: 3,
// //         // },
// //         {
// //             id: '2',
// //             user: true,
// //             end: true,
// //         },
// //     ];

// //     return (
// //         <ThemeProvider theme={theme}>
// //             <ChatBot 
// //                 headerTitle="Customer Support Bot"
// //                 recognitionEnable={true}
// //                 steps={steps} 
// //                 floating={true} 
// //             />
// //         </ThemeProvider>
// //     );
// // }

































