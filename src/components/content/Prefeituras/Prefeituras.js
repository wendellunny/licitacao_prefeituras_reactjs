import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../../../styles/layout/table.module.css'
export function Prefeituras(){
    const [prefeituras,setPrefeituras] = useState([]);
    const [token, setToken] =useState(localStorage.getItem('jwt_token'));
    
    useEffect(() => {
        getPrefeituras();
    },[]);
    
    return (
        <div>
            <Link to="/prefeituras/create">Nova Prefeitura</Link>
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
                                <Link to={`/prefeituras/${prefeitura.id}/edit `}><button>Editar</button></Link>
                                <button onClick={()=>deletePrefeitura(prefeitura.id)}>Excluir</button>
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
    }

    async function deletePrefeitura($id){
        const data = await fetch(`http://127.0.0.1:8000/api/city-halls/${$id}`,{
            method:'DELETE',
            headers: { 'Content-Type': 'application/json','Authorization': `bearer ${token}` },
        });

        console.log(await data.json());
        getPrefeituras();
    }
}