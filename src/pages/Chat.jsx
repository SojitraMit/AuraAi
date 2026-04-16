/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import SidebarItem from "../components/SidebarItem";
import ChatMessage from "../components/ChatMessage";
import ChatLeftPanel from "../components/ChatLeftPanel";
import { useParams } from "react-router-dom";
import { useChat, useChatHistory } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { addChat, allChats } from "../utils/chatSlice";

const Chat = () => {
  const sessionId = useParams().sessionId;
  const dispatch = useDispatch();
  console.log(sessionId);
  const {
    data: chatHistory,
    isLoading: chatHistoryLoading,
    error,
  } = useChatHistory(sessionId);
  const chatMutation = useChat();
  const allMessages = useSelector((store) => store.chat?.messages || []);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "user",
      text: "Can you analyze the recent design trends in high-end AI dashboards? I'm looking for specifics on depth and surface hierarchy.",
      time: "10:42 AM",
    },
    {
      id: 2,
      role: "ai",
      text: "Modern high-end AI interfaces are shifting towards Atmospheric Persistence...",
      isAnalysis: true,
      time: "10:42 AM",
    },
  ]);
  const [input, setInput] = useState("");

  const [isAiLoading, setIsAiLoading] = useState(false);
  const messagesEndRef = useRef(null); // ✅ add this ref

  // ✅ Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return; // ✅ move guard to top

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiLoading(true); // ✅ show loading

    chatMutation.mutate(
      { session_id: sessionId, message: input },
      {
        onSuccess: (aiAns) => {
          const newMessage = {
            content: aiAns.reply,
            role: "assistant",
            id: Date.now() + 1,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, newMessage]);
          dispatch(addChat(newMessage));
          setIsAiLoading(false); // ✅ hide loading
        },
        onError: () => {
          setIsAiLoading(false); // ✅ hide on error too
        },
      },
    );
  };

  useEffect(() => {
    if (!chatHistoryLoading && chatHistory) {
      setMessages(chatHistory.messages);
      dispatch(allChats(chatHistory.messages));
    }
  }, [chatHistory, chatHistoryLoading, error]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-[#12121d] text-[#e3e0f1] font-sans">
      {/* LEFT SIDEBAR */}
      <ChatLeftPanel sessionId={sessionId} />

      {/* CENTER CHAT AREA */}
      <main className="flex-1 h-screen flex flex-col bg-[#12121d] relative">
        <header className="w-full h-16 sticky top-0 z-50 flex justify-between items-center px-6 bg-[#12121d]/70 backdrop-blur-xl shadow-[0px_10px_40px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-bold text-white">Design Review</h2>
            <span className="px-2 py-0.5 bg-[#7c3aed]/20 text-[#d2bbff] text-[10px] font-bold rounded-md border border-[#7c3aed]/20 tracking-wider">
              LLAMA 3.2
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-[#ccc3d8] hover:text-white transition-colors">
              <span className="material-symbols-outlined">share</span>
            </button>
            <button className="p-2 text-[#ccc3d8] hover:text-white transition-colors duration-200">
              <span className="material-symbols-outlined">more_vert</span>
            </button>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto pt-8 pb-32 custom-scroll">
          <div className="max-w-[760px] mx-auto px-4 space-y-10">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} msg={msg} />
            ))}

            {/* ✅ AI loading bubble */}
            {isAiLoading && (
              <ChatMessage msg={{ role: "assistant", isLoading: true }} />
            )}

            {/* ✅ Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </section>

        {/* INPUT AREA */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#12121d] via-[#12121d] to-transparent">
          <div className="max-w-[760px] mx-auto relative group">
            <div className="bg-surface-container-high/80 bg-[#252530] backdrop-blur-xl rounded-2xl p-2 shadow-[0_-10px_40px_rgba(0,0,0,0.3)] border border-white/5 focus-within:border-purple-500/30 transition-all duration-300">
              <div className="flex items-end  gap-2 p-2">
                {/* Attach button */}
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>

                {/* Input */}
                <textarea
                  placeholder="Message AuraAI..."
                  rows={1}
                  className="w-full bg-transparent border-none focus:ring-0 text-gray-200 text-sm py-2 resize-none max-h-40 min-h-[44px] placeholder:text-gray-400/40 outline-none"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault(); // ✅ Shift+Enter = new line, Enter = send
                      handleSendMessage();
                    }
                  }}
                />

                {/* Send button */}
                <button
                  className="bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105 transition-transform active:scale-95"
                  onClick={handleSendMessage}>
                  <span className="material-symbols-outlined">send</span>
                </button>
              </div>
            </div>

            {/* Footer note */}
            <p className="text-center text-[10px] text-gray-400 mt-3 opacity-40">
              AuraAI can make mistakes. Check important info.
            </p>
          </div>
        </div>
      </main>

      {/* RIGHT CONTEXT PANEL */}
      <aside className="w-[280px] h-screen flex-shrink-0 flex flex-col p-6 bg-[#0d0d18]">
        {/* Header */}
        <header className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-purple-600 mb-1">
            Context
          </h3>
          <div className="h-0.5 w-8 bg-purple-600"></div>
        </header>

        {/* Content */}
        <div className="flex-1 space-y-8 custom-scroll overflow-y-auto">
          {/* Memory Section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-sm text-purple-600">
                memory
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
                Active Memory
              </span>
            </div>

            <div className="space-y-3">
              <div className="bg-[#1f1e2a] border-l-2 border-purple-600 p-3 rounded-r-lg hover:bg-[#1b1a26] transition-all">
                <p className="text-xs text-white font-medium mb-1 truncate">
                  UI Visual Strategy
                </p>
                <p className="text-[10px] text-gray-400 opacity-60 leading-relaxed">
                  Focused on "Digital Nebula" aesthetics and glassmorphic depth.
                </p>
              </div>

              <div className="bg-[#1b1a26] border-l-2 border-transparent p-3 rounded-r-lg opacity-50 hover:opacity-100 hover:border-purple-600 transition-all">
                <p className="text-xs text-white font-medium mb-1 truncate">
                  Color Palette V2
                </p>
                <p className="text-[10px] text-gray-400 opacity-60 leading-relaxed">
                  Obsidian tones with hyper-saturated violet core.
                </p>
              </div>
            </div>
          </section>

          {/* Session Info */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-sm text-purple-600">
                info
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
                Session Info
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-[#1b1a26] p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-400 mb-1">Messages</p>
                <p className="text-sm font-bold text-white">42</p>
              </div>

              <div className="bg-[#1b1a26] p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-400 mb-1">Tokens</p>
                <p className="text-sm font-bold text-white">1.2k</p>
              </div>
            </div>

            <div className="bg-[#1b1a26] p-3 rounded-xl border border-white/5">
              <p className="text-[10px] text-gray-400 mb-1">Current Intent</p>
              <p className="text-xs text-white leading-relaxed">
                Architectural Design Systems & UI Engineering
              </p>
            </div>
          </section>

          {/* Files */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="material-symbols-outlined text-sm text-purple-600">
                description
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">
                Shared Files
              </span>
            </div>

            <div className="bg-[#1b1a26]/50 border border-dashed border-white/10 rounded-xl p-6 text-center">
              <span className="material-symbols-outlined text-gray-400/30 text-3xl mb-2">
                upload_file
              </span>
              <p className="text-[10px] text-gray-400 opacity-50">
                No files uploaded to this session yet.
              </p>
            </div>
          </section>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-4 border-t border-white/5">
          <div className="bg-gradient-to-br from-purple-600/10 to-purple-900/10 rounded-xl p-4 border border-purple-600/20">
            <p className="text-[11px] font-bold text-white mb-2">Pro Feature</p>
            <p className="text-[10px] text-gray-400 mb-3">
              Enable context-aware real-time search across your workspace.
            </p>

            <button className="w-full py-2 bg-purple-600 text-[11px] font-bold text-white rounded-lg hover:opacity-90 transition">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

// Sub-components for cleaner code

export default Chat;
