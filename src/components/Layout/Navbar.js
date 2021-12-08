import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from '../../styles/layout/navbar.module.css';

export function Navbar(){
    const [token, setToken] =useState(localStorage.getItem('jwt_token'));
    const navigate = useNavigate();
    return (
        <nav className={styles.navbar}>
            <ul>
               <li><span className="material-icons">notifications</span></li>
                <li ><span className="material-icons" onClick={logout}>logout</span></li>
                
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
}