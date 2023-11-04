import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import {FcAdvertising} from "react-icons/fc";


export const ContactForm = ({addContact}) => {

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
 
    // Metoda odnowienia pola input
    const handleChange = event => setName(() => event.target.value);
  
    // Sposób przesyłania formularzy
    const handleFormSubmit = event => {
      event.preventDefault();
  
      addContact(name, number, nanoid());
      resetForm();
    };
  
    //Sposób czyszczenia pól formularza
    const resetForm = () => {
     setName('');
     setNumber('');
    };
  
 
      return (
        <form className={css.form_wrapper} onSubmit={handleFormSubmit}>
          <FcAdvertising size={'35px'} className={css.icon} />
          <label className={css.label}>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>
          <label className={css.label}>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              value={number}
              onChange={handleChange}
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button className={css.button_add} type="submit">
            Add contact
          </button>
        </form>
      );
    };
 
  
  ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };