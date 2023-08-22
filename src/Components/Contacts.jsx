import React,{useState,useEffect} from "react";
import {AiOutlineUserAdd,AiFillDelete,AiOutlineEye} from "react-icons/ai";
import {GiPencil} from "react-icons/gi";
import profile from "../assets/profile.png";
import EditModal from "./EditModal";
import CreateModal from "./CreateModal";
import ViewModal from "./ViewModal";
import { useSelector } from 'react-redux';
import { deleteContact } from '../reducers/contactsReducer';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Contacts({contact}) {

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [ViewOpen, setViewOpen] = useState(false);
    const [viewContact, setViewContact] = useState(null);

    const EditOpen =() => setIsEditOpen(true);
    const onEditClose =() => setIsEditOpen(false);
    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    const onViewClose =() => setViewOpen(false);
    const dispatch = useDispatch();

    let navigate = useNavigate();

    const contacts = useSelector(state => state.contacts?.contacts || []);
    
    const contactsLength = contacts.length;

    const [editContact, setEditContact] = useState(null);

  const handleEdit = (contact) => {
    setEditContact(contact);
    setIsEditOpen(true);
  };
  const viewOpen = (contact) => {
    setViewOpen(true);
    setViewContact(contact);
  };

  const handleEditContact = (updatedContact) => {
    // Dispatch an action to update the contact in Redux store
    dispatch(editContact(updatedContact));
    setIsEditOpen(false);
  };
    const handleDelete = (contact) => {
      dispatch(deleteContact(contact.id));
    };
    useEffect(() => {
      if(contactsLength === 0){
        navigate('/');
      }
      console.log('Contacts from Redux Store:', contacts);
    }, [contacts])

    return (
      <div className="contacts">
          <button className='contact-btn' onClick={openModal}><AiOutlineUserAdd/>Create New Contact</button>
          <CreateModal isOpen={modalIsOpen} onClose={closeModal}/>
          <div className="contacts-list">
           <h3 className="contact-h">Contacts List</h3>
           <div className="list">
           {contacts.map(contact => (
            <div className="list-item" key={contact.id}>
              <div className="list-img col-md-4">
                <img src={profile} alt="" className="list-image"/>
              </div>
              <div className="list-info col-md-8">
                <h5 className="name">{contact.firstName} {contact.lastName}</h5>
                <button className="view-btn" onClick={()=>viewOpen(contact)}><AiOutlineEye/>View Profile</button>
                <ViewModal isOpen={ViewOpen} onClose={onViewClose} contact={contact}/>
                <div className="btns">
                    <button className="edit-btn" onClick={() => handleEdit(contact)} onClose={onEditClose}><GiPencil/>  <span>Edit</span></button>
                    <button className="delete-btn" onClick={() =>handleDelete(contact)}><AiFillDelete/>  <span>Delete</span></button>
                    <EditModal isOpen={isEditOpen} onClose={onEditClose} contact={editContact} onContactUpdate={handleEditContact} />
                </div>
              </div>
            </div>
            ))}
           </div>
          </div>
      </div>
    );
}

export default Contacts;