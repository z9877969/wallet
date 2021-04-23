import Button from '../Button';
import styles from './Form.module.css';

const Form = ({ children, onSubmit }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <Button title={'ok'} type={'submit'} className={styles.btn} />
      {children}
    </form>
  );
};

export default Form;
