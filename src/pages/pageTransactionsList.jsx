import { useHistory, useLocation } from 'react-router-dom';
import Button from '../components/share/Button/Button';

const PageTransactionsList = () => {
  const history = useHistory();
  const location = useLocation();

  const handleGoBack = () => {
    history.push(location.state ? location.state.from : '/');
    // history.push(location.state?.from || "/");
  };
  
  return (
    <>
      <Button title="GoBAck" cbOnClick={handleGoBack} />
      <h1>PageTransactionsList</h1>
    </>
  );
};

export default PageTransactionsList;
