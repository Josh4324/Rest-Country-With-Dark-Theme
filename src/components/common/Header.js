import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";

const Header = () => {
  const toogleRef = useRef(null);
  const [color, setColor] = useState("light");
  const ontoogle = () => {
    let newColor = color === "light" ? "dark" : "light";
    setColor(newColor);
    document.documentElement.setAttribute("data-theme", newColor);
  };
  return (
    <div className="header">
      <div className="inner-header">
        <span className="left">Where in the world?</span>
        <span onClick={ontoogle} ref={toogleRef} className="right">
          <FontAwesomeIcon className="fas" icon={faMoon} />
          {color === "light" ? "Dark Mode" : "Light Mode"}
        </span>
      </div>
    </div>
  );
};

export default Header;
