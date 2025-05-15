import { PropsWithChildren, useState, ReactElement } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export function Collapsible({ 
  children, 
  title,
  icon 
}: PropsWithChildren & { 
  title: string;
  icon?: ReactElement;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name="chevron.right"
          size={18}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={[styles.chevron, { transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }]}
        />
        
        <ThemedView style={styles.titleContainer}>
          {icon}
          <ThemedText type="defaultSemiBold">{title}</ThemedText>
        </ThemedView>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginRight: 6,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    marginTop: 12,
    marginLeft: 24,
  },
});
