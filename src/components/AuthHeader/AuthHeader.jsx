import { NavLink } from 'react-router-dom';
import Item from '../share/Item';
import List from '../share/List';

const AuthHeader = ({ isAuth, handleLogout }) => {
  return (
    <header>
      <nav>
        <List>
          <Item>
            <NavLink to="/">Home</NavLink>
          </Item>
          {!isAuth ? (
            <>
            {console.log('isAuth :>> ', isAuth)}
              <Item>
                <NavLink to="/login">LogIn</NavLink>
              </Item>
              <Item>
                <NavLink to="/register">SignUp</NavLink>
              </Item>
            </>
          ) : (
            <Item>
              <NavLink to="/logout" onClick={handleLogout}>
                LogOut
              </NavLink>
            </Item>
          )}
        </List>
      </nav>
    </header>
  );
};

export default AuthHeader;
