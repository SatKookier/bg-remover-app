
import React from 'react';

interface SpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-5 w-5 border-t-2 border-b-2',
    medium: 'h-8 w-8 border-t-4 border-b-4', // Previous default was h-12 w-12, reducing for better fit
    large: 'h-12 w-12 border-t-4 border-b-4',
  };
  return (
    <div className={`inline-block animate-spin rounded-full border-sky-500 ${sizeClasses[size]}`}></div>
  );
};
