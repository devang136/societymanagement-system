import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Message, Contact, CallState } from '../types';

interface ChatState {
  contacts: Contact[];
  activeContact: Contact | null;
  messages: Record<number, Message[]>;
  currentUser: User;
  call: CallState;
}

type ChatAction =
  | { type: 'SET_ACTIVE_CONTACT'; payload: Contact }
  | { type: 'ADD_MESSAGE'; payload: { contactId: number; message: Message } }
  | { type: 'FILTER_CONTACTS'; payload: string }
  | { type: 'START_CALL'; payload: { contactId: number; isVideo: boolean } }
  | { type: 'END_CALL' };

const initialState: ChatState = {
  currentUser: {
    id: 0,
    name: 'You',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    status: 'Online',
  },
  contacts: [
    { id: 1, name: 'Devang', status: 'Hey there! How are you doing?', time: '12m', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
    { id: 2, name: 'Pinki', status: 'Working on the new project', time: '27m', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
    { id: 3, name: 'Ravina', status: 'Available', time: '1h', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
    { id: 4, name: 'Path', status: 'Active now', time: '2h', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&h=100&fit=crop' },
    { id: 4, name: 'JAY', status: 'Active now', time: '2h', avatar: 'https://img.freepik.com/premium-vector/modern-headphones-concept-design-with-enhanced-features_1263357-35421.jpg' },

  ],
  activeContact: null,
  messages: {
    4: [
      { id: 1, senderId: 4, content: 'Hi there, How are you?', timestamp: '10:30 AM' },
      { id: 2, senderId: 0, content: 'Nothing to say now. Am I here to to have lunch. Have to meet my girlfriend.', timestamp: '10:31 AM' },
      { id: 3, senderId: 0, content: 'Ok, I\'m running down to her...', timestamp: '10:32 AM' },
      { id: 4, senderId: 4, content: 'I\'m running down to her...', timestamp: '10:33 AM', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=400&fit=crop' },
    ],
  },
  call: {
    isIncoming: false,
    isOutgoing: false,
    isActive: false,
    isVideo: false,
  },
};

const chatReducer = (state: ChatState, action: ChatAction): ChatState => {
  switch (action.type) {
    case 'SET_ACTIVE_CONTACT':
      return { ...state, activeContact: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.contactId]: [
            ...(state.messages[action.payload.contactId] || []),
            action.payload.message,
          ],
        },
      };
    case 'FILTER_CONTACTS':
      const filteredContacts = initialState.contacts.filter(contact =>
        contact.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      return { ...state, contacts: filteredContacts };
    case 'START_CALL':
      return {
        ...state,
        call: {
          isIncoming: false,
          isOutgoing: true,
          isActive: true,
          isVideo: action.payload.isVideo,
          contactId: action.payload.contactId,
        },
      };
    case 'END_CALL':
      return {
        ...state,
        call: {
          isIncoming: false,
          isOutgoing: false,
          isActive: false,
          isVideo: false,
        },
      };
    default:
      return state;
  }
};

const ChatContext = createContext<{
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
} | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={{ state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}