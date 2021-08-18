import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [email, setEmail] = useState('');

  return (
    <UserContext.Provider value={ { email, setEmail } }>
      { children }
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const UserHook = () => useContext(UserContext);
