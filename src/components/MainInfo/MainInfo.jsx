import { useHistory } from 'react-router-dom';
import List from '../share/List';
import Item from '../share/Item';
import css from './MainInfo.module.css';

const MainInfo = ({
  title,
  dataList,
  cardId = '',
  // handleToggleCard,
  summsOfPeriod,
}) => {
  
  const abracadabra = useHistory();

  const handleToggleCard = () => {
    const pathname = `/${cardId}`;
    abracadabra.push(pathname);
  };
  return (
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
      {summsOfPeriod && (
        <List>
          {summsOfPeriod.map(({ name, value }) => (
            <Item key={name}>
              <span>{name}</span>
              <span>{value}</span>
            </Item>
          ))}
        </List>
      )}
    </>
  );
};

export default MainInfo;
