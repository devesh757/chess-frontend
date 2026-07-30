import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaChessKnight, FaPuzzlePiece, FaBook, FaPlay, FaNewspaper, FaHome, FaUser, FaSignInAlt } from 'react-icons/fa';

const navItems = [
  { label: 'Home', icon: FaHome, path: '/' },
  { label: 'Play', icon: FaChessKnight, path: '/game' },
  { label: 'Puzzles', icon: FaPuzzlePiece, path: '/puzzles' },
  { label: 'Learn', icon: FaBook, path: '/learn' },
  { label: 'Watch', icon: FaPlay, path: '/watch' },
  { label: 'News', icon: FaNewspaper, path: '/news' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handlePlayClick = (e: React.MouseEvent) => {
    const token = localStorage.getItem("token");
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <>

      <aside className="fixed left-0 top-0 h-full w-64 bg-[#272522] z-40 hidden lg:flex flex-col border-r border-zinc-700/30">

        <div className="px-6 pt-6 pb-5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="text-3xl leading-none">♚</span>
            <span className="text-2xl font-black text-white tracking-tight">
              Chess
            </span>
          </Link>
        </div>


        <nav className="flex-1 px-3 py-2 space-y-0.5">
          {navItems.map((item) => {
            const isPlay = item.path === "/game";
            return (
              <Link
                key={item.path}
                to={isPlay ? "#" : item.path}
                onClick={isPlay ? handlePlayClick : undefined}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 group ${
                  isActive(item.path)
                    ? 'bg-green-600/15 text-green-400'
                    : 'text-zinc-400 hover:bg-zinc-800/60 hover:text-zinc-200'
                }`}
              >
                <item.icon className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                  isActive(item.path) ? 'text-green-400' : 'text-zinc-500'
                }`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>


        <div className="px-4 py-3 border-t border-zinc-700/30 space-y-2">
          <Link
            to="/register"
            className="flex items-center justify-center w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98]"
          >
            <FaUser className="mr-2 text-sm" />
            Sign Up for Free
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 border border-zinc-700/50 active:scale-[0.98]"
          >
            <FaSignInAlt className="mr-2 text-sm" />
            Log In
          </Link>
        </div>


        <div className="px-4 py-3 border-t border-zinc-700/30">
          <button
            onClick={handlePlayClick}
            className="flex items-center justify-center w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98] cursor-pointer"
          >
            Play Chess
          </button>
        </div>
      </aside>


      <nav className="fixed bottom-0 left-0 right-0 bg-[#272522] border-t border-zinc-700/30 z-40 lg:hidden">
        <div className="flex justify-around items-center py-2 px-2 max-w-lg mx-auto">
          {navItems.slice(0, 5).map((item) => {
            const isPlay = item.path === "/game";
            return (
              <Link
                key={item.path}
                to={isPlay ? "#" : item.path}
                onClick={isPlay ? handlePlayClick : undefined}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors min-w-0 ${
                  isActive(item.path)
                    ? 'text-green-400'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <item.icon className="text-lg" />
                <span className="text-[10px] font-medium leading-tight">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
