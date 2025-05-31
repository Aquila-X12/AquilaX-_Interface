
import { useState } from 'react';
import { User, Settings, BookOpen, Trophy, Clock, LogOut, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    level: number;
    xp: number;
    maxXp: number;
    streak: number;
    completedLessons: number;
  };
}

export const UserProfile = ({ user }: UserProfileProps) => {
  // Mock user data if not provided
  const defaultUser = {
    name: 'Alex Student',
    email: 'alex@example.com',
    avatar: '',
    level: 12,
    xp: 2850,
    maxXp: 3000,
    streak: 7,
    completedLessons: 45,
  };

  const userData = user || defaultUser;
  const xpProgress = (userData.xp / userData.maxXp) * 100;

  const handleProfileAction = (action: string) => {
    console.log(`Profile action: ${action}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 h-auto p-2 text-purple-300 hover:text-white hover:bg-purple-600/20 rounded-xl transition-all duration-200"
        >
          <Avatar className="h-8 w-8 border-2 border-purple-400/50">
            <AvatarImage src={userData.avatar} alt={userData.name} />
            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-sm font-semibold">
              {userData.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:flex flex-col items-start">
            <span className="text-sm font-medium text-white">{userData.name}</span>
            <span className="text-xs text-purple-400">Level {userData.level}</span>
          </div>
          <ChevronDown className="h-4 w-4 hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 bg-slate-900/95 backdrop-blur-md border-purple-500/30 z-50"
        align="end"
        side="bottom"
        sideOffset={5}
      >
        {/* Profile Header */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-12 w-12 border-2 border-purple-400/50">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white font-semibold">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{userData.name}</h3>
              <p className="text-sm text-purple-400">{userData.email}</p>
            </div>
          </div>
          
          {/* Level Progress */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-purple-300">Level {userData.level}</span>
              <span className="text-xs text-purple-400">{userData.xp}/{userData.maxXp} XP</span>
            </div>
            <Progress value={xpProgress} className="h-2" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="p-3 border-b border-purple-500/20">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="bg-purple-600/20 rounded-lg p-2">
              <div className="flex items-center justify-center gap-1 text-orange-400 mb-1">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-semibold">{userData.streak}</span>
              </div>
              <span className="text-xs text-purple-400">Day Streak</span>
            </div>
            <div className="bg-blue-600/20 rounded-lg p-2">
              <div className="flex items-center justify-center gap-1 text-blue-400 mb-1">
                <Trophy className="h-4 w-4" />
                <span className="text-sm font-semibold">{userData.completedLessons}</span>
              </div>
              <span className="text-xs text-purple-400">Completed</span>
            </div>
          </div>
        </div>

        <DropdownMenuLabel className="text-purple-400 text-xs font-medium">
          Account
        </DropdownMenuLabel>
        
        <DropdownMenuItem 
          onClick={() => handleProfileAction('profile')}
          className="text-purple-300 hover:text-white hover:bg-purple-600/20 cursor-pointer"
        >
          <User className="h-4 w-4 mr-2" />
          View Profile
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleProfileAction('progress')}
          className="text-purple-300 hover:text-white hover:bg-purple-600/20 cursor-pointer"
        >
          <BookOpen className="h-4 w-4 mr-2" />
          Learning Progress
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleProfileAction('achievements')}
          className="text-purple-300 hover:text-white hover:bg-purple-600/20 cursor-pointer"
        >
          <Trophy className="h-4 w-4 mr-2" />
          Achievements
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          onClick={() => handleProfileAction('settings')}
          className="text-purple-300 hover:text-white hover:bg-purple-600/20 cursor-pointer"
        >
          <Settings className="h-4 w-4 mr-2" />
          Account Settings
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-purple-500/20" />
        
        <DropdownMenuItem 
          onClick={() => handleProfileAction('logout')}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
