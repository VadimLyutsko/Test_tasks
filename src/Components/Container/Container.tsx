import React from 'react';
import styles from './Container.module.scss';
import clsx from 'clsx';
export type ContainerPropsType = {
  children: React.ReactNode;
  left?: true;
};
export const Container: React.FC<ContainerPropsType> = ({ children, left }) => {
  const classes = clsx(styles.content, {
    [styles.leftPadding]: left,
    [styles.container]: !left,
  });
  return (
    <div data-scroll-lock-scrollable className={classes}>
      {children}
    </div>
  );
};
