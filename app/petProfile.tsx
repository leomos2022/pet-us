import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function PetProfileScreen() {
  const router = useRouter();
  const [petData, setPetData] = useState({
    name: '',
    breed: '',
    age: '',
    weight: '',
    gender: 'male',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Imágenes de mascotas de Unsplash para la demo
  const petImages = [
    'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=300&h=300&fit=crop&crop=face',
  ];

  const handleInputChange = (field: string, value: string) => {
    setPetData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const { name, breed, age, weight } = petData;

    if (!name.trim()) {
      Alert.alert('Error', 'El nombre de tu mascota es requerido');
      return false;
    }

    if (!breed.trim()) {
      Alert.alert('Error', 'La raza es requerida');
      return false;
    }

    if (!age.trim() || isNaN(Number(age))) {
      Alert.alert('Error', 'Por favor ingresa una edad válida');
      return false;
    }

    if (!weight.trim() || isNaN(Number(weight))) {
      Alert.alert('Error', 'Por favor ingresa un peso válido');
      return false;
    }

    return true;
  };

  const handleSavePet = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simular llamada a API
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Perfil Creado', 
        `¡Perfecto! ${petData.name} ya está registrado en PetUs.`,
        [
          { 
            text: 'Continuar', 
            onPress: () => router.push('/(tabs)')
          }
        ]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <StatusBar style="dark" />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>🐾 Perfil de tu mascota</Text>
          <Text style={styles.subtitle}>Cuéntanos sobre tu compañero peludo</Text>
        </View>

        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Foto de tu mascota</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.imageGallery}
          >
            {petImages.map((imageUrl, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.imageOption,
                  selectedImage === imageUrl && styles.selectedImage
                ]}
                onPress={() => setSelectedImage(imageUrl)}
              >
                <Image 
                  source={{ uri: imageUrl }} 
                  style={styles.petImage}
                  resizeMode="cover"
                />
                {selectedImage === imageUrl && (
                  <View style={styles.selectedOverlay}>
                    <Text style={styles.selectedIcon}>✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre de tu mascota"
              placeholderTextColor="#7F8C8D"
              value={petData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Raza</Text>
            <TextInput
              style={styles.input}
              placeholder="Labrador, Golden Retriever, etc."
              placeholderTextColor="#7F8C8D"
              value={petData.breed}
              onChangeText={(value) => handleInputChange('breed', value)}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.inputLabel}>Edad (años)</Text>
              <TextInput
                style={styles.input}
                placeholder="2"
                placeholderTextColor="#7F8C8D"
                value={petData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                keyboardType="numeric"
              />
            </View>

            <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
              <Text style={styles.inputLabel}>Peso (kg)</Text>
              <TextInput
                style={styles.input}
                placeholder="25"
                placeholderTextColor="#7F8C8D"
                value={petData.weight}
                onChangeText={(value) => handleInputChange('weight', value)}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Género</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  petData.gender === 'male' && styles.genderSelected
                ]}
                onPress={() => handleInputChange('gender', 'male')}
              >
                <Text style={[
                  styles.genderText,
                  petData.gender === 'male' && styles.genderTextSelected
                ]}>
                  Macho
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  petData.gender === 'female' && styles.genderSelected
                ]}
                onPress={() => handleInputChange('gender', 'female')}
              >
                <Text style={[
                  styles.genderText,
                  petData.gender === 'female' && styles.genderTextSelected
                ]}>
                  Hembra
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.saveButton, isLoading && styles.buttonDisabled]}
            onPress={handleSavePet}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? 'Guardando...' : 'Guardar Perfil'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>← Volver</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E9C5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#016B61',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 22,
  },
  imageSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#016B61',
    marginBottom: 16,
  },
  imageGallery: {
    flexDirection: 'row',
  },
  imageOption: {
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: '#70B2B2',
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(112, 178, 178, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  selectedIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#016B61',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#9ECFD4',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D3748',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderOption: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#9ECFD4',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  genderSelected: {
    backgroundColor: '#70B2B2',
    borderColor: '#70B2B2',
  },
  genderText: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  genderTextSelected: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#70B2B2',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  backButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4A5568',
  },
});