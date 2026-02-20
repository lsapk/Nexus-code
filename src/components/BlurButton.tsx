import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { styled } from '../lib/styled';
import { MotiView } from 'moti';

const StyledBlurView = styled(BlurView);

export const BlurButton = ({ children, className, textClassName, onPress, intensity = 30, ...props }: any) => {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <MotiView
          animate={{ scale: pressed ? 0.95 : 1 }}
          transition={{ type: 'spring', damping: 15 }}
        >
          <View className={`overflow-hidden rounded-2xl border border-white/20 ${className}`} {...props}>
            <StyledBlurView intensity={intensity} className="py-3 px-6 items-center justify-center">
              {typeof children === 'string' ? (
                <Text className={`text-white font-semibold ${textClassName}`}>{children}</Text>
              ) : (
                children
              )}
            </StyledBlurView>
          </View>
        </MotiView>
      )}
    </Pressable>
  );
};
