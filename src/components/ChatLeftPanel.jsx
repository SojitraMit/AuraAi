/* eslint-disable react-hooks/set-state-in-effect */
import React, { use, useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import { useAllSessions, useNewSession } from "../hooks/useChat";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ChatLeftPanel = ({ sessionId }) => {
  const navigate = useNavigate();
  const [recentSessions, setRecentSessions] = useState([]);
  const { data, isLoading, error } = useAllSessions();
  const queryClient = useQueryClient();

  const userData = useSelector((state) => state.user);

  const newSessionMutation = useNewSession();

  const handleNewSession = () => {
    // Logic to create a new session and navigate to it
    newSessionMutation.mutate(
      { name: "New Chat", session_id: `session-${uuidv4()}` },
      {
        onSuccess: (newSession) => {
          queryClient.invalidateQueries(["allSessions"]);
          navigate(`/chat/${newSession.session_id}`);
        },
      },
    );
    // This can be done by calling the API to create a new session and then updating the state
  };

  useEffect(() => {
    if (!isLoading && data) {
      setRecentSessions(data.sessions || []);
    }
  }, [isLoading, data]);
  return (
    <aside className="w-[260px] h-screen flex-shrink-0 flex flex-col p-4 bg-[#0d0d18] border-r-0">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[#7c3aed] to-[#4f319c] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)]">
          <span className="material-symbols-outlined text-white text-xl">
            auto_awesome
          </span>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-white">
            AuraAI
          </h1>
          <p className="text-[10px] text-[#7c3aed] font-bold uppercase tracking-widest opacity-80">
            Intelligence v2.4
          </p>
        </div>
      </div>

      <button
        className="relative w-full flex items-center justify-center cursor-pointer gap-2 py-3 px-4 mb-6 bg-gradient-to-r from-[#7c3aed] to-[#4f319c] text-white rounded-xl font-semibold shadow-[0px_4px_20px_rgba(124,58,237,0.25)] hover:scale-[0.98] transition-all disabled:opacity-70"
        onClick={handleNewSession}
        disabled={newSessionMutation.isPending}>
        <div
          className={
            newSessionMutation.isPending
              ? "flex items-center justify-center gap-2 opacity-0"
              : "flex items-center justify-center gap-2"
          }>
          <span className="material-symbols-outlined text-sm">add</span>
          <span className="text-sm font-medium tracking-tight">New Chat</span>
        </div>
        {newSessionMutation.isPending && (
          <svg
            className="absolute h-8 w-8 animate-spin text-white"
            viewBox="0 0 24 24"
            aria-hidden="true">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 overflow-y-auto space-y-1 pr-2">
        <div className="px-2 py-2 text-[#ccc3d8] opacity-50 text-[10px] font-bold uppercase tracking-widest mb-2">
          Recent Sessions
        </div>
        {recentSessions.map((session) => (
          <SidebarItem
            key={session.id}
            session_id={session.session_id}
            icon="chat_bubble"
            label={session.name}
            active={session.session_id === sessionId}
          />
        ))}
      </div>

      <div className="pt-4 mt-4 border-t border-white/5 flex flex-col gap-1">
        <a
          className="flex items-center gap-3 p-3 text-[#ccc3d8] opacity-70 hover:bg-[#1b1a26] hover:opacity-100 rounded-lg transition-all duration-200"
          href="#">
          <span className="material-symbols-outlined text-sm">settings</span>
          <span className="font-['Inter'] font-medium text-sm tracking-tight">
            Settings
          </span>
        </a>
        <div className="flex items-center gap-3 p-3 mt-2 bg-[#1b1a26] rounded-xl">
          <div className="w-8 h-8 rounded-full bg-[#343440] flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-sm">
              person
            </span>
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="font-semibold text-sm text-white truncate">
              {userData?.email ? userData.email.split("@")[0] : "Username"}
            </p>
            <p className="text-[10px] text-[#ccc3d8] truncate">
              {userData?.email || "User Email"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ChatLeftPanel;
