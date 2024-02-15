import React from "react";

const Header = () => {
  const handleClick = () => {
    window.location.reload();
  };

  return (
    <header
      style={{
        cursor: "pointer",
        height: "100px", // Adjust the height as needed
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: "30px",
      }}
      onClick={handleClick}
    >
      <h1 style={{ margin: "5px 0" }}>News Gambit</h1>
      <p style={{ margin: "5px 0", color: "black" }}>by GambitsForge</p>
    </header>
  );
};

export default Header;
