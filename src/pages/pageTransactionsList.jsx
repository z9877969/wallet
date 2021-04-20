import { connect } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import Button from '../components/share/Button/Button';
import Container from '../components/share/Container/Container';
import Item from '../components/share/Item';
import List from '../components/share/List/List';
import Section from '../components/share/Section/Section';

import help from '../utils/helpers';

const PageTransactionsList = props => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();

  const { category } = match.params;

  const data = props[category] || [];

  const dataRender = data.filter(({ category: { id } }) => id === props.listId);

  const handleGoBack = () => {
    history.push(location.state ? location.state.from : '/');
  };

  return (
    <>
      <Section>
        <Container>
          <Button title="GoBAck" cbOnClick={handleGoBack} />
          <List>
            {dataRender.map(({ category: { name }, date }) => (
              <Item key={help.generateId()}>
                <span>{name}</span>
                <span>{date}</span>
                <Button title="Edit" />
                <Button title="Delete" />
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
