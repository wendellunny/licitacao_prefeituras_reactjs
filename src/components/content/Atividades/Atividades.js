import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../../../styles/layout/table.module.css';
export function Atividades(){
    const [atividades,setAtividades] = useState([]);
    useEffect(()=>{
        getAtividades();
    },[]);
    return (
        
        <div>
            <Link to="/atividades/create">Nova Atividade</Link>
           <table className={styles.table}>
               <thead>
                   <tr>
                       <th>Descrição</th>
                       <th>Tipo</th>
                       <th>Status</th>
                       <th>Prefeitura</th>
                       <th>Categoria</th>
                       <th>Data</th>
                   </tr>
               </thead>
               <tbody>
                    {atividades?.data?.map((atividade)=>{
                        return (<tr>
                                    <td>{atividade.description}</td>
                                    <td>{atividade.type.formated}</td>
                                    <td>{atividade.status.formated}</td>
                                    <td>{atividade.city_hall.social_reason}</td>
                                    <td></td>
                                    <td>{atividade.scheduled_date}</td>
                                    </tr>
                                )
                    })}
               </tbody>
           </table>

        </div>

    )
    async function getAtividades(){
        const data = await fetch('http://127.0.0.1:8000/api/activities');
        const response = await data.json();
        console.log(response.data.data)
        setAtividades(response.data);
    }

}