import React, { HTMLProps } from 'react';
import classNames from 'classnames';

const Card: React.FC<HTMLProps<HTMLDivElement>> = ({ className, ...rest }) => (
  <div className={classNames(`tu-card`, className)} {...rest} />
);

export default Card;
