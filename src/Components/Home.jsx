import React,{useState, useEffect} from 'react';
import Navbar from './Navbar';
import main from "../assets/main.png";
import {AiOutlineUserAdd} from "react-icons/ai";
import {BiError} from "react-icons/bi";
import bg from "../assets/bg.png";
import Contacts from './Contacts';
import { useSelector } from 'react-redux';
import CreateModal from './CreateModal';

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
function Home(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contactsCreated, setContactsCreated] = useState(false);

    const contacts = useSelector(state => state.contacts.contacts);

    const contactsLength = contacts.length;


    useEffect(() => {
        if(contactsLength > 0){
            setContactsCreated(true);
        }else{
            setContactsCreated(false);
        }
    },[contactsLength]);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
  
    return(
        <div className='home'>
            <Navbar/>

            {contactsCreated ?
            <Contacts/>
            :
            <div className='main'>
                <div className='popup'>
                    <div className='icon'>
                        <BiError/>
                    </div>
                    <div className='msg'>
                    <span className='error-msg'>
                        No Contact Found,Please Create contact from create contact button.
                    </span>
                    </div>
                </div>
                <img src={main} className='main-img' alt=""></img>
                <button className='contact-btn' onClick={openModal}><AiOutlineUserAdd/>Create New Contact</button>
                <CreateModal isOpen={modalIsOpen} onClose={closeModal}/>
            </div>
            }
        </div>
    );
}

export default Home;