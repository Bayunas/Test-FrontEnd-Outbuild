import React, { useState, useContext } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useNavigate } from "react-router";
import BorderBeam from "../component/borderBeam.js";
import SlightFlip from "../component/slightFlip.js";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Context } from "../store/appContext.js";
import { AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const initialState = {
  email: "",
  password: "",
};

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { store, actions } = useContext(Context);
  const [user, setUser] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await actions.login(user);
      if (response) {
        navigate("/dashboard");
      } else {
        Swal.fire({
          icon: "error",
          title: "Wrong credentials",
          text: "Please check your credentials",
        });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const springs = useSpring({
    from: { x: -1000 },
    to: { x: 0 },
  });

  const gradientBackground = `linear-gradient(45deg, #0bd1ff 50%, #ffd34e 50%)`;

  return (
    <AnimatePresence mode="wait">
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage: gradientBackground,
        }}
      >
        <animated.div
          className="flex items-center h-2/4 w-72 sm:w-8/12 md:w-6/12 lg:w-2/5 bg-green-400 flex-col rounded-lg flex-nowrap"
          style={{
            borderRadius: 8,
            ...springs,
          }}
        >
          <div className="flex items-start justify-center pt-3 font-bold lg:text-2xl md:text-xl sm:text-sm text-sm">
            <SlightFlip word="ProLogin" />
          </div>
          <div className="flex items-center w-3/4 h-3/4 mt-3 relative">
            <BorderBeam />
            <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  className="bg-gray-50 border border-gray-300 rounded-lg dark:bg-white focus: w-full p-2.5"
                  placeholder="name@flowbite.com"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-5 relative">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Your password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  className="bg-gray-50 border border-gray-300 rounded-lg dark:bg-white focus: w-full p-2.5"
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 mt-4"
                >
                  {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                </button>
              </div>
              <button
                type="submit"
                className="bg-gray-50 rounded-lg dark:bg-white focus:outline-none w-full p-2 transition-colors duration-300 ease-in-out hover:bg-blue-400 hover:border-blue-400 hover:border-none"
              >
                Login
              </button>
            </form>
          </div>
        </animated.div>
      </div>
    </AnimatePresence>
  );
};
