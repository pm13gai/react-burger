import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './modal.module.scss'

const modalRoot = document.getElementById("react-modals");



const Backdrop = ({ onClose }) => {
    return <div className={styles.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ header, onClose, children }) => {
    return (
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
    );
};


const Modal = ({ header, onClose, children }) => {

    useEffect(() => {
        const handleClose = (e) => {
            if (e.code === "Escape") {
                onClose();
            }
        }

        document.addEventListener("keyup", handleClose);
        return () => {
            document.removeEventListener("keyup", handleClose)
        }
    }, [onClose]);



    return (
        <>

            {ReactDOM.createPortal(
                <Backdrop onClose={onClose} />,
                modalRoot
            )}

            {ReactDOM.createPortal(
                <ModalOverlay header={header} onClose={onClose}>{children}</ModalOverlay>,
                modalRoot
            )}

        </>
    );
};



export default Modal;


Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.string
};