import React from 'react';
import { View } from 'react-native';
import { BlurView } from 'expo-blur';
import { styled } from '../lib/styled';

const StyledBlurView = styled(BlurView);

export const GlassCard = ({ children, className, intensity = 20, ...props }: any) => {
  return (
    <View
      className={`overflow-hidden rounded-3xl border border-white/10 ${className}`}
      {...props}
    >
      <StyledBlurView intensity={intensity} className="flex-1 p-4">
        {children}
      </StyledBlurView>
    </View>
  );
};
