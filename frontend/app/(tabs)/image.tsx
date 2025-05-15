import { View, Button, Image, StyleSheet, Modal, Platform, TextInput, ActivityIndicator, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePredictor() {
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      setError("Please give permissions");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      setImage(result.assets[0].uri);
      await classifyImage(imageUri);
    }
  };

  const classifyImage = async (uri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      } as any);
  
      const response = await fetch('http://10.194.131.236:8080/predict', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const result = await response.json();
      alert(`Prediction: ${result.prediction}`);
    } catch (err) {
      alert('Prediction failed');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Classify Your Food!</ThemedText>
        </ThemedView>

        <ThemedView style={styles.inputContainer}>
          <ThemedView style={styles.searchContainer}>
          </ThemedView>

          {error && (
            <ThemedText style={styles.errorText}>{error}</ThemedText>
          )}
        </ThemedView>
        <ThemedView style={styles.inputContainer}>
          <TouchableOpacity 
          style={[styles.button, styles.uploadButton]}
          onPress={uploadImage}>
          <ThemedText>Upload Image</ThemedText>
          </TouchableOpacity>
          {image && (
            <>
              <Image source={{ uri: image }} style={styles.previewImage} />
              {loading ? (
                <ThemedText>Loading prediction...</ThemedText>
              ) : (
                prediction && (
                  <ThemedText style={{ fontSize: 16, marginTop: 12 }}>
                    Prediction: {prediction}
                  </ThemedText>
                )
              )}
            </>
          )}
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
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
  inputContainer: {
    gap: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  previewImage: {
    width: 100,
    height: 100,
    alignSelf: 'flex-start',
    marginTop: 16,
    borderRadius: 10,
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
  uploadButton: {
    backgroundColor: '#2196F3',
  },
  searchButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 14,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nutritionContainer: {
    gap: 16,
  },
  nutritionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  nutritionItem: {
    width: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 12,
    borderRadius: 8,
    gap: 4,
  },
});
