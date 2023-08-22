import React from "react";
import Modal from 'react-modal';
import bg from "../assets/bg.png";
import { AiOutlineClose } from "react-icons/ai";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add a semi-transparent overlay
      },    
    content: {
      top: '50%',
      left: '60%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundImage: `url(${bg})`,
      backgroundSize: 'cover',
      outline:'none',
      zIndex:'-1',
    },
  };
function ViewModal({ isOpen, onClose, contact }) {

    const close =() =>{
        onClose();
    }
    return(
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
      >
        <div className='modal-div'>
        <h1 className='modal-title'>Contact Details</h1>
         <div className="modal-details">
            <span>Name: {contact.firstName} {contact.lastName}</span>
            <span>Status: {contact.status}</span>
            <button className="close-btn" onClick={close}><AiOutlineClose />Close</button>
         </div>
        </div>
      </Modal>
    );
}

export default ViewModal;