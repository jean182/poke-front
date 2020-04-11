import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [toggle, setToggle] = useState(false);
  const [collapsedNav, setCollapsedNav] = useState("collapse");

  const handleClick = () => {
    setCollapsedNav("collapsing");
    setToggle((currenToggleState) => !currenToggleState);
    setCollapsedNav("collapse");
  };

  const collapsedButton = toggle ? "" : "collapsed";
  const show = toggle ? "show" : "";

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Home
      </NavLink>
      <button
        className={`navbar-toggler ${collapsedButton}`}
        onClick={handleClick}
        type="button"
        data-toggle="collapse"
        data-target="#sidebar-pokedex"
        aria-controls="sidebar-pokedex"
        aria-expanded={toggle}
        aria-label="Toggle docs navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`navbar-collapse ${collapsedNav} ${show}`}
        aria-label="Main navigation"
        id="navbarNav"
      >
        <div className="navbar-nav">
          <NavLink
            className="nav-item nav-link"
            to="/pokedex"
            activeClassName="active"
          >
            Pokedex
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
