import { type ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { FaChessKnight, FaRobot, FaUserFriends, FaBolt, FaTrophy, FaGraduationCap } from "react-icons/fa"

function requireAuth(navigate: ReturnType<typeof useNavigate>) {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return false;
  }
  return true;
}

const playersOnline = 37421

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 bg-zinc-800/50 rounded-xl px-5 py-4 border border-zinc-700/30">
      <div className="text-green-500 text-xl">{icon}</div>
      <div>
        <div className="text-white font-bold text-lg">{value}</div>
        <div className="text-zinc-400 text-xs">{label}</div>
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  buttonText,
  buttonAction,
  imageSrc,
  reversed,
}: {
  title: string
  description: string
  buttonText: string
  buttonAction: () => void
  imageSrc: string
  reversed?: boolean
}) {
  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
      <div className="flex-1 w-full">
        <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-zinc-700/30">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      <div className="flex-1 w-full space-y-5">
        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">{title}</h2>
        <p className="text-zinc-400 text-base md:text-lg leading-relaxed">{description}</p>
        <button
          onClick={buttonAction}
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 px-7 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98]"
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

const handlePlayOnline = (navigate: ReturnType<typeof useNavigate>) => {
  if (!requireAuth(navigate)) return;
  navigate("/game");
};

const handlePlayBot = (navigate: ReturnType<typeof useNavigate>) => {
  if (!requireAuth(navigate)) return;
  navigate("/game");
};

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-zinc-900">
      
      <section className="px-4 md:px-8 pt-6 md:pt-10 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-6 md:gap-8">
    
          <div className="flex-1">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-800 shadow-2xl shadow-black/50 border border-zinc-700/30 group">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://images.chesscomfiles.com/chess-assets/backgrounds/chess-background.png"
              >
                <source
                  src="https://assets-configurator.chess.com/video/configurator/hero_1780586045036.webm"
                  type="video/webm"
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/80 text-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live now — 1,234 watching
              </div>
            </div>
          </div>

          
          <div className="w-full lg:w-[380px] xl:w-[420px] flex flex-col justify-center gap-4">
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl xl:text-5xl font-black text-white leading-[1.1]">
                Play Chess
                <span className="text-green-500"> Online</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-lg">
                Join 250+ million players from around the world. Your next match is seconds away.
              </p>
            </div>

        
            <div className="bg-zinc-800/60 rounded-xl p-5 border border-zinc-700/30 space-y-4">
              <button
                onClick={() => handlePlayOnline(navigate)}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all duration-200 hover:shadow-lg hover:shadow-green-600/30 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                <FaChessKnight className="text-xl" />
                Play Online
              </button>
              <div className="flex items-center justify-center gap-4 text-sm text-zinc-400">
                <span className="flex items-center gap-1.5">
                  <FaUserFriends className="text-green-500" />
                  <span className="text-zinc-300 font-semibold">{playersOnline.toLocaleString()}</span> players
                </span>
                <span className="flex items-center gap-1.5">
                  <FaBolt className="text-yellow-500" />
                  <span className="text-zinc-300 font-semibold">2s</span> avg wait
                </span>
              </div>
            </div>

    
            <button
              onClick={() => handlePlayBot(navigate)}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 border border-zinc-700/50 active:scale-[0.98] flex items-center justify-center gap-3"
            >
              <FaRobot className="text-lg text-zinc-400" />
              Play a Bot
            </button>
          </div>
        </div>
      </section>

      
      <section className="px-4 md:px-8 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatCard icon={<FaUserFriends />} label="Daily Active Players" value="3.2M" />
          <StatCard icon={<FaTrophy />} label="Games Played Today" value="8.7M" />
          <StatCard icon={<FaGraduationCap />} label="Lessons Completed" value="142K" />
          <StatCard icon={<FaBolt />} label="Puzzles Solved" value="2.1M" />
        </div>
      </section>

      
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <FeatureCard
            title="Improve Your Game with Lessons"
            description="Quick, fun, interactive lessons designed by grandmasters. Whether you're a beginner or a seasoned pro, level up your skills with structured training tailored to your rating."
            buttonText="Explore Lessons"
            buttonAction={() => navigate("/game")}
            imageSrc="https://assets-configurator.chess.com/image/configurator/lessons_optimized_1779894072912.webp"
          />
        </div>
      </section>

      
      <section className="px-4 md:px-8 pb-16 md:pb-24 bg-zinc-900/50">
        <div className="max-w-7xl mx-auto">
          <FeatureCard
            title="Train with Puzzles"
            description="Sharpen your tactical vision with millions of hand-picked puzzles. Each puzzle targets a specific pattern so you can recognize winning moves faster in real games."
            buttonText="Start Puzzles"
            buttonAction={() => navigate("/game")}
            imageSrc="https://images.chesscomfiles.com/chess-assets/backgrounds/puzzles-bg.jpg"
            reversed
          />
        </div>
      </section>

      
      <section className="px-4 md:px-8 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto">
          <FeatureCard
            title="Play Computer Personalities"
            description="Face off against unique chess personalities ranging from beginner-friendly bots to ruthless grandmaster-level AIs. Each bot has its own playstyle — adapt or get checkmated."
            buttonText="Challenge a Bot"
            buttonAction={() => navigate("/game")}
            imageSrc="https://assets-configurator.chess.com/image/configurator/bots_1765899028922.webp"
          />
        </div>
      </section>

      
      <footer className="border-t border-zinc-800 px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">♚</span>
            <span className="font-black text-white text-lg">Chess</span>
          </div>
          <p className="text-zinc-500 text-xs">
            &copy; {new Date().getFullYear()} Chess Clone. Not affiliated with Chess.com.
          </p>
          <div className="flex items-center gap-6 text-zinc-500 text-xs">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Contact</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
