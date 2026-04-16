import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Lottie from "lottie-react";
import call from "../assets/call.json";

const ChatMessage = ({ msg }) => {
  const isAi = msg.role === "assistant";

  return (
    <div className={`flex gap-4 ${!isAi ? "flex-col items-end" : ""}`}>
      {isAi && (
        <div className="w-10 h-10 rounded-xl bg-[#292935] flex-shrink-0 flex items-center justify-center relative">
          <span className="material-symbols-outlined text-[#d2bbff]">
            auto_awesome
          </span>
          <div className="absolute inset-0 bg-[#7c3aed]/20 rounded-xl animate-pulse blur-md -z-10"></div>
        </div>
      )}

      <div
        className={`${!isAi && msg.content ? "bg-[#7c3aed] text-white px-5 py-3.5 rounded-2xl rounded-tr-none shadow-lg max-w-[85%]" : "flex-1 space-y-4"}`}>
        {isAi && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#d2bbff] tracking-widest uppercase">
              AuraAI
            </span>
            {msg.time && (
              <span className="text-[10px] text-[#ccc3d8] opacity-50 font-medium">
                {msg.time}
              </span>
            )}
          </div>
        )}

        {/* ✅ Loading dots or message content */}
        {msg.isLoading ? (
          // <div className="flex items-center gap-1 py-2">
          //   <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:0ms]"></span>
          //   <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:150ms]"></span>
          //   <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:300ms]"></span>
          // </div>
          <DotLottieReact
            src="https://lottie.host/c0422598-9d4d-401a-a6a6-bd5545dd3801/LXZZ6oLsbX.lottie"
            loop
            autoplay
            className="w-12 h-12"
          />
        ) : (
          <div
            className={`${isAi ? " prose prose-invert max-w-none bg-[#1B1A26] p-5 rounded-2xl " : "text-sm"}`}>
            {isAi ? <ReactMarkdown>{msg.content}</ReactMarkdown> : msg.content}
          </div>
        )}
      </div>

      {/* {!isAi && (
        <span className="text-[10px] text-[#ccc3d8] mt-2 mr-1 opacity-50 font-medium">
          {msg.time}
        </span>
      )} */}
    </div>
  );
};

export default ChatMessage;
