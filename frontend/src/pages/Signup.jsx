import { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  return (
    <div className="bg-red-800">
      <div>
        <div className="bg-red-900">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            label={"First Name"}
            onChange={(e) => {
              console.log("hello");
            }}
          />
          <InputBox
            label={"Last Name"}
            onChange={(e) => {
              console.log("hello");
            }}
          />
          <InputBox
            label={"Email"}
            onChange={(e) => {
              console.log("hello");
            }}
          />
          <InputBox
            label={"Password"}
            onChange={(e) => {
              console.log("hello");
            }}
          />

          <div>
            <Button label={"Sign up"} />
            <BottomWarning
              label={"Already have an account?"}
              buttonext={"Sign in"}
              to={"/signin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
