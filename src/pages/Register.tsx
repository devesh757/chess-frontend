import { useState } from "react"
import api from "../api"
import { Link, useNavigate } from "react-router-dom"
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa"

function RegisterPage() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (!email || !password || !firstname || !lastname) {
            setError("Please fill in all fields");
            return;
        }
        setLoading(true);
        setError("");
        try {
            const res = await api.post(
                "/api/v1/auth/signup",
                { email, password, firstname, lastname }
            );
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", res.data.token);
            navigate("/game");
        } catch (err: unknown) {
            if (err && typeof err === "object" && "response" in err) {
                const axiosErr = err as { response: { data: { message?: string } } };
                setError(axiosErr.response.data?.message || "Registration failed. Please try again");
            } else {
                setError("Registration failed. Please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleRegister();
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="bg-[#2a2a2a] rounded-2xl border border-zinc-700/40 shadow-2xl overflow-hidden">

                    <div className="relative px-8 pt-10 pb-6 text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-green-500 rounded-b-full" />
                        <div className="text-5xl mb-3">♚</div>
                        <h1 className="text-2xl font-bold text-white">Join Chess</h1>
                        <p className="text-zinc-400 text-sm mt-1">Create your free account</p>
                    </div>


                    <div className="px-8 pb-6 space-y-3">
                        <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-zinc-800 font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98]">
                            <FaGoogle className="text-lg" />
                            Continue with Google
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-zinc-800 font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-[0.98]">
                            <FaApple className="text-lg" />
                            Continue with Apple
                        </button>
                    </div>


                    <div className="px-8 pb-6">
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-zinc-700/60" />
                            <span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">or</span>
                            <div className="flex-1 h-px bg-zinc-700/60" />
                        </div>
                    </div>


                    <div className="px-8 pb-8">
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-5 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-red-500 rounded-full flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        <div className="space-y-4" onKeyDown={handleKeyDown}>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter First Name"
                                        value={firstname}
                                        onChange={(e) => {
                                            setFirstname(e.target.value);
                                            setError("");
                                        }}
                                        className="w-full bg-zinc-800/80 border border-zinc-700/60 text-white placeholder-zinc-500 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/15 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Last Name"
                                        value={lastname}
                                        onChange={(e) => {
                                            setLastname(e.target.value);
                                            setError("");
                                        }}
                                        className="w-full bg-zinc-800/80 border border-zinc-700/60 text-white placeholder-zinc-500 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/15 transition-all"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    className="w-full bg-zinc-800/80 border border-zinc-700/60 text-white placeholder-zinc-500 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/15 transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            setError("");
                                        }}
                                        className="w-full bg-zinc-800/80 border border-zinc-700/60 text-white placeholder-zinc-500 px-4 py-3 rounded-xl text-sm focus:outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/15 transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                                    >
                                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                onClick={handleRegister}
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-500 disabled:bg-green-600/60 disabled:cursor-not-allowed text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-600/25 active:scale-[0.98] flex items-center justify-center gap-2"
                            >
                                {loading && (
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                )}
                                {loading ? "Creating account..." : "Create Account"}
                            </button>
                        </div>

                        <p className="text-[11px] text-zinc-500 leading-relaxed mt-4 text-center">
                            By continuing, you agree to Chess{" "}
                            <Link to="/" className="text-green-500 hover:text-green-400 hover:underline">
                                Terms of Use
                            </Link>{" "}
                            and{" "}
                            <Link to="/" className="text-green-500 hover:text-green-400 hover:underline">
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>


                    <div className="px-8 py-5 bg-[#222222] border-t border-zinc-700/30 text-center">
                        <span className="text-zinc-400 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-green-500 hover:text-green-400 font-semibold hover:underline transition-colors">
                                Log in
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;
