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

    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      className="hover:text-red-500  shadow-2xl shadow-red-500   cursor-pointer transition-colors"
      fill="none"
      viewBox="0 0 25 24">
      <g stroke="currentColor" stroke-width="1.5">
        <path
          stroke-linecap="round"
          stroke-miterlimit="10"
          d="M4.25 4.75h16.5m-8.25-2v2m1.74 12.52v-4.5m-3.49 4.48v-4.5"
        />
        <path stroke-miterlimit="10" d="M5.87 8.75h13.3" />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.91 21.25H9.09c-1.02 0-1.88-.77-1.99-1.78L5.5 4.75h14l-1.6 14.72a2.003 2.003 0 0 1-1.99 1.78"
        />
      </g>
    </svg>
  </Link>
);

export default SidebarItem;
