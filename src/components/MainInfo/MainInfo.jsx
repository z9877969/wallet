import List from '../share/List';
import Item from '../share/Item';
import css from './MainInfo.module.css';
import { memo } from 'react';

const MainInfo = memo(
  ({ title, dataList, cardId = '', handleToggleCard, foo, n }) => (
    <>
      {console.log('foo :>> ', foo)}
      <h1 className={css.title}>{title}</h1>
      <p>RUB {console.log('cardId', cardId)}</p>
      <button
        onClick={() => {
          handleToggleCard(cardId);
        }}
      >
        Add
      </button>
      <List>
        {dataList.map(el => (
          <Item key={el.name}>
            <span>{el.name}</span>
            <span>{el.value}</span>
          </Item>
        ))}
      </List>
    </>
  ),
  (prevProps, nextProps) => {
    console.log('prevProps.title :>> ', prevProps.title);
    console.log('nextProps.title :>> ', nextProps.title);
    return prevProps.n !== nextProps.n;
  },
);

export default MainInfo;
