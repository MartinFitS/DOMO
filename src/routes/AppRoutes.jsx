import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Index from "../pages/Index";
import ImageViewer from "../pages/Images";
import RegistroDomo from "../pages/RegistroDomo";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";

const AppRoutes =  () => {
    return(
        <Routes>
            <Route path={"/"} element={<Index/>}/>

            <Route path={"/register"} element={<RegistroDomo/>}/>

            <Route path={"/img"} element={<ImageViewer/>}/>

            <Route path={"/login"} element={<Login/>}/>

            <Route path={"/home"} element={<Home/>}/>

            <Route path={"/registro"} element={<RegistroDomo/>}/>

            <Route path={"/iniciar-sesion"} element={<Login/>}/>

            <Route path={"/img"} element={<ImageViewer/>}/>

            <Route path={"/dashboard"} element={<Dashboard/>}/>
        </Routes>
    )
}

export default AppRoutes;