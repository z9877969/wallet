import List from '../share/List';
import Item from '../share/Item';
import css from './MainInfo.module.css';

const MainInfo = ({ title, dataList, cardId = '', handleToggleCard, summsOfPeriod }) => {
  // console.log(summsOfPeriod)
  return(
  
  <>
    <h1 className={css.title}>{title}</h1>
    <p>RUB</p>
    <button
      onClick={() => {
        handleToggleCard(cardId);
      }}
    >
      Add
    </button>
      { summsOfPeriod  && <List>
        {summsOfPeriod.map(({ name, value }) => (
          <Item key={name}>
            <span>{name}</span>
            <span>{value}</span>
          </Item>
        ))}
      </List>}
  </>
)};

export default MainInfo;
