export default function Dashboard() {
  return (
    <div className="flex flex-col items-center text-center max-w-2xl mx-auto p-8 gap-4">
      <img
        src="/me.png"
        alt="me"
        className="w-48 h-48 rounded-full object-cover border-4 border-slate-700"
      />
      <h2 className="text-3xl font-bold">Hi!</h2>
      <p className="italic text-slate-400">"Be better than you were yesterday"</p>
      <p className="text-slate-300">
        I'm Zairus Mhon A. Belison 18 years old, an Information Technology student at MFI Polytechnic
        Institute Inc. In my free time I enjoy playing online
        games, jogging, and playing basketball.
      </p>
    </div>
  );
}