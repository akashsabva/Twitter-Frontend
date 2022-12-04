import React, { useState } from "react";
import axios from "axios";
import LoginLogo from "../../assets/logo-login.png";
import Joi from "joi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import googleLogo from "../../assets/svg/google.svg";
import appleLogo from "../../assets/svg/apple.svg";
import { TextField } from "@mui/material";
import styled from "styled-components";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = Joi.extend(joiPasswordExtendCore);

const LoginDiv = styled.div`
  .MuiTextField-root {
    margin-bottom: 15px;
  }

  .loginForm {
    box-shadow: 0px 0px 5px 1px grey;
  }

  .loginBox {
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    box-shadow: 0px 0px 5px 1px grey;
  }
`;

const baseURL = "http://127.0.0.1:3001/api/auth";

export default function Login() {
  const [customer, setCustomer] = React.useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const loginSchema = Joi.object({
    email: Joi.string().required().min(5).max(255),
    password: joiPassword
      .string()
      .required()
      .min(8)
      .max(1024)
      .minOfSpecialCharacters(1)
      .minOfLowercase(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces(),
  });

  const validate = () => {
    const { error } = loginSchema.validate(customer);
    if (!error) return null;
    return true;
  };

  const validateProperty = (event) => {
    const { name, value } = event.target;
    const obj = { [name]: value };
    //const subSchema = { [name]: loginSchema[name] };
    const result = loginSchema.extract(name).validate(value);
    const { error } = result;
    var custom_err_msg =
      error && error.details[0].message.replace('"value"', name);
    return error ? custom_err_msg : null;
  };

  const onFieldChange = (event) => {
    const { name, value } = event.target;
    let errorData = { ...errors };
    let userData = { ...customer };
    const errorMessage = validateProperty(event);
    if (errorMessage) {
      errorData[name] = errorMessage;
    } else {
      delete errorData[name];
    }
    userData[name] = value;
    setCustomer(userData);
    setErrors(errorData);

    // const { name, value } = event.target;
    // setCustomer({ ...customer, [name]: value });
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const result = loginSchema.validate(customer, { abortEarly: false });
    const { error } = result;
    if (!error) {
      const loader = toast.loading("Waiting...");
      try {
        const { data } = await axios.post(baseURL, customer);
        localStorage.setItem("token", data.message);
        toast.dismiss(loader);
        toast.success("Successfully Login!");
        setTimeout(() => navigate("/"), 1000);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.dismiss(loader);
          toast.error(err.response.data.message);
        }
      }
    } else {
      toast.error("Email or password wrong !");
      const errorData = {};
      console.log(error.details);
      for (let item of error.details) {
        const name = item.path[0];
        const message = item.message;
        errorData[name] = message;
      }
      setErrors(errorData);
      return errorData;
    }
  };

  return (
    <React.Fragment>
      {/* <pre>{JSON.stringify(customer, undefined, 2)}</pre> */}
      <LoginDiv>
        <div className="loginBox min-w-[600px] max-w-[80vh] min-h-[400px] max-h-[90vh] h-[650px] rounded-[16px] fixed top-[50%] left-[50%] ">
          <div className="header flex justify-center px-4 h-[53px]">
            <span className="flex items-center">
              <img
                src={LoginLogo}
                alt="twitter"
                className="w-[31px] h-[25px]"
              />
            </span>
          </div>
          <div className="main-part relative">
            <form
              action=""
              className="flex flex-col min-w-[364px] max-w-[364px] px-[32px] pb-12 m-auto "
            >
              <div className="my-5 font-bold text-[#0d1419] text-[31px]">
                Sign in to Twitter
              </div>
              {/* <button className="my-3 px-4 py-[6px] bg-transparent text-[#0d1419] text-[15px] font-medium rounded-[20px] border-[#CFD9DE] border border-solid">
                <span className="flex items-center justify-center gap-2">
                  <img src={googleLogo} alt="google" className="w-[18px]" />
                  Sign in with Google
                </span>
              </button>
              <button className="my-3 px-4 py-[6px] bg-transparent text-[#0d1419] text-[15px] font-bold rounded-[20px] border-[#CFD9DE] border border-solid">
                <span className="flex items-center justify-center gap-2">
                  <img src={appleLogo} alt="apple" className="w-5" />
                  Sign in with Apple
                </span>
              </button> */}
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                margin="dense"
                name="email"
                value={customer.email}
                className="border border-red-500 rounded-sm"
                onChange={(e) => onFieldChange(e)}
              />
              {errors.email && (
                <div className="py-2 pl-3 mt-[-16px] text-sm text-red-700 ">
                  {errors.email}
                </div>
              )}
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                size="small"
                margin="dense"
                name="password"
                value={customer.password}
                onChange={(e) => onFieldChange(e)}
              />
              {errors.password && (
                <div className="py-2 pl-3 mt-[-16px] text-sm text-red-700 ">
                  {errors.password}
                </div>
              )}
              <button
                className={`my-3 px-4 py-[6px] bg-[#0d1419] text-white text-[15px] font-bold rounded-[20px] border-[#0d1419] border-0 border-solid ${
                  validate() && "opacity-50"
                }`}
                disabled={validate()}
                onClick={(e) => onLogin(e)}
              >
                Next
              </button>
              <button className="my-3 px-4 py-[6px] bg-transparent text-[#0d1419] text-[15px] font-bold rounded-[20px] border-[#CFD9DE] border border-solid">
                Forgot Password?
              </button>
              <div className="mt-3">
                Don't have an account?{" "}
                <a href="" className="text-[#1D9BF0] hover:underline">
                  Sign up
                </a>
              </div>
            </form>
          </div>
          <Toaster />
        </div>
      </LoginDiv>
    </React.Fragment>
  );
}
