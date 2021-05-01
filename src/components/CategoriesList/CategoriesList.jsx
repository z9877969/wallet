import { useEffect } from 'react';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../share/Button';
import Container from '../share/Container/Container';
import Item from '../share/Item';
import List from '../share/List';
import Section from '../share/Section/Section';
import AddCategory from '../AddCategory/AddCategory';
import css from './CategoriesList.module.css';
import {
  addCostsCat,
  addIncomesCat,
  getCategories,
} from '../../redux/categories/categoriesOperation';
import { resetCategoriesNull } from '../../redux/categories/categoriesAction';
import { categoriesList as catListIncomes } from '../../db/incomes.json';
import { categoriesList as catListCosts } from '../../db/costs.json';

const CategoriesList = ({ onCategoryClick, match, history, location }) => {
  const dispatch = useDispatch();
  const { url, path } = match;
  const { push } = history;
  const { state } = location;

  const categories = useSelector(state => state.category);
  const { incomes: isCatIncomesNull, costs: isCatCostsNull } = useSelector(
    state => state.category.isNull,
  );

  const category = url.split('/')[1];
  const categoriesList = categories[category] || [];

  const handleAddCategory = () => {
    dispatch(addIncomesCat('data'));
    history.push({
      pathname: `${url}/add`,
      state: {
        from: location,
      },
    });
  };

  const handleGoBack = () => {
    push(state?.from || '/');
  };

  useEffect(() => {
    !categoriesList.length && dispatch(getCategories());
  }, []);

  useEffect(() => {
    isCatIncomesNull &&
      catListIncomes.forEach(async (data, i) => {
        i === 0 && dispatch(resetCategoriesNull('incomes'));
        await dispatch(addIncomesCat(data));
      });
    isCatCostsNull &&
      category === 'costs' &&
      catListCosts.forEach(async (data, i) => {
        i === 0 && dispatch(resetCategoriesNull('costs'));
        await dispatch(addCostsCat(data));
      });
  }, [isCatIncomesNull, isCatCostsNull]);

  return (
    <Section>
      <Container>
        <Button title="Go back" cbOnClick={handleGoBack} />
        <h2>Categories</h2>
        <List>
          {categoriesList.map(({ id, name }) => {
            return (
              <Item key={id}>
                <span
                  className={css.item}
                  onClick={() => onCategoryClick({ id, name })}
                >
                  {name}
                </span>
                <Button title={'...'} />
              </Item>
            );
          })}
        </List>
        {location.pathname.split('/').pop() !== 'add' && (
          <Button title="Add Category" cbOnClick={handleAddCategory} />
        )}
        <Route path={`${path}/add`} exact component={AddCategory} />
      </Container>
    </Section>
  );
};

export default CategoriesList;
