import React, { useState, useEffect } from "react";
import Select from 'react-select'


export function PrefeituraForm(){
    const [estados,setEstados] = useState([]);

    useEffect(()  => {
        getAllUF();
    },[]);
 
    return (
        
        <div>
            <form>
                <div className="form-group">
                    <labe>Razão Social</labe>
                    <input type="text"/>
                </div>

                <div className="form-group">
                    <label>Estado</label>
                    <Select options={estados} />
                </div>

                <div className="form-group">
                    <labe>Razão Social</labe>
                    <input type="text"/>
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
    
}


