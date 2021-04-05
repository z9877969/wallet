import MainInfo from "../MainInfo/MainInfo";
import Button from "../share/Button/Button";

const balance = [{ name: "Все время", value: "0,00" }];
const MainPage = (props) => {
    const { costsDb, incomesDb, handleToggleCard } = props;
    return (
        <>
            <h1>Журнал рассходов</h1>
            <MainInfo
                title={costsDb.mainPageTitle}
                dataList={costsDb.mainPageList}
                cardId="costs"
                handleToggleCard={handleToggleCard}
            />

            <MainInfo
                title={incomesDb.mainPageTitle}
                dataList={incomesDb.mainPageList}
                cardId="incomes"
                handleToggleCard={handleToggleCard}
            />

            <MainInfo title={"Баланс"} dataList={balance} />
            <Button title={"Все расходы"} />
            <Button title={"Все доходы"} />
        </>
    );
};

export default MainPage;
