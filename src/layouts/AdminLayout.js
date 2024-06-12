import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;