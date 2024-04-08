import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { LOGOUT } from "../../graphql/mutations/user.mutation";
import { Link } from "react-router-dom";

const Home = () => {
  const { data } = useQuery(GET_AUTHENTICATED_USER);
  const [logout, { loading, error, data: logoutData }] = useMutation(LOGOUT, {
    refetchQueries: [GET_AUTHENTICATED_USER],
  });

  const handlLogout = async () => {
    await logout();
  };

  useEffect(() => {
    console.log(logoutData);
  }, [logoutData]);

  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-blue-500 to-emerald-400 flex flex-col space-y-2 items-center justify-center">
      <h2 className="font-semibold text-4xl  ">{data?.authUser.username}</h2>
      <img src={data?.authUser.profilePicture} className="w-40 h-40" />

      <Link
        className="bg-green-500 font-semibold text-white px-3 py-1 rounded-md"
        to={"/todos"}
      >
        My todos
      </Link>
      <button
        onClick={handlLogout}
        className="bg-red-600 font-semibold px-3 py-1 rounded-md text-white"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
