import "./Header.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartArrowDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';



const Header = () => {
    return (
        <div className="Header" id="Header">
            {/* Top Header  */}
            <div id="Top-header-wrapper">
                <div className="Top-header h-full mx-auto items-center flex primary-width justify-between">
                    <div className="left-menus flex items-center">
                        <h2 className="logo">Trendio Fashion's</h2>
                        <div className="searchBar flex justify-between items-center ">
                            <FontAwesomeIcon icon={faSearch} className="search-icon primary-hover" />
                            <input type="search" className="w-full h-full" placeholder="Search for trendio Fashion's World" />
                        </div>
                        <div className="flex items-center cursor-pointer main-search-icon">
                            <FontAwesomeIcon icon={faSearch} className="common-icon" />
                        </div>
                        <div className="Cart-icon flex items-center cursor-pointer">
                            <div className="cart-item-num">0</div>
                            <FontAwesomeIcon icon={faCartArrowDown} className="common-icon" />
                        </div>
                    </div>

                    <div className="right-menus flex">
                        <div className="login-box auth-box flex items-center">
                            <FontAwesomeIcon icon={faUser} className="" />
                            <p>Login</p>
                        </div>
                        <div className="Signup-box auth-box flex items-center">
                            <p>Signin</p>
                        </div>
                    </div>
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