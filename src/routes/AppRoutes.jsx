import React from "react"
import { Routes, Route } from "react-router-dom";
import Prueba from "../pages/Prueba";
import Index from "../pages/Index";
import RegistroDomo from "../pages/RegistroDomo";

const AppRoutes =  () => {
    return(
        <Routes>
            <Route path={"/"} element={<Index/>}/>

            <Route path={"/test"} element={<RegistroDomo/>}/>
        </Routes>
    )
}

export default AppRoutes;