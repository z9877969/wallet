import { memo } from 'react';

const Item = ({ children, onClick }) => (
  <li>
    {console.log('object')}
    {children}
  </li>
);

export default Item;
