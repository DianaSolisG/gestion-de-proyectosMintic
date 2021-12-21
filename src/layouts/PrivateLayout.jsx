import Sidebar from "components/Sidebar";
import { Outlet } from "react-router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "context/authContext";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "graphql/auth/mutations";
import { useNavigate } from "react-router-dom";

const PrivateLayout = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [loadingAuth, setLoadingAuth] = useState(true);

  const [refreshToken, { data: dataMutation, loading: loadingMutation }] =
    useMutation(REFRESH_TOKEN);

  useEffect(() => {
    refreshToken();
  }, [refreshToken]);

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation?.refreshToken?.token) {
        setToken(dataMutation.refreshToken.token);
      } else {
        setToken(null);
        navigate("/auth/login");
      }
      setLoadingAuth(false);
    }
  }, [dataMutation, setToken, setLoadingAuth, navigate]);

  if (loadingMutation || loadingAuth) return <div>Loading.....</div>;

  return (
    <div className="flex flex-col md:flex-row flex-no-wrap h-screen">
      <Sidebar />
      <div className="flex w-full h-full">
        <div className="w-full h-full  overflow-y-scroll">
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PrivateLayout;
