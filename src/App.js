import logo from './logo.svg';
import './App.css';
import { Layout } from './components/Layout/Layout';
import { Route, Routes, useNavigate } from 'react-router';
import { Home } from './components/content/Home/Home';
import { Prefeituras } from './components/content/Prefeituras/Prefeituras';
import { Atividades } from './components/content/Atividades/Atividades';
import { PrefeituraForm } from './components/content/Prefeituras/PrefeituraForm';
import { AtividadeForm } from './components/content/Atividades/AtividadeForm';
import {AuthProvider} from './context/AuthContext'
import { useContext } from 'react';
import Login from './components/content/Login/Login';
import { VerifyAuth } from './middlewares/VerifyAuth';

function App() {

  const navigate = useNavigate();
  
  return (
      <AuthProvider>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"></link>
        
        <VerifyAuth>
          <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home/>} />
                <Route path="login" element={<Login/>} />
                <Route path="prefeituras" element={<Prefeituras/>} />
                <Route path="prefeituras/create" element={<PrefeituraForm />} />
                <Route path="prefeituras/:id/edit" element={<PrefeituraForm  />} />
                <Route path="atividades" element={<Atividades/>} />
                <Route path="atividades/create" element={<AtividadeForm />} />
                <Route path="atividades/:id/edit" element={<AtividadeForm />} />
              </Route>
            </Routes>
          </VerifyAuth>  
        </AuthProvider>
      
  
    
  );


  
}



export default App;
