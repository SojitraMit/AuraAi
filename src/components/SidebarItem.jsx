import { Link, useNavigate } from "react-router-dom"; // ✅ import Link
import { useDeleteSession, useNewSession } from "../hooks/useChat";
import { useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";

const SidebarItem = ({ icon, label, active = false, session_id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteSessionMutation = useDeleteSession();
  const newSessionMutation = useNewSession();

  const handleDeleteSession = (e) => {
    e.preventDefault();

    deleteSessionMutation.mutate(session_id, {
      onSuccess: () => {
        queryClient.invalidateQueries(["allSessions"]);
        if (active) {
          newSessionMutation.mutate(
            { name: "New Chat", session_id: `session-${uuidv4()}` },
            {
              onSuccess: (newSession) => {
                queryClient.invalidateQueries(["allSessions"]);
                navigate(`/chat/${newSession.session_id}`);
              },
            },
          );
        }
      },
    });
  };
  return (
    <Link // ✅ Link instead of <a>
      to={`/chat/${session_id}`} // ✅ "to" instead of "href"
      className={`group flex items-center gap-3 p-3 rounded-lg transition-all ${
        active
          ? "text-white bg-[#1f1e2a]"
          : "text-[#ccc3d8] opacity-70 hover:bg-[#1b1a26] hover:opacity-100"
      }`}>
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span className="text-sm font-medium truncate flex-1">{label}</span>

      {deleteSessionMutation.isPending ? (
        <div className="relative flex items-center justify-center">
          <div className="w-5 h-5 border-3 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-md animate-pulse"></div>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          className="hover:text-red-500 shadow-red-500 cursor-pointer transition-colors hidden group-hover:block"
          onClick={handleDeleteSession}
          fill="none"
          viewBox="0 0 25 24">
          <g stroke="currentColor" strokeWidth="1.5">
            <path
              strokeLinecap="round"
              strokeMiterlimit="10"
              d="M4.25 4.75h16.5m-8.25-2v2m1.74 12.52v-4.5m-3.49 4.48v-4.5"
            />
            <path strokeMiterlimit="10" d="M5.87 8.75h13.3" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.91 21.25H9.09c-1.02 0-1.88-.77-1.99-1.78L5.5 4.75h14l-1.6 14.72a2.003 2.003 0 0 1-1.99 1.78"
            />
          </g>
        </svg>
      )}
    </Link>
  );
};

export default SidebarItem;
