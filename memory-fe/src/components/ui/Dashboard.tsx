import { Twitter } from "../../icons/Twitter"
import { Youtube } from "../../icons/Youtube"
import { Button } from "./Button"
import { HomeIcon } from "../../icons/Home"
import { useNavigate } from "react-router-dom"
import { Logout } from "../../icons/Logout"
import { useDispatch } from "react-redux"
import { logout } from "../../store/Slice"
import axios from "axios"
import { useRef, useState } from "react"
import { Loader } from "./Loader"

interface DashboardInterface {
  logo: string;
}

const navigationItems = [
  {
    icon: <HomeIcon size="md" />,
    title: "Home",
    path: "/home",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <Twitter width="20" height="20" />,
    title: "Tweets",
    path: "/tweets",
    gradient: "from-blue-400 to-blue-600",
  },
  {
    icon: <Youtube size="md" />,
    title: "Videos",
    path: "/videos",
    gradient: "from-red-500 to-red-600",
  },
];

export const Dashboard = (props: DashboardInterface) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const activeItem = useRef('Home')

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post('https://memory-quilt-backend.onrender.com/api/v1/logout', {}, {
        withCredentials: true
      });
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigation = (item: typeof navigationItems[0]) => {
    console.log(item)
    activeItem.current = item.title
        console.log(activeItem.current)
    navigate(item.path);
  };

  // useEffect(() => {
  //   console.log(activeItem)
  // }, [setActiveItem])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gradient-to-br from-slate-900 to-slate-800">
        <Loader color="#8b5cf6" size={100} loading={loading} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/10 via-transparent to-indigo-900/10" />
      <div className="absolute top-1/4 -left-12 w-24 h-24 bg-violet-600/20 rounded-full blur-2xl" />
      <div className="absolute bottom-1/4 -right-12 w-24 h-24 bg-indigo-600/20 rounded-full blur-2xl" />

      <div className="relative z-10 p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-3 mb-2">
          <div className="relative">
            <img 
              src={props.logo} 
              alt="logo" 
              className="w-12 h-12 rounded-xl border-2 border-slate-600/50 object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Second Brain
            </h1>
            <p className="text-xs text-slate-400">Knowledge Management</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 relative z-10">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
            Navigation
          </p>
          {navigationItems.map((item, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(item)}
              className={`
                w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-300 group relative overflow-hidden
                ${activeItem.current === item.title 
                  ? 'bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 shadow-lg shadow-violet-500/10' 
                  : 'hover:bg-slate-800/50 border border-transparent hover:border-slate-600/30'
                }
              `}
            >
              {activeItem.current === item.title && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-r-full" />
              )}

              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${activeItem.current === item.title 
                  ? `bg-gradient-to-br ${item.gradient} text-white shadow-lg` 
                  : 'bg-slate-700/50 text-slate-400 group-hover:bg-slate-600/50 group-hover:text-slate-300'
                }
              `}>
                {item.icon}
              </div>

              <span className={`
                font-semibold transition-colors duration-300
                ${activeItem.current === item.title 
                  ? 'text-white' 
                  : 'text-slate-300 group-hover:text-white'
                }
              `}>
                {item.title}
              </span>

              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </button>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Quick Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">Total Items</span>
              <span className="text-sm font-bold text-white">42</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-400">This Week</span>
              <span className="text-sm font-bold text-violet-400">+8</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 p-6 border-t border-slate-700/50">
        <Button
          title="Logout"
          size="md"
          startIcon={<Logout size="md" />}
          variant="logout"
          type="button"
          onClick={handleLogout}
        />

        <div className="mt-4 p-3 rounded-lg bg-slate-800/30 border border-slate-700/30">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-br from-violet-500 to-indigo-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-white">U</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-300">Welcome back!</p>
              <p className="text-xs text-slate-500">Manage your brain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};