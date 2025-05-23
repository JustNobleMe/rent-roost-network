import { Mail, Search, User, LogOut, ChevronDown } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/images/logo-blue.png";

const UserTopbar = ({ user }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-20 bg-white border-b flex items-center justify-between px-6 h-16">
       <Link to="/">
				<div className="hidden max-sm:mb-0 max-sm:block">
					<img src={Logo} alt="Logo" className="w-10 h-10" />
				</div>
			</Link>
      <div className="flex items-center gap-3 w-1/2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search properties"
            className="w-full pl-10 pr-4 py-2 rounded bg-muted text-sm border focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative">
          <Mail className="h-5 w-5 text-muted-foreground" />
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center gap-2 focus:outline-none max-sm:gap-0"
            onClick={() => setOpen((v) => !v)}
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover border"
            />
            <div className="flex flex-col items-start max-sm:hidden">
              <span className="font-medium text-sm">{user.name}</span>
              <span className="text-xs text-muted-foreground">Welcome back!</span>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground -ml-2 max-sm:hidden" />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow-lg z-50">
              <Link
                to="/dashboard/profile"
                className="flex items-center gap-2 px-4 py-2 hover:bg-muted text-sm"
                onClick={() => setOpen(false)}
              >
                <User className="h-4 w-4" /> Profile
              </Link>
              <button
                className="flex items-center gap-2 px-4 py-2 w-full hover:bg-muted text-sm text-red-600"
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default UserTopbar;