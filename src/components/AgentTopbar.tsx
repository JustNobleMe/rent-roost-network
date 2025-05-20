import { Bell, Mail, Search } from "lucide-react";

const AgentTopbar = ({ user }) => (
  <header className="sticky top-0 z-20 bg-white border-b flex items-center justify-between px-6 h-16">
    <div className="flex items-center gap-3 w-1/2">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded bg-muted text-sm border focus:outline-none"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
      </div>
    </div>
    <div className="flex items-center gap-6">
      <button className="relative">
        <Mail className="h-5 w-5 text-muted-foreground" />
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1">3</span>
      </button>
      <button className="relative">
        <Bell className="h-5 w-5 text-muted-foreground" />
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full px-1">5</span>
      </button>
      <div className="flex items-center gap-2">
        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover border" />
        <span className="font-medium text-sm">{user.name}</span>
      </div>
    </div>
  </header>
);

export default AgentTopbar;