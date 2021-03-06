import React, { useState, useEffect } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "context/userContext";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import Index from "./pages/Index";
import IndexUsuarios from "./pages/usuarios/index";
import EditarUsuario from "./pages/usuarios/editar";
import "styles/globals.css";
import "styles/tabla.css";
import AuthLayout from "layouts/AuthLayouts";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import { AuthContext } from "context/authContext";
import { setContext } from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";
import IndexProyectos from "./pages/proyectos/Index";
import NuevoProyecto from "./pages/proyectos/NuevoProyecto";
import IndexInscripciones from "./pages/inscripciones/Index";
import Profile from "./pages/profile";
import IndexAvance from "./pages/avances/Index";

// import PrivateRoute from 'components/PrivateRoute';

const httpLink = createHttpLink({
  uri: "https://back-diana-mintic-gh.herokuapp.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    console.log("set token", token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };
  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.corro,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="" element={<Index />} />
                <Route path="/usuarios" element={<IndexUsuarios />} />
                <Route
                  path="/usuarios/editar/:_id"
                  element={<EditarUsuario />}
                />
                <Route path="/proyectos" element={<IndexProyectos />} />
                <Route path="/proyectos/nuevo" element={<NuevoProyecto />} />
                <Route path="/inscripciones" element={<IndexInscripciones />} />
                <Route path="/avances/:projectid" element={<IndexAvance />} />
                <Route path="/perfil" element={<Profile />} />
              </Route>
              <Routes path="/auth" element={<AuthLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Routes>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
