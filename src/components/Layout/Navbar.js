import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/layout/navbar.module.css';
import { ModalQuit } from './modals/ModalQuit';

export function Navbar(){
    const [token, setToken] =useState(localStorage.getItem('jwt_token'));
    const [showModalQuit, setShowModalQuit] = useState(false);
    const navigate = useNavigate();
    return (

        <nav className={styles.navbar}>
            {showModalQuit ? <ModalQuit action={logout} setShowState={setShowModalQuit}/> : ''}
            <ul>
               <li><span className="material-icons">notifications</span></li>
                <li style={{cursor:'pointer'}} ><span className="material-icons" onClick={handleModalQuit}>logout</span></li>
                
            </ul>
        </nav>
    );

    async function logout(){
        const data = await fetch(`http://127.0.0.1:8000/api/logout`,{
            method:'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `bearer ${token}` },
        });
        localStorage.removeItem('jwt_token');
        navigate('/login');
    }
    function handleModalQuit(){
        setShowModalQuit(true);
    }
}