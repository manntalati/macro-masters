import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';
import { ThemedTextInput } from '../../components/ThemedTextInput';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { NutritionCard } from '../../components/NutritionCard';
import { SearchHistory } from '../../components/SearchHistory';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import ParallaxScrollView from '@/components/ParallaxScrollView';

interface FoodItem {
  name: string;
  calories: number;
  protein: number;
  carbohydrates: number;
  total_fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
}

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foodData, setFoodData] = useState<FoodItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const { getItem, setItem } = useAsyncStorage('@search_history');

  useEffect(() => {
    loadSearchHistory();
  }, []);

  const loadSearchHistory = async () => {
    try {
      const history = await getItem();
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (error) {
      console.error('Error loading search history:', error);
    }
  };

  const saveSearchHistory = async (query: string) => {
    try {
      const newHistory = [query, ...searchHistory.filter(item => item !== query)].slice(0, 10);
      setSearchHistory(newHistory);
      await setItem(JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving search history:', error);
    }
  };

  const clearSearchHistory = async () => {
    try {
      setSearchHistory([]);
      await setItem(JSON.stringify([]));
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setFoodData(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data for demonstration
      const mockData: FoodItem = {
        name: searchQuery,
        calories: Math.floor(Math.random() * 500) + 100,
        protein: Math.floor(Math.random() * 30) + 5,
        carbohydrates: Math.floor(Math.random() * 50) + 10,
        total_fat: Math.floor(Math.random() * 20) + 5,
        fiber: Math.floor(Math.random() * 10) + 1,
        sugar: Math.floor(Math.random() * 20) + 1,
        sodium: Math.floor(Math.random() * 500) + 100,
      };

      setFoodData(mockData);
      saveSearchHistory(searchQuery);
    } catch (error) {
      setError('Failed to fetch nutrition data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: string) => {
    setSearchQuery(item);
    handleSearch();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F5F5F5', dark: '#1C1C1E' }}
      headerImage={
        <Image
          source={require('@/assets/images/food2.png')}
          style={styles.headerImage}
          resizeMode="cover"
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.searchSection}>
          <ThemedView style={styles.searchContainer}>
            <ThemedTextInput
              placeholder="Search for food..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={styles.searchInput}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}>
              <IconSymbol name="magnifyingglass" size={20} color="#fff" />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>

        {!searchQuery && !foodData && (
          <SearchHistory
            history={searchHistory}
            onSelect={handleHistorySelect}
            onClearHistory={clearSearchHistory}
          />
        )}

        {loading && (
          <ThemedView style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <ThemedText style={styles.loadingText}>Searching...</ThemedText>
          </ThemedView>
        )}

        {error && (
          <ThemedView style={styles.errorContainer}>
            <IconSymbol name="exclamationmark.triangle" size={24} color="#FF5252" />
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          </ThemedView>
        )}

        {foodData && (
          <ThemedView>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => {
                setFoodData(null);
                setSearchQuery('');
              }}>
              <IconSymbol name="arrow.left" size={20} color="#007AFF" />
              <ThemedText style={styles.backButtonText}>Back to Search</ThemedText>
            </TouchableOpacity>
            <NutritionCard foodItem={foodData} />
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  searchSection: {
    flex: 1,
    justifyContent: 'center',
    minHeight: '25%',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
  },
  searchInput: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 24,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    opacity: 0.7,
  },
  errorContainer: {
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    margin: 16,
    borderRadius: 12,
  },
  errorText: {
    color: '#FF5252',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 16,
    paddingBottom: 0,
  },
  backButtonText: {
    color: '#007AFF',
    fontSize: 16,
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
