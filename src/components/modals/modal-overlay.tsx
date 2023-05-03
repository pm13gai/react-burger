import { FC } from 'react';
import styles from './modal-overlay.module.scss'

interface IModalOverlayProps {
    onClose: () => void
}
const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
    return <div className={styles.backdrop} onClick={onClose}></div>;
};

export default ModalOverlay;
