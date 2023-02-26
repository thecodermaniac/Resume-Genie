import React from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";

const Home = ({ darkMode, setDarkMode }) => {
  return (
    <>
      <Hero darkMode={darkMode} setDarkMode={setDarkMode} />
      <Card darkMode={darkMode} setDarkMode={setDarkMode} />
    </>
  );
};

export default Home;
