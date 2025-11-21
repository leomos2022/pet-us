import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function ProfessionalHomeScreen() {
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Fondo temático moderno */}
      <View style={styles.gradientBackground}>
        <ImageBackground
          source={{
            uri: 'https://i.pinimg.com/1200x/dd/44/ba/dd44ba4bf24c41e7ff954d650dffb67a.jpg'
          }}
          style={styles.background}
          blurRadius={0}
        >
          <View style={styles.overlay} />
        </ImageBackground>
      </View>

      {/* Elementos decorativos sutiles */}
      <View style={[styles.decorativeElement, { left: '5%', top: '15%' }]}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={4000}
          style={styles.dot}
        />
      </View>

      <View style={[styles.decorativeElement, { right: '8%', top: '25%' }]}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={5000}
          delay={1500}
          style={[styles.dot, styles.dotSecondary]}
        />
      </View>

      <View style={[styles.decorativeElement, { left: '85%', top: '65%' }]}>
        <Animatable.View
          animation="pulse"
          iterationCount="infinite"
          duration={6000}
          delay={3000}
          style={[styles.dot, styles.dotTertiary]}
        />
      </View>

      {/* Contenido principal */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo profesional */}
        {showContent && (
          <Animatable.View
            animation="fadeInUp"
            duration={800}
            style={styles.logoContainer}
          >
            <View style={styles.logoCircle}>
              <Text style={styles.logoIcon}>🐾</Text>
              <Text style={styles.logoText}>PetUs</Text>
            </View>
            
            <Text style={styles.logoSubtitle}>Professional Pet Care</Text>
          </Animatable.View>
        )}

        {/* Título principal */}
        {showContent && (
          <Animatable.View
            animation="fadeInUp"
            delay={400}
            duration={800}
            style={styles.titleContainer}
          >
            <View style={styles.infoCard}>
              <Text style={styles.title}>Cuidado Profesional</Text>
              <Text style={styles.subtitle}>para tu Mascota</Text>
              <Text style={styles.description}>
                Tecnología avanzada de inteligencia artificial para el monitoreo y cuidado integral de tu compañero fiel.
              </Text>
            </View>
          </Animatable.View>
        )}

        {/* Botones profesionales */}
        {showContent && (
          <Animatable.View
            animation="fadeInUp"
            delay={800}
            duration={800}
            style={styles.buttonContainer}
          >
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => router.push('/menu')}
            >
              <Text style={styles.primaryButtonText}>Explorar Aplicación</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={() => router.push('/login')}
            >
              <Text style={styles.secondaryButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.tertiaryButton} 
              onPress={() => router.push('/register')}
            >
              <Text style={styles.tertiaryButtonText}>Crear Cuenta</Text>
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
    backgroundColor: '#1e293b',
  },
  gradientBackground: {
    flex: 1,
    position: 'relative',
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
    backgroundColor: 'rgba(30, 41, 59, 0.3)',
  },
  decorativeElement: {
    position: 'absolute',
    zIndex: 1,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(34, 197, 94, 0.8)',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
  },
  dotSecondary: {
    backgroundColor: 'rgba(59, 130, 246, 0.7)',
    width: 8,
    height: 8,
    borderRadius: 4,
    shadowColor: '#3b82f6',
  },
  dotTertiary: {
    backgroundColor: 'rgba(245, 158, 11, 0.6)',
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowColor: '#f59e0b',
  },
  scrollView: {
    flex: 1,
    zIndex: 2,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 30,
    minHeight: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  logoCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#22c55e',
  },
  logoIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1e293b',
    letterSpacing: 1,
  },
  logoSubtitle: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 8,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  titleContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#22c55e',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 10,
    marginTop: 15,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#22c55e',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  secondaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    letterSpacing: 0.5,
  },
  tertiaryButton: {
    width: '100%',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: 0.5,
  },
});