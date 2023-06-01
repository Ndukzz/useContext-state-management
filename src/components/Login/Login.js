import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context"

const emailReducer = (state, action) => {                                 //Initilaized Reducer func that manages both the email state and its validity
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }
  if (action.type === "INPUT_VALID") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {                              //initialize Reducer func that manages both the password state and its validity
  if (action.type === "PASSWORD_INPUT") {
    return { value: action.val, isValid: action.val.length > 6 };
  }
  if (action.type === "PASSWORD_VALID") {
    return { value: state.val, isValid: state.value.length > 6 };
  }
  return {
    value: "",
    isValid: false,
  };
};

const Login = (props) => {                                                //Main function
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  const AuthCtx = useContext(AuthContext)

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    console.log("Effect running");
  }, []);

  useEffect(()=> {
    const validateTimeout = setTimeout(() => {
      console.log("validating form");                                     //form validationg function
      setFormIsValid(
        passwordIsValid && emailIsValid
      );
    }, 800);

    return () => {
      console.log("CleanUP");                                            //form Cleanup function
      clearTimeout(validateTimeout);
    }
  }, [emailIsValid, passwordIsValid])

  const emailChangeHandler = (event) => {                                   //Func updating email input
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {                                //Func updating password Input
    dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_VALID" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "PASSWORD_VALID" });
  };

  const submitHandler = (event) => {                                        //Func submits email and password for login
    event.preventDefault();
    AuthCtx.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
