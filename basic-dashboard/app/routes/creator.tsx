import { Outlet } from "@remix-run/react";
import { Routes, SideNav } from "~/components/NavBar";

const Creator: React.FC = () => {
  return (
    <main className="flex flex-row">
      <SideNav selected={Routes.Creator} />
      <Outlet />
    </main>
  );
};

export default Creator;
