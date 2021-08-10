import React, { HTMLProps, ReactNode } from 'react';
import classNames from 'classnames';

interface INavbarProps extends HTMLProps<HTMLDivElement> {
  brand?: ReactNode;
  course: ReactNode;
}

type INavbar = React.FC<INavbarProps>;

const Navbar: INavbar = ({ className, brand, course, ...rest }) => (
  <nav className={classNames(`tu-navbar`, className)} {...rest}>
    <h1 className="tu-navbar__brand">{brand}</h1>
    <h2 className="tu-navbar__course">{course}</h2>
  </nav>
);

Navbar.defaultProps = {
  brand: `Training`,
};

export default Navbar;
