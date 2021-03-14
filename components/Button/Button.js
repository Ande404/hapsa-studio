import styles from './Button.module.scss';

export const Button = ({ children, ...props }) => (
  <button
    type="button"
    className={styles.primary}
    data-testid="button"
    {...props}
  >
    {children}
  </button>
);
