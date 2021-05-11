import { connect, useDispatch } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Button from '../components/share/Button/Button';
import Container from '../components/share/Container/Container';
import Item from '../components/share/Item';
import List from '../components/share/List/List';
import Section from '../components/share/Section/Section';
import {
  removeCosts,
  removeIncomes,
} from '../redux/transactions/transactionsOperations';

import help from '../utils/helpers';

const PageTransactionsList = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const { category } = match.params;

  const data = props[category] || [];

  const dataRender = data.filter(({ category: { id } }) => id === props.listId);
  console.log('dataRender :>> ', dataRender);

  const handleGoBack = () => {
    history.push(location.state ? location.state.from : '/');
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

const mapStateToProps = state => ({
  incomes: state.transactions.incomes,
  costs: state.transactions.costs,
  listId: state.transactions.listId,
});

export default connect(mapStateToProps)(PageTransactionsList);
