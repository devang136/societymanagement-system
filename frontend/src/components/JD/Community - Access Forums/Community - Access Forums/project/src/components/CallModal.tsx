import React, { useEffect, useRef } from 'react';
import { Phone, Video, X, Mic, MicOff, VideoOff } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';

export function CallModal() {
  const { state, dispatch } = useChatContext();
  const [isMuted, setIsMuted] = React.useState(false);
  const [isVideoOff, setIsVideoOff] = React.useState(false);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (state.call.isActive && state.call.isVideo) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error('Error accessing media devices:', err));
    }
  }, [state.call.isActive, state.call.isVideo]);

  const handleEndCall = () => {
    dispatch({ type: 'END_CALL' });
    if (localVideoRef.current?.srcObject) {
      (localVideoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach(track => track.stop());
    }
  };

  if (!state.call.isActive) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {state.call.isVideo ? 'Video Call' : 'Voice Call'}
          </h2>
          <button
            onClick={handleEndCall}
            className="p-2 hover:bg-red-100 rounded-full"
          >
            <X className="w-6 h-6 text-red-600" />
          </button>
        </div>

        {state.call.isVideo && (
          <div className="relative mb-4 bg-gray-900 rounded-lg aspect-video">
            <video
              ref={remoteVideoRef}
              className="w-full h-full rounded-lg"
              autoPlay
              playsInline
            />
            <video
              ref={localVideoRef}
              className="absolute bottom-4 right-4 w-48 rounded-lg border-2 border-white"
              autoPlay
              playsInline
              muted
            />
          </div>
        )}

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-4 rounded-full ${
              isMuted ? 'bg-red-500' : 'bg-gray-200'
            }`}
          >
            {isMuted ? (
              <MicOff className="w-6 h-6 text-white" />
            ) : (
              <Mic className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {state.call.isVideo && (
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-4 rounded-full ${
                isVideoOff ? 'bg-red-500' : 'bg-gray-200'
              }`}
            >
              {isVideoOff ? (
                <VideoOff className="w-6 h-6 text-white" />
              ) : (
                <Video className="w-6 h-6 text-gray-700" />
              )}
            </button>
          )}

          <button
            onClick={handleEndCall}
            className="p-4 bg-red-500 rounded-full"
          >
            <Phone className="w-6 h-6 text-white transform rotate-225" />
          </button>
        </div>
      </div>
    </div>
  );
}