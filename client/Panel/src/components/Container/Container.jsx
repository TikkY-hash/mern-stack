import './Container.scss';

import cn from 'classnames';

const Container = ({ children, className }) => <div className={cn('container', className)}>{children}</div>;

export default Container;
