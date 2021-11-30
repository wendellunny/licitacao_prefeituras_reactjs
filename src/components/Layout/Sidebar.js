import styles from '../../styles/layout/sidebar.module.css';

export function Sidebar(){
    return (
        <aside className={styles.sidebar}>
            <ul>
                <li>
                    Prefeituras
                </li>
                <li>
                    Atividades
                </li>
            </ul>
        </aside>
    );
}