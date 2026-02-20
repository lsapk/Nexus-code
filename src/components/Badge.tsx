import React from 'react';
import { View, Text } from 'react-native';

export const Badge = ({ children, className, variant = 'default', ...props }: any) => {
  const variants = {
    default: 'bg-zinc-800',
    primary: 'bg-primary/20 border border-primary/50',
    success: 'bg-green-500/20 border border-green-500/50',
    error: 'bg-red-500/20 border border-red-500/50',
  };

  const variantClass = variants[variant as keyof typeof variants] || variants.default;

  return (
    <View className={`px-2 py-0.5 rounded-full ${variantClass} ${className}`} {...props}>
      <Text className="text-white text-xs font-medium">{children}</Text>
    </View>
  );
};
