import React from 'react';
import { View, ViewProps } from 'react-native';
import { styled } from '../lib/styled';

interface SmoothStackProps extends ViewProps {
  spacing?: number;
  horizontal?: boolean;
  className?: string;
}

const StyledView = styled(View);

export const SmoothStack: React.FC<SmoothStackProps> = ({
  children,
  spacing = 4,
  horizontal = false,
  className,
  ...props
}) => {
  const gapClass = horizontal ? `gap-x-${spacing}` : `gap-y-${spacing}`;
  const flexClass = horizontal ? 'flex-row' : 'flex-col';

  return (
    <StyledView
      className={`${flexClass} ${gapClass} ${className || ''}`}
      {...props}
    >
      {children}
    </StyledView>
  );
};
