
import { useState, useEffect, useCallback } from 'react';
import { Message } from '@/components/chat/ChatArea';

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isPinned?: boolean;
  tags?: string[];
  summary?: string;
  wordCount?: number;
  aiModel?: string;
}

const STORAGE_KEY = 'aquilax_chat_sessions';

export const useChatStorage = () => {
  const [chatSessions, setChatSessions] = useState<Record<string, ChatSession>>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        const sessions: Record<string, ChatSession> = {};
        Object.entries(parsed).forEach(([id, session]: [string, any]) => {
          sessions[id] = {
            ...session,
            createdAt: new Date(session.createdAt),
            updatedAt: new Date(session.updatedAt),
            messages: session.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          };
        });
        setChatSessions(sessions);
      }
    } catch (error) {
      console.error('Failed to load chat sessions:', error);
    }
  }, []);

  // Save to localStorage whenever sessions change
  const saveToStorage = useCallback((sessions: Record<string, ChatSession>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error('Failed to save chat sessions:', error);
    }
  }, []);

  const createChatSession = useCallback((id: string, title?: string): ChatSession => {
    const welcomeMessage: Message = {
      id: '1',
      content: "Hello! I'm Aquilax, your intelligent AI assistant. I'm designed to help you with a wide range of tasks - from answering questions and solving problems to brainstorming ideas and providing detailed explanations. What would you like to explore today?",
      sender: 'ai',
      timestamp: new Date(),
      messageType: 'text',
      metadata: {
        confidence: 1.0,
        tokens: 45
      }
    };

    const session: ChatSession = {
      id,
      title: title || 'New Conversation',
      messages: [welcomeMessage],
      createdAt: new Date(),
      updatedAt: new Date(),
      isPinned: false,
      tags: [],
      wordCount: welcomeMessage.content.split(' ').length,
      aiModel: 'Aquilax Pro'
    };

    setChatSessions(prev => {
      const updated = { ...prev, [id]: session };
      saveToStorage(updated);
      return updated;
    });

    return session;
  }, [saveToStorage]);

  const updateChatSession = useCallback((id: string, updates: Partial<ChatSession>) => {
    setChatSessions(prev => {
      const session = prev[id];
      if (!session) return prev;

      const updatedSession = {
        ...session,
        ...updates,
        updatedAt: new Date(),
        wordCount: updates.messages ? 
          updates.messages.reduce((count, msg) => count + msg.content.split(' ').length, 0) :
          session.wordCount
      };

      const updated = { ...prev, [id]: updatedSession };
      saveToStorage(updated);
      return updated;
    });
  }, [saveToStorage]);

  const getChatSession = useCallback((id: string): ChatSession | null => {
    return chatSessions[id] || null;
  }, [chatSessions]);

  const deleteChatSession = useCallback((id: string) => {
    setChatSessions(prev => {
      const { [id]: deleted, ...rest } = prev;
      saveToStorage(rest);
      return rest;
    });
  }, [saveToStorage]);

  const getAllSessions = useCallback((): ChatSession[] => {
    return Object.values(chatSessions).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
  }, [chatSessions]);

  return {
    chatSessions,
    createChatSession,
    updateChatSession,
    getChatSession,
    deleteChatSession,
    getAllSessions
  };
};
