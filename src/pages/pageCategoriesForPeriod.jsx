import { connect } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Button from '../components/share/Button';
import Item from '../components/share/Item';
import List from '../components/share/List';

import { addTransactionListId } from '../redux/transactions/transactionsAction';

const PageCategoriesForPeriod = props => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { category } = match.params;

  const data = props[category] || [];

  const handleOpenList = id => {
    history.push({
      pathname: `${match.url}/list`,
      state: {
        from: location,
      },
    });
    props.addTransactionListId(id);
  };

  const handleGoBack = () => history.push('/');

  return (
    <>
      <h1>PageCategoriesForPeriod</h1>
      <Button title="GoBack" cbOnClick={handleGoBack} />
      <List>
        {data.map(({ category: { name, id }, summ }) => (
          <Item>
            <span>{name}</span> <span>{summ}</span>
            <Button
              title="show list"
              cbOnClick={handleOpenList}
              cbArgs={[id]}
            />
          </Item>
        ))}
      </List>
    </>
  );
};

const mapStateToProps = state => ({
  incomes: state.transactions.incomes,
  costs: state.transactions.costs,
});

const mapDispatchToProps = {
  addTransactionListId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageCategoriesForPeriod);
