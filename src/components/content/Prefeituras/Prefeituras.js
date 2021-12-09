import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../../../styles/layout/table.module.css'
import { AppLoading } from "../../Layout/loadings/AppLoading";
export function Prefeituras(){
    const [prefeituras,setPrefeituras] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('jwt_token'));
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        getPrefeituras();
    },[]);
    
    return (
        <div>
            {loading ? <AppLoading/> : ''}
            <div className={styles.items_header}>
                <h2>Prefeituras</h2>
                
                <Link to="/prefeituras/create">
                    <button>
                        <span className="material-icons">add</span>
                    </button> 
                </Link>
            </div>
            
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            Razão Social
                        </th>
                        <th>
                            Cidade
                        </th>
                        <th>
                            Estado
                        </th>
                        <th>
                            Telefone
                        </th>
                        <th>
                            Número de Habitantes
                        </th>
                        <th>
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {prefeituras?.data?.map(function(prefeitura){
                      return (
                          <tr>
                            <td>{prefeitura.social_reason}</td>
                            <td>{prefeitura.city}</td>
                            <td>{prefeitura.uf}</td>
                            <td>{prefeitura.phone}</td>
                            <td>{prefeitura.population}</td>
                            <td>
                                <Link to={`/prefeituras/${prefeitura.id}/edit `}>
                                    <button style={{backgroundColor:'#3B9CFF', color:'#fff'}}>
                                        <span className="material-icons" >edit</span>
                                    </button>
                                </Link>
                                <button onClick={()=>deletePrefeitura(prefeitura.id)} style={{backgroundColor:'#FE5F55', color:'#fff'}} >
                                    <span className="material-icons">delete</span>
                                </button>
                            </td>
                          </tr>
                      )
                    })}
                </tbody>
            </table>

        </div>
            
        
    )
    

    async function getPrefeituras(){
        const data = await fetch(`http://127.0.0.1:8000/api/city-halls?token=${token}`);
        const response = await data.json();

        setPrefeituras(response.data);
        setLoading(false);
    }

    async function deletePrefeitura($id){
        setLoading(true);
        const data = await fetch(`http://127.0.0.1:8000/api/city-halls/${$id}`,{
            method:'DELETE',
            headers: { 'Content-Type': 'application/json','Authorization': `bearer ${token}` },
        });

        console.log(await data.json());
        getPrefeituras();
    }
}