import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { router } from 'expo-router';
import * as Animatable from 'react-native-animatable';

interface PetProfile {
  id: string;
  name: string;
  species: 'canina' | 'felina';
  sex: 'macho' | 'hembra';
  birthDate: string;
  breed: string;
  ageStage: string;
  reproductiveStatus: 'esterilizado' | 'entero';
  origin: string;
  photo?: string;
}

interface OwnerProfile {
  id: string;
  name: string;
  sex: 'masculino' | 'femenino' | 'otro';
  age: number;
  ageGroup: '18-30' | '31-45' | '46-60' | '>60';
  socioeconomicLevel: number; // 1-6
  department: string;
  city: string;
  locality: string;
  totalPets: number;
  totalDogs: number;
  totalCats: number;
}

const PetProfileScreen = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'health' | 'gallery'>('profile');
  const [petData, setPetData] = useState<PetProfile | null>(null);
  const [ownerData, setOwnerData] = useState<OwnerProfile | null>(null);

  const handleCreateProfile = () => {
    router.push('/create-pet-profile');
  };

  const handleEditProfile = () => {
    router.push('/edit-pet-profile');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab petData={petData} ownerData={ownerData} />;
      case 'health':
        return <HealthTab petData={petData} />;
      case 'gallery':
        return <GalleryTab petData={petData} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Regresar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mi Tesoro</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleCreateProfile}
        >
          <Text style={styles.addButtonText}>+ Agregar</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Pet Card */}
      {petData ? (
        <Animatable.View animation="fadeInUp" style={styles.petCard}>
          <Image 
            source={{ uri: petData.photo || 'https://via.placeholder.com/100' }} 
            style={styles.petImage} 
          />
          <View style={styles.petInfo}>
            <Text style={styles.petName}>{petData.name}</Text>
            <Text style={styles.petDetails}>
              {petData.species === 'canina' ? '🐕' : '🐱'} {petData.breed}
            </Text>
            <Text style={styles.petAge}>{petData.ageStage}</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>✏️</Text>
          </TouchableOpacity>
        </Animatable.View>
      ) : (
        <Animatable.View animation="pulse" style={styles.emptyCard}>
          <Text style={styles.emptyIcon}>🐾</Text>
          <Text style={styles.emptyTitle}>¡Crea el perfil de tu tesoro!</Text>
          <Text style={styles.emptySubtitle}>
            Registra a tu mascota y mantén toda su información organizada
          </Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateProfile}
          >
            <Text style={styles.createButtonText}>Crear Perfil</Text>
          </TouchableOpacity>
        </Animatable.View>
      )}

      {/* Tabs */}
      {petData && (
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'profile' && styles.activeTab]}
            onPress={() => setActiveTab('profile')}
          >
            <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
              📋 Perfil
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'health' && styles.activeTab]}
            onPress={() => setActiveTab('health')}
          >
            <Text style={[styles.tabText, activeTab === 'health' && styles.activeTabText]}>
              🏥 Salud
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'gallery' && styles.activeTab]}
            onPress={() => setActiveTab('gallery')}
          >
            <Text style={[styles.tabText, activeTab === 'gallery' && styles.activeTabText]}>
              📸 Galería
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Tab Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderTabContent()}
      </ScrollView>
    </SafeAreaView>
  );
};

// Componente ProfileTab
const ProfileTab = ({ petData, ownerData }: { petData: PetProfile | null; ownerData: OwnerProfile | null }) => (
  <View style={styles.tabContent}>
    {petData && (
      <Animatable.View animation="fadeIn" style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Información Básica</Text>
        <View style={styles.infoGrid}>
          <InfoItem label="Nombre" value={petData.name} />
          <InfoItem label="Especie" value={petData.species === 'canina' ? 'Perro' : 'Gato'} />
          <InfoItem label="Sexo" value={petData.sex} />
          <InfoItem label="Raza" value={petData.breed} />
          <InfoItem label="Fecha Nacimiento" value={petData.birthDate} />
          <InfoItem label="Estado Reproductivo" value={petData.reproductiveStatus} />
          <InfoItem label="Procedencia" value={petData.origin} />
        </View>
      </Animatable.View>
    )}
    
    {ownerData && (
      <Animatable.View animation="fadeIn" delay={200} style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Información del Hogar</Text>
        <View style={styles.infoGrid}>
          <InfoItem label="Total Mascotas" value={ownerData.totalPets.toString()} />
          <InfoItem label="Perros" value={ownerData.totalDogs.toString()} />
          <InfoItem label="Gatos" value={ownerData.totalCats.toString()} />
          <InfoItem label="Ubicación" value={`${ownerData.city}, ${ownerData.locality}`} />
        </View>
      </Animatable.View>
    )}
  </View>
);

// Componente HealthTab
const HealthTab = ({ petData }: { petData: PetProfile | null }) => (
  <View style={styles.tabContent}>
    <Animatable.View animation="fadeIn" style={styles.infoSection}>
      <Text style={styles.sectionTitle}>Historial Médico</Text>
      <View style={styles.healthCard}>
        <Text style={styles.healthIcon}>💉</Text>
        <Text style={styles.healthTitle}>Próxima en implementar</Text>
        <Text style={styles.healthSubtitle}>
          Vacunas, consultas veterinarias, medicamentos y más
        </Text>
      </View>
    </Animatable.View>
  </View>
);

// Componente GalleryTab
const GalleryTab = ({ petData }: { petData: PetProfile | null }) => (
  <View style={styles.tabContent}>
    <Animatable.View animation="fadeIn" style={styles.infoSection}>
      <Text style={styles.sectionTitle}>Galería de Fotos</Text>
      <View style={styles.galleryCard}>
        <Text style={styles.galleryIcon}>📸</Text>
        <Text style={styles.galleryTitle}>Próxima en implementar</Text>
        <Text style={styles.gallerySubtitle}>
          Guarda los mejores momentos de tu mascota
        </Text>
      </View>
    </Animatable.View>
  </View>
);

// Componente InfoItem
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoValue}>{value}</Text>
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
    letterSpacing: 1,
  },
  addButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  petCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 4,
  },
  petDetails: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  petAge: {
    fontSize: 12,
    color: '#22c55e',
    fontWeight: '600',
  },
  editButton: {
    padding: 10,
  },
  editButtonText: {
    fontSize: 20,
  },
  emptyCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    margin: 20,
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  createButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#22c55e',
  },
  tabText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  tabContent: {
    gap: 20,
  },
  infoSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
    marginBottom: 15,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  healthCard: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  healthIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  healthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  healthSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  galleryCard: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  galleryIcon: {
    fontSize: 50,
    marginBottom: 15,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  gallerySubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default PetProfileScreen;