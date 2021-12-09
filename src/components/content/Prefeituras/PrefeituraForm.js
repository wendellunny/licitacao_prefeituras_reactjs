import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Select from 'react-select'
import {useNavigate,useParams} from 'react-router-dom'
import styles from '../../../styles/layout/forms.module.css';
import { AppLoading } from "../../Layout/loadings/AppLoading";


export function PrefeituraForm(props){
    const [estados,setEstados] = useState([]);
    const [ufSelected,setUfSelected] = useState(null);
    const [citySelected,setCitySelected] = useState(null);
    const [cidades,setCidades] = useState([]);
    const [socialReason,setSocialReason] = useState('');
    const [token, setToken] =useState(localStorage.getItem('jwt_token'));
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); 
    const {id} = useParams();
    useEffect(()  => {
        getAllUF();
        if(id){
            setLoading(true);
            getPrefeitura(id);
        }else{
            setLoading(false); 
        }
        
        console.log(id);
    },[]);

    useEffect(()=>{
        
    },[socialReason])
 
    return (


        
        <div className={styles.form}>
            {loading ? <AppLoading/> : ''}
            <header>
                <button><Link to="/prefeituras"><span className="material-icons">reply</span></Link></button>
            </header>
            
            <form >
                <h3> {id ? 'Editar' : 'Cadastrar' } Prefeitura </h3>
                <div className={styles.form_group}>
                    <labe>Razão Social</labe>
                    <input type="text" value={socialReason} onChange={(event)=>{setSocialReason(event.target.value)}}/>
                </div>
                <div className={styles.form_row}>
                    
                </div>
                <div className={styles.form_group}>
                    <label>Estado</label>
                    <Select options={estados} value={ufSelected} onChange={handleSelectedEstado}/>
                </div>
                <div className={styles.form_group}>
                    <label>Cidade</label>
                    <Select options={cidades} placeholder={cidades[0]?.label} value={citySelected} onChange={handleSelectedCity}/>
                </div>

                
                <button type="button" onClick={sendForm}>Concluir</button>
               

            </form>

        </div>
        
            
        
    )


    async function getAllUF(){
        setLoading(true);
        const options = [];
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados?token=${token}`);
        const data = await response.json();

        data.forEach(estado => {
            options.push({value:estado.sigla, label:`${estado.sigla} - ${estado.nome}`})    
        });
        setEstados(options);
    }
    
    async function getUfCities(uf){
        setLoading(true);
        const options = [];
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios?token=${token}`);
        const data = await response.json();

        data.forEach(city => {
            options.push({value:city.id, label: city.nome})    
        });
        setCidades(options);
        setLoading(false);
    }

  function handleSelectedEstado(selected){
        setUfSelected(selected);
        setCitySelected(null);
        getUfCities(selected.value);
    }

   function handleSelectedCity(selected){
        setCitySelected(selected);
        
    }

    async function sendForm(){
        setLoading(true);
        const data = {
            social_reason: socialReason,
            id_city: citySelected.value
        }
       if(id){
        const response = await fetch(`http://127.0.0.1:8000/api/city-halls/${id}`,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${token}` },
            body: JSON.stringify(data)
        });
        console.log(await response.json());
       }else{
            const response = await fetch('http://127.0.0.1:8000/api/city-halls',{
                method:'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `bearer ${token}` },
                body: JSON.stringify(data)
            });
            console.log(await response.json());
       }
       
       navigate('/prefeituras');
    }

    async function getPrefeitura(id){
        const response =  await fetch(`http://127.0.0.1:8000/api/city-halls/${id}?token=${token}`);
        const data = await response.json();
        console.log(data);
        setSocialReason(data.data.social_reason);
        setUfSelected(data.data.labels.inputUf)
        setCitySelected(data.data.labels.inputCity);
        setLoading(false);
    }

}


