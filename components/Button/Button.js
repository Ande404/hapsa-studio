import styles from './Button.module.scss';

export const Button = ({ children, ...props }) => (
  <div>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <button
      type="button"
      className={styles.primary}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  </div>
);
