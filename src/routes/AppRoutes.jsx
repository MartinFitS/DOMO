import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Index from "../pages/Index";
import ImageViewer from "../pages/Images";
import RegistroDomo from "../pages/RegistroDomo";
import Home from "../pages/Home";

const AppRoutes =  () => {
    return(
        <Routes>
            <Route path={"/"} element={<Index/>}/>

            <Route path={"/register"} element={<RegistroDomo/>}/>

            <Route path={"/img"} element={<ImageViewer/>}/>

            <Route path={"/dashboard"} element={<Home/>}/>

            <Route path={"/registro"} element={<RegistroDomo/>}/>

            <Route path={"/iniciar-sesion"} element={<Login/>}/>

        </Routes>
    )
}

export default AppRoutes;