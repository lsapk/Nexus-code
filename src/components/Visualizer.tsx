import React from 'react';
import { View, Text, ScrollView, FlatList, TextInput } from 'react-native';
import { GlassCard } from './GlassCard';
import { BlurButton } from './BlurButton';
import { Avatar } from './Avatar';
import { Icon } from './Icon';
import { Badge } from './Badge';
import { styled } from '../lib/styled';
import { MotiView } from 'moti';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledScrollView = styled(ScrollView);
const StyledTextInput = styled(TextInput);

const COMPONENTS: Record<string, any> = {
  View: StyledView,
  Text: StyledText,
  ScrollView: StyledScrollView,
  GlassCard,
  BlurButton,
  Avatar,
  Icon,
  Badge,
  Input: StyledTextInput,
};

export const Visualizer = ({ node }: { node: any }) => {
  if (!node) return null;

  const { type, props = {}, children, text } = node;
  const Component = COMPONENTS[type] || StyledView;

  if (type === 'Text') {
    return <Component {...props}>{text}</Component>;
  }

  const renderedChildren = Array.isArray(children)
    ? children.map((child: any, index: number) => (
        <Visualizer key={index} node={child} />
      ))
    : children;

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'timing', duration: 400 }}
    >
      <Component {...props}>
        {renderedChildren}
      </Component>
    </MotiView>
  );
};
