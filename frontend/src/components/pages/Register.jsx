import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SIGN_UP } from "../../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate(null);
  const [input, setInput] = useState({
    username: "",
    password: "",
    name: "",
    gender: "",
  });
  const [signUp, { loading, error, data }] = useMutation(SIGN_UP, {
    refetchQueries: [GET_AUTHENTICATED_USER],
  });
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await signUp({
        variables: {
          input,
        },
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const inputHandle = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (data?.signUp) {
      toast.success("Register successfull");
      navigate("/login");
    }
  }, [data, navigate]);

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-blue-500 to-emerald-400 flex items-center justify-center">
      <div className=" w-11/12 sm:w-9/12 md:w-7/12 lg:w-4/12 px-5 py-8 bg-white rounded-md">
        <p className="text-2xl font-bold text-gray-800 ">Login your account</p>
        <p className="text-xs font-semibold text-gray-500  mt-2">
          ( Todo app )
        </p>

        <form onSubmit={handleSignup}>
          {/* <-----------Single field-----------> */}
          <div className="py-2 space-y-1">
            <label htmlFor="name" className="block text-gray-600 font-semibold">
              Name
            </label>
            <input
              type="text"
              value={input.name}
              onChange={inputHandle}
              name="name"
              id="name"
              placeholder="Type your name"
              required
              className="border outline-none focus:bg-blue-50  border-x-2  focus:border-x-blue-500     ease-linear  duration-200 rounded-md w-full p-2 text-gray-700"
            />
          </div>
          {/* <-----------Single field-----------> */}
          <div className="py-2 space-y-1">
            <label
              htmlFor="username"
              className="block text-gray-600 font-semibold"
            >
              Username
            </label>
            <input
              type="text"
              value={input.username}
              onChange={inputHandle}
              name="username"
              id="username"
              placeholder="Type your username"
              required
              className="border outline-none focus:bg-blue-50  border-x-2  focus:border-x-blue-500     ease-linear  duration-200 rounded-md w-full p-2 text-gray-700"
            />
          </div>
          {/* <-----------Single field-----------> */}
          <div className="py-2 space-y-1">
            <label
              htmlFor="password"
              className="block text-gray-600 font-semibold"
            >
              Password
            </label>
            <input
              type="password"
              value={input.password}
              onChange={inputHandle}
              name="password"
              id="password"
              placeholder="Type your passowd"
              required
              className="border outline-none focus:bg-blue-50  border-x-2  focus:border-x-blue-500     ease-linear  duration-200 rounded-md w-full p-2 text-gray-700"
            />
          </div>
          {/* <-----------Single field-----------> */}
          <div className="py-2 space-y-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="gender"
                value="male"
                checked={input.gender === "male"}
                onChange={inputHandle}
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                className="form-radio"
                name="gender"
                value="female"
                checked={input.gender === "female"}
                onChange={inputHandle}
              />
              <span className="ml-2">Female</span>
            </label>
          </div>

          {/* <-----------------sign up button --------------> */}
          <button
            type="submit"
            className="text-white bg-gradient-to-bl from-blue-400 via-blue-500 to-emerald-400 p-2 font-semibold w-full rounded-md"
          >
            Sign In
          </button>
          <Link className="font-semibold text-blue-400 my-2 block" to="/login">
            Have an account ?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
