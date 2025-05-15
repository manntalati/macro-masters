import { StyleSheet, View } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { IconSymbol } from './ui/IconSymbol';

interface NutritionCardProps {
  foodItem: {
    name: string;
    calories: number;
    protein: number;
    carbohydrates: number;
    total_fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
}

const DAILY_VALUES = {
  calories: 2000,
  protein: 50,
  carbohydrates: 275,
  total_fat: 78,
  fiber: 28,
  sugar: 50,
  sodium: 2300,
};

const getProgressColor = (value: number, max: number) => {
  const percentage = (value / max) * 100;
  if (percentage > 100) return '#FF5252';
  if (percentage > 75) return '#FF9800';
  return '#4CAF50';
};

const getProgressPercentage = (value: number, max: number) => {
  return Math.min((value / max) * 100, 100);
};

export function NutritionCard({ foodItem }: NutritionCardProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>{foodItem.name}</ThemedText>
      
      <ThemedView style={styles.macrosContainer}>
        <MacroItem
          label="Calories"
          value={foodItem.calories}
          total={DAILY_VALUES.calories}
          unit="kcal"
          icon="flame.fill"
        />
        <MacroItem
          label="Protein"
          value={foodItem.protein}
          total={DAILY_VALUES.protein}
          unit="g"
          icon="dumbbell.fill"
        />
        <MacroItem
          label="Carbs"
          value={foodItem.carbohydrates}
          total={DAILY_VALUES.carbohydrates}
          unit="g"
          icon="leaf.fill"
        />
        <MacroItem
          label="Fat"
          value={foodItem.total_fat}
          total={DAILY_VALUES.total_fat}
          unit="g"
          icon="drop.fill"
        />
      </ThemedView>

      <ThemedView style={styles.detailsContainer}>
        <DetailItem
          label="Fiber"
          value={foodItem.fiber}
          total={DAILY_VALUES.fiber}
          unit="g"
        />
        <DetailItem
          label="Sugar"
          value={foodItem.sugar}
          total={DAILY_VALUES.sugar}
          unit="g"
        />
        <DetailItem
          label="Sodium"
          value={foodItem.sodium}
          total={DAILY_VALUES.sodium}
          unit="mg"
        />
      </ThemedView>
    </ThemedView>
  );
}

function MacroItem({ label, value, total, unit, icon }: { 
  label: string; 
  value: number; 
  total: number;
  unit: string;
  icon: string;
}) {
  const progress = getProgressPercentage(value, total);
  const color = getProgressColor(value, total);

  return (
    <ThemedView style={styles.macroItem}>
      <ThemedView style={styles.macroHeader}>
        <IconSymbol name={icon} size={20} color={color} />
        <ThemedText type="defaultSemiBold">{label}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.progressContainer}>
        <ThemedView 
          style={[
            styles.progressBar,
            { width: `${progress}%`, backgroundColor: color }
          ]} 
        />
      </ThemedView>
      <ThemedText>
        {value}{unit} / {total}{unit}
      </ThemedText>
    </ThemedView>
  );
}

function DetailItem({ label, value, total, unit }: { 
  label: string; 
  value: number; 
  total: number;
  unit: string;
}) {
  const color = getProgressColor(value, total);

  return (
    <ThemedView style={styles.detailItem}>
      <ThemedText type="defaultSemiBold">{label}</ThemedText>
      <ThemedText style={{ color }}>
        {value}{unit} / {total}{unit}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    gap: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  macrosContainer: {
    gap: 12,
  },
  macroItem: {
    gap: 8,
  },
  macroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  progressContainer: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  detailItem: {
    alignItems: 'center',
    gap: 4,
  },
}); 