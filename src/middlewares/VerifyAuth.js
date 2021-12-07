import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../context/AuthContext";
export function VerifyAuth({children}){
    const {isAuthenticated} = useContext(Context);
    const [loading, setLoading] =useState(true);
    const navigate = useNavigate();

    useEffect(async function(){

        const authenticated = await isAuthenticated();
        if(!authenticated){
            navigate('/login')
        }
        setLoading(false);
    },[]);
    if(loading){
        return <h1>Carregando</h1>;
    }
    return (
        <>
            {children}
        </>
    );
}