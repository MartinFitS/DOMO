import React from "react"
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Index from "../pages/Index";
import ImageViewer from "../pages/Images";
import RegistroDomo from "../pages/RegistroDomo";

const AppRoutes =  () => {
    return(
        <Routes>
            <Route path={"/"} element={<Index/>}/>

            <Route path={"/registro"} element={<RegistroDomo/>}/>

            <Route path={"/iniciar-sesion"} element={<Login/>}/>

            <Route path={"/img"} element={<ImageViewer/>}/>
        </Routes>
    )
}

export default AppRoutes;