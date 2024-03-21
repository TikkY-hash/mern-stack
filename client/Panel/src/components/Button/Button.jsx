import cn from 'classnames';

import './Button.scss';

const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={cn('button', className)}>
    {children}
  </button>
);

export default Button;
