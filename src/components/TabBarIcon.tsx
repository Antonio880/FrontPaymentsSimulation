import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';

interface TabBarIconProps extends IconProps<ComponentProps<typeof Ionicons>['name']> {
  name: ComponentProps<typeof Ionicons>['name'];
  color: string;
}

export function TabBarIcon({ name, color, style, ...rest }: TabBarIconProps) {
  return <Ionicons name={name} size={28} color={color} style={[{ marginBottom: -3 }, style]} {...rest} />;
}