
import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share, MoreHorizontal, RotateCcw, Copy, Volume2, Flag, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Message } from './ChatArea';

/**
 * Props interface for MessageComponent
 */
interface MessageComponentProps {
  message: Message;
  isLast: boolean;
  onRegenerate: () => void;
}

/**
 * Individual message component with enhanced timestamp display
 */
export const MessageComponent = ({ message, isLast, onRegenerate }: MessageComponentProps) => {
  const [showActions, setShowActions] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const [showThinking, setShowThinking] = useState(false);

  /**
   * Format timestamp for display
   */
  const formatTimestamp = (timestamp: Date): string => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - messageTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return messageTime.toLocaleDateString();
  };

  /**
   * Get detailed timestamp for tooltip
   */
  const getDetailedTimestamp = (timestamp: Date): string => {
    return new Date(timestamp).toLocaleString();
  };

  /**
   * Handle copying message content to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      console.log('✅ Message copied to clipboard');
    } catch (err) {
      console.error('❌ Failed to copy message:', err);
    }
  };

  /**
   * Handle text-to-speech functionality
   */
  const handleListen = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message.content);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
      console.log('🔊 Playing message audio');
    } else {
      console.log('❌ Text-to-speech not supported in this browser');
    }
  };

  if (message.sender === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-3xl">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 text-white shadow-lg border border-blue-400/20">
            {message.content}
          </div>
          <div className="flex items-center justify-end mt-2 space-x-2">
            <div 
              className="flex items-center text-xs text-gray-400 hover:text-gray-300 transition-colors cursor-help"
              title={getDetailedTimestamp(message.timestamp)}
            >
              <Clock className="h-3 w-3 mr-1" />
              {formatTimestamp(message.timestamp)}
            </div>
            {message.metadata?.tokens && (
              <div className="text-xs text-gray-500">
                {message.metadata.tokens} tokens
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // AI message
  return (
    <div 
      className="flex items-start space-x-4"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        setShowMoreActions(false);
      }}
    >
      {/* AI Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg">
        <span className="text-white text-sm font-semibold">A</span>
      </div>

      {/* Message Content */}
      <div className="flex-1 space-y-2">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-4 text-white border border-slate-600/30 shadow-lg">
          {message.content}
          
          {/* Show thinking link */}
          <div className="mt-3 pt-3 border-t border-slate-600/30">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition-colors duration-200 underline decoration-cyan-400/50 hover:decoration-cyan-300"
            >
              {showThinking ? 'Hide thinking' : 'Show thinking'}
            </button>
            
            {showThinking && (
              <div className="mt-2 p-3 bg-slate-700/50 rounded-lg border border-slate-600/20">
                <div className="text-sm text-cyan-300 font-medium mb-2">🧠 AI Reasoning Process</div>
                <p className="text-sm text-gray-300 italic">
                  Processing user query → Analyzing context and intent → Accessing knowledge base → 
                  Formulating comprehensive response → Optimizing for clarity and helpfulness → 
                  Applying conversational best practices → Delivering structured answer
                </p>
                {message.metadata?.confidence && (
                  <div className="mt-2 text-xs text-gray-400">
                    Confidence: {(message.metadata.confidence * 100).toFixed(1)}%
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Message metadata */}
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-3">
            <div 
              className="flex items-center hover:text-gray-300 transition-colors cursor-help"
              title={getDetailedTimestamp(message.timestamp)}
            >
              <Clock className="h-3 w-3 mr-1" />
              {formatTimestamp(message.timestamp)}
            </div>
            {message.metadata?.tokens && (
              <div>{message.metadata.tokens} tokens</div>
            )}
            {message.metadata?.processingTime && (
              <div>{message.metadata.processingTime}ms response</div>
            )}
            {message.metadata?.confidence && (
              <div>{(message.metadata.confidence * 100).toFixed(0)}% confidence</div>
            )}
          </div>
          
          {message.messageType && (
            <div className="px-2 py-1 bg-slate-700/50 rounded text-xs">
              {message.messageType}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-600/10 border border-transparent hover:border-emerald-400/20 transition-all duration-200"
            >
              <ThumbsUp className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-red-400 hover:bg-red-600/10 border border-transparent hover:border-red-400/20 transition-all duration-200"
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-blue-400 hover:bg-blue-600/10 border border-transparent hover:border-blue-400/20 transition-all duration-200"
            >
              <Share className="h-4 w-4" />
            </Button>

            {/* More actions dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMoreActions(!showMoreActions)}
                className="text-gray-400 hover:text-purple-400 hover:bg-purple-600/10 border border-transparent hover:border-purple-400/20 transition-all duration-200"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>

              {showMoreActions && (
                <div className="absolute top-8 right-0 bg-slate-800/95 border border-purple-400/30 rounded-xl shadow-2xl py-2 z-10 min-w-48 backdrop-blur-md">
                  <button
                    onClick={handleCopy}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-purple-200 flex items-center space-x-2 transition-all duration-200"
                  >
                    <Copy className="h-4 w-4" />
                    <span>Copy Message</span>
                  </button>
                  
                  <button
                    onClick={handleListen}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-purple-200 flex items-center space-x-2 transition-all duration-200"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>Listen to Message</span>
                  </button>
                  
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-purple-200 flex items-center space-x-2 transition-all duration-200"
                  >
                    <Flag className="h-4 w-4" />
                    <span>Report Issue</span>
                  </button>
                </div>
              )}
            </div>

            {/* Regenerate button */}
            {isLast && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="text-gray-400 hover:text-yellow-400 hover:bg-yellow-600/10 border border-transparent hover:border-yellow-400/20 ml-2 transition-all duration-200"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
