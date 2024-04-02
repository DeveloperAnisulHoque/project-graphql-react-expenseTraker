import { useMutation } from "@apollo/client";
import React from "react";
import { SIGN_UP } from "../../graphql/mutations/user.mutation";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";

const Register = () => {
  const [signUp, { loading, error }] = useMutation(SIGN_UP, {
    refetchQueries: [GET_AUTHENTICATED_USER],
  });
  const handleSignup = async () => {
    try {
      await signUp({
        variables: {
          input: {
            username: "bigs",
            password: "1234s",
            name: "Md. Anisul hoques",
            gender: "male",
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
      Register
      <button
        className="bg-blue-500 w-fit block my-5 p-2 rounded-md"
        onClick={handleSignup}
      >
        {loading ? ". . . " : "Register"}
      </button>
    </div>
  );
};

export default Register;
