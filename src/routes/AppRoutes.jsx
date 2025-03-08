import React from "react"
import { Routes, Route } from "react-router-dom";
import Prueba from "../pages/Prueba";
import Index from "../pages/Index";
import ImageViewer from "../pages/Images";
import RegistroDomo from "../pages/RegistroDomo";
import Login from "../pages/Login";
import Home from "../pages/Home";

const AppRoutes =  () => {
    return(
        <Routes>
            <Route path={"/"} element={<Index/>}/>

            <Route path={"/register"} element={<RegistroDomo/>}/>

            <Route path={"/img"} element={<ImageViewer/>}/>

            <Route path={"/login"} element={<Login/>}/>

            <Route path={"/home"} element={<Home/>}/>

        </Routes>
    )
}

export default AppRoutes;