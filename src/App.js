import React from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import ArticleList from "./components/article_list";
import AnimatedGridSection from "./components/animated_grid_section";
import "./styles.css"; // Import your CSS styles

const App = () => (
  <div className="App">
    <Header />
    <AnimatedGridSection />
    <Footer />
  </div>
);

export default App;
