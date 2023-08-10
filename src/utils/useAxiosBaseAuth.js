import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import MockAdapter from "axios-mock-adapter";

// Incorpora la url base para las llamadas de axios
// Incorpora el bearer access token en la peticion
// Valida si la sesion ha expirado
// Valida si el access token esta cargado en el estado de redux sino intenta cargarlo desde el storage
// Sino esta en el storage redirige al logout

const useAxiosWithAuth = () => {
  const auth = useSelector((state) => state.auth.response.data); // Update this selector according to your actual Redux state structure

  const axiosBase = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
  });

  useEffect(() => {
    if (auth && auth.access) {
      axiosBase.defaults.headers.common["Authorization"] =
        "Bearer " + auth.access;
    }
  }, [auth]);

  return axiosBase;
};

export default useAxiosWithAuth;


/*
Usage:

javascript


import React from "react";
import useAxiosWithAuth from "./useAxiosWithAuth";

const MyComponent = () => {
  const axiosInstance = useAxiosWithAuth();

  // Now you can use the axiosInstance for your API calls with authorization
  // For example:
  axiosInstance.get("/some-endpoint")
    .then((response) => {
      // Handle the response
    })
    .catch((error) => {
      // Handle the error
    });

  return (
    // Your component JSX
  );
};

export default MyComponent;
*/
// In this custom hook, we've encapsulated the logic of setting the authorization 
//  token in the axios instance based on the Redux state. The hook listens to 
//  changes in the auth object from the Redux state and updates the axios headers
//  accordingly. This way, the axios instance will always have the correct 
//  authorization header when making API calls.

// Remember to adjust the useSelector function to match your actual Redux state
//  structure and path to the authorization token. Also, make sure to provide 
//  the Redux store and necessary setup for useSelector to work properly in
//  your application.
