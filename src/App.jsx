import React from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  sessionStorage.setItem("userid", "guest");
  //console.log('environment is: ', process.env.NODE_ENV)
  return (
    <>
      <Header title="Star Wars Movies" />
      <Main />
      <Footer />
    </>
  );
}

export default App;
