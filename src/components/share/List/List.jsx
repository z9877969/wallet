import css from './List.module.css';

const List = ({children}) => (
    <ul className={css.list}>
        {children}
    </ul>
)

export default List