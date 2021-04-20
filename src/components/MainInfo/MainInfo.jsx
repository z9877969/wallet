import { useHistory } from 'react-router-dom';
import List from '../share/List';
import Item from '../share/Item';
import Button from '../share/Button';
import Section from '../share/Section/Section';
import Container from '../share/Container/Container';

import help from '../../utils/helpers';

const MainInfo = ({ title, cardId = '', summsOfPeriod }) => {
  const abracadabra = useHistory();

  const handleToggleCard = () => {
    const pathname = `/${cardId}`;
    abracadabra.push(pathname);
  };
  return (
    <Section title={title}>
      <Container>
        <p>RUB</p>
        <Button title="Add" cbOnClick={handleToggleCard} cbArgs={[cardId]} />
        {summsOfPeriod && (
          <List>
            {summsOfPeriod.map(({ name, value }) => (
              <Item key={name || help.generateId()}>
                <span>{name}</span>
                <span>{value}</span>
              </Item>
            ))}
          </List>
        )}
      </Container>
    </Section>
  );
};

export default MainInfo;
