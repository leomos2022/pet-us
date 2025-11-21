import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

// Datos simulados del monitor IA
const aiData = {
  status: 'ACTIVO',
  heartRate: 85,
  temperature: 38.2,
  activity: 'Alta',
  mood: 'Feliz',
  alert: null,
  lastUpdate: 'Hace 2 min',
};

const vitalSigns = [
  { 
    name: 'Ritmo Cardíaco', 
    value: aiData.heartRate, 
    unit: 'BPM', 
    icon: '💓', 
    color: '#FF6B6B',
    normal: aiData.heartRate >= 70 && aiData.heartRate <= 120
  },
  { 
    name: 'Temperatura', 
    value: aiData.temperature, 
    unit: '°C', 
    icon: '🌡️', 
    color: '#4ECDC4',
    normal: aiData.temperature >= 37.5 && aiData.temperature <= 39.2
  },
  { 
    name: 'Actividad', 
    value: aiData.activity, 
    unit: '', 
    icon: '🏃', 
    color: '#45B7D1',
    normal: true
  },
  { 
    name: 'Estado Anímico', 
    value: aiData.mood, 
    unit: '', 
    icon: '😊', 
    color: '#96CEB4',
    normal: true
  },
];

export default function AIMonitorScreen() {
  const router = useRouter();
  const [scanning, setScanning] = useState(true);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    // Simular escaneo y mostrar datos después de 3 segundos
    setTimeout(() => {
      setScanning(false);
      setShowData(true);
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Fondo futurista */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=800&fit=crop'
        }}
        style={styles.background}
        blurRadius={6}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Header */}
      <Animatable.View
        animation="slideInDown"
        duration={1000}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>🤖 Monitor IA</Text>
        <Text style={styles.headerSubtitle}>Análisis en Tiempo Real</Text>
        <View style={styles.statusContainer}>
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={1500}
            style={[
              styles.statusDot,
              { backgroundColor: aiData.status === 'ACTIVO' ? '#00FF00' : '#FF0000' }
            ]}
          />
          <Text style={styles.statusText}>{aiData.status}</Text>
        </View>
      </Animatable.View>

      {/* Scanner Central */}
      <View style={styles.scannerContainer}>
        {scanning ? (
          <Animatable.View
            animation="bounceIn"
            duration={1000}
            style={styles.scannerWrapper}
          >
            {/* Círculos de escaneo simples */}
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={2000}
              style={[styles.scanRing, styles.outerRing]}
            />
            
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={1500}
              delay={500}
              style={[styles.scanRing, styles.middleRing]}
            />

            {/* Centro del scanner */}
            <Animatable.View
              animation="rotate"
              iterationCount="infinite"
              duration={3000}
              style={styles.scannerCore}
            >
              <Text style={styles.scannerIcon}>🔍</Text>
            </Animatable.View>

            <Text style={styles.scanningText}>Escaneando a Luna...</Text>
            
            {/* Línea de escaneo */}
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={1500}
              style={styles.scanLine}
            />
          </Animatable.View>
        ) : (
          // Datos del monitor
          <ScrollView 
            style={styles.dataContainer}
            showsVerticalScrollIndicator={false}
          >
            {showData && (
              <>
                {/* Signos vitales */}
                <Animatable.View
                  animation="fadeInUp"
                  duration={1000}
                  style={styles.vitalsContainer}
                >
                  <Text style={styles.sectionTitle}>📊 Signos Vitales</Text>
                  <View style={styles.vitalsGrid}>
                    {vitalSigns.map((vital, index) => (
                      <Animatable.View
                        key={vital.name}
                        animation="bounceInUp"
                        delay={index * 200}
                        duration={800}
                        style={[
                          styles.vitalCard,
                          {
                            borderColor: vital.color,
                            backgroundColor: vital.normal 
                              ? `${vital.color}20` 
                              : 'rgba(255, 0, 0, 0.2)'
                          }
                        ]}
                      >
                        <Text style={styles.vitalIcon}>{vital.icon}</Text>
                        <Text style={[styles.vitalName, { color: vital.color }]}>
                          {vital.name}
                        </Text>
                        <Animatable.Text
                          animation="pulse"
                          iterationCount="infinite"
                          duration={2000}
                          style={[styles.vitalValue, { color: vital.color }]}
                        >
                          {vital.value}{vital.unit}
                        </Animatable.Text>
                        <View style={[
                          styles.statusIndicator,
                          { 
                            backgroundColor: vital.normal ? '#00FF00' : '#FF0000'
                          }
                        ]} />
                      </Animatable.View>
                    ))}
                  </View>
                </Animatable.View>

                {/* Análisis IA */}
                <Animatable.View
                  animation="slideInLeft"
                  delay={1000}
                  duration={800}
                  style={styles.analysisContainer}
                >
                  <Text style={styles.sectionTitle}>🧠 Análisis IA</Text>
                  
                  <View style={styles.analysisCard}>
                    <Text style={styles.analysisTitle}>
                      🎯 Evaluación General
                    </Text>
                    <Text style={styles.analysisText}>
                      Luna está en excelente estado de salud. Todos los signos vitales 
                      están dentro del rango normal. Se recomienda mantener la rutina 
                      actual de ejercicio y alimentación.
                    </Text>
                  </View>

                  <View style={styles.analysisCard}>
                    <Text style={styles.analysisTitle}>
                      📈 Tendencias
                    </Text>
                    <Text style={styles.analysisText}>
                      • Actividad física: ⬆️ +15% esta semana{'\n'}
                      • Frecuencia cardíaca: ➡️ Estable{'\n'}
                      • Estado anímico: ⬆️ Muy positivo
                    </Text>
                  </View>
                </Animatable.View>

                {/* Recomendaciones */}
                <Animatable.View
                  animation="bounceIn"
                  delay={1500}
                  duration={1000}
                  style={styles.recommendationsContainer}
                >
                  <Text style={styles.sectionTitle}>💡 Recomendaciones</Text>
                  
                  <View style={styles.recommendationItem}>
                    <Text style={styles.recommendationIcon}>🎾</Text>
                    <Text style={styles.recommendationText}>
                      Tiempo de juego extra hoy
                    </Text>
                  </View>
                  
                  <View style={styles.recommendationItem}>
                    <Text style={styles.recommendationIcon}>💧</Text>
                    <Text style={styles.recommendationText}>
                      Recordar hidratación cada 2 horas
                    </Text>
                  </View>
                  
                  <View style={styles.recommendationItem}>
                    <Text style={styles.recommendationIcon}>🏥</Text>
                    <Text style={styles.recommendationText}>
                      Próxima revisión en 3 semanas
                    </Text>
                  </View>
                </Animatable.View>
              </>
            )}
          </ScrollView>
        )}
      </View>

      {/* Botón de regreso */}
      <Animatable.View
        animation="fadeIn"
        delay={2000}
        duration={800}
        style={styles.backButtonContainer}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>🏠 Volver al Menú</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Última actualización */}
      <Text style={styles.lastUpdate}>
        Última actualización: {aiData.lastUpdate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    backgroundColor: 'rgba(0, 10, 30, 0.8)',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00FFFF',
    textShadowColor: '#0080FF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#87CEEB',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  scannerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  scannerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 250,
  },
  scanRing: {
    position: 'absolute',
    borderRadius: 150,
    borderWidth: 2,
  },
  outerRing: {
    width: 250,
    height: 250,
    borderColor: '#00FFFF',
  },
  middleRing: {
    width: 200,
    height: 200,
    borderColor: '#0080FF',
  },
  scannerCore: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#00FFFF',
  },
  scannerIcon: {
    fontSize: 40,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  scanningText: {
    position: 'absolute',
    bottom: -50,
    fontSize: 16,
    color: '#00FFFF',
    fontWeight: '600',
    textShadowColor: '#0080FF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  scanLine: {
    position: 'absolute',
    width: 200,
    height: 2,
    backgroundColor: '#00FFFF',
    shadowColor: '#00FFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  dataContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 8,
  },
  vitalsContainer: {
    marginBottom: 30,
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vitalCard: {
    width: '48%',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    position: 'relative',
  },
  vitalIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  vitalName: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
    textAlign: 'center',
  },
  vitalValue: {
    fontSize: 18,
    fontWeight: '900',
  },
  statusIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  analysisContainer: {
    marginBottom: 30,
  },
  analysisCard: {
    backgroundColor: 'rgba(0, 255, 255, 0.1)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 255, 0.3)',
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00FFFF',
    marginBottom: 10,
  },
  analysisText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  recommendationsContainer: {
    marginBottom: 30,
  },
  recommendationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recommendationIcon: {
    fontSize: 20,
    marginRight: 15,
  },
  recommendationText: {
    flex: 1,
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  backButtonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    backgroundColor: 'rgba(0, 255, 255, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#00FFFF',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: '#00FFFF',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  lastUpdate: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    fontSize: 12,
    color: '#87CEEB',
  },
});