import { NavLink, useLocation } from 'react-router-dom';

const Contacts = () => {
  const location = useLocation();

  return (
    <ul>
      <li>
        <NavLink to={{
          pathname: '/contacts/1',
          state: {
            from: location
          }
        }}>Contact-1</NavLink>
      </li>
      <li>
        <NavLink to={{
          pathname: '/contacts/2',
          state: {
            from: location
          }
        }}>Contact-2</NavLink>
      </li>
      <li>
        <NavLink to={{
          pathname: '/contacts/3',
          state: {
            from: location
          }
        }}>Contact-3</NavLink>
      </li>
    </ul>
  );
};

export default Contacts;
