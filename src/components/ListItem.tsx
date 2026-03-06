import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';
import { styled } from '../lib/styled';

interface ListItemProps {
  title: string;
  subtitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onPress?: () => void;
  className?: string;
}

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  onPress,
  className
}) => {
  const Container = onPress ? StyledTouchableOpacity : StyledView;

  return (
    <Container
      onPress={onPress}
      className={`flex-row items-center p-4 border-b border-zinc-800/50 ${className || ''}`}
    >
      {leftIcon && (
        <StyledView className="mr-4 p-2 bg-zinc-900 rounded-lg border border-zinc-800">
          <Icon name={leftIcon} size={20} color="#06b6d4" />
        </StyledView>
      )}
      <StyledView className="flex-1">
        <StyledText className="text-white font-medium">{title}</StyledText>
        {subtitle && (
          <StyledText className="text-zinc-500 text-sm mt-0.5">{subtitle}</StyledText>
        )}
      </StyledView>
      {rightIcon ? (
        <Icon name={rightIcon} size={16} color="#4b5563" />
      ) : onPress ? (
        <Icon name="ChevronRight" size={16} color="#4b5563" />
      ) : null}
    </Container>
  );
};
