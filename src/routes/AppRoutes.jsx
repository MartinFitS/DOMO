import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Index from "../pages/Index";
import ImageViewer from "../pages/Images";
import RegistroDomo from "../pages/RegistroDomo";
import Dashboard from "../pages/Dashboard";

const AppRoutes =  () => {
    return(
        <Routes>
            <Route path={"/"} element={<Index/>}/>

            <Route path={"/registro"} element={<RegistroDomo/>}/>

            <Route path={"/iniciar-sesion"} element={<Login/>}/>

            <Route path={"/img"} element={<ImageViewer/>}/>

            <Route path={"/dashboard"} element={<Dashboard/>}/>
        </Routes>
    )
}

export default AppRoutes;