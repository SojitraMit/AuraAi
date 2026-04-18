import { Link } from "react-router-dom"; // ✅ import Link

const SidebarItem = ({ icon, label, active = false, session_id }) => (
  <Link // ✅ Link instead of <a>
    to={`/chat/${session_id}`} // ✅ "to" instead of "href"
    className={`group flex items-center gap-3 p-3 rounded-lg transition-all ${
      active
        ? "text-white bg-[#1f1e2a]"
        : "text-[#ccc3d8] opacity-70 hover:bg-[#1b1a26] hover:opacity-100"
    }`}>
    <span className="material-symbols-outlined text-sm">{icon}</span>
    <span className="text-sm font-medium truncate flex-1">{label}</span>
  </Link>
);

export default SidebarItem;
