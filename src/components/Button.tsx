import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  const { onPress, title = '', disabled = false } = props;
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !disabled && styles.buttonPressed
      ]}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 6,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
