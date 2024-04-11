import "./Header.css"

const Header = () => {
    return (
        <div className="Header" id="Header">
            {/* Top Header  */}
            <div id="Top-header-wrapper">
                <div className="Top-header h-full mx-auto items-center flex primary-width justify-between">
                    <div className="left-menus flex items-center">
                        <h2 className="logo">Trendio Fashion's</h2>
                        <div className="searchBar flex justify-between items-center ">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                            <input type="search" className="w-full h-full" placeholder="Search for trendio Fashion's World" />
                        </div>
                        <div className="login-box auth-box flex items-center">
                            <i class="fa-solid fa-user"></i>
                            <p>Login</p>
                        </div>
                    </div>

                    <div className="right-menus flex">
                        <div className="Signup-box auth-box flex items-center">
                            <i class="fa-solid fa-user"></i>
                            <p>Signup</p>
                        </div>
                        <div className="Signup-box auth-box flex items-center">
                            <i class="fa-solid fa-user"></i>
                            <p>Cart</p>
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