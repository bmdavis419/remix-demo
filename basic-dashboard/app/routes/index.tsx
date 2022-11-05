import { Routes, SideNav } from "~/components/NavBar";

export default function Index() {
  return (
    <main className="flex flex-row">
      <SideNav selected={Routes.Index} />

      <div className="py-4 px-10 w-full overflow-scroll h-screen no-scrollbar">
        <p className="text-white">
          Welcome to this basic demo of Remix! The only page that does anything
          is dashboard, it is supposed to illustrate the nested routing
          concepts.
        </p>
      </div>
    </main>
  );
}
