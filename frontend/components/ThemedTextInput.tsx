import { StyleSheet, TextInput, TextInputProps, useColorScheme } from 'react-native';
import { ThemedView } from './ThemedView';

interface ThemedTextInputProps extends TextInputProps {
  style?: TextInputProps['style'];
}

export function ThemedTextInput({ style, ...props }: ThemedTextInputProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.input,
          isDark ? styles.darkInput : styles.lightInput,
          style,
        ]}
        placeholderTextColor={isDark ? '#666' : '#999'}
        {...props}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
  },
  lightInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
  },
  darkInput: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#333',
    color: '#fff',
  },
}); 