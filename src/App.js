import logo from './logo.svg';
import './App.css';
import { Layout } from './components/Layout/Layout';
import { Route, Routes } from 'react-router';
import { Home } from './components/content/Home/Home';
import { Prefeituras } from './components/content/Prefeituras/Prefeituras';
import { Atividades } from './components/content/Atividades/Atividades';
import { PrefeituraForm } from './components/content/Prefeituras/PrefeituraForm';
import { AtividadeForm } from './components/content/Atividades/AtividadeForm';


function App() {

  return (
      <>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
       <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>} />
          <Route path="prefeituras" element={<Prefeituras/>} />
          <Route path="prefeituras/create" element={<PrefeituraForm/>} />
          <Route path="atividades" element={<Atividades/>} />
          <Route path="atividades/create" element={<AtividadeForm />} />
        </Route>
      </Routes>
      </>
      
  
    
  );
}

export default App;
