import { Home, Heart, ShoppingBag, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/images/logo-blue.png"
import clsx from "clsx";

const navItems = [
  { icon: <Home />, label: "Dashboard", to: "/Dashboard" },
  { icon: <Heart />, label: "Saved", to: "/dashboard/saved" },
  { icon: <ShoppingBag />, label: "Purchases", to: "/dashboard/purchases" },
  { icon: <User />, label: "Profile", to: "/dashboard/profile" },
];

const UserSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };
  return (
    <aside className="fixed left-0 top-0 h-full w-20 bg-white border-r flex flex-col items-center py-6 z-30">
      <Link to="/">
        <div className="mb-8">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
        </div>
      </Link>
      <nav className="flex flex-col gap-8 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={clsx(
              "flex flex-col items-center text-foreground hover:text-muted-foreground transition-colors",
              location.pathname === item.to && "text-foreground"
            )}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </nav>
      <button
      onClick={handleLogout}
      className="mt-auto mb-2 text-muted-foreground hover:text-red-500 transition-colors">
        <LogOut />
      </button>
    </aside>
  );
};

export default UserSidebar;