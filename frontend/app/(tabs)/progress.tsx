import { useState } from 'react';
import { TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface CalorieLog {
  [date: string]: {
    total: number;
    entries: number[];
  };
}

const DAILY_CALORIE_GOAL = 2000;

export default function ProgressScreen() {
  const [calories, setCalories] = useState('');
  const [calorieLog, setCalorieLog] = useState<CalorieLog>({});

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
  };

  const undoCalories = () => {
    const date = getCurrentDate();
    setCalorieLog((prevLog) => {
      const currentDateLog = prevLog[date] || { total: 0, entries: [] };
      if (currentDateLog.entries.length === 0) return prevLog;

      const updatedEntries = [...currentDateLog.entries];
      const lastEntry = updatedEntries.pop() || 0;
      
      return {
        ...prevLog,
        [date]: {
          entries: updatedEntries,
          total: currentDateLog.total - lastEntry
        }
      };
    });
  };

  const clearCalories = () => {
    const date = getCurrentDate();
    setCalorieLog((prevLog) => ({
      ...prevLog,
      [date]: { total: 0, entries: [] }
    }));
    setCalories('');
  };

  const addCalories = () => {
    const calorieIntake = parseInt(calories, 10);

    if (isNaN(calorieIntake) || calorieIntake <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid number of calories.');
      return;
    }

    const date = getCurrentDate();
    setCalorieLog((prevLog) => {
      const currentDateLog = prevLog[date] || { total: 0, entries: [] };
      return {
        ...prevLog,
        [date]: {
          entries: [...currentDateLog.entries, calorieIntake],
          total: currentDateLog.total + calorieIntake
        }
      };
    });

    setCalories('');
  };

  const getCaloriesLeft = (total: number) => {
    const remaining = DAILY_CALORIE_GOAL - total;
    return remaining > 0 ? remaining : 0;
  };

  const getProgressPercentage = (total: number) => {
    return Math.min((total / DAILY_CALORIE_GOAL) * 100, 100);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F5F5F5', dark: '#1C1C1E' }}
      headerImage={
        <Image
          source={require('@/assets/images/calories.png')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Calorie Tracker</ThemedText>
          <IconSymbol name="chart.bar.fill" size={24} color="#2196F3" />
        </ThemedView>

        <ThemedView style={styles.inputSection}>
          <ThemedView style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter calories..."
              placeholderTextColor="#888"
              value={calories}
              keyboardType="numeric"
              onChangeText={setCalories}
            />
            <TouchableOpacity 
              style={styles.addButton}
              onPress={addCalories}>
              <IconSymbol name="plus" size={24} color="#fff" />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.undoButton]}
              onPress={undoCalories}>
              <IconSymbol name="arrow.uturn.backward" size={20} color="#fff" />
              <ThemedText>Undo</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.clearButton]}
              onPress={clearCalories}>
              <IconSymbol name="trash" size={20} color="#fff" />
              <ThemedText>Clear</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.statsContainer}>
          {Object.entries(calorieLog).map(([date, log]) => (
            <ThemedView key={date} style={styles.dateStats}>
              <ThemedView style={styles.dateHeader}>
                <ThemedText type="subtitle">{formatDate(date)}</ThemedText>
                <ThemedText type="defaultSemiBold">{log.total} / {DAILY_CALORIE_GOAL} kcal</ThemedText>
              </ThemedView>
              
              <ThemedView style={styles.progressBarContainer}>
                <ThemedView 
                  style={[
                    styles.progressBar, 
                    { width: `${getProgressPercentage(log.total)}%` }
                  ]} 
                />
              </ThemedView>

              <ThemedView style={styles.statsDetails}>
                <StatsItem 
                  label="Consumed"
                  value={`${log.total} kcal`}
                  icon="flame.fill"
                  color="#FF9800"
                />
                <StatsItem 
                  label="Remaining"
                  value={`${getCaloriesLeft(log.total)} kcal`}
                  icon="leaf.fill"
                  color="#4CAF50"
                />
                <StatsItem 
                  label="Entries"
                  value={log.entries.length.toString()}
                  icon="number"
                  color="#2196F3"
                />
              </ThemedView>
            </ThemedView>
          ))}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

function StatsItem({ label, value, icon, color }: { 
  label: string; 
  value: string; 
  icon: string;
  color: string;
}) {
  return (
    <ThemedView style={styles.statsItem}>
      <IconSymbol name={icon} size={20} color={color} />
      <ThemedView>
        <ThemedText style={styles.statsLabel}>{label}</ThemedText>
        <ThemedText type="defaultSemiBold">{value}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  inputSection: {
    gap: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 50,
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#fff",
    backgroundColor: "#222",
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  undoButton: {
    backgroundColor: '#2196F3',
  },
  clearButton: {
    backgroundColor: '#FF5252',
  },
  statsContainer: {
    gap: 24,
  },
  dateStats: {
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  statsDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statsLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  headerImage: {
    width: 220,
    height: 220,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: [{ translateX: -110 }, { translateY: -90 }],
  },
});