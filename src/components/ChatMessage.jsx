const ChatMessage = ({ msg }) => {
  const isAi = msg.role === "ai";
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
        className={`${!isAi ? "bg-[#7c3aed] text-white px-5 py-3.5 rounded-2xl rounded-tr-none shadow-lg max-w-[85%]" : "flex-1 space-y-4"}`}>
        {isAi && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#d2bbff] tracking-widest uppercase">
              AuraAI
            </span>
            <span className="text-[10px] text-[#ccc3d8] opacity-50 font-medium">
              {msg.time}
            </span>
          </div>
        )}
        <div
          className={`${isAi ? "text-white leading-relaxed text-[15px]" : "text-sm"}`}>
          {msg.text}
        </div>
      </div>
      {!isAi && (
        <span className="text-[10px] text-[#ccc3d8] mt-2 mr-1 opacity-50 font-medium">
          {msg.time}
        </span>
      )}
    </div>
  );
};

export default ChatMessage;
