import React, { useState } from 'react';
import type { UserProfile } from '../types';

interface UserAvatarProps {
  user: UserProfile;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'sm', className = '' }) => {
  const [imgError, setImgError] = useState(false);

  const initial = (
    user.displayName?.trim().charAt(0) ||
    user.email?.trim().charAt(0) ||
    'U'
  ).toUpperCase();

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size];

  if (user.photoURL && !user.photoURL.includes('bottts') && !imgError) {
    return (
      <img
        src={user.photoURL}
        alt={user.displayName || 'User profile'}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`${sizeClasses} rounded-full object-cover border border-gray-200 shadow-2xs shrink-0 ${className}`}
      />
    );
  }

  const colors = ['#4285F4', '#188038', '#EA4335', '#D97706', '#7C3AED', '#0284C7'];
  const charCode = (initial.charCodeAt(0) || 0) % colors.length;
  const bgColor = colors[charCode];

  // Google letter avatar style
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`${sizeClasses} rounded-full text-white font-extrabold flex items-center justify-center shrink-0 shadow-2xs select-none ${className}`}
    >
      {initial}
    </div>
  );
};
