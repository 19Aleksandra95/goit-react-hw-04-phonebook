import { useEffect, useState } from 'react';
import { ContactForm } from "./ContactForm/ContactForm";
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';
export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') || [])
  );
  const [filter, setFilter] = useState('');
//LocalStorage
useEffect (()=> {
  const localStorageData = JSON.parse(localStorage.getItem('contacts'));
  setContacts(() => [...localStorageData])
}, []) ;
useEffect (() => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}, [contacts])
  //Sposób przetwarzania formularza - dodanie danych do stanu (dane pobierane są z komponentu ContactForm)
  const formSubmitHandler = (name, number) => {
    console.log(name);
    //Uniemożliwia dodawanie kontaktów, których nazwy znajdują się już w książce telefonicznej.
    if (contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    setContacts(prevState => [...prevState, newContact]);
  };
  // Metoda aktualizacji pola filtru
  const handleChangeFilter = event => {
setFilter(() => event.target.value)
  };
  //Metoda filtracji kontaktów
  const filteredContacts = contacts.filter(contact =>
    contact.name.includes(filter)
  );
  //Sposób usuwania kontaktu z listy kontaktów
  const deleteContact = id => {
    setContacts(prevState =>
      prevState.filter(contact => {
        return contact.id !== id;
      })
    );
  };
    // const filteredContacts = getFilteredContacts();
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#010101',
        }}
      >
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
        <h2 className={css.subtitle}>Contacts</h2>
        <p className={css.total}>
          Total contacts:
          <span className={css.total_count}> {contacts.length}</span>
        </p>
        <Filter value={filter} onChange={handleChangeFilter} />
        <ContactList filteredContacts={filteredContacts} onDeleteContact={deleteContact} />
      </div>
    );
  }