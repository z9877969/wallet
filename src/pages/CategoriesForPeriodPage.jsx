import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';

import Button from '../components/share/Button';
import Container from '../components/share/Container/Container';
import Item from '../components/share/Item';
import List from '../components/share/List';
import Section from '../components/share/Section/Section';
import DatesPaginator from '../components/DatesPaginator/DatesPaginator';

import { addTransactionListId } from '../redux/transactions/transactionsAction';
import {
  resetPeriod,
  setCatData,
  setPeriod,
} from '../redux/analitics/analiticsAction';
import {
  getCatsWithTotal,
  getPeriod,
} from '../redux/analitics/analiticsSelector';
import { getTransactions } from '../redux/transactions/transactionsSelector';
import help from '../utils/helpers';
import options from '../assets/options/selectPeriods';
import iconsPath from '../assets/icons/sprite.svg';

const icons = {
  goBack: { path: iconsPath, id: 'icon-arrow-left2' },
};

const CategoriesForPeriodPage = () => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { category } = match.params;

  const data = useSelector(getTransactions)[category] || [];
  const dataRender = useSelector(getCatsWithTotal);
  const selectPeriod = useSelector(getPeriod);

  // const [date, setDate] = useState(help.dataByPeriod.current);
  const [date, setDate] = useState(new Date());

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

  const handleChangeDate = date => setDate(date);

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
          <Button icon={icons.goBack} cbOnClick={handleGoBack} />
          <CreatableSelect
            onChange={handleChange}
            options={options.ru}
            defaultValue={selectPeriod}
          />
          <DatesPaginator
            title={'May 2021'}
            date={date}
            handleChangeDate={handleChangeDate}
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
