import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { styled } from '../lib/styled';

const StyledBlurView = styled(BlurView);
const StyledView = styled(View);
const StyledText = styled(Text);

export const BlurButton = ({ children, className, textClassName, onPress, intensity = 30, ...props }: any) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={{ transform: [{ scale: pressed ? 0.95 : 1 }] }}
        >
          <StyledView className={`overflow-hidden rounded-2xl border border-white/20 ${className || ''}`} {...props}>
            <StyledBlurView intensity={intensity} className="py-3 px-6 items-center justify-center">
              {typeof children === 'string' ? (
                <StyledText className={`text-white font-semibold ${textClassName || ''}`}>{children}</StyledText>
              ) : (
                children
              )}
            </StyledBlurView>
          </StyledView>
        </View>
      )}
    </Pressable>
  );
};
