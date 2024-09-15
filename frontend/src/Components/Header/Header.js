import React, { useState } from "react"
import { Link, useNavigate } from 'react-router-dom';

import "./Header.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromGroundWater, faCartArrowDown, faDiagramProject, faHelicopterSymbol, faHome, faProcedures, faProjectDiagram, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

 

const Header = () => {

    const [visibleClass, setVisibleClass] = useState("");
    
    const navigate = useNavigate();

    const handleSearchClick = ()=> {
        setVisibleClass(prevClass => prevClass === "" ? "visible-searchbar" : "");
    }


    return (
        <div className="Header" id="Header">
            {/* Top Header  */}
            <div id="Top-header-wrapper">
                <div className="Top-header h-full mx-auto items-center flex primary-width justify-between">
                    <div className="left-menus w-full flex items-center">
                        <h2 className="logo"><Link to="/">Trendio Fashion's </Link></h2>
                        <div className={`searchBar ${visibleClass} flex justify-between items-center` }>
                            <FontAwesomeIcon icon={faSearch} className="search-icon primary-hover" />
                            <input type="search" className="w-full h-full" placeholder="Search for trendio Fashion's World" />
                        </div>
                        <div className="flex items-center cursor-pointer main-search-icon">
                            <FontAwesomeIcon icon={faSearch} className="common-icon" />
                        </div>

                    </div>

                    <div className="right-menus flex">
                        <div className="Cart-icon flex items-center cursor-pointer">
                            <div className="cart-item-num">0</div>
                            <FontAwesomeIcon icon={faCartArrowDown} className="common-icon" />
                        </div>

                        <div className="Signup-box auth-box flex items-center">
                            <p>Login</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom navigation  */}
            <div className="bottom-navigation flex justify-around items-center w-full">

                <div className="menu-icn cursor-pointer" onClick={()=> {navigate("/")}}>
                    <FontAwesomeIcon icon={faHome} className="common-icon" />
                </div>
                <div className="menu-icn cursor-pointer" onClick={handleSearchClick}>
                    <FontAwesomeIcon icon={faSearch} className="common-icon" />
                </div>
                <div className="menu-icn cursor-pointer" onClick={()=> {navigate('/products')}}>
                    <FontAwesomeIcon icon={faProcedures} className="common-icon" />
                </div>
                
                <div className="menu-icn cursor-pointer">
                    <FontAwesomeIcon icon={faUser} className="common-icon" />
                </div>
                

            </div>
            {/* Bottom Header  */}
            <div className="Bottom-header w-full">
                <div className="Bottom-header-wrapper mx-auto primary-width flex">
                    <p className="productOptions">Mens</p>
                    <p className="productOptions">Womens</p>
                    <p className="productOptions">Kids</p>
                    <p className="productOptions">Tshirts</p>
                    <p className="productOptions">Kurtas</p>
                    <p className="productOptions">Electronics</p>
                </div>
            </div>
        </div>
    );
}

export default Header;