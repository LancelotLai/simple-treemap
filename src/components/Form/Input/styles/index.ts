export const inputStyle = (isError: boolean, type: 'textarea' | 'number') => {
  return {
    fontSize: '1rem',
    borderRadius: '4px',
    lineHeight: '22px',
    height: type === 'textarea' ? '200px' : '20px',
    width: '100%',
    padding: '0',
    color: 'grey',
    margin: '10px 0',
    border: isError ? '1px solid red' : '1px solid black',
  };
};

export const inputContainerStyle = {
  width: '320px',
};
