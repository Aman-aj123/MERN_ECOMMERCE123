import TopProducts from "./TopProducts/TopProducts";

const Main = () => {
    return (
        <>
            <TopProducts productCategory="all"/>
            <TopProducts productClass="Single-item" productCategory="kids"/>
            <TopProducts productClass="" productCategory="kids"/>
            <TopProducts productClass="Single-item" productCategory="kids"/>
            <TopProducts productClass="" productCategory="kids"/>
        </>
    );
}

export default Main;