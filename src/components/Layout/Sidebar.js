import { Link } from 'react-router-dom';
import styles from '../../styles/layout/sidebar.module.css';

export function Sidebar(){
    return (
        <aside className={styles.sidebar}>
            <ul>
                <Link to="/">
                    <li>Licitações Prefeituras</li>
                </Link>
            </ul>
            <ul>
                <Link to="/prefeituras">
                    <li>
                        <span className="material-icons">location_city</span> 
                        <span>Prefeituras</span>
                    </li>
                </Link>

                <Link to="/atividades">
                    <li>
                        <span className="material-icons">task</span> <span>Atividades</span>
                    </li>
                </Link>
                
            </ul>
        </aside>
    );
}