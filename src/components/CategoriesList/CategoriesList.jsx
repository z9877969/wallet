import style from './CategoriesList.module.css';

const CategoriesList = ({ categoriesList, onCategoryClick, handleGoBack }) => {
  return (
    <section>
      <button type="button" onClick={handleGoBack}>
        go back
      </button>
      <h2>Categories</h2>;
      <ul>
        {categoriesList.map(({ id, name }) => {
          return (
            <li key={id}>
              <span
                className={style.item}
                onClick={() => onCategoryClick({ id, name })}
              >
                {name}
              </span>
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
