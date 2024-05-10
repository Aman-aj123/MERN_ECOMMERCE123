import TopProducts from "./TopProducts/TopProducts";

const Main = () => {
    return (
        <>
            <TopProducts productCategory="all"/>
            <TopProducts productClass="Single-item" productCategory="all"/> 
        </>
    );
}

export default Main;