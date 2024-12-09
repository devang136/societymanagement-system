import { ProfileAvatar } from './ProfileAvatar';
import type { Profile } from '../../types/profile';

interface ProfileViewProps {
  profile: Profile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  const fields = [
    { label: 'First Name', value: profile.firstName },
    { label: 'Last Name', value: profile.lastName },
    { label: 'Phone Number', value: profile.phoneNumber },
    { label: 'Email Address', value: profile.emailAddress },
    { label: 'Select Society', value: profile.society },
    { label: 'Country', value: profile.country },
    { label: 'State', value: profile.state },
    { label: 'City', value: profile.city },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <ProfileAvatar
        imageUrl={profile.avatarUrl}
        name={`${profile.firstName} ${profile.lastName}`}
      />
      <h2 className="text-xl font-medium text-center mb-6">
        {profile.firstName} {profile.lastName}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {fields.map(field => (
          <div key={field.label}>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              {field.label}
            </label>
            <div className="text-gray-900">{field.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}