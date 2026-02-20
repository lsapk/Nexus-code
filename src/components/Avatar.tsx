import React from 'react';
import { View, Image, Text } from 'react-native';

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export const Avatar = ({ src, name, size = 'md', className, ...props }: any) => {
  const sizeClass = sizes[size as keyof typeof sizes] || sizes.md;

  return (
    <View className={`${sizeClass} rounded-full bg-zinc-800 items-center justify-center overflow-hidden border border-white/10 ${className}`} {...props}>
      {src ? (
        <Image source={{ uri: src }} className="w-full h-full" />
      ) : (
        <Text className="text-white font-bold">{name ? name[0].toUpperCase() : '?'}</Text>
      )}
    </View>
  );
};
