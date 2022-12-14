import { Outlet } from "@remix-run/react";
import { Routes, SideNav } from "~/components/NavBar";

const Settings: React.FC = () => {
  return (
    <main className="flex flex-row">
      <SideNav selected={Routes.Settings} />
      <div className="py-4 px-10 w-full overflow-scroll h-screen no-scrollbar">
        <p className="text-white">settings page</p>
      </div>
    </main>
  );
};

export default Settings;
