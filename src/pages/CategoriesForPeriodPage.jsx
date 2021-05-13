import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

import Button from '../components/share/Button';
import Container from '../components/share/Container/Container';
import Item from '../components/share/Item';
import List from '../components/share/List';
import Section from '../components/share/Section/Section';

import { addTransactionListId } from '../redux/transactions/transactionsAction';
import { setCatData } from '../redux/analitics/analiticsAction';
import help from '../utils/helpers';
import { useEffect } from 'react';
import moment from 'moment';
import { getCatsWithTotal } from '../redux/analitics/analiticsSelector';
import { getTransactions } from '../redux/transactions/transactionsSelector';

const CategoriesForPeriodPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { category } = match.params;

  const data = useSelector(getTransactions)[category] || [];
  const dataRender = useSelector(getCatsWithTotal);

  const handleOpenList = id => {
    history.push({
      pathname: `${match.url}/list`,
      state: {
        from: location,
      },
    });
    dispatch(addTransactionListId(id));
  };

  const handleGoBack = () => history.push('/');

  useEffect(() => {
    dispatch(setCatData({ data, date: moment().format('YYYY-MM-DD') }));
  }, []);

  return (
    <>
      <Section>
        <Container>
          <Button title="GoBack" cbOnClick={handleGoBack} />
          <List>
            {dataRender.map(({ category, total }) => (
              <Item key={category}>
                <span>{category}</span> <span>{total}</span>
                <Button
                  title="show list"
                  cbOnClick={handleOpenList}
                  cbArgs={[category]}
                />
              </Item>
            ))}
          </List>
        </Container>
      </Section>
    </>
  );
};

export default CategoriesForPeriodPage;
