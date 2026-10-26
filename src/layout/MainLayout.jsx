import { Outlet } from "react-router-dom";
import Navbar from "../components/general/Navbar";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <Navbar/>
      <main className="flex flex-1 flex-col w-full">
        <Outlet/>
      </main>
    </div>
  );
}

export default MainLayout;