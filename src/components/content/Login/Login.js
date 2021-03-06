import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Navigate } from "react-router-dom";
import { Context } from "../../../context/AuthContext";
import styles from "../../../styles/login/login.module.css";
import background from "../../../assets/images/backgrounds/licitacao.jpg";
import { StartLoading } from "../../Layout/loadings/StartLoading";

export default function Login(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {isAuthenticated,handleLogin} = useContext(Context);
    const [loading, setLoading] =useState(true);
    const navigate = useNavigate();

    useEffect(async function(){
        const authenticated = await isAuthenticated();
        console.log(authenticated);
        if(!authenticated){
            setLoading(false);
            return <Navigate to="/login"/>
        }else{
            setLoading(false);
            return <Navigate to="/"/>
        }
        
    },[]);

    if(loading){
        return <StartLoading/>
    }
    
    return(
        <main className={styles.login}>
            <section className="background">
                <img src={background}/>
            </section>
            <section>
                <div class="form-group">
                    <label><span className='material-icons'>mail</span> Email</label>
                    <input type="text" value={email} onChange={(event)=>setEmail(event.target.value)}/>
                </div>
                <div class="form-group">
                    <label> <span className='material-icons'>key</span>Senha</label>
                    <input type="password"  value={password} onChange={(event)=>setPassword(event.target.value)}/>
                </div>
                <div>
                    <button onClick={()=>handleLogin({email:email,password:password})}>Entrar</button>
                </div>   
            </section>
        </main>
    )
}