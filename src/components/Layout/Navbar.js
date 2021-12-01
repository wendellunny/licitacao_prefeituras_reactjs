import styles from '../../styles/layout/navbar.module.css';

export function Navbar(){
    return (
        <nav className={styles.navbar}>
            <ul>
                <li><span className="material-icons">logout</span></li>
            </ul>
        </nav>
    );
}