import { StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface SearchHistoryProps {
  history: string[];
  onSelect: (item: string) => void;
  onClearHistory: () => void;
}

export function SearchHistory({ 
  history, 
  onSelect,
  onClearHistory 
}: SearchHistoryProps) {
  return (
    <ThemedView style={styles.container}>
      {history.length > 0 && (
        <ThemedView style={styles.section}>
          <ThemedView style={styles.sectionHeader}>
            <ThemedText type="subtitle">Recent Searches</ThemedText>
            <TouchableOpacity onPress={onClearHistory}>
              <ThemedText style={styles.clearButton}>Clear</ThemedText>
            </TouchableOpacity>
          </ThemedView>
          {history.map((item) => (
            <TouchableOpacity
              key={item}
              style={styles.historyItem}
              onPress={() => onSelect(item)}>
              <IconSymbol name="clock" size={16} color="#666" />
              <ThemedText>{item}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingHorizontal: 16,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  clearButton: {
    color: '#FF5252',
  },
}); 