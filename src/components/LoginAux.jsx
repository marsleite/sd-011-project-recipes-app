import React from 'react';
import PropTypes from 'prop-types';

// Reference: SetValue
// https://docs.microfocus.com/SM/9.41/Classic/Content/programming/javascript/reference/javascript_method_xml_setvalue.htm

const LoginAux = ({ id, label, setValue, ...props }) => (
  <>
    <label htmlFor={ id }>{label}</label>
    <input
      id={ id }
      name={ id }
      onChange={ ({ target }) => setValue(target.value) }
      { ...props }
    />
  </>
);

LoginAux.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

LoginAux.defaultProps = {
  id: undefined,
};

export default LoginAux;
