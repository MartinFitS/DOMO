import React from "react"
import { Routes, Route } from "react-router-dom";
import Prueba from "../pages/Prueba";
import Index from "../pages/Index";

const AppRoutes =  () => {
    return(
        <Routes>
            <Route path={"/"} element={<Index/>}/>
            <Route path={"/test"} element={<Prueba/>}/>
        </Routes>
    )
}

export default AppRoutes;