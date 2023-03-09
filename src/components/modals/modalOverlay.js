import PropTypes from 'prop-types';
import styles from './modalOverlay.module.scss'

const ModalOverlay = ({ onClose }) => {
    return <div className={styles.backdrop} onClick={onClose}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired,
};