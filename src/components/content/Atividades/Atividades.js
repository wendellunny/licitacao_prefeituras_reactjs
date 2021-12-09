import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../../../styles/layout/table.module.css';
import Select from 'react-select'
import { AppLoading } from "../../Layout/loadings/AppLoading";
export function Atividades(){
    const [atividades,setAtividades] = useState([]);
    const [inputStatus,setInputStatus] = useState(null);
    const [inputType,setInputType] = useState(null);
    const [inputSatisfaction,setInputSatisfaction] = useState(null);
    const [token, setToken] =useState(localStorage.getItem('jwt_token'));

    const [loading,setLoading] = useState(true);

    const types = [
        {value:1, label:'Ligação'},
        {value:2, label:'Visita'},
    ]
    const statuses = [
        {value:1, label:'Agendada'},
        {value:2, label:'Adiada'},
        {value:3, label:'Concluída'},
        {value:4, label:'Negada'},
    ];

    const satisfactions = [
        {value:1, label:'Em Análise'},
        {value:2, label: 'Ganha'},
        {value:3, label: 'Perda'}
    ]

    useEffect(()=>{
        getAtividades();
        

    },[]);
    return (
        
        <div>
            {loading ? <AppLoading/> : ''}
            <Link to="/atividades/create">Nova Atividade</Link>
           <table className={styles.table}>
               <thead>
                   <tr>
                       <th>Descrição</th>
                       <th>Tipo</th>
                       <th>Status</th>
                       <th>Prefeitura</th>
                       <th>Satisfação</th>
                       <th>Data</th>
                       <th>Ações</th>
                   </tr>
               </thead>
               <tbody>
                    {atividades?.data?.map((atividade)=>{
                        return (<tr>
                                    <td>{atividade.description}</td>
                                    <td>
                                        <Select options={types} value={{'value':atividade.type.original,label:atividade.type.formated}} onChange={(selected,id)=>handleType(selected, atividade.id)}/>
                                    </td>
                                    <td>
                                        <Select options={statuses} value={{'value':atividade.status.original,label:atividade.status.formated}} onChange={(selected,id)=>handleStatus(selected, atividade.id)}/>
                                    </td>
                                    <td>{atividade.city_hall.social_reason}</td>
                                    <td>
                                        <Select options={satisfactions} value={{'value':atividade.city_hall.status.original,label:atividade.city_hall.status.formated}} onChange={(selected,id)=>handleSatisfaction(selected, atividade.city_hall_id)}/>
                                    </td>
                                    <td>{atividade.scheduled_date}</td>
                                    <td>  
                                        <Link to={`/atividades/${atividade.id}/edit `}>
                                            <button style={{backgroundColor:'#3B9CFF', color:'#fff'}}>
                                                <span className="material-icons">edit</span>
                                            </button>
                                        </Link>
                                        <button onClick={()=>deleteAtividade(atividade.id)} style={{backgroundColor:'#FE5F55', color:'#fff'}}>
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
    async function getAtividades(){
       
        const data = await fetch(`http://127.0.0.1:8000/api/activities?token=${token}`,{
            headers: { 'Content-Type': 'application/json' }

        });
        const response = await data.json();
        // console.log(response.data.data)
        setAtividades(response.data);
        setLoading(false);
    }
    async function deleteAtividade($id){
        setLoading(true);
        const data = await fetch(`http://127.0.0.1:8000/api/activities/${$id}`,{
            method:'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${token}`},
        });

        console.log(await data.json());
        getAtividades();
    }
    function handleStatus(selected,id){
        console.log(selected);

        setStatus(id,selected);
        
    }

    async function setStatus(id,selected){
        setLoading(true);
        const data = {
            status: selected.value
        }

        const response = await fetch(`http://127.0.0.1:8000/api/activities/${id}/set-status`,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json','Authorization': `bearer ${token}` },
            body: JSON.stringify(data)
        });

        getAtividades();
    }

   function handleType(selected,id){
        console.log(selected);

        setTypes(id,selected);
        
    }

   async function setTypes(id,selected){
    setLoading(true);
        const data = {
            type: selected.value
        }

        const response = await fetch(`http://127.0.0.1:8000/api/activities/${id}/set-type`,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json','Authorization': `bearer ${token}` },
            body: JSON.stringify(data)
        });

        getAtividades();
    
    }

    function handleSatisfaction(selected,id){
        setSatisfaction(id,selected);
    }

    async function setSatisfaction(id,selected){
        setLoading(true);
        const data = {
            status: selected.value
        }

        const response = await fetch(`http://127.0.0.1:8000/api/activities/${id}/set-satisfaction`,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json','Authorization': `bearer ${token}` },
            body: JSON.stringify(data)
        });

        console.log(await response.json());

        getAtividades();
    }

}