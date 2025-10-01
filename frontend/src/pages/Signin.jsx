import Heading from "../components/Heading";
import Subheading from "../components/Subheading";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex justify-center flex-col">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <Subheading
            label={"Enter Your credentials to access your account "}
          />
          <InputBox
            label={"Email"}
            placeholder={"Enter your email"}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <InputBox
            label={"Password"}
            placeholder={" "}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="pt-4">
            <Button
              label={"Sign in "}
              onClick={async (e) => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin"
                );
                useNavigate("/dashboard");
              }}
            />
            <BottomWarning
              label={"Dont have an account ?"}
              to={"/signup"}
              buttontext={"Sign up"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
