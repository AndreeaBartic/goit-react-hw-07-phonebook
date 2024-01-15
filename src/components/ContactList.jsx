import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteContact } from '../redux/operations';
import { getContacts } from '../redux/selectors';

const statusFilters = Object.freeze({
  all: 'all',
  active: 'active',
  completed: 'completed',
});

const getVisibleContacts = (contacts, statusFilter) => {
  switch (statusFilter) {
    case statusFilters.active:
      return contacts.filter(contacts => !contacts.completed);
    case statusFilters.completed:
      return contacts.filter(contacts => contacts.completed);
    default:
      return contacts;
  }
};

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(state => state.contacts.filter);
  const visibleContacts = getVisibleContacts(contacts, statusFilters);
  const dispatch = useDispatch();

  const handledeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  const filteredContacts = useMemo(() => {
    return Array.isArray(visibleContacts)
      ? visibleContacts.filter(contact =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      : [];
  }, [visibleContacts, filter]);

  return (
    <>
      <ul>
        {filteredContacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button
              onClick={() => handledeleteContact(contact.id)}
              aria-label={`Delete ${contact.name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ContactList;
