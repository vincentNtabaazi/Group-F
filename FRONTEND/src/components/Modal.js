import React from 'react';

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
      <div style={styles.overlay}>
      <div style={styles.modal}>
      <div style={styles.closeButton} onClick={onClose}>X</div>
        {children}
      </div>
    </div>
    );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    minWidth: '300px',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflowY: 'auto',
    textAlign: 'center',
    position: 'relative', // For positioning the close div
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    width: '30px',
    height: '30px',
    backgroundColor: 'red',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '18px',
    fontWeight: 'bold',
  },
};


export default Modal;