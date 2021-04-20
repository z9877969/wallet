import Button from '../share/Button';
import Container from '../share/Container/Container';
import Item from '../share/Item';
import List from '../share/List';
import Section from '../share/Section/Section';
import css from './CategoriesList.module.css';

const CategoriesList = ({ categoriesList, onCategoryClick, handleGoBack }) => {
  return (
    <Section>
      <Container>
        <Button title="Go back" onClick={handleGoBack} />
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
        <input
          className={css.comment}
          type="text"
          placeholder="Комментарий..."
        />
        <Button title="+" />
      </Container>
    </Section>
  );
};

export default CategoriesList;
