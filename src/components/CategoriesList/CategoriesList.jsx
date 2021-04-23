import { useEffect } from 'react';
import { Route } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../_share/Button';
import Container from '../_share/Container/Container';
import Item from '../_share/Item';
import List from '../_share/List';
import Section from '../_share/Section/Section';
import AddCategory from '../AddCategory/AddCategory';
import css from './CategoriesList.module.css';
import {
  addCostsCat,
  addIncomesCat,
  getCostsCat,
  getIncomesCat,
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
  const { incomes: isCatIncomes, costs: isCatCosts } = useSelector(
    state => state.category.isNull,
  );

  const category = url.split('/')[1];
  const categoriesList = categories[category] || [];

  const handleAddCategory = () => {
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
    const { incomes, costs } = categories;
    !incomes?.length && category === 'incomes' && dispatch(getIncomesCat());
    !costs?.length && category === 'costs' && dispatch(getCostsCat());
  }, []);

  useEffect(() => {
    if (isCatIncomes) {
      catListIncomes.forEach(async data => {
        await dispatch(addIncomesCat(data));
      });
      dispatch(resetCategoriesNull('incomes'));
    }
  }, [isCatIncomes]);

  useEffect(() => {
    console.log('isCatCosts :>> ', isCatCosts);
    if (isCatCosts) {
      catListCosts.forEach(async data => await dispatch(addCostsCat(data)));
      dispatch(resetCategoriesNull('costs'));
    }
  }, [isCatCosts]);

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
        {/* <input
          className={css.comment}
          type="text"
          placeholder="Комментарий..."
        /> */}
        {location.pathname.split('/').pop() !== 'add' && (
          <Button title="Add Category" cbOnClick={handleAddCategory} />
        )}
        <Route path={`${path}/add`} exact component={AddCategory} />
      </Container>
    </Section>
  );
};

export default CategoriesList;
