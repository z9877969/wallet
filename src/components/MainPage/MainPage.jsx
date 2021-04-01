import MainInfo from "../MainInfo/MainInfo"

const MainPage = (props) => {
    const {costsDb, incomesDb} = props
    return( 
        <>
        <h1>Журнал рассходов</h1>
        <MainInfo title={costsDb.mainPageTitle} dataList={costsDb.mainPageList}/>
        <MainInfo title={incomesDb.mainPageTitle} dataList={incomesDb.mainPageList}/>
        
    </>
)}

export default MainPage