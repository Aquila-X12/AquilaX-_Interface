
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { ChatHeader } from './ChatHeader';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { SmartSuggestions } from './SmartSuggestions';
import { AIStatusIndicator } from './AIStatusIndicator';
import { ErrorBoundary } from './ErrorBoundary';
import { useChatStorage } from '@/hooks/useChatStorage';

interface ChatAreaProps {
  chatId: string;
  onToggleSidebar: () => void;
}

export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isThinking?: boolean;
  messageType?: 'text' | 'code' | 'list' | 'error';
  reactions?: string[];
  metadata?: {
    tokens?: number;
    confidence?: number;
    processingTime?: number;
  };
}

export const ChatArea = ({ chatId, onToggleSidebar }: ChatAreaProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiStatus, setAiStatus] = useState<'online' | 'thinking' | 'offline' | 'error'>('online');
  const [responseTime, setResponseTime] = useState<number>();

  const abortControllerRef = useRef<AbortController | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  const { getChatSession, createChatSession, updateChatSession } = useChatStorage();

  // Load chat session when chatId changes
  useEffect(() => {
    if (!mountedRef.current) return;
    
    let session = getChatSession(chatId);
    
    if (!session) {
      // Create new session if it doesn't exist
      session = createChatSession(chatId);
    }
    
    setMessages(session.messages);
    setIsAiThinking(false);
    setAiStatus('online');
    setResponseTime(undefined);
    
    console.log(`💬 Loaded chat session: ${chatId}`, session);
  }, [chatId, getChatSession, createChatSession]);

  // Cleanup on unmount
  useEffect(() => {
    mountedRef.current = true;
    
    return () => {
      mountedRef.current = false;
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!mountedRef.current || isAiThinking) return;

    const startTime = Date.now();
    
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const userMessage: Message = {
      id: `user_${Date.now()}`,
      content,
      sender: 'user',
      timestamp: new Date(),
      messageType: 'text',
      metadata: {
        tokens: content.split(' ').length
      }
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsAiThinking(true);
    setAiStatus('thinking');

    try {
      const complexity = content.length > 100 ? 2000 : 1000;
      const delay = complexity + Math.random() * 500;
      
      await new Promise(resolve => setTimeout(resolve, delay));

      if (!mountedRef.current || abortControllerRef.current?.signal.aborted) {
        return;
      }

      const endTime = Date.now();
      const actualResponseTime = endTime - startTime;
      
      const responseContent = generateResponse(content, messages);
      
      const aiMessage: Message = {
        id: `ai_${Date.now()}`,
        content: responseContent,
        sender: 'ai',
        timestamp: new Date(),
        messageType: 'text',
        metadata: {
          tokens: responseContent.split(' ').length,
          confidence: 0.9,
          processingTime: actualResponseTime
        }
      };

      const finalMessages = [...newMessages, aiMessage];

      if (mountedRef.current) {
        setMessages(finalMessages);
        setResponseTime(actualResponseTime);
        setAiStatus('online');
        
        // Update the chat session
        updateChatSession(chatId, { 
          messages: finalMessages,
          title: generateChatTitle(finalMessages[1]?.content || content)
        });
      }
      
    } catch (error) {
      console.error('Error generating response:', error);
      
      if (mountedRef.current) {
        setAiStatus('error');
        
        const errorMessage: Message = {
          id: `error_${Date.now()}`,
          content: "I apologize, but I encountered an issue while processing your request. Please try again.",
          sender: 'ai',
          timestamp: new Date(),
          messageType: 'error',
          metadata: {
            confidence: 0,
            processingTime: Date.now() - startTime
          }
        };
        
        const finalMessages = [...newMessages, errorMessage];
        setMessages(finalMessages);
        updateChatSession(chatId, { messages: finalMessages });
      }
    } finally {
      if (mountedRef.current) {
        setIsAiThinking(false);
      }
      abortControllerRef.current = null;
    }
  }, [isAiThinking, messages, chatId, updateChatSession]);

  const generateResponse = (input: string, messageHistory: Message[]): string => {
    const context = messageHistory.slice(-5); // Last 5 messages for context
    
    const educationalResponses = [
      `Excellent question! Based on our conversation, I can see you're developing a deep understanding of this topic. Let me break this down step by step: ${input.toLowerCase().includes('how') ? 'The process involves several key stages...' : input.toLowerCase().includes('why') ? 'The fundamental reason behind this is...' : 'Here\'s what you need to know...'}`,
      
      `Great thinking! I can see you're making connections between concepts. ${input.toLowerCase().includes('compare') ? 'Let me highlight the key differences and similarities...' : input.toLowerCase().includes('example') ? 'Here are some practical examples that illustrate this concept...' : 'This builds on what we discussed earlier...'}`,
      
      `That's a sophisticated question that shows real analytical thinking! ${input.toLowerCase().includes('analyze') ? 'Let\'s examine this from multiple perspectives...' : input.toLowerCase().includes('explain') ? 'I\'ll walk you through the reasoning behind this...' : 'The key insight here is...'}`,
      
      `Perfect! You're asking exactly the right questions for deep learning. ${input.toLowerCase().includes('application') ? 'Here\'s how this applies in real-world scenarios...' : input.toLowerCase().includes('difference') ? 'The crucial distinctions you should understand are...' : 'This concept connects to broader principles...'}`
    ];
    
    return educationalResponses[Math.floor(Math.random() * educationalResponses.length)];
  };

  const generateChatTitle = (firstUserMessage: string): string => {
    const words = firstUserMessage.split(' ').slice(0, 6).join(' ');
    return words.length > 40 ? words.substring(0, 40) + '...' : words;
  };

  const handleRegenerate = useCallback(async () => {
    if (!mountedRef.current || messages.length < 2 || isAiThinking) return;
    
    setIsAiThinking(true);
    setAiStatus('thinking');
    
    const newMessages = [...messages];
    if (newMessages[newMessages.length - 1]?.sender === 'ai') {
      newMessages.pop();
    }
    setMessages(newMessages);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!mountedRef.current) return;
      
      const lastUserMessage = newMessages.reverse().find(msg => msg.sender === 'user')?.content || '';
      const alternativeResponse = generateResponse(lastUserMessage, newMessages);
      
      const aiMessage: Message = {
        id: `ai_regen_${Date.now()}`,
        content: alternativeResponse,
        sender: 'ai',
        timestamp: new Date(),
        messageType: 'text',
        metadata: {
          tokens: alternativeResponse.split(' ').length,
          confidence: 0.85,
          processingTime: 1000
        }
      };

      const finalMessages = [...newMessages, aiMessage];

      if (mountedRef.current) {
        setMessages(finalMessages);
        updateChatSession(chatId, { messages: finalMessages });
      }
    } catch (error) {
      console.error('Error regenerating response:', error);
    } finally {
      if (mountedRef.current) {
        setIsAiThinking(false);
        setAiStatus('online');
      }
    }
  }, [messages, isAiThinking, chatId, updateChatSession]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    handleSendMessage(suggestion);
  }, [handleSendMessage]);

  const showSuggestions = messages.length === 1 && !isAiThinking;

  return (
    <ErrorBoundary>
      <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/20 relative">
        <ChatHeader onToggleSidebar={onToggleSidebar} />

        <div className="absolute top-4 right-4 z-10">
          <AIStatusIndicator 
            status={aiStatus} 
            responseTime={responseTime}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          {showSuggestions ? (
            <div className="h-full flex flex-col justify-center">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">What can I help you with?</h2>
                <p className="text-gray-400">Choose a suggestion below or ask me anything</p>
              </div>
              <SmartSuggestions onSuggestionClick={handleSuggestionClick} />
            </div>
          ) : (
            <MessageList 
              messages={messages} 
              isAiThinking={isAiThinking}
              onRegenerate={handleRegenerate}
              ref={messageEndRef}
            />
          )}
        </div>

        <div className="p-4 border-t border-purple-500/20 bg-slate-900/50 backdrop-blur-sm">
          <ChatInput 
            onSendMessage={handleSendMessage}
            disabled={isAiThinking}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};
