import React from 'react';
import { View, Text } from 'react-native';
import { styled } from '../lib/styled';

const StyledView = styled(View);
const StyledText = styled(Text);

export const Badge = ({ children, className, variant = 'default', ...props }: any) => {
  const variants: any = {
    default: 'bg-zinc-800',
    primary: 'bg-cyan-500/20 border border-cyan-500/50',
    success: 'bg-green-500/20 border border-green-500/50',
    error: 'bg-red-500/20 border border-red-500/50',
  };

  const variantClass = variants[variant] || variants.default;

  return (
    <StyledView className={`px-2 py-0.5 rounded-full ${variantClass} ${className || ''}`} {...props}>
      <StyledText className="text-white text-xs font-medium">{children}</StyledText>
    </StyledView>
  );
};
