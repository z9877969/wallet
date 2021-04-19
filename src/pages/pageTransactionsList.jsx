import { connect } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Button from '../components/share/Button/Button';
import Item from '../components/share/Item';
import List from '../components/share/List/List';

const PageTransactionsList = props => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const { category } = match.params;

  const data = props[category] || [];

  const dataRender = data.filter(({category: {id}}) => id === props.listId);

  const handleGoBack = () => {
    history.push(location.state ? location.state.from : '/');
  };

  return (
    <>
      <Button title="GoBAck" cbOnClick={handleGoBack} />
      <h1>PageTransactionsList</h1>
      <List>
        {dataRender.map(({ category: { name } }) => (
          <Item>
            {name}
            <Button title="Edit" />
            <Button title="Delete" />
          </Item>
        ))}
      </List>
    </>
  );
};

const mapStateToProps = state => ({
  incomes: state.transactions.incomes,
  costs: state.transactions.costs,
  listId: state.transactions.listId,
});

export default connect(mapStateToProps)(PageTransactionsList);
