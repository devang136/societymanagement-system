import { Phone, Video, MoreVertical } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

export function ChatHeader() {
  const { state, dispatch } = useChatContext();
  const contact = state.activeContact;

  if (!contact) return null;

  const handleVoiceCall = () => {
    dispatch({ type: 'START_CALL', payload: { contactId: contact.id, isVideo: false } });
  };

  const handleVideoCall = () => {
    dispatch({ type: 'START_CALL', payload: { contactId: contact.id, isVideo: true } });
  };

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex items-center">
        <img
          src={contact.avatar}
          alt={contact.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="font-medium text-gray-900">{contact.name}</h2>
          <p className="text-sm text-gray-500">{contact.status}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={handleVoiceCall}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleVideoCall}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}