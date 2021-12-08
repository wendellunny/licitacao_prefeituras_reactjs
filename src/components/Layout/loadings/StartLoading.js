import loading from '../../../assets/gifs/start-loading.gif';
import styles from '../../../styles/layout/laodings/start-loading.module.css';
export function StartLoading(){
    return (
        <div className={styles.loading}>
            <div>
                <img src={loading}/>
            </div>
        </div>
    )
}