import { Routes, SideNav } from "~/components/NavBar";

export default function Index() {
  return (
    <main className="flex flex-row">
      <SideNav selected={Routes.Index} />

      <div className="py-4 px-10 w-full overflow-scroll h-screen no-scrollbar">
        <p className="text-white">
          Welcome to this basic demo of Remix! There are two demos created here.
          The first is on the dashboard and is an example of nested routes data
          fetching. The next is on the creator page and is an example of a form
          and how to submit it. Settings and profile don't do anything yet.
        </p>
      </div>
    </main>
  );
}
