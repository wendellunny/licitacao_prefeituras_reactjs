import styles from "../../../styles/layout/modals/modal.module.css";

export function Modal({message,action,setShowState,image}){
    return(
        <div className={styles.modal}>
            <div >
                <div>
                    <h3>{message}</h3>
                </div>
                <div>
                    <img src={image}/>
                </div>
                <div>
                    <button onClick={action}>Confirmar</button>
                    <button onClick={()=>setShowState(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    )
    
}