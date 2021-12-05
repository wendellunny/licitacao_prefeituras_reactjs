import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import {useNavigate,useParams} from 'react-router-dom'

export function AtividadeForm(){
    const [prefeituras,setPrefeituras] = useState('');
    const [description,setDescription] = useState('');
    const [date,setDate] = useState('');
    const [type,setType] = useState('');
    const [status,setStatus] = useState('');
    const [cityHallId, setcityHallId] = useState(0);

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

    useEffect(()=>{
        getPrefeituras();
    },[])
    return (
        <div>
            {/* <Link to="/prefeituras">Voltar</Link> */}
            <form>
                <div className="form-group">
                    <label>Descrição</label>
                    <input type="text" value={description} onChange={(event)=>setDescription(event.target.value)}/>
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <Select options={types}/>
                </div>
                <div className="form-group">
                    <label>Prefeitura</label>
                    <Select  options={prefeituras} />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <Select options={statuses}/>
                </div>
               
                <div className="form-group">
                    <label>Data</label>
                    <input type="datetime-local" value={date} onChange={(event)=>setDate(event.target.value)}></input>
                </div>

                <div className="form-group">
                    <button type="button" >Concluir</button>
                </div>

            </form>

        </div>
    )

    async function getPrefeituras(){
        const cityHalls = []
        const data = await fetch('http://127.0.0.1:8000/api/city-halls');
        const response = await data.json();
        // console.log(response);
        response.data.data.map(function(prefeitura){
            cityHalls.push({value:prefeitura.id, label:prefeitura.social_reason});
        })
        setPrefeituras(cityHalls);
        console.log(cityHalls);
    }
   
}