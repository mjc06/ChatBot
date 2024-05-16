import React, { useState, useEffect, useRef } from 'react';
import { Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import {useStateContext} from '../contexts/ContextProvider.jsx'
import axiosClient from './../axios';

export default function Chat(){
    // const [myUser,setMyUser] = useState({
    //     name: 'user_xxxx' + Math.ceil(Math.random() * 3600 * 0.2 - 6 + 1),
    //     email: 'user' + Math.ceil(Math.random() * 3600 * 0.2 - 6 + 1) + '@xxx.com',
    //     password: 'Abcd@x0.',
    //     password_confirmation: 'Abcd@x0.',
    //     type: 'user',
    //     session_id: null,
    // });
    const [session,setSession] = useState({
        id: 1,
    });
    const [message,setMessage] = useState({        
        id: null,
        content: '',
        type: 'text',
        genre: 'simple',
        user_id: null,
        session_id: null,
        statut: 'envoyé',
        auteur: 'client'
    });
    const [chatService,setChatService] = useState({        
        id: null,
        content: '',
        type: 'text',
        genre: 'simple',
        user_id: null,
        session_id: null,
        statut: 'Reçu',
        auteur: 'bot'
    });
    const [loading,setLoading] = useState(false);
    const [statut, setStatut] = useState(false);
    const [chatMan,setChatMan] = useState([]);
    const [chatUser,setChatUser] = useState([]);
    const [errors,setErrors] = useState('')
    const {user, token, setUser, setToken} = useStateContext()
    const chatEndRef = useRef(null)
    const [statutRedirectClient,setStatutRedirectClient] = useState(false)
    const csrfToken = () => axiosClient.get('http://chatbot-client.test/sanctum/csrf-cookie');

    
    useEffect(() => {
        if(!token){
            return <Navigate to={'/signup-chat'} />
        }
    }, []);      

    useEffect(() => {
        scrollToBottom();
    }, [chatUser]);      

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

    // useEffect(() => 0
    //     const fetch = async() => {
    //         await axiosClient.post('/botman', {
    //             driver: 'web'
    //         })
    //         .then(({data}) => {
    //             setTimeout(() => {
    //                 setChatUser([
    //                     ...chatUser, 
    //                     {
    //                         id: Math.ceil(Math.random(12) * 3600),
    //                         ask: '',
    //                         answer: data.messages[1].text,
    //                     }
    //                 ])
    //             }, 2000);

    //             setChatService({
    //                 ...chatService, content: data.messages[1].text, 
    //             })
    //         })
    //         .catch(err => {
    //             const response = err.response
    //             if (response && response.status === 422) {
    //                 setErrors(response.data.errors)
    //             }
    //         })

    //     }    
    //     fetch()

    //     if(chatService.content !== '') {
    //         axiosClient.post('/messages', chatService)
    //         .then(({data}) => {
    //             setChatService({
    //                 ...chatService, 
    //                 content: '',
    //                 user_id: null,
    //                 session_id: null,
    //             })
    //         })
    //         .catch(err => {
    //             const response = err.response
    //             if (response && response.status === 422) {
    //                 setErrors(response.data.errors)
    //             }
    //         })
    //     }
    // },[])


    const onSubmitChat = async(e) => {
        e.preventDefault()
        setMessage({...message, user_id: user.id})
        console.log(user.id)
        
        await csrfToken()

        if(!statutRedirectClient) {
            try {
                const { data } = await axiosClient.post('/botman',{
                    driver: "web",
                    userId: user.id,
                    message: message.content,
                });
    
                console.log(data)
    
                if(data.messages[0].additionalParameters.stopChatMan){
                    
                }
    
                if(data.messages[0].additionalParameters) {
                    setChatService({
                        ...chatService, content: data.messages[0].text, 
                        session_id: data.messages[0].additionalParameters.session_id,
                    })
                }
                else {
                    setChatService({
                        ...chatService, content: data.messages[0].text, 
                    })
                }    
    
                setTimeout(() => {
                    setChatUser([
                        ...chatUser, 
                        {
                            id: Math.ceil(Math.random(12) * 3600),
                            ask: message.content,
                            answer: data.messages[0].text,
                        }
                    ])
                }, 0);
    
                setTimeout(() => {
                    setLoading(true)
                }, 3000);
                
                setMessage({...message, session_id: data.messages[0].additionalParameters.session_id})
                
            } catch (error) {
                console.error('Error saving user message:', error);
            }
    
            try {
                const { data } = await axiosClient.post('/messages', message);
                
                setMessage({
                    ...message, 
                    content: '',
                })
            } catch (error) {
                console.error('Error saving user message:', error);
            }
    
    
            if(chatService.content !== '') {
                try {
                    const { data } = await axiosClient.post('/messages', chatService);
    
                    setChatService({
                        ...chatService, 
                        content: '',
                    })
                } catch (error) {
                    console.error('Error saving user message:', error);
                }
    
            }
        }
        else {
            try {
                const { data } = await axiosClient.post('/botman',{
                    driver: "web",
                    userId: user.id,
                    message: message.content,
                });
    
                console.log(data)
    
                if(data.messages[0].additionalParameters.stopChatMan){
                    
                }
    
                if(data.messages[0].additionalParameters) {
                    setChatService({
                        ...chatService, content: data.messages[0].text, 
                        session_id: data.messages[0].additionalParameters.session_id,
                    })
                }
                else {
                    setChatService({
                        ...chatService, content: data.messages[0].text, 
                    })
                }    
    
                setTimeout(() => {
                    setChatUser([
                        ...chatUser, 
                        {
                            id: Math.ceil(Math.random(12) * 3600),
                            ask: message.content,
                            answer: data.messages[0].text,
                        }
                    ])
                }, 0);
    
                setTimeout(() => {
                    setLoading(true)
                }, 3000);
                
                setMessage({...message, session_id: data.messages[0].additionalParameters.session_id})
                
            } catch (error) {
                console.error('Error saving user message:', error);
            }
    
            try {
                const { data } = await axiosClient.post('/messages', message);
                
                setMessage({
                    ...message, 
                    content: '',
                })
            } catch (error) {
                console.error('Error saving user message:', error);
            }
    
    
            if(chatService.content !== '') {
                try {
                    const { data } = await axiosClient.post('/messages', chatService);
    
                    setChatService({
                        ...chatService, 
                        content: '',
                    })
                } catch (error) {
                    console.error('Error saving user message:', error);
                }
    
            }
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
                                <div key={msg.id}>                            
                                    {
                                        msg.ask && 
                                        (<div className='mcb2'>
                                            <p className='' >{msg.ask}</p>&nbsp;
                                            <i className='bi bi-person-circle text-warning'></i>
                                        </div>)
                                    }

                                    {
                                        (msg.answer && loading) &&
                                        (<div className='mcb1'>
                                            <i className='bi bi-person-circle text-warning'></i>&nbsp;
                                            <p className='' >{msg.answer}</p>
                                        </div> )   
                                    }
                                </div>
                            )
                        }
                        <div ref={chatEndRef} />
                    </div>

                    

                    <form className='my-card-footer' onSubmit={onSubmitChat}>
                        <div className='mcf1'>
                            <input type='text' name='content' value={message.content} onChange={e => setMessage({...message,content: e.target.value})} placeholder='Tapez votre message' />
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

































