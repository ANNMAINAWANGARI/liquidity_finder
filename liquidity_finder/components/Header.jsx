import React from "react";
import {SiBlockchaindotcom} from "react-icons/si";
import {CgMenuRight} from "react-icons/cg";

const Header = ({setActiveComponent,activeNetwork}) => {
  const navMenu = [
    "Home",
    "Liquidity",
    "Pool History",
    "Liquidity History",
    "Networks"
  ]
  return (
  <header id="navbar-sticky" className='navbar'>
    <div className="container">
      <nav className="">
        <a href='/' className="logo">
          <img 
          src='assets/images/logo.png' 
          alt='Liquidity Finder Logo'
          className="h-10"/>
        </a>
        <div className="lg:hidden flex items-center ms-auto px-2.5">
          <button className="hs-collapse-toggle inline-flex items-center justify-center h-9 w-12 rounded-md border border-white/20 bg-default-100/5" type="button"
          id="hs-unstyled-collapse"
          data-hs-collapse="#mobileMenu"
          data-hs-type="collapse">
            <CgMenuRight/>
          </button>
        </div>
        <div id='mobileMenu'
        className="hs-collapse transition-all duration-300 lg:basis-auto basis-full grow hidden lg:flex items-center justify-center mx-auto mt-2 lg:mt-0">
          <ul id="navbar-navlist" className="navbar-nav">
            {navMenu.map((list,index)=>(
              <li key={index}
              onClick={()=>setActiveComponent(list)}
              className="nav-item">
                <a className="nav-link">{list}</a>
              </li>
            ))}
          </ul>
          <div className="lg:hidden flex items-center pt-4 mt-4 lg:mt-0 border-t border-white/10 lg:border-none">
            <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-3">
              <SiBlockchaindotcom/>
              {activeNetwork || "Select Network"}
            </a>
          </div>
        </div>
        <div className="hidden lg:flex items-center">
        <a href="#" className="inline-flex items-center justify-center gap-2 bg-primary text-white py-2 px-6 rounded-full hover:bg-primary-hover transition-all duration-3">
              <SiBlockchaindotcom/>
              {activeNetwork || "Select Network"}
            </a>
        </div>
      </nav>
    </div>
  </header>);
};

export default Header;
