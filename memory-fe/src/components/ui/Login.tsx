import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../store/Slice";
import { ModernButton } from "./Button";
import { ModernInput } from "./Input";
import { Loader } from "./Loader";

type LoginInputs = {
  username: string;
  password: string;
};

const BrainOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(6)].map((_, i) => (
      <div
        key={i}
        className={`absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `pulse ${3 + Math.random() * 2}s infinite ${i * 0.5}s`,
        }}
      />
    ))}
  </div>
);

export function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      const loginReq = await axios.post(
        "https://memory-quilt-backend.onrender.com/api/v1/signin",
        data,
        {
          withCredentials: true,
        }
      );

      if (!loginReq || loginReq.status !== 200) {
        throw new Error("Invalid response");
      }

      const contentData = await axios.get(
        "https://memory-quilt-backend.onrender.com/api/v1/content",
        {
          withCredentials: true,
        }
      );

      dispatch(login(contentData.data.content));
      setLoading(false);
      navigate("/home");
    } catch (error) {
      setApiError("Failed to login. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader color={"#38bdf8"} size={150} loading={loading} />;
  }

  return (
    <div className="relative flex items-center justify-center w-full h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-gray-900 to-black" />
      <BrainOrbs />

      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-lg shadow-cyan-500/25">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.88-11.71L12 14.17 8.12 8.29c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.02-.38-1.42.01z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Second Brain
          </h1>
          <p className="text-white/60 text-lg font-light">Connect to your knowledge universe</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 shadow-2xl shadow-black/20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl" />
          <div className="relative space-y-6">
            {apiError && (
              <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm">
                <p className="text-red-400 text-center font-light">{apiError}</p>
              </div>
            )}

            <ModernInput
              type="text"
              placeholder="Username"
              name="username"
              value={watch("username") || ""}
              onChange={(e) => setValue("username", e.target.value)}
              error={errors.username?.message}
            />

            <ModernInput
              type="password"
              placeholder="Password"
              name="password"
              value={watch("password") || ""}
              onChange={(e) => setValue("password", e.target.value)}
              error={errors.password?.message}
            />

            <ModernButton
              title="Access Brain"
              onClick={handleSubmit(onSubmit)}
              loading={loading}
            />
          </div>

          <div className="mt-6 text-center">
            <p className="text-white/60 font-light">
              New to the neural network?{" "}
              <button
                type="button"
                onClick={() => navigate("/")}
                className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200 hover:underline"
              >
                Create Brain
              </button>
            </p>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm font-light">Secure • Private • Intelligent</p>
        </div>
      </div>
    </div>
  );
}
