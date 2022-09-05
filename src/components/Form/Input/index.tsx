import { FC, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { defaultProps, InputProps } from './interface';
import { inputStyle, inputContainerStyle } from './styles';

const Input: FC<InputProps> = ({
  name,
  labelText,
  rules,
  errorMessage,
  type,
  ...props
}: InputProps) => {
  const { register, formState } = useFormContext<any>();
  const [errorProps, setErropProps] = useState(false);
  const { errors }: any = formState;
  const targetError = errors[`${name}`];
  useEffect(() => {
    if (errors && errors[`${name}`] && errors[`${name}`]?.type === 'validate') {
      setErropProps(true);
    } else {
      setErropProps(false);
    }
  }, [targetError, errors, name]);
  return (
    <div style={inputContainerStyle} {...props}>
      {labelText && <label htmlFor={name}>{labelText}</label>}
      {type === 'textarea' && (
        <textarea
          {...register(`${name}`, rules)}
          style={inputStyle(errorProps, 'textarea')}
        />
      )}
      {type === 'number' && (
        <input
          type={type}
          {...register(`${name}`, rules)}
          style={inputStyle(errorProps, 'number')}
        />
      )}
      {errorProps && <div>{errorMessage}</div>}
    </div>
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.oneOfType<any>([
    PropTypes.string,
    PropTypes.oneOf([undefined, null]),
  ]),
  labelText: PropTypes.oneOfType<any>([
    PropTypes.string,
    PropTypes.oneOf([undefined, null]),
  ]),
  rules: PropTypes.oneOfType<any>([
    PropTypes.object,
    PropTypes.oneOf([undefined, null]),
  ]),
  errorMessage: PropTypes.oneOfType<any>([
    PropTypes.string,
    PropTypes.oneOf([undefined, null]),
  ]),
  type: PropTypes.oneOf<any>(['number', 'textarea']),
};

Input.defaultProps = defaultProps;
