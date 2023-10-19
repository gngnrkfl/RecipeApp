import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import './bootstrap.css';
import Login from "./Login";
import SignUp from "./SignUp";
import Logout from "./Logout";
import Ingredient from "./Ingredient";
import EditUser from "./EditUser";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/edituser" element={<EditUser/>}/>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/ingredient" element={<Ingredient />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default AppRouter;