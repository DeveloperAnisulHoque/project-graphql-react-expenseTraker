import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
import { LOGOUT } from "../../graphql/mutations/user.mutation";

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
    <div>
      <h2 className="font-semibold text-4xl my-5">Profile page</h2>
      <img src={data?.authUser.profilePicture} className="w-40 h-40" />

      <button onClick={handlLogout} className="bg-red-500 text-white">
        Logout
      </button>
    </div>
  );
};

export default Home;
