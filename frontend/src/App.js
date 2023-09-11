import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader"; //for fonts
import React from "react";
import Footer from "./components/layout/Footer/Footer.js";
function App() {
  React.useEffect(() => {
    //load fonts from google
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
}

export default App;
