import { Modal } from "./Modal";
import image from '../../../assets/images/vector/delete.png'
export function ModalDelete({action,setShowState}){
    return <Modal 
                message='Deseja remover permanentemente este registro?' 
                action={action}
                setShowState={setShowState}
                image={image}
            />
}