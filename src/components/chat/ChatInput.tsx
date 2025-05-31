
import { useState } from 'react';
import { Send, Paperclip, Mic } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

/**
 * Props interface for ChatInput component
 */
interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

/**
 * Chat input component that handles message composition and sending
 * Includes support for text input, attachments, and voice input
 */
export const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  /**
   * Handle form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  /**
   * Handle textarea key press for submit on Enter
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  /**
   * Handle file attachment (placeholder functionality)
   */
  const handleAttachment = () => {
    // In a real app, this would open a file picker
    console.log('File attachment clicked');
  };

  /**
   * Handle voice input (placeholder functionality)
   */
  const handleVoiceInput = () => {
    // In a real app, this would start voice recording
    console.log('Voice input clicked');
  };

  return (
    <div className="p-4 bg-transparent">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          {/* Main input area - floating transparent */}
          <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-purple-500/20 focus-within:border-blue-400/50 transition-all duration-300 shadow-2xl hover:shadow-purple-500/10">
            {/* Attachment and Canvas buttons */}
            <div className="absolute left-4 bottom-4 flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleAttachment}
                className="h-8 w-8 text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-full transition-all duration-200"
                disabled={disabled}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-purple-300 hover:text-white hover:bg-purple-600/30 text-xs rounded-full px-3 transition-all duration-200"
                disabled={disabled}
              >
                📊 Canvas
              </Button>
            </div>

            {/* Textarea */}
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask AquilaX"
              disabled={disabled}
              className="min-h-[60px] max-h-40 resize-none border-0 bg-transparent text-white placeholder-purple-300/60 focus-visible:ring-0 focus-visible:ring-offset-0 pl-24 pr-20 py-4 rounded-3xl"
            />

            {/* Voice and Send buttons */}
            <div className="absolute right-4 bottom-4 flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={handleVoiceInput}
                className="h-8 w-8 text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-full transition-all duration-200"
                disabled={disabled}
              >
                <Mic className="h-4 w-4" />
              </Button>

              {/* Send button - only show when there's text */}
              {message.trim() && (
                <Button
                  type="submit"
                  size="icon"
                  disabled={disabled}
                  className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg transition-all duration-200"
                >
                  <Send className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Disclaimer text */}
        <p className="text-center text-xs text-purple-400/60 mt-3">
          AquilaX can make mistakes, so double-check it
        </p>
      </div>
    </div>
  );
};
