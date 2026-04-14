const SidebarItem = ({ icon, label, active = false }) => (
  <a
    className={`group flex items-center gap-3 p-3 rounded-lg transition-all ${active ? "text-white bg-[#1f1e2a]" : "text-[#ccc3d8] opacity-70 hover:bg-[#1b1a26] hover:opacity-100"}`}
    href="#">
    <span className="material-symbols-outlined text-sm">{icon}</span>
    <span className="text-sm font-medium truncate flex-1">{label}</span>
  </a>
);

export default SidebarItem;
