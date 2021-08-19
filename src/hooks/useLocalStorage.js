import React, { useState } from 'react';

const useLocalStorage = (key, initial) => {
  const [state, setState] = useState(() => {
    const getKey = localStorage.getItem(key);
    return !getKey ? initial : getKey;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
