import { NavLink } from 'react-router-dom';
import Item from '../_share/Item';
import List from '../_share/List';

const AuthHeader = () => {
  return (
    <header>
      <nav>
        <List>
          <Item>
            <NavLink to="/">Home</NavLink>
          </Item>
          <Item>
            <NavLink to="/login">LogIn</NavLink>
          </Item>
          <Item>
            <NavLink to="/register">SignIn</NavLink>
          </Item>
        </List>
      </nav>
    </header>
  );
};

export default AuthHeader;
