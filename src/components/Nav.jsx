import { NavLink } from 'react-router-dom';

const Nav = () => {
  const location = {
    pathname: '/',
    search: '?q=21',
    state: "state value"
  };

  return (
    <ul>
      <li>
        {/* <NavLink to={location}>Home</NavLink> */}
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/contacts">Contacts</NavLink>
      </li>
    </ul>
  );
};

export default Nav;
