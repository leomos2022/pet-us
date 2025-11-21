import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import * as Animatable from 'react-native-animatable';

// Datos basados en tu esquema Excel
const DOG_BREEDS = [
  { id: 1, name: 'Cruce' },
  { id: 2, name: 'Labrador Retriever' },
  { id: 3, name: 'Bulldog Francés' },
  { id: 4, name: 'Pastor Alemán' },
  { id: 5, name: 'Golden Retriever' },
  { id: 6, name: 'Pug' },
  { id: 7, name: 'Rottweiler' },
  { id: 8, name: 'Chihuahua' },
  { id: 9, name: 'Beagle' },
  { id: 10, name: 'Dachshund' },
  // ... más razas según tu esquema
];

const CAT_BREEDS = [
  { id: 1, name: 'Cruce' },
  { id: 2, name: 'Maine Coon' },
  { id: 3, name: 'Bengalí' },
  { id: 4, name: 'Persa' },
  { id: 5, name: 'Himalayo' },
  { id: 6, name: 'Scottish Fold' },
  { id: 7, name: 'Británico de Pelo Corto' },
  { id: 8, name: 'Siamés' },
];

const AGE_STAGES_DOG = [
  { id: 1, name: 'Cachorro (menos de 1 año)' },
  { id: 2, name: 'Adulto (1-7 años)' },
  { id: 3, name: 'Senior (8-12 años)' },
  { id: 4, name: 'Geriátrico (mayor de 12 años)' },
  { id: 5, name: 'No la conozco' },
];

const AGE_STAGES_CAT = [
  { id: 1, name: 'Gatito (menos de 1 año)' },
  { id: 2, name: 'Adulto (1-9 años)' },
  { id: 3, name: 'Senior (10-14 años)' },
  { id: 4, name: 'Geriátrico (mayor de 14 años)' },
  { id: 5, name: 'No la conozco' },
];

const ORIGINS = [
  { id: 1, name: 'Compra criadero/tienda' },
  { id: 2, name: 'Adopción centro/institución/organización' },
  { id: 3, name: 'Adopción de animal en condición de calle' },
  { id: 4, name: 'Cría de mascota anterior' },
  { id: 5, name: 'Adopción de un primer hogar' },
];

interface PetFormData {
  name: string;
  species: 'canina' | 'felina' | '';
  sex: 'macho' | 'hembra' | '';
  birthDate: string;
  breed: string;
  ageStage: string;
  reproductiveStatus: 'esterilizado' | 'entero' | '';
  origin: string;
}

const CreatePetProfileScreen = () => {
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    species: '',
    sex: '',
    birthDate: '',
    breed: '',
    ageStage: '',
    reproductiveStatus: '',
    origin: '',
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: keyof PetFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Reset breed when species changes
    if (field === 'species') {
      setFormData(prev => ({ ...prev, breed: '', ageStage: '' }));
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    
    // Validar campos requeridos
    const requiredFields = ['name', 'species', 'sex', 'breed', 'ageStage', 'reproductiveStatus', 'origin'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof PetFormData]);
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Por favor completa todos los campos requeridos');
      setIsLoading(false);
      return;
    }

    try {
      // Aquí implementarías la lógica para guardar el perfil
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación
      
      Alert.alert(
        'Éxito', 
        '¡Perfil de mascota creado exitosamente!',
        [{ text: 'OK', onPress: () => router.replace('/pet-profile') }]
      );
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el perfil. Inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.name && formData.species && formData.sex;
      case 1:
        return formData.breed && formData.ageStage && formData.reproductiveStatus;
      case 2:
        return formData.origin && formData.birthDate;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicInfoStep formData={formData} updateField={updateField} />;
      case 1:
        return <BreedInfoStep formData={formData} updateField={updateField} />;
      case 2:
        return <AdditionalInfoStep formData={formData} updateField={updateField} />;
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 0: return 'Información Básica';
      case 1: return 'Raza y Características';
      case 2: return 'Información Adicional';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Crear Perfil</Text>
        <View style={styles.placeholder} />
      </Animatable.View>

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        {[0, 1, 2].map((step) => (
          <View
            key={step}
            style={[
              styles.progressDot,
              step <= currentStep ? styles.progressDotActive : styles.progressDotInactive
            ]}
          />
        ))}
      </View>

      {/* Step Title */}
      <Animatable.View animation="fadeIn" style={styles.stepTitleContainer}>
        <Text style={styles.stepTitle}>{getStepTitle()}</Text>
        <Text style={styles.stepSubtitle}>Paso {currentStep + 1} de 3</Text>
      </Animatable.View>

      {/* Form Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animatable.View animation="slideInRight" key={currentStep}>
          {renderStep()}
        </Animatable.View>
      </ScrollView>

      {/* Bottom Buttons */}
      <Animatable.View animation="fadeInUp" style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isStepValid() && styles.buttonDisabled
          ]}
          onPress={handleNext}
          disabled={!isStepValid() || isLoading}
        >
          <Text style={styles.nextButtonText}>
            {isLoading ? 'Guardando...' : currentStep === 2 ? 'Crear Perfil' : 'Siguiente'}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    </SafeAreaView>
  );
};

// Paso 1: Información Básica
const BasicInfoStep = ({ formData, updateField }: {
  formData: PetFormData;
  updateField: (field: keyof PetFormData, value: string) => void;
}) => (
  <View style={styles.stepContainer}>
    <Animatable.View animation="fadeIn" style={styles.formSection}>
      <Text style={styles.sectionTitle}>📝 Datos Básicos</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Nombre de la mascota *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => updateField('name', text)}
          placeholder="Ej: Max, Luna, Simba"
          placeholderTextColor="#94a3b8"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Especie *</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioOption, formData.species === 'canina' && styles.radioSelected]}
            onPress={() => updateField('species', 'canina')}
          >
            <Text style={[styles.radioText, formData.species === 'canina' && styles.radioTextSelected]}>
              🐕 Canina (Perro)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioOption, formData.species === 'felina' && styles.radioSelected]}
            onPress={() => updateField('species', 'felina')}
          >
            <Text style={[styles.radioText, formData.species === 'felina' && styles.radioTextSelected]}>
              🐱 Felina (Gato)
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Sexo *</Text>
        <View style={styles.radioGroup}>
          <TouchableOpacity
            style={[styles.radioOption, formData.sex === 'macho' && styles.radioSelected]}
            onPress={() => updateField('sex', 'macho')}
          >
            <Text style={[styles.radioText, formData.sex === 'macho' && styles.radioTextSelected]}>
              ♂️ Macho
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioOption, formData.sex === 'hembra' && styles.radioSelected]}
            onPress={() => updateField('sex', 'hembra')}
          >
            <Text style={[styles.radioText, formData.sex === 'hembra' && styles.radioTextSelected]}>
              ♀️ Hembra
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  </View>
);

// Paso 2: Información de Raza
const BreedInfoStep = ({ formData, updateField }: {
  formData: PetFormData;
  updateField: (field: keyof PetFormData, value: string) => void;
}) => {
  const breeds = formData.species === 'canina' ? DOG_BREEDS : CAT_BREEDS;
  const ageStages = formData.species === 'canina' ? AGE_STAGES_DOG : AGE_STAGES_CAT;

  return (
    <View style={styles.stepContainer}>
      <Animatable.View animation="fadeIn" style={styles.formSection}>
        <Text style={styles.sectionTitle}>
          {formData.species === 'canina' ? '🐕 Información Canina' : '🐱 Información Felina'}
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Raza *</Text>
          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            {breeds.map((breed) => (
              <TouchableOpacity
                key={breed.id}
                style={[styles.optionItem, formData.breed === breed.name && styles.optionSelected]}
                onPress={() => updateField('breed', breed.name)}
              >
                <Text style={[styles.optionText, formData.breed === breed.name && styles.optionTextSelected]}>
                  {breed.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Etapa de Vida *</Text>
          <View style={styles.radioGroup}>
            {ageStages.map((stage) => (
              <TouchableOpacity
                key={stage.id}
                style={[styles.radioOption, formData.ageStage === stage.name && styles.radioSelected]}
                onPress={() => updateField('ageStage', stage.name)}
              >
                <Text style={[styles.radioText, formData.ageStage === stage.name && styles.radioTextSelected]}>
                  {stage.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Estado Reproductivo *</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={[styles.radioOption, formData.reproductiveStatus === 'esterilizado' && styles.radioSelected]}
              onPress={() => updateField('reproductiveStatus', 'esterilizado')}
            >
              <Text style={[styles.radioText, formData.reproductiveStatus === 'esterilizado' && styles.radioTextSelected]}>
                ✂️ Esterilizado/Castrado
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioOption, formData.reproductiveStatus === 'entero' && styles.radioSelected]}
              onPress={() => updateField('reproductiveStatus', 'entero')}
            >
              <Text style={[styles.radioText, formData.reproductiveStatus === 'entero' && styles.radioTextSelected]}>
                🔄 Entero/Sin esterilizar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

// Paso 3: Información Adicional
const AdditionalInfoStep = ({ formData, updateField }: {
  formData: PetFormData;
  updateField: (field: keyof PetFormData, value: string) => void;
}) => (
  <View style={styles.stepContainer}>
    <Animatable.View animation="fadeIn" style={styles.formSection}>
      <Text style={styles.sectionTitle}>📋 Información Adicional</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Fecha de Nacimiento *</Text>
        <TextInput
          style={styles.input}
          value={formData.birthDate}
          onChangeText={(text) => updateField('birthDate', text)}
          placeholder="DD/MM/AAAA"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Procedencia *</Text>
        <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
          {ORIGINS.map((origin) => (
            <TouchableOpacity
              key={origin.id}
              style={[styles.optionItem, formData.origin === origin.name && styles.optionSelected]}
              onPress={() => updateField('origin', origin.name)}
            >
              <Text style={[styles.optionText, formData.origin === origin.name && styles.optionTextSelected]}>
                {origin.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Animatable.View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#22c55e',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  placeholder: {
    width: 60,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  progressDotActive: {
    backgroundColor: '#22c55e',
  },
  progressDotInactive: {
    backgroundColor: '#334155',
  },
  stepTitleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  stepTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  stepSubtitle: {
    color: '#94a3b8',
    fontSize: 14,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContainer: {
    marginBottom: 100,
  },
  formSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  radioGroup: {
    gap: 8,
  },
  radioOption: {
    backgroundColor: '#f8fafc',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  radioSelected: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  radioText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  radioTextSelected: {
    color: '#ffffff',
  },
  optionsList: {
    maxHeight: 200,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    backgroundColor: '#f8fafc',
  },
  optionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  optionSelected: {
    backgroundColor: '#22c55e',
  },
  optionText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#ffffff',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1e293b',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default CreatePetProfileScreen;