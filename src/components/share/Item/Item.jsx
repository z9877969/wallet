import css from './Item.module.css';

const Item = ({ children, onClick }) => <li className={`${css.item} ${css.col}`}>{children}</li>;

export default Item;
