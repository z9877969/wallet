import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Button from '../components/share/Button/Button';
import Container from '../components/share/Container/Container';
import Item from '../components/share/Item';
import List from '../components/share/List/List';
import Section from '../components/share/Section/Section';
import { getCatDataByPeriod } from '../redux/analitics/analiticsSelector';
import { removeTransactionListId } from '../redux/transactions/transactionsAction';
import {
  removeCosts,
  removeIncomes,
} from '../redux/transactions/transactionsOperations';

const TransactionsListPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const { category } = match.params;

  const dataRender = useSelector(getCatDataByPeriod);

  const handleGoBack = () => {
    history.push(location.state ? location.state.from : '/');
    dispatch(removeTransactionListId());
  };

  const handleRemoveTransaction = id => {
    category === 'costs' && dispatch(removeCosts(id));
    category === 'incomes' && dispatch(removeIncomes(id));
  };

  const handleOpenEdit = id => {
    history.push({
      pathname: `/${category}/${id}/edit`,
    });
  };

  return (
    <>
      <Section>
        <Container>
          <Button title="GoBAck" cbOnClick={handleGoBack} />
          <List>
            {dataRender.map(({ category: { name }, date, id, summ }) => (
              <Item key={id}>
                <span>{name}</span>
                <span>{summ}</span>
                <span>{date}</span>
                <Button title="Edit" cbOnClick={handleOpenEdit} cbArgs={[id]} />
                <Button
                  title="Delete"
                  cbOnClick={handleRemoveTransaction}
                  cbArgs={[id]}
                />
              </Item>
            ))}
          </List>
        </Container>
      </Section>
    </>
  );
};

export default TransactionsListPage;
