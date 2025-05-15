import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function ExploreScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">App Features</ThemedText>
          <IconSymbol name="star.fill" size={24} color="#FFD700" />
        </ThemedView>
        
        <ThemedText style={styles.subtitle}>
          Discover all the powerful features to help you achieve your health goals!
        </ThemedText>

        <Collapsible 
          title="Smart Food Analysis"
          icon={<IconSymbol name="camera.fill" size={20} color="#4CAF50" />}>
          <ThemedView style={styles.featureContent}>
            <ThemedText style={styles.featureText}>
              • Upload food images for instant calorie analysis{'\n'}
              • AI-powered food recognition{'\n'}
              • Detailed nutritional breakdown{'\n'}
              • Quick and accurate results
            </ThemedText>
          </ThemedView>
        </Collapsible>

        <Collapsible 
          title="Comprehensive Progress Tracking"
          icon={<IconSymbol name="chart.bar.fill" size={20} color="#2196F3" />}>
          <ThemedView style={styles.featureContent}>
            <ThemedText style={styles.featureText}>
              • Real-time calorie tracking{'\n'}
              • Daily progress visualization{'\n'}
              • Customizable goals{'\n'}
              • Detailed statistics and trends
            </ThemedText>
          </ThemedView>
        </Collapsible>

        <Collapsible 
          title="Coming Soon"
          icon={<IconSymbol name="sparkles" size={20} color="#9C27B0" />}>
          <ThemedView style={styles.featureContent}>
            <ThemedText style={styles.featureText}>
              • User profiles and authentication{'\n'}
              • Cloud data synchronization{'\n'}
              • Personalized meal recommendations{'\n'}
              • Social sharing features
            </ThemedText>
          </ThemedView>
        </Collapsible>

        <ThemedView style={styles.helpSection}>
          <IconSymbol name="questionmark.circle.fill" size={20} color="#FF9800" />
          <ThemedText style={styles.helpText}>
            Need help? Tap on each section to learn more about the features.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    opacity: 0.8,
  },
  featureContent: {
    paddingVertical: 12,
  },
  featureText: {
    lineHeight: 24,
  },
  helpSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 152, 0, 0.1)',
  },
  helpText: {
    flex: 1,
    fontSize: 14,
  },
});
