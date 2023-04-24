import ReactDOM from 'react-dom';
import { useEffect, FC, ReactNode } from 'react';
import ModalOverlay from './modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.scss'

interface IModalProps {
    header?: string,
    onClose: () => void,
    children: ReactNode
}

const modalRoot = document.getElementById("react-modals")!;

const Modal: FC<IModalProps> = ({ header, onClose, children }) => {

    useEffect(() => {
        const handleClose = (e: KeyboardEvent) => {
            if (e.code === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keyup", handleClose);
        return () => {
            document.removeEventListener("keyup", handleClose)
        }
    }, [onClose]);



    return ReactDOM.createPortal(
        (
            <>
                <div className={`${styles.modal} flex flex-column p-10`}>
                    <div className="flex j-space-bt mb-4">
                        <p className="text text_type_main-large">
                            {header}
                        </p>
                        <div ></div>
                        <CloseIcon type="primary" onClick={onClose} />
                    </div>

                    <div className={styles.content}>{children}</div>
                </div>
                <ModalOverlay onClose={onClose} />
            </>
        ),
        modalRoot
    );
};



export default Modal;

