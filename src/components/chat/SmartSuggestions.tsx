
import React from 'react';
import { Lightbulb, TrendingUp, Clock, Star } from 'lucide-react';

interface SmartSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const SmartSuggestions = ({ onSuggestionClick }: SmartSuggestionsProps) => {
  const suggestions = [
    {
      icon: Lightbulb,
      text: "Explain quantum computing in simple terms",
      category: "Learning",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: TrendingUp,
      text: "What are the latest AI trends in 2024?",
      category: "Trending",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: Clock,
      text: "Help me plan my day efficiently",
      category: "Productivity",
      color: "from-blue-500 to-purple-500"
    },
    {
      icon: Star,
      text: "Create a creative writing prompt",
      category: "Creative",
      color: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 max-w-4xl mx-auto">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion.text)}
          className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${suggestion.color} shadow-lg`}>
              <suggestion.icon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <div className="text-sm text-gray-400 mb-1">{suggestion.category}</div>
              <div className="text-white font-medium group-hover:text-blue-300 transition-colors">
                {suggestion.text}
              </div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
      ))}
    </div>
  );
};
