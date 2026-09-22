import Navbar from "../components/general/Navbar";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
      <Navbar/>
      <main className="flex flex-col max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;