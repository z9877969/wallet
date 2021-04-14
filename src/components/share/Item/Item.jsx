import { memo } from 'react';

const Item = ({ children, onClick }) => (
  <li>
    {children}
  </li>
);

export default Item;
