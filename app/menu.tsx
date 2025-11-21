import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Opciones del menú principal
const menuOptions = [
  {
    id: 1,
    title: 'Dashboard',
    subtitle: 'Control IA de tu Mascota',
    icon: '🎯',
    route: '/dashboard',
    delay: 0,
  },
  {
    id: 2,
    title: 'Mi Tesoro',
    subtitle: 'Perfil de tu Mascota',
    icon: '🐾',
    route: '/pet-profile',
    delay: 200,
  },
  {
    id: 3,
    title: 'Monitor IA',
    subtitle: 'Salud en Tiempo Real',
    icon: '📱',
    route: '/ai-monitor',
    delay: 400,
  },
  {
    id: 4,
    title: 'Recordatorios',
    subtitle: 'Vacunas & Citas',
    icon: '📅',
    route: '/reminders',
    delay: 600,
  },
  {
    id: 5,
    title: 'Veterinarios',
    subtitle: 'Cerca de Ti',
    icon: '🏥',
    route: '/vets',
    delay: 800,
  },
  {
    id: 6,
    title: 'Estadísticas',
    subtitle: 'Análisis Completo',
    icon: '📊',
    route: '/stats',
    delay: 1000,
  },
  {
    id: 7,
    title: 'Explorar',
    subtitle: 'Artículos & Consejos',
    icon: '🔍',
    route: '/(tabs)/explore',
    delay: 1200,
  },
];

export default function MenuScreen() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowMenu(true), 500);
  }, []);

  const handleOptionPress = (route: string) => {
    router.push(route as any);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ImageBackground
        source={{
          uri: 'https://i.pinimg.com/736x/35/35/3d/35353dbee5038603efd5ab7254c3e8b7.jpg'
        }}
        style={styles.background}
        blurRadius={0}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <View style={[styles.particle, { left: '5%', top: '15%' }]}>
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          duration={4000}
          style={styles.particleText}
        >
          ✨
        </Animatable.Text>
      </View>

      <View style={[styles.particle, { right: '10%', top: '25%' }]}>
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          duration={5000}
          delay={2000}
          style={styles.particleText}
        >
          🐾
        </Animatable.Text>
      </View>

      <Animatable.View 
        animation="slideInDown"
        duration={1000}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>PetUs</Text>
        <Text style={styles.headerSubtitle}>Menú Principal</Text>
      </Animatable.View>

      <ScrollView 
        style={styles.menuContainer}
        contentContainerStyle={styles.menuContent}
        showsVerticalScrollIndicator={false}
      >
        {showMenu && menuOptions.map((option, index) => (
          <Animatable.View
            key={option.id}
            animation="bounceInUp"
            delay={option.delay}
            duration={800}
            style={styles.menuItemContainer}
          >
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => handleOptionPress(option.route)}
              activeOpacity={0.8}
            >
              <View style={styles.iconContainer}>
                <Text style={styles.optionIcon}>{option.icon}</Text>
              </View>
              
              <View style={styles.textContainer}>
                <Text style={styles.optionTitle}>
                  {option.title}
                </Text>
                <Text style={styles.optionSubtitle}>
                  {option.subtitle}
                </Text>
              </View>
              
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          </Animatable.View>
        ))}
        
        {showMenu && (
          <Animatable.View
            animation="fadeInUp"
            delay={1600}
            duration={800}
            style={styles.exitButtonContainer}
          >
            <TouchableOpacity
              style={styles.exitButton}
              onPress={() => router.back()}
            >
              <Text style={styles.exitButtonText}>← Volver</Text>
            </TouchableOpacity>
          </Animatable.View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.85)',
  },
  particle: {
    position: 'absolute',
    zIndex: 1,
  },
  particleText: {
    fontSize: 20,
    opacity: 0.6,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '600',
  },
  menuContainer: {
    flex: 1,
    zIndex: 2,
  },
  menuContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  menuItemContainer: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  iconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#22c55e',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionIcon: {
    fontSize: 20,
  },
  textContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
    letterSpacing: 0.3,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 20,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  exitButtonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  exitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  exitButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.3,
  },
});