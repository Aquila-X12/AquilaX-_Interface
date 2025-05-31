
import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/chat/Sidebar';
import { ChatArea } from '@/components/chat/ChatArea';
import { SidebarProvider } from '@/components/ui/sidebar';
import { QuickActions } from '@/components/chat/QuickActions';
import { ErrorBoundary } from '@/components/chat/ErrorBoundary';
import { UniversityDashboard } from '@/components/features/UniversityDashboard';
import { useChatStorage } from '@/hooks/useChatStorage';

const Index = () => {
  const [activeChatId, setActiveChatId] = useState<string>('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  const { getAllSessions, createChatSession } = useChatStorage();

  // Generate stable chat ID
  const generateChatId = useCallback((): string => {
    return `chat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // Initialize with existing chat or create new one
  useEffect(() => {
    const existingSessions = getAllSessions();
    
    if (existingSessions.length > 0) {
      // Load the most recent chat
      const mostRecentChat = existingSessions[0];
      setActiveChatId(mostRecentChat.id);
      console.log(`🔄 Loaded most recent chat: ${mostRecentChat.id}`);
    } else if (!activeChatId) {
      // Create new chat only if no existing chats and no active chat
      const initialChatId = generateChatId();
      setActiveChatId(initialChatId);
      console.log(`🚀 Initialized with new chat: ${initialChatId}`);
    }
  }, [activeChatId, generateChatId, getAllSessions]);

  const handleChatChange = useCallback((chatId: string) => {
    console.log(`🔄 Switching to chat: ${chatId}`);
    setActiveChatId(chatId);
    setShowDashboard(false);
  }, []);

  const handleNewChat = useCallback(() => {
    const newChatId = generateChatId();
    console.log(`🆕 Creating new chat: ${newChatId}`);
    setActiveChatId(newChatId);
    setShowDashboard(false);
    
    // Auto-collapse sidebar on mobile
    if (window.innerWidth < 768) {
      setIsSidebarCollapsed(true);
    }
  }, [generateChatId]);

  const handleQuickAction = useCallback((action: string) => {
    switch (action) {
      case 'summarize':
        console.log('📋 Generating conversation summary...');
        break;
      case 'export':
        console.log('📤 Exporting current chat...');
        break;
      case 'share':
        console.log('🔗 Preparing chat for sharing...');
        break;
      case 'settings':
        console.log('⚙️ Opening pro settings panel...');
        break;
      case 'dashboard':
        setShowDashboard(!showDashboard);
        console.log('📊 Toggling university dashboard...');
        break;
    }
  }, [showDashboard]);

  const handleToggleSidebar = useCallback(() => {
    setIsSidebarCollapsed(prev => !prev);
  }, []);

  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isSidebarCollapsed) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarCollapsed]);

  if (showDashboard) {
    return (
      <ErrorBoundary>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/20 text-white relative">
            <Sidebar 
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={handleToggleSidebar}
              onNewChat={handleNewChat}
              onChatSelect={handleChatChange}
              activeChatId={activeChatId}
            />
            
            <main className="flex-1 flex flex-col relative overflow-hidden">
              <UniversityDashboard />
            </main>

            <QuickActions onAction={handleQuickAction} />

            <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none z-0" />
          </div>
        </SidebarProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-900 via-slate-800 to-purple-900/20 text-white relative">
          <Sidebar 
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={handleToggleSidebar}
            onNewChat={handleNewChat}
            onChatSelect={handleChatChange}
            activeChatId={activeChatId}
          />
          
          <main className="flex-1 flex flex-col relative">
            {activeChatId && (
              <ChatArea 
                chatId={activeChatId}
                onToggleSidebar={handleToggleSidebar}
              />
            )}
          </main>

          <QuickActions onAction={handleQuickAction} />

          <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 pointer-events-none z-0" />
        </div>
      </SidebarProvider>
    </ErrorBoundary>
  );
};

export default Index;
