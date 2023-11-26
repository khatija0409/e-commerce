// has both login and sign up forms which can be toggled
import React, { Fragment, useRef, useState,useEffect } from "react";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login,register} from "../../actions/userAction";
import {useAlert} from "react-alert";

const LoginSignUp = ({history,location}) => {
    const dispatch=useDispatch();
    const alert=useAlert();
    const { error, loading, isAuthenticated } = useSelector(
        (state) => state.user
      );


  // useref is used to access dom elemets insteaad of doc.getelbyid
  // address all ref here
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    // excecuting login func
    dispatch(login(loginEmail,loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    // adding data to the above objbefore sending it

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
        // to add picture read file file of thse pic
      const reader = new FileReader();
// after file is loaded
      reader.onload = () => {
        // it has 3 states 0>initial,2>processing,3>done
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
// reads contetn of file
      reader.readAsDataURL(e.target.files[0]);
    } else {
        // find name field field in user and replace
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  // split when = is encountered
  // splits accoridin to array index at 1 it is shipping
  // redirect becomes /shipping
  const redirect=location.search?location.search.split("=")[1]:"/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // when we log in successfully we dont want to still see t elogin page so it goes to accpunt page( if log in is clciked when user si already logged in)
    if(isAuthenticated){
        // history helps in changing the path 
        history.push(redirect);
    }
  }, [dispatch, error, alert,history,isAuthenticated,redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      // when login tab is clciked
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
     <Fragment>
{loading?<Loader/>:<Fragment>
      <div className="LoginSignUpContainer">
        <div className="LoginSignUpBox">
          <div>
            <div className="login_signUp_toggle">
              <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
              <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
            </div>
            {/* using useref to access dom elements */}
            {/* line below login and register is the button */}
            <button ref={switcherTab}></button>
          </div>

          <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
            <div className="loginEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="loginPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <Link to="/password/forgot">Forgot Password ?</Link>

            <input type="submit" value="Login" className="loginBtn" />
          </form>
          {/* form for signup or register */}
          <form
            className="signUpForm"
            ref={registerTab}
            encType="multipart/form-data"
            onSubmit={registerSubmit}
          >
            <div className="signUpName">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                required
                name="name"
                value={name}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpEmail">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                required
                name="email"
                value={email}
                onChange={registerDataChange}
              />
            </div>
            <div className="signUpPassword">
              <LockOpenIcon />
              <input
                type="password"
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={registerDataChange}
              />
            </div>

            <div id="registerImage">
              <img src={avatarPreview} alt="Avatar Preview" />
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={registerDataChange}
              />
            </div>
            <input type="submit" value="Register" className="signUpBtn" />
          </form>
        </div>
      </div>
    </Fragment>
}

     </Fragment>
  );
};

export default LoginSignUp;
