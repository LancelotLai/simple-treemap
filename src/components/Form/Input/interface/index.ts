export const defaultProps = {
  name: '',
  labelText: '',
  rules: {},
  errorMessage: '',
  type: '',
};

export type InputProps = {
  name: string | undefined;
  labelText: string | undefined;
  rules: object | null;
  errorMessage: string | undefined;
  type: 'number' | 'textarea' | string;
} & typeof defaultProps;
