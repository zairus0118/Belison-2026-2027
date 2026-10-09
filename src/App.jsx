import { Outlet, useNavigate } from "react-router";

export default function App() {
  const nav = useNavigate();

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      <header className="bg-slate-800 flex justify-between items-center px-6 py-4 border-b border-slate-700">
        <h1 className="text-xl font-bold">My Portfolio</h1>

        <nav className="flex gap-3">
          <button className="px-3 py-1 rounded hover:bg-slate-700" onClick={() => nav("/")}>About Me</button>
          <button className="px-3 py-1 rounded hover:bg-slate-700" onClick={() => nav("/hobby/1")}>Online Games</button>
          <button className="px-3 py-1 rounded hover:bg-slate-700" onClick={() => nav("/hobby/2")}>Jogging</button>
          <button className="px-3 py-1 rounded hover:bg-slate-700" onClick={() => nav("/hobby/3")}>Basketball</button>
        </nav>
      </header>

      <Outlet />
    </main>
  );
}