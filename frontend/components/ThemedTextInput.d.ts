import { TextInputProps } from 'react-native';

export interface ThemedTextInputProps extends TextInputProps {
  style?: TextInputProps['style'];
}

export function ThemedTextInput(props: ThemedTextInputProps): JSX.Element; 