import React from "react";
import "./about.css";
import { Typography } from "@material-ui/core";

const About = () => {
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <div className="heading">
              <p>E-commerce Website</p>
            </div>

            <span>
              <ul>
                <li>It is an E-Commerce Website made using MERN tech stack.</li>
<<<<<<< HEAD

=======
>>>>>>> a219c49a9a93a2013050529638d7c816d8dfbeb2
                <li>
                  It has Login and SignUp options along with authentication.
                </li>
                <li>It has search and filter feature along with pagination.</li>
                <li>It has a payment gateway made using Stripe.</li>
                <li>Redux is used for state management.</li>
              </ul>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
