
import { useState, useEffect } from 'react';
import { Settings, Sparkles, Volume2, VolumeX, Palette, Zap, Brain, Lightbulb, Target, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const AIExperiencePanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [creativityLevel, setCreativityLevel] = useState(50);
  const [responseSpeed, setResponseSpeed] = useState(75);
  const [selectedPersonality, setSelectedPersonality] = useState('friendly');
  const [selectedTheme, setSelectedTheme] = useState('cosmic');

  // Handle escape key and click outside to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (isOpen && 
          !target.closest('[role="dialog"]') && 
          !target.closest('[data-dialog-trigger]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const personalities = [
    { id: 'friendly', name: 'Friendly Tutor', emoji: '😊', description: 'Encouraging and supportive' },
    { id: 'professional', name: 'Professional', emoji: '🎓', description: 'Formal and structured' },
    { id: 'creative', name: 'Creative Mentor', emoji: '🎨', description: 'Imaginative and inspiring' },
    { id: 'analytical', name: 'Analytical', emoji: '🔬', description: 'Logical and detail-oriented' },
    { id: 'motivational', name: 'Motivational Coach', emoji: '💪', description: 'Energetic and driven' },
  ];

  const themes = [
    { id: 'cosmic', name: 'Cosmic Purple', colors: 'from-purple-600 to-blue-600' },
    { id: 'ocean', name: 'Ocean Blue', colors: 'from-blue-600 to-cyan-600' },
    { id: 'forest', name: 'Forest Green', colors: 'from-green-600 to-emerald-600' },
    { id: 'sunset', name: 'Sunset Orange', colors: 'from-orange-600 to-red-600' },
    { id: 'midnight', name: 'Midnight Dark', colors: 'from-gray-800 to-black' },
  ];

  const studyModes = [
    { id: 'focus', name: 'Focus Mode', icon: Target, description: 'Minimize distractions' },
    { id: 'speed', name: 'Speed Learning', icon: Zap, description: 'Quick Q&A sessions' },
    { id: 'deep', name: 'Deep Dive', icon: Brain, description: 'Comprehensive explanations' },
    { id: 'creative', name: 'Creative Mode', icon: Lightbulb, description: 'Brainstorming and ideation' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-dialog-trigger
          className="text-purple-300 hover:text-white hover:bg-purple-600/30 rounded-xl transition-all duration-200 transform hover:scale-105 relative"
        >
          <Settings className="h-5 w-5" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-slate-900/95 backdrop-blur-md border-purple-500/30 max-w-4xl max-h-[85vh] z-50 p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl font-bold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              AI Experience Center
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-purple-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-120px)] px-6 pb-6">
          <div className="space-y-8">
            
            {/* Quick Actions */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Study Modes
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {studyModes.map((mode) => (
                  <button
                    key={mode.id}
                    className="flex items-center gap-3 p-4 bg-slate-800/50 hover:bg-purple-600/20 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-200 text-left"
                  >
                    <mode.icon className="h-5 w-5 text-purple-400" />
                    <div>
                      <div className="text-white font-medium text-sm">{mode.name}</div>
                      <div className="text-purple-400 text-xs">{mode.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Voice & Audio */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-blue-400" />
                Voice & Audio
              </h3>
              <div className="bg-slate-800/30 rounded-xl p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Voice Responses</div>
                    <div className="text-purple-400 text-sm">Enable AI voice responses</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`rounded-full ${voiceEnabled ? 'bg-green-600/20 text-green-400' : 'bg-slate-700 text-gray-400'}`}
                  >
                    {voiceEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-2">
                  {['Sarah', 'David', 'Emma'].map((voice) => (
                    <button
                      key={voice}
                      className="p-3 bg-slate-700/50 hover:bg-purple-600/20 rounded-lg text-center transition-all duration-200"
                    >
                      <div className="text-white text-sm font-medium">{voice}</div>
                      <div className="text-purple-400 text-xs">Neural</div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* AI Personality */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-pink-400" />
                AI Personality
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {personalities.map((personality) => (
                  <button
                    key={personality.id}
                    onClick={() => setSelectedPersonality(personality.id)}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left ${
                      selectedPersonality === personality.id
                        ? 'bg-purple-600/20 border-purple-400/50 text-white'
                        : 'bg-slate-800/30 border-purple-500/20 text-purple-300 hover:bg-purple-600/10'
                    }`}
                  >
                    <div className="text-2xl">{personality.emoji}</div>
                    <div>
                      <div className="font-medium">{personality.name}</div>
                      <div className="text-xs opacity-80">{personality.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* AI Behavior */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-400" />
                AI Behavior
              </h3>
              <div className="bg-slate-800/30 rounded-xl p-4 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Creativity Level</span>
                    <span className="text-purple-400 text-sm">{creativityLevel}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={creativityLevel}
                    onChange={(e) => setCreativityLevel(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-purple-400 mt-1">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white font-medium">Response Speed</span>
                    <span className="text-purple-400 text-sm">{responseSpeed}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={responseSpeed}
                    onChange={(e) => setResponseSpeed(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-purple-400 mt-1">
                    <span>Thorough</span>
                    <span>Balanced</span>
                    <span>Quick</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Theme Customization */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Palette className="h-5 w-5 text-green-400" />
                Theme & Appearance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-4 rounded-xl border transition-all duration-200 ${
                      selectedTheme === theme.id
                        ? 'border-purple-400/50'
                        : 'border-purple-500/20 hover:border-purple-400/30'
                    }`}
                  >
                    <div className={`w-full h-8 rounded-lg bg-gradient-to-r ${theme.colors} mb-2`}></div>
                    <div className="text-white text-sm font-medium">{theme.name}</div>
                  </button>
                ))}
              </div>
            </section>

            {/* Learning Analytics */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-400" />
                Today's Progress
              </h3>
              <div className="bg-slate-800/30 rounded-xl p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">2.5h</div>
                    <div className="text-purple-300 text-sm">Study Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">12</div>
                    <div className="text-purple-300 text-sm">Questions Answered</div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-white text-sm">Daily Goal Progress</span>
                    <span className="text-purple-400 text-sm">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              </div>
            </section>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
