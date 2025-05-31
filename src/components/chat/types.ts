/**
*Interface for conversion context
*/
export interface ConversationContext {
  topics: string[];
  userPreferences: {
    responseStyle: 'detailed' | 'concise' | 'casual';
    expertise: 'beginner' | 'intermediate' | 'expert';
  };
  conversationHistory: string[];
}
