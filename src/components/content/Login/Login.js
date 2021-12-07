import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../../context/AuthContext";

export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {isAuthenticated,handleLogin} = useContext(Context);
    const [loading, setLoading] =useState(true);
    const navigate = useNavigate();

    useEffect(async function(){
        const authenticated = await isAuthenticated();
        if(authenticated){
            navigate('/')
        }
        setLoading(false);
    },[]);

    if(loading){
        return <h1>Carregando</h1>;
    }
    return(
        <div>
            <div class="form-group">
                <label>Email</label>
                <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
            </div>
            <div class="form-group">
                <label>Senha</label>
                <input type="password"  value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </div>
            <button onClick={()=>handleLogin({email:email,password:password})}>Entrar</button>
        </div>
    )
}