import "./Footer.css";

const Footer =  ()=> {
    return (
        <footer>
        <div className="main-footer">
            <div className="top-footer">
                <div className="contact t-f">
                    <div className="c-logo"><h2>Trendio</h2></div>
                    <h4 className="c-heading">Contact</h4>
                    <li><span className="location">Address:</span> <span className="detail">Nabinagar road amba (aurangabad),
                            (bihar)</span> </li>
                    <li><span className="location">Phone:</span> <span className="detail">9155333590 / 9503821037</span></li>
                    <li><span className="location"> Hours: </span><span className="detail">10.00 - 18.00 Mon - Sat</span></li>
                    <h3>Follow Us</h3>
                    <div className="follow-icons">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-linkedin"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-youtube"></i>

                    </div>
                    <div className="company-img"></div>
                </div>



                <div className="about t-f">
                    <h4 className="c-heading">About</h4>
                    <li> <span className="detail">About us</span> </li>
                    <li> <span className="detail">Delievery Information</span></li>
                    <li> <span className="detail">Privicy policy</span></li>
                    <li> <span className="detail">Terms and conditions</span></li>
                    <li> <span className="detail">Contact us</span></li>
                </div>


                <div className="my-about t-f">
                    <h4 className="c-heading">My Account</h4>
                    <li> <span className="detail"> Sign In </span> </li>
                    <li><span className="detail">View Cart</span></li>
                    <li><span className="detail">My Wishlist</span></li>
                    <li><span className="detail">Track My Order</span></li>
                    <li><span className="detail">Help</span></li>
                </div>

            </div>



            <div className="center-footer">
                <div className="text">
                    <h3>Sign up for Newsletters</h3>
                    <p>get emails updates about our latest shop and <span>special offeres</span></p>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Your email address"/><span>Sign Up</span>
                </div>
            </div>

        </div>



        <div className="bottom-footer">
            <p>&copy; copyright designed and developed by developer aman raj from aurangabad, (bihar)</p>
        </div>
    </footer>
    );

}

export default Footer;