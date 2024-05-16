import {createBrowserRouter, Navigate} from 'react-router-dom';
import Login from './view/Login.jsx';
import Signup from './view/Signup.jsx';
import SignupChat from './view/SignupChat.jsx';
import Users from './view/Users.jsx';
import Chat from './view/Chat.jsx';
import Produits from './view/Produits.jsx';
import Messages from './view/Messages.jsx';
import Questions from './view/Questions.jsx';
import DefaultLayout from './components/DefaultLayout.jsx';
import GuestLayout from './components/GuestLayout.jsx';
import NotFound from './view/NotFound.jsx';
import Dashboard from './view/Dashboard';
import UserForm from './view/UserForm.jsx';
import ProduitForm from './view/ProduitForm.jsx';
import QuestionForm from './view/QuestionForm.jsx';
import MessageForm from './view/MessageForm.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [            
            {
                path: '/',
                element: <Navigate to='dashboard'/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
            {
                path: '/produits',
                element: <Produits/>
            },
            {
                path: '/produits/new',
                element: <ProduitForm key="produitCreate"/>
            },
            {
                path: '/produits/:id',
                element: <ProduitForm key="produitUpdate"/>
            },
            {
                path: '/questions',
                element: <Questions/>
            },
            {
                path: '/questions/new',
                element: <QuestionForm key="questionCreate"/>
            },
            {
                path: '/questions/:id',
                element: <QuestionForm key="questionUpdate"/>
            },
            {
                path: '/messages',
                element: <Messages/>
            },
            {
                path: '/messages/new',
                element: <MessageForm key="messageCreate"/>
            },
            {
                path: '/messages/:id',
                element: <MessageForm key="messageUpdate"/>
            },
            {
                path: '/support/client',
                element: <Chat/>
            },  
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [  
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/signup-chat',
                element: <SignupChat/>
            },
        ]
    },  
    {
        path: '*',
        element: <NotFound/>
    }
]);

export default router;