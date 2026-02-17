import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface StreamWindowProps {
  content: string;
  isStreaming: boolean;
}

export const StreamWindow = ({ content, isStreaming }: StreamWindowProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [content]);

  return (
    <div className="stream-markdown font-raleway text-base sm:text-lg xl:text-xl text-slate-300 leading-relaxed">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      {isStreaming && <span className="stream-cursor" />}
      <div ref={bottomRef} />
    </div>
  );
};
