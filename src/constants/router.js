import React, { useContext, useEffect } from "react";
import App from "../App";
import ProjectManager from "../pages/ProjectManager";
import UserManager from "../pages/UserManager";
import CreateProject from "../pages/ProjectManager/Create";
import DetailProject from "../pages/ProjectManager/Detail";
import CreateUser from "../pages/UserManager/Create";
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";
import { Outlet, Navigate, Route, Routes }  from 'react-router-dom';
import Issues from "../pages/Issues";
import Releases from "../pages/Releases/index.tsx";
import Pages from "../pages/Pages";
import Reports from "../pages/Reports";
import Calander from "../pages/Calander";


export default function Router () {
    const { curentUser } = useContext(AuthContext);
    const ProtectedRoute = ({ user, redirectPath = "/login" }) => {
        if (!user) {
            return <Navigate to={redirectPath} replace />;
        }
        return <Outlet />;
    };
    useEffect(() => {
        if(curentUser) {
            <Navigate to='/' replace />
        }
    },[curentUser])

    return (
        <>
        <Routes>
            <Route element={<ProtectedRoute user={curentUser} />}>
              <Route exact path="/" element={<App />}>
                <Route path="projectmanagement" element={<ProjectManager />} />
                <Route path="/" element={<ProjectManager />} />
                <Route path="createproject" element={<CreateProject />} />
                <Route path="projectdetail/:id" element={<DetailProject />} />
                <Route path="usermanagement" element={<UserManager />} />
                <Route path="createuser" element={<CreateUser />} />
                <Route path="releases" element={<Releases />} />
                <Route path="issues" element={<Issues />} />
                <Route path="pages" element={<Pages />} />
                <Route path="reports" element={<Reports />} />
                <Route path="calander" element={<Calander />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
        </>
    );
};