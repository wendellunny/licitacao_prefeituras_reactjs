import loading from '../../../assets/gifs/start-loading.gif';
import styles from '../../../styles/layout/laodings/app-loading.module.css';
export function AppLoading(){
    return (
        <div className={styles.loading}>
            <div>
                <img src={loading}/>
            </div>
        </div>
    )
}