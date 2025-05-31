
import React from 'react';
import { Brain, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface AIStatusIndicatorProps {
  status: 'online' | 'thinking' | 'offline' | 'error';
  responseTime?: number;
}

export const AIStatusIndicator = ({ status, responseTime }: AIStatusIndicatorProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-400/20',
          text: 'Online',
          pulse: false
        };
      case 'thinking':
        return {
          icon: Brain,
          color: 'text-blue-400',
          bgColor: 'bg-blue-400/20',
          text: 'Thinking...',
          pulse: true
        };
      case 'offline':
        return {
          icon: AlertCircle,
          color: 'text-gray-400',
          bgColor: 'bg-gray-400/20',
          text: 'Offline',
          pulse: false
        };
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-400/20',
          text: 'Error',
          pulse: false
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50 backdrop-blur-md">
      <div className={`p-1 rounded-full ${config.bgColor} ${config.pulse ? 'animate-pulse' : ''}`}>
        <config.icon className={`w-4 h-4 ${config.color}`} />
      </div>
      <span className="text-sm text-gray-300">{config.text}</span>
      {responseTime && status === 'online' && (
        <span className="text-xs text-gray-500">({responseTime}ms)</span>
      )}
    </div>
  );
};
