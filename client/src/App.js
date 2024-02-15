import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import AnimatedGridSection from "./components/animated_grid_section";
import "./style/styles.css";

function App() {
  return (
    <div className="App">
      <Header />
      {/* Placeholder for content between Header and AnimatedGridSection */}
      <div className="content-placeholder">
        {/* Your additional content goes here */}
      </div>
      <AnimatedGridSection />
      {/* Placeholder for content after AnimatedGridSection */}
      <div className="content-placeholder">
        {/* Additional content after AnimatedGridSection */}
      </div>
      <Footer />
    </div>
  );
}

export default App;
