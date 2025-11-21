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
  Alert,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

// Datos de recordatorios
const reminders = [
  {
    id: 1,
    title: 'Vacuna Antirrábica',
    type: 'vaccine',
    date: '15 Marzo',
    time: '10:00 AM',
    priority: 'high',
    icon: '💉',
    color: '#FF6B6B',
    daysLeft: 5,
    description: 'Vacuna anual obligatoria',
  },
  {
    id: 2,
    title: 'Desparasitación',
    type: 'medicine',
    date: '20 Marzo',
    time: '08:00 AM',
    priority: 'medium',
    icon: '💊',
    color: '#4ECDC4',
    daysLeft: 10,
    description: 'Tratamiento mensual',
  },
  {
    id: 3,
    title: 'Corte de Uñas',
    type: 'grooming',
    date: '25 Marzo',
    time: '02:00 PM',
    priority: 'low',
    icon: '✂️',
    color: '#45B7D1',
    daysLeft: 15,
    description: 'Cuidado estético',
  },
  {
    id: 4,
    title: 'Control Veterinario',
    type: 'checkup',
    date: '30 Marzo',
    time: '11:30 AM',
    priority: 'high',
    icon: '🩺',
    color: '#96CEB4',
    daysLeft: 20,
    description: 'Revisión general',
  },
];

const dailyTasks = [
  { id: 1, task: 'Dar comida matutina', time: '07:00 AM', completed: true, icon: '🍖' },
  { id: 2, task: 'Paseo matutino', time: '08:30 AM', completed: true, icon: '🚶' },
  { id: 3, task: 'Medicamento vitaminas', time: '02:00 PM', completed: false, icon: '💊' },
  { id: 4, task: 'Paseo vespertino', time: '06:00 PM', completed: false, icon: '🌅' },
  { id: 5, task: 'Cena', time: '07:30 PM', completed: false, icon: '🥘' },
];

export default function RemindersScreen() {
  const router = useRouter();
  const [selectedReminder, setSelectedReminder] = useState<number | null>(null);
  const [tasks, setTasks] = useState(dailyTasks);

  const handleTaskToggle = (taskId: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    
    // Vibración suave al completar tarea
    if (!tasks.find(t => t.id === taskId)?.completed) {
      Alert.alert('¡Tarea Completada! ✨', 'Luna está muy feliz contigo 🐕💕');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#FF6B6B';
      case 'medium': return '#FFEAA7';
      case 'low': return '#74B9FF';
      default: return '#DDD';
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Fondo mágico */}
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=800&fit=crop'
        }}
        style={styles.background}
        blurRadius={8}
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Partículas flotantes simples */}
      <View style={[styles.sparkle, { top: '15%', left: '10%' }]}>
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          duration={2000}
          style={styles.sparkleText}
        >
          ⭐
        </Animatable.Text>
      </View>

      <View style={[styles.sparkle, { top: '25%', right: '15%' }]}>
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          duration={2500}
          delay={500}
          style={styles.sparkleText}
        >
          ✨
        </Animatable.Text>
      </View>

      <View style={[styles.sparkle, { bottom: '30%', left: '20%' }]}>
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          duration={3000}
          delay={1000}
          style={styles.sparkleText}
        >
          🌟
        </Animatable.Text>
      </View>

      {/* Header */}
      <Animatable.View
        animation="slideInDown"
        duration={1000}
        style={styles.header}
      >
        <Animatable.Text
          animation="pulse"
          iterationCount="infinite"
          duration={3000}
          style={styles.headerTitle}
        >
          📅 Recordatorios Mágicos
        </Animatable.Text>
        <Text style={styles.headerSubtitle}>
          ✨ Cuida a Luna como la estrella que es ✨
        </Text>
      </Animatable.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Tareas diarias */}
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>🌅 Tareas de Hoy</Text>
          <View style={styles.tasksContainer}>
            {tasks.map((task, index) => (
              <Animatable.View
                key={task.id}
                animation="bounceInLeft"
                delay={index * 150}
                duration={800}
                style={styles.taskItem}
              >
                <TouchableOpacity
                  style={[
                    styles.taskContent,
                    { backgroundColor: task.completed ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)' }
                  ]}
                  onPress={() => handleTaskToggle(task.id)}
                >
                  <Animatable.View
                    animation={task.completed ? "pulse" : "none"}
                    iterationCount="infinite"
                    duration={2000}
                    style={[
                      styles.taskIcon,
                      { backgroundColor: task.completed ? '#00FF00' : '#FFD700' },
                    ]}
                  >
                    <Text style={styles.taskEmoji}>{task.icon}</Text>
                  </Animatable.View>
                  
                  <View style={styles.taskInfo}>
                    <Text style={[
                      styles.taskText,
                      { 
                        textDecorationLine: task.completed ? 'line-through' : 'none',
                        color: task.completed ? '#90EE90' : '#FFFFFF'
                      }
                    ]}>
                      {task.task}
                    </Text>
                    <Text style={styles.taskTime}>{task.time}</Text>
                  </View>
                  
                  <View style={[
                    styles.checkmark,
                    { backgroundColor: task.completed ? '#00FF00' : 'transparent' }
                  ]}>
                    {task.completed && <Text style={styles.checkmarkText}>✓</Text>}
                  </View>
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        </Animatable.View>

        {/* Próximos recordatorios */}
        <Animatable.View
          animation="slideInRight"
          delay={800}
          duration={1000}
          style={styles.section}
        >
          <Text style={styles.sectionTitle}>📋 Próximos Eventos</Text>
          <View style={styles.remindersContainer}>
            {reminders.map((reminder, index) => (
              <Animatable.View
                key={reminder.id}
                animation="bounceInUp"
                delay={index * 200 + 1000}
                duration={800}
                style={styles.reminderItem}
              >
                <TouchableOpacity
                  style={[
                    styles.reminderCard,
                    { 
                      borderColor: reminder.color,
                      backgroundColor: `${reminder.color}15`,
                      transform: selectedReminder === reminder.id ? [{ scale: 1.05 }] : [{ scale: 1 }]
                    }
                  ]}
                  onPress={() => setSelectedReminder(selectedReminder === reminder.id ? null : reminder.id)}
                >
                  <View style={styles.reminderHeader}>
                    <Animatable.View
                      animation="pulse"
                      iterationCount="infinite"
                      duration={2000}
                      style={[
                        styles.reminderIcon,
                        { backgroundColor: reminder.color },
                      ]}
                    >
                      <Text style={styles.reminderEmoji}>{reminder.icon}</Text>
                    </Animatable.View>
                    
                    <View style={styles.reminderInfo}>
                      <Text style={[styles.reminderTitle, { color: reminder.color }]}>
                        {reminder.title}
                      </Text>
                      <Text style={styles.reminderDate}>
                        {reminder.date} - {reminder.time}
                      </Text>
                    </View>
                    
                    <View style={styles.priorityBadge}>
                      <View style={[
                        styles.priorityDot,
                        { backgroundColor: getPriorityColor(reminder.priority) }
                      ]} />
                      <Text style={styles.daysLeft}>
                        {reminder.daysLeft} días
                      </Text>
                    </View>
                  </View>
                  
                  {selectedReminder === reminder.id && (
                    <Animatable.View
                      animation="fadeInDown"
                      duration={300}
                      style={styles.reminderDetails}
                    >
                      <Text style={styles.reminderDescription}>
                        {reminder.description}
                      </Text>
                      <View style={styles.reminderActions}>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionButtonText}>📱 Configurar Alarma</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                          <Text style={styles.actionButtonText}>📍 Agregar Ubicación</Text>
                        </TouchableOpacity>
                      </View>
                    </Animatable.View>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            ))}
          </View>
        </Animatable.View>

        {/* Botón agregar recordatorio */}
        <Animatable.View
          animation="bounceIn"
          delay={2000}
          duration={1000}
          style={styles.addButtonContainer}
        >
          <TouchableOpacity style={styles.addButton}>
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              duration={2000}
              style={styles.addButtonContent}
            >
              <Text style={styles.addButtonIcon}>➕</Text>
              <Text style={styles.addButtonText}>Agregar Recordatorio</Text>
            </Animatable.View>
          </TouchableOpacity>
        </Animatable.View>

        {/* Botón de regreso */}
        <Animatable.View
          animation="fadeIn"
          delay={2500}
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
      </ScrollView>
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
    backgroundColor: 'rgba(25, 25, 112, 0.7)',
  },
  sparkle: {
    position: 'absolute',
    zIndex: 1,
  },
  sparkleText: {
    fontSize: 25,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: 'center',
    zIndex: 2,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFB6C1',
    textShadowColor: '#FF69B4',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
  },
  content: {
    flex: 1,
    zIndex: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tasksContainer: {
    gap: 12,
  },
  taskItem: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  taskEmoji: {
    fontSize: 18,
  },
  taskInfo: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  taskTime: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: '500',
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  remindersContainer: {
    gap: 15,
  },
  reminderItem: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  reminderCard: {
    borderRadius: 20,
    borderWidth: 2,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  reminderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  reminderEmoji: {
    fontSize: 22,
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  reminderDate: {
    fontSize: 14,
    color: '#E6E6FA',
    fontWeight: '500',
  },
  priorityBadge: {
    alignItems: 'center',
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 4,
  },
  daysLeft: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  reminderDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  reminderDescription: {
    fontSize: 14,
    color: '#E6E6FA',
    marginBottom: 15,
    lineHeight: 20,
  },
  reminderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  addButtonContainer: {
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  addButton: {
    width: '100%',
  },
  addButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  addButtonIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  backButtonContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  backButton: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FF6B6B',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: '#FF6B6B',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});