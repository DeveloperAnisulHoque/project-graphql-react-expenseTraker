import React from "react";
import toast from "react-hot-toast";
import { LOGIN } from "../../graphql/mutations/user.mutation";
import { useMutation } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";

const Login = () => {
  const [login, { loading, error }] = useMutation(LOGIN, {
    refetchQueries: [GET_AUTHENTICATED_USER],
  });
  const handleSignin = async () => {
    try {
      await login({
        variables: {
          input: {
            username: "big",
            password: "1234s",
          },
        },
      });
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div>
      Login
      <button
        className="bg-blue-400 text-white w-fit block m-5"
        onClick={handleSignin}
      >
        {" "}
        Loign
      </button>
    </div>
  );
};

export default Login;
