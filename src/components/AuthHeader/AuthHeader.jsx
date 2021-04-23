import { NavLink } from 'react-router-dom';
import Item from '../share/Item';
import List from '../share/List';

const AuthHeader = () => {
  return (
    <header>
      <nav>
        <List>
          <Item>
            <NavLink to="/">Logo</NavLink>
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
