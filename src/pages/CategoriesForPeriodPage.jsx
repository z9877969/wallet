import { connect } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Button from '../components/share/Button';
import Container from '../components/share/Container/Container';
import Item from '../components/share/Item';
import List from '../components/share/List';
import Section from '../components/share/Section/Section';

import { addTransactionListId } from '../redux/transactions/transactionsAction';
import help from '../utils/helpers';

const PageCategoriesForPeriod = props => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { category } = match.params;
  const data = props[category] || [];
  const dataByCategories = help.getDataByCategories(data);

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
      <Section>
        <Container>
          <Button title="GoBack" cbOnClick={handleGoBack} />
          <List>
            {dataByCategories.map(({ name, id, summ }) => (
              <Item key={id}>
                <span>{name}</span> <span>{summ}</span>
                <Button
                  title="show list"
                  cbOnClick={handleOpenList}
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
});

const mapDispatchToProps = {
  addTransactionListId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageCategoriesForPeriod);
