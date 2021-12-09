import { Modal } from "./Modal";
import image from '../../../assets/images/vector/quit.png'

export function ModalQuit({action,setShowState}){
    return <Modal 
                message='Deseja sair da aplicação?' 
                action={action}
                setShowState={setShowState}
                image={image}
            />
}