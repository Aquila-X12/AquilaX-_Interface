import { useState, useRef, useEffect } from 'react';
import { Search, MoreVertical, Sparkles, Grid3X3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { AIExperiencePanel } from './AIExperiencePanel';
import { UserProfile } from './UserProfile';

interface ChatHeaderProps {
  onToggleSidebar: () => void;
}

export const ChatHeader = ({ onToggleSidebar }: ChatHeaderProps) => {
  const [isAppsDialogOpen, setIsAppsDialogOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus search input when search is opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle escape key and click outside to close dialogs
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAppsDialogOpen(false);
        setIsSearchOpen(false);
        setIsMoreMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Close apps dialog if clicking outside
      if (isAppsDialogOpen && 
          !target.closest('[role="dialog"]') && 
          !target.closest('[data-dialog-trigger]') &&
          !target.closest('[data-radix-popper-content-wrapper]')) {
        setIsAppsDialogOpen(false);
      }
      
      // Close search if clicking outside
      if (isSearchOpen && !target.closest('[data-search-container]')) {
        setIsSearchOpen(false);
      }

      // Close more menu if clicking outside
      if (isMoreMenuOpen && 
          !target.closest('[data-radix-popper-content-wrapper]') &&
          !target.closest('button[aria-expanded="true"]')) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isAppsDialogOpen, isSearchOpen, isMoreMenuOpen]);

  const apps = [
    { name: 'Gmail', icon: '📧', description: 'Email management' },
    { name: 'Calendar', icon: '📅', description: 'Schedule & events' },
    { name: 'Drive', icon: '📁', description: 'Cloud storage' },
    { name: 'Docs', icon: '📝', description: 'Document editor' },
    { name: 'Sheets', icon: '📊', description: 'Spreadsheet editor' },
    { name: 'Slides', icon: '📽️', description: 'Presentation tool' },
    { name: 'Photos', icon: '📷', description: 'Photo management' },
    { name: 'Maps', icon: '🗺️', description: 'Navigation & maps' },
    { name: 'YouTube', icon: '📺', description: 'Video platform' },
    { name: 'Translate', icon: '🌐', description: 'Language translation' },
    { name: 'News', icon: '📰', description: 'Latest news' },
    { name: 'Weather', icon: '🌤️', description: 'Weather forecast' },
  ];

  const handleAppClick = (appName: string) => {
    console.log(`Opening ${appName}...`);
    setIsAppsDialogOpen(false);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/80 to-purple-800/80 backdrop-blur-md border-b border-purple-500/20 relative z-30">
      {/* Left Section - Logo only */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-purple-400 animate-pulse" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Aquilax AI
            </h1>
          </div>
          <div className="hidden md:block px-3 py-1 bg-purple-600/20 rounded-full text-xs text-purple-300 border border-purple-500/30">
            GPT-4 Turbo
          </div>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-2xl mx-8">
        {!isSearchOpen ? (
          <Button
            variant="ghost"
            onClick={() => setIsSearchOpen(true)}
            className="w-full justify-start bg-slate-800/50 hover:bg-slate-700/50 border border-purple-500/20 text-purple-300 rounded-xl px-4 py-3 transition-all duration-200"
          >
            <Search className="h-4 w-4 mr-3" />
            <span>Search conversations...</span>
          </Button>
        ) : (
          <div className="relative" data-search-container>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-10 py-3 bg-slate-800/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-400/60 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/20 transition-all duration-200"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(false)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-purple-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* AI Experience Panel */}
        <AIExperiencePanel />

        {/* Apps Dialog */}
        <Dialog open={isAppsDialogOpen} onOpenChange={setIsAppsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              data-dialog-trigger
              className="text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <Grid3X3 className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-900/95 backdrop-blur-md border-purple-500/30 max-w-2xl z-50">
            <DialogHeader>
              <DialogTitle className="text-white text-center">Apps</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
              {apps.map((app) => (
                <button
                  key={app.name}
                  onClick={() => handleAppClick(app.name)}
                  className="flex flex-col items-center p-4 rounded-xl bg-slate-800/50 hover:bg-purple-600/20 transition-all duration-200 transform hover:scale-105 border border-transparent hover:border-purple-500/30"
                >
                  <div className="text-3xl mb-2">{app.icon}</div>
                  <span className="text-sm text-white font-medium">{app.name}</span>
                  <span className="text-xs text-purple-400/80 text-center mt-1">{app.description}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* More Options */}
        <DropdownMenu open={isMoreMenuOpen} onOpenChange={setIsMoreMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            className="bg-slate-800/95 backdrop-blur-md border-purple-500/30 z-50"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <DropdownMenuItem 
              className="text-purple-300 hover:text-white hover:bg-purple-600/20"
              onClick={() => setIsMoreMenuOpen(false)}
            >
              🎨 Customize Theme
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-purple-300 hover:text-white hover:bg-purple-600/20"
              onClick={() => setIsMoreMenuOpen(false)}
            >
              🔊 Voice Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-purple-300 hover:text-white hover:bg-purple-600/20"
              onClick={() => setIsMoreMenuOpen(false)}
            >
              🤖 AI Personality
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-purple-500/20" />
            <DropdownMenuItem 
              className="text-purple-300 hover:text-white hover:bg-purple-600/20"
              onClick={() => setIsMoreMenuOpen(false)}
            >
              ⚙️ Settings
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-purple-300 hover:text-white hover:bg-purple-600/20"
              onClick={() => setIsMoreMenuOpen(false)}
            >
              ❓ Help & Support
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile - positioned at the far right for easy access */}
        <UserProfile />
      </div>
    </header>
  );
};
