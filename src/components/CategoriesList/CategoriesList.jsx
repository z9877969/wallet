const CategoriesList = ({ categoriesList, onCategoryClick }) => {
  return (
    <section>
      <button>go back</button>
      <h2>Categories</h2>;
      <ul>
        {categoriesList.map(({ id, name }) => {
          return (
            <li key={id}>
              <span onClick={() => onCategoryClick({ id, name })}>{name}</span>
              <button>...</button>
            </li>
          );
        })}
      </ul>
      <input type="text" />
      <button type="button">+</button>
    </section>
  );
};

export default CategoriesList;
