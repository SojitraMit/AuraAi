/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import SidebarItem from "../components/SidebarItem";
import ChatMessage from "../components/ChatMessage";
import ChatLeftPanel from "../components/ChatLeftPanel";
import { useParams } from "react-router-dom";
import { useChat, useChatHistory } from "../hooks/useChat";
import { useDispatch, useSelector } from "react-redux";
import { addChat, allChats } from "../utils/chatSlice";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import ContextPanel from "../components/ContextPanel";

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

  // ✅ Reset messages when switching chats
  useEffect(() => {
    setMessages([]);
  }, [sessionId]);

  const handleSendMessage = (text) => {
    const messageText = text || input; // ✅ use passed text or input state
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAiLoading(true);

    chatMutation.mutate(
      { session_id: sessionId, message: messageText }, // ✅ use messageText
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
          setIsAiLoading(false);
        },
        onError: () => setIsAiLoading(false),
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
            {/* ✅ Show loading spinner only when loading chat history */}
            {chatHistoryLoading && messages.length === 0 && (
              <div className="flex flex-col items-center justify-center mt-[200px]">
                <div className="animate-spin">
                  <span className="material-symbols-outlined text-4xl text-[#7c3aed]">
                    auto_awesome
                  </span>
                </div>
                <p className="text-sm text-[#ccc3d8] mt-4 opacity-70">
                  Loading chat...
                </p>
              </div>
            )}

            {messages.length === 0 && !chatHistoryLoading && (
              <div className="flex flex-col items-center justify-center h-full min-h-[400px] gap-3">
                {/* Icon */}
                <DotLottieReact
                  src="https://lottie.host/ebbe71b3-01b8-4ed0-a4fe-e2816ace068e/3SMXTVok7r.lottie"
                  loop
                  autoplay
                  className=" h-36"
                />

                {/* Text */}
                <div className="text-center max-w-xs mb-2">
                  <p className="text-lg font-semibold text-white mb-2">
                    How can I help you today?
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Ask me anything — writing, coding, analysis, brainstorming,
                    and much more.
                  </p>
                </div>

                {/* Suggestion Cards */}
                <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                  {[
                    {
                      icon: "edit_note",
                      title: "Write something",
                      sub: "Essays, emails, stories",
                    },
                    {
                      icon: "code",
                      title: "Code with me",
                      sub: "Debug, build, review",
                    },
                    {
                      icon: "search",
                      title: "Analyze & research",
                      sub: "Summarize, explore",
                    },
                    {
                      icon: "lightbulb",
                      title: "Brainstorm ideas",
                      sub: "Plans, concepts, drafts",
                    },
                  ].map((item) => (
                    <button
                      key={item.title}
                      onClick={() => handleSendMessage(item.title)} // ✅ pass directly
                      className="bg-purple-500/10 border border-purple-500/20 cursor-pointer rounded-xl p-4 text-left hover:bg-purple-500/20 hover:border-purple-500/40 transition-all duration-200">
                      <span className="material-symbols-outlined text-purple-400 text-lg mb-2 block">
                        {item.icon}
                      </span>
                      <p className="text-xs font-medium text-white mb-1">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-gray-500">{item.sub}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
                  onClick={() => handleSendMessage()}>
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
      <ContextPanel/>
    </div>
  );
};

// Sub-components for cleaner code

export default Chat;
