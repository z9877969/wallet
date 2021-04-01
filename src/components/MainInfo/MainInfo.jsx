import List from "../share/List/List"
import Item from "../share/Item/Item"
import css from "./MainInfo.module.css"

const MainInfo = ({title, dataList}) => (
    <>
    <h1 className={css.title}>{title}</h1>
    <p>RUB</p>
    <button>Add</button>
    <List>
            {dataList.map(el => (
                <Item key={el.name}>
                    <span>{el.name}</span>
                    <span>{el.value}</span>
                </Item>  
            ))}
    </List>
    </>
)

export default MainInfo