import './Input.scss';

const Input = ({ value, onChange, placeholder }) => (
  <input className="input" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
);

export default Input;
