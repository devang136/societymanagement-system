import { ChatProvider } from './context/ChatContext';
import { ChatSidebar } from './components/ChatSidebar';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { CallModal } from './components/CallModal';
import { useChatContext } from './context/ChatContext';

function ChatContainer() {
  const { state } = useChatContext();
  const messages = state.activeContact ? state.messages[state.activeContact.id] || [] : [];

  return (
    <div className="flex h-screen bg-white">
      <ChatSidebar />
      <div className="flex-1 flex flex-col">
        <ChatHeader />
        {state.activeContact ? (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {messages.map((message) => (
                <ChatMessage key={message.id} {...message} />
              ))}
            </div>
            <ChatInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a contact to start chatting
          </div>
        )}
      </div>
      <CallModal />
    </div>
  );
}

function App() {
  return (
    <ChatProvider>
      <ChatContainer />
    </ChatProvider>
  );
}

export default App;