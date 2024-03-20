import './TextArea.scss';

import cn from 'classnames';

const TextArea = ({ value, onChange, placeholder, className }) => (
  <textarea
    placeholder={placeholder}
    className={cn('textarea', className)}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default TextArea;
