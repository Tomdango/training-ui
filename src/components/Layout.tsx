import React, { HTMLProps } from 'react';
import classNames from 'classnames';

export const Main: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
  ...rest
}) => <main className={classNames(`tu-main`, className)} {...rest} />;

export const Container: React.FC<HTMLProps<HTMLDivElement>> = ({
  className,
  ...rest
}) => <div className={classNames(`tu-container`, className)} {...rest} />;
