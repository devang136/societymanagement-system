import { Camera } from 'lucide-react';

interface ProfileAvatarProps {
  imageUrl: string;
  name: string;
  editable?: boolean;
}

export function ProfileAvatar({ imageUrl, name, editable }: ProfileAvatarProps) {
  return (
    <div className="relative w-32 h-32 mx-auto mb-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full rounded-full object-cover"
      />
      {editable && (
        <button
          className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-200"
          aria-label="Change profile picture"
        >
          <Camera className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
}