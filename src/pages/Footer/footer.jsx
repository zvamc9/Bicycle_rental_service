import React from "react";
import { Link } from "react-router-dom";
import css from "./footer.module.css";
import brandBikeRental from "../../depictions/images/brandBikeRental.jpg"

const Footer = () => {
    return (
<footer>
  <div className={`contacts ${css.contacts}`}>
    <Link to="/" className={`navbar-brand ${css.brand}`}>
      <img src={brandBikeRental} className={css.icon} alt={"Pretty bicycle"} />
       Bike rental
    </Link>
      <div className={`footer-text ${css.text}`}>
        <a className={css.tel}
           aria-current="page"
           href="tel:+7-979-797-99-77">
           tel: +7-979-797-99-77
        </a>
          <a className="nav-link" href="/">
             bike_rental@gmail.com
          </a>
      </div>
   </div>
</footer>
    );
};

export default Footer;