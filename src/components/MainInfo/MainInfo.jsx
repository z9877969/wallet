import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import List from '../share/List';
import Item from '../share/Item';
import Button from '../share/Button';
import Section from '../share/Section/Section';
import Container from '../share/Container/Container';
import setsPeriodsList from '../../db/tmp/mainInfoList.json';
import help from '../../utils/helpers';
import css from './MainInfo.module.css';

const MainInfo = ({ title, cardId }) => {
  const abracadabra = useHistory();
  const transactions = useSelector(state => state.transactions);

  const transByCat = transactions[cardId] || [];
  const periodsSumms = help.getPeriodsSumms(transByCat)

  const handleToggleCard = () => {
    const pathname = `/${cardId}`;
    abracadabra.push(pathname);
  };
  return (
    <Section title={title}>
      <Container className={css.infoFrame}> 
        <Button className={css.addButton} title="Add" cbOnClick={handleToggleCard} cbArgs={[cardId]} />
        <p className={css.currency}>RUB</p>
        <List>
          {setsPeriodsList.map(({ name, id }) => (
            <Item key={id}>
              <span>{name}</span>
              <span>{periodsSumms[id] || '0.00'}</span>
            </Item>
          ))}
        </List>
      </Container>
    </Section>
  );
};

export default MainInfo;
