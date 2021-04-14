import { Component } from 'react';
import {
  useHistory,
  useLocation,
  useRouteMatch,
  withRouter,
} from 'react-router-dom';

import Button from '../components/share/Button';
import Item from '../components/share/Item';
import List from '../components/share/List';

const PageCategoriesForPeriod = (
  props,
  // { costs, incomes }
) => {
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  const { category } = match.params;

  //   let data = [];
  //   switch (category) {
  //     case 'costs':
  //       data = [...costs];
  //       break;
  //     case 'incomes':
  //       data = [...incomes];
  //       break;
  //   }

  //   const data =
  //     category === 'costs' ? costs : category === 'incomes' ? incomes : [];

  const data = props[category] || [];

  const handleOpenList = () => {
    history.push({
      pathname: `${match.url}/list`,
      state: {
        from: location,
      },
    });
  };

  const handleGoBack = () => history.push('/');

  return (
    <>
      <h1>PageCategoriesForPeriod</h1>
      <Button title="GoBack" cbOnClick={handleGoBack} />
      <List>
        {data.map(({ category: { name }, summ }) => (
          <Item>
            <span>{name}</span> <span>{summ}</span>
            <Button title="show list" cbOnClick={handleOpenList} />
          </Item>
        ))}
      </List>
    </>
  );
};

export default PageCategoriesForPeriod;
