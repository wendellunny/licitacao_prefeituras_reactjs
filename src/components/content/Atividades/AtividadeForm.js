import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import {useNavigate,useParams} from 'react-router-dom'

export function AtividadeForm(){
    const [prefeituras,setPrefeituras] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState(null);
    const [type,setType] = useState(null);
    const [status,setStatus] = useState(null);
    const [cityHallId, setCityHallId] = useState(null);
    const [token, setToken] =useState(localStorage.getItem('jwt_token'));

    const types = [
        {value:1, label:'Ligação'},
        {value:2, label:'Visita'},
    ]
    const statuses = [
        {value:1, label:'Agendada'},
        {value:2, label:'Adiada'},
        {value:3, label:'Concluída'},
        {value:4, label:'Negada'},
    ]

    const {id} = useParams();
   
    const navigate = useNavigate();
    useEffect(()=>{
        getPrefeituras();
        if(id){
            getAtividade(id);
        }
    },[])
    return (
        <div>
            <Link to="/atividades">Voltar</Link>
            <form>
                <div className="form-group">
                    <label>Descrição</label>
                    <input type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <Select options={types}  value={type} onChange={handleType}/>
                </div>
                <div className="form-group">
                    <label>Prefeitura</label>
                    <Select  options={prefeituras} value={cityHallId} onChange={handleCityHallId}/>
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <Select options={statuses} value={status} onChange={handleStatus}/>
                </div>
               
                <div className="form-group">
                    <label>Data</label>
                    <input type="datetime-local" value={date} onChange={(event)=>setDate(event.target.value)}></input>
                </div>

                <div className="form-group">
                    <button type="button" onClick={()=>sendForm()} >Concluir</button>
                </div>

            </form>

        </div>
    )

    async function getPrefeituras(){
        const cityHalls = []
        const data = await fetch(`http://127.0.0.1:8000/api/city-halls?token=${token}`);
        const response = await data.json();
        // console.log(response);
        response.data.data.map(function(prefeitura){
            cityHalls.push({value:prefeitura.id, label:prefeitura.social_reason});
        })
        setPrefeituras(cityHalls);
        console.log(cityHalls);
    }

    function handleType(selected){
        setType(selected);
    }
    function handleCityHallId(selected){
        setCityHallId(selected);
    }
    function handleStatus(selected){
        setStatus(selected);
    }

    async function sendForm(){
        const data = {
            description: description,
            type: type.value,
            city_hall_id: cityHallId.value,
            status: status.value,
            scheduled_date: date
        }
        if(id){
            const response = await fetch(`http://127.0.0.1:8000/api/activities/${id}`,{
                method:'PUT',
                headers: { 'Content-Type': 'application/json' , 'Authorization': `bearer ${token}`},
                body: JSON.stringify(data)
            });
            console.log(await response.json());
        }else{
            const response = await fetch('http://127.0.0.1:8000/api/activities',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' , 'Authorization': `bearer ${token}`},
                body: JSON.stringify(data)
            });
            console.log(await response.json());
        }
        
      
       
       navigate('/atividades');
    }

    async function getAtividade(id){
        const response =  await fetch(`http://127.0.0.1:8000/api/activities/${id}?token=${token}`);
        const data = await response.json();
        console.log(data);

        setCityHallId({value:data.data.cityHallId, label: data.data.city_hall.social_reason});
        setStatus({value:data.data.status.original, label:data.data.status.formated});
        setType({value:data.data.type.original, label:data.data.type.formated});
        setDescription(data.data.description);
        setDate(data.data.scheduled_date);
    }
   
}