import styles from '../../styles/layout/sidebar.module.css';

export function Sidebar(){
    return (
        <aside className={styles.sidebar}>
            <ul>
                <li>Licitações Prefeituras</li>
            </ul>
            <ul>
                <li>
                    <span className="material-icons">location_city</span> <span>Prefeituras</span>
                </li>
                <li>
                    <span className="material-icons">task</span> <span>Atividades</span>
                </li>
            </ul>
        </aside>
    );
}