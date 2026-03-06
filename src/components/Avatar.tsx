import React from 'react';
import { View, Image, Text } from 'react-native';
import { styled } from '../lib/styled';

const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledText = styled(Text);

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
};

export const Avatar = ({ src, name, size = 'md', className, ...props }: any) => {
  const sizeClass = (sizes as any)[size] || sizes.md;

  return (
    <StyledView className={`${sizeClass} rounded-full bg-zinc-800 items-center justify-center overflow-hidden border border-white/10 ${className || ''}`} {...props}>
      {src ? (
        <StyledImage source={{ uri: src }} className="w-full h-full" />
      ) : (
        <StyledText className="text-white font-bold">{name ? name[0].toUpperCase() : '?'}</StyledText>
      )}
    </StyledView>
  );
};
