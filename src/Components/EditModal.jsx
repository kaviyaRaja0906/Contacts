import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editContact } from '../reducers/contactsReducer';import Modal from 'react-modal';
import bg from "../assets/bg.png";
import { FiSave } from 'react-icons/fi';
import { BiErrorCircle } from 'react-icons/bi';


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
function EditModal({ isOpen, onClose, contact }) {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});  
  const dispatch = useDispatch();

  const [editedContact, setEditedContact] = useState({ ...contact });

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces allowed

    if (!firstName) {
      newErrors.firstName = (
        <><BiErrorCircle /> Please enter a first name</>
      );
    }else if (firstName.length < 3) {
      newErrors.firstName = (
        <><BiErrorCircle /> First name must be at least 3 characters</>
      );
    }else if (!nameRegex.test(firstName)) {
      newErrors.firstName = (
        <><BiErrorCircle /> First name must only contain letters and spaces</>
      );
    }

    if (!lastName) {
      newErrors.lastName = (
        <><BiErrorCircle /> Please enter a last name</>
      );
    }else if (lastName.length < 3) {
      newErrors.lastName = (
        <><BiErrorCircle /> Last name must be at least 3 characters</>
      );
    }else if (!nameRegex.test(lastName)) {
      newErrors.lastName = (
        <><BiErrorCircle /> Last name must only contain letters and spaces</>
      );
    }
    if (!status) {
      newErrors.status = (
        <><BiErrorCircle /> Please select a status</>
      );
    }
    return newErrors;
  };
  useEffect(() => {
    // Reset the editedContact state whenever the contact prop changes
    setEditedContact({ ...contact });
  }, [contact]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const updatedContact = { ...contact, firstName, lastName, status };
    dispatch(editContact({ id: contact.id, updatedContact }));
    setErrors({});
    onClose();
  }

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className='modal-div'>
        <h1 className='modal-title'>Edit Contact</h1>
        <input className='modal-input' type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
        {errors.firstName && <span className="error">{errors.firstName}</span>}
        <input className='modal-input' type="text" placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)}/>
        {errors.lastName && <span className="error">{errors.lastName}</span>}
        <label className='modal-label'>Status</label>
        <div className='modal-status'>
           <div className='status'>
           <input type="radio" name='status' value='Active' onClick={(e) => setStatus(e.target.value)} className='radio'/><span>Active</span>
           </div>
           <div className='status'>
           <input type="radio" name='status' value='Inactive' className='radio' onClick={(e) => setStatus(e.target.value)} /><span>Inactive</span>
           </div>
        </div>
        {errors.status && <span className="error">{errors.status}</span>}
        <button onClick={handleSubmit} className='modal-btn'><FiSave/> Save Editted Contact</button>
        </div>
      </Modal>
    );
}

export default EditModal;