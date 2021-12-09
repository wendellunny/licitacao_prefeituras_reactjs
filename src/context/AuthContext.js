import React,{createContext, useEffect, useState} from 'react';
import { useNavigate } from 'react-router';
const Context = createContext();


function AuthProvider({children}){
    const navigate = useNavigate();

    async function isAuthenticated(){
       const jwtToken = localStorage.getItem('jwt_token');
       if(jwtToken){
           const dataForm = {
               token: jwtToken
            };
       
            const request = await fetch('http://127.0.0.1:8000/api/me',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(dataForm)
            });

            const response = await request.json();
           
            if(response.email){
                return true;
            }else{
                return false;
            }
       }
       return false
    }

    async function handleLogin(form){
        const response = await fetch('http://127.0.0.1:8000/api/login',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
        }
        )
        const {access_token} = await response.json();
        localStorage.setItem('jwt_token',access_token);
        const auth = await isAuthenticated();
        if (auth){
            navigate('/');
        }else{
            navigate('/login')
        }
    }


    return(
        <Context.Provider value={{isAuthenticated,handleLogin}}>
            {children}
        </Context.Provider>
    )
   
}

export {Context,AuthProvider};