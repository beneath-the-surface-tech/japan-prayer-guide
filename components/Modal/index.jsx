import React from 'react';
import ReactModal from 'react-modal'

const galleryStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0px !important'
    },
};
  
const customStyles = {
    content: {
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      padding: '0',
      border: 'none',
      background: 'transparent', // Set the background to transparent to remove the default modal overlay
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay to dim the background
    },
};


const Modal = ({ typ, modal, setModal, children }) =>{
    return(
    <ReactModal
        isOpen={modal}
        onRequestClose={()=>setModal(false)}
        style={typ==="gallery"? galleryStyles: customStyles}
    >
      {children}
    </ReactModal>
    )
}
export default Modal;