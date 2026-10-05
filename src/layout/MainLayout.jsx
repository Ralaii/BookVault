import Navbar from "../components/general/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-white">
      <Navbar/>
      <main className="flex flex-col w-full">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;