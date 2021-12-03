import React, { useState, useEffect } from "react";
import Select from 'react-select'


export function PrefeituraForm(){
    const [estados,setEstados] = useState([]);
    const [inputEstados,setInputEstados] = useState('');
    const [cidades,setCidades] = useState([]);

    useEffect(()  => {
        getAllUF();
    },[]);

    useEffect(()=>{
        getUfCities(inputEstados);
    },[inputEstados])
 
    return (
        
        <div>
            <form>
                <div className="form-group">
                    <labe>Razão Social</labe>
                    <input type="text"/>
                </div>

                <div className="form-group">
                    <label>Estado</label>
                    <Select options={estados} onChange={(value)=>setInputEstados(value.value)}/>
                </div>
                <div className="form-group">
                    <label>Cidade</label>
                    <Select options={cidades} />
                </div>

            </form>

        </div>
            
        
    )


    async function getAllUF(){
        const options = [];
        const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
        const data = await response.json();

        data.forEach(estado => {
            options.push({value:estado.sigla, label:`${estado.sigla} - ${estado.nome}`})    
        });
        setEstados(options);
    }
    
    async function getUfCities(uf){
        const options = [];
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
        const data = await response.json();

        data.forEach(city => {
            options.push({value:city.id, label: city.nome})    
        });

        setCidades(options);
    
    }
}


