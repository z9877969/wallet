import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

import Button from '../components/share/Button';
import Container from '../components/share/Container/Container';
import Item from '../components/share/Item';
import List from '../components/share/List';
import Section from '../components/share/Section/Section';

import { addTransactionListId } from '../redux/transactions/transactionsAction';
import {
  resetPeriod,
  setCatData,
  setPeriod,
} from '../redux/analitics/analiticsAction';
import { getCatsWithTotal, getPeriod } from '../redux/analitics/analiticsSelector';
import { getTransactions } from '../redux/transactions/transactionsSelector';
import help from '../utils/helpers';
import options from '../assets/options/selectPeriods';
// import { handleInputChange } from 'react-select/src/utils';

const CategoriesForPeriodPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { category } = match.params;

  const data = useSelector(getTransactions)[category] || [];
  const dataRender = useSelector(getCatsWithTotal);
  const selectPeriod = useSelector(getPeriod);

  const [selectOption, setSelectOption] = useState([options.ru[0]]);

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
    dispatch(setCatData({ data, date: help.dataByPeriod.current }));
  }, []);

  const handleChange = newValue => {
    dispatch(setPeriod(newValue.value));
  };

  useEffect(() => {
    const { value } = options.ru[0];
    dispatch(setPeriod(value));
    return () => {
      dispatch(resetPeriod());
    };
  }, []);

  return (
    <>
      <Section>
        <Container>
          <Button title="GoBack" cbOnClick={handleGoBack} />
          <CreatableSelect
            onChange={handleChange}
            options={options.ru}
            defaultValue={options.ru[0]}
          />
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
