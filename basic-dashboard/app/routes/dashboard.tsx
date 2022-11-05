import { Outlet } from "@remix-run/react";
import { Routes, SideNav } from "~/components/NavBar";

const Dashboard: React.FC = () => {
  return (
    <main className="flex flex-row">
      <SideNav selected={Routes.Dashboard} />
      <div className="py-4 px-10 w-full overflow-scroll h-screen no-scrollbar">
        <h1 className="text-white text-5xl font-bold mb-6">Dashboard</h1>
        <Outlet />
      </div>
    </main>
  );
};

export default Dashboard;
