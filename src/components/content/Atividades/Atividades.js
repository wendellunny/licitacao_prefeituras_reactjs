import styles from '../../../styles/layout/table.module.css';
export function Atividades(){
    return (
        <div>
           <table className={styles.table}>
               <thead>
                   <tr>
                       <th>Descrição</th>
                       <th>Tipo</th>
                       <th>Status</th>
                       <th>Prefeitura</th>
                       <th>Categoria</th>
                   </tr>
               </thead>
               <tbody>

               </tbody>
           </table>

        </div>

    )
}