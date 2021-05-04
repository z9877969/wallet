import { Route } from 'react-router';
import { useSelector } from 'react-redux';
import Button from '../share/Button';
import Container from '../share/Container/Container';
import Item from '../share/Item';
import List from '../share/List';
import Section from '../share/Section/Section';
import AddCategory from '../AddCategory/AddCategory';
import css from './CategoriesList.module.css';
import LableInput from '../share/LableInput';

const CategoriesList = ({ match, history, location, handleChangeFormik }) => {
  const { url, path } = match;
  const { push } = history;
  const { state } = location;

  const categories = useSelector(state => state.categories);

  const transactionType = url.split('/')[1];
  const categoriesList = categories[transactionType] || [];

  const handleOpenAddCategory = () => {
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

  const handleChange = e => {
    handleChangeFormik(e);
    handleGoBack();
  };

  return (
    <Section>
      <label>
        checkbox
        <input type="checkbox" name="category" placeholder="" />
      </label>
      <Container>
        <Button title="Go back" cbOnClick={handleGoBack} />
        <h2>Categories</h2>
        <List>
          {categoriesList.map(({ id, name }) => {
            return (
              <Item key={id}>
                <LableInput
                  title={name}
                  type="radio"
                  name="category"
                  value={name}
                  handleChange={handleChange}
                />
                <Button title={'...'} />
              </Item>
            );
          })}
        </List>
        {location.pathname.split('/').pop() !== 'add' && (
          <Button title="Add Category" cbOnClick={handleOpenAddCategory} />
        )}
        <Route path={`${path}/add`} exact component={AddCategory} />
      </Container>
    </Section>
  );
};

export default CategoriesList;
