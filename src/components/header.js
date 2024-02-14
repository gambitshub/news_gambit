import React from "react";

const Header = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <header style={{ cursor: "pointer" }} onClick={handleClick}>
      <h1>News Gambit</h1>
      <p1>by GambitsForge</p1>
    </header>
  );
};

export default Header;
