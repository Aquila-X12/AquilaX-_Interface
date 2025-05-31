
import { useEffect, useRef, forwardRef } from 'react';
import { MessageComponent } from './MessageComponent';
import { Message } from './ChatArea';

/**
 * Props interface for MessageList component
 */
interface MessageListProps {
  messages: Message[];
  isAiThinking: boolean;
  onRegenerate: () => void;
}

/**
 * Component that renders the list of messages in the chat
 * Handles auto-scrolling and displays thinking indicator with AI/ML themed styling
 */
export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, isAiThinking, onRegenerate }, ref) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    /**
     * Auto-scroll to bottom when new messages are added
     */
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages, isAiThinking]);

    return (
      <div className="h-full overflow-y-auto px-4 py-6 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Render all messages */}
          {messages.map((message, index) => (
            <MessageComponent
              key={message.id}
              message={message}
              isLast={index === messages.length - 1}
              onRegenerate={onRegenerate}
            />
          ))}

          {/* AI thinking indicator */}
          {isAiThinking && (
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
              <div className="flex-1 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 border border-slate-600/30 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <span className="text-sm text-cyan-300 font-medium">Neural networks processing...</span>
                </div>
              </div>
            </div>
          )}

          {/* Empty div for auto-scroll target */}
          <div ref={messagesEndRef} />
        </div>
      </div>
    );
  }
);

MessageList.displayName = 'MessageList';
