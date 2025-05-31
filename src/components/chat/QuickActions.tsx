
import React from 'react';
import { 
  Zap, 
  FileText, 
  Download, 
  Share2, 
  Settings, 
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export const QuickActions = ({ onAction }: QuickActionsProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const actions = [
    { id: 'summarize', icon: FileText, label: 'Summarize', color: 'text-blue-400' },
    { id: 'export', icon: Download, label: 'Export Chat', color: 'text-green-400' },
    { id: 'share', icon: Share2, label: 'Share', color: 'text-purple-400' },
    { id: 'settings', icon: Settings, label: 'Settings', color: 'text-gray-400' },
  ];

  return (
    <div className="fixed right-4 bottom-24 z-50">
      <div className={`bg-gray-800/90 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-2xl transition-all duration-300 ${
        isExpanded ? 'p-3' : 'p-2'
      }`}>
        {isExpanded && (
          <div className="flex flex-col gap-2 mb-2">
            {actions.map((action) => (
              <button
                key={action.id}
                onClick={() => {
                  onAction(action.id);
                  setIsExpanded(false);
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700/50 transition-colors group"
              >
                <action.icon size={16} className={action.color} />
                <span className="text-sm text-gray-300 group-hover:text-white">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        )}
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
        >
          {isExpanded ? (
            <X size={20} className="text-white" />
          ) : (
            <Zap size={20} className="text-white" />
          )}
        </button>
      </div>
    </div>
  );
};
