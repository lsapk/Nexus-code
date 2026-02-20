import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { styled } from '../lib/styled';

const iconCache = new Map();

export const Icon = ({ name, size = 24, color = "white", ...props }: any) => {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    return null;
  }

  let StyledIcon = iconCache.get(name);
  if (!StyledIcon) {
    StyledIcon = styled(IconComponent);
    iconCache.set(name, StyledIcon);
  }

  return <StyledIcon size={size} color={color} {...props} />;
};
