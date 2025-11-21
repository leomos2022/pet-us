import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert as RNAlert,
} from 'react-native';
import { router } from 'expo-router';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

interface DashboardData {
  petName: string;
  species: 'canina' | 'felina';
  breed: string;
  ageStage: string;
  healthScore: number;
  todayTasks: Task[];
  weekAlerts: Alert[];
  aiInsight: string;
  nextVaccination: string;
  feedingProgress: { completed: number; total: number };
  exerciseToday: { completed: number; recommended: number };
}

interface Task {
  id: string;
  type: 'feeding' | 'exercise' | 'medication' | 'hygiene';
  title: string;
  time: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface Alert {
  id: string;
  type: 'vaccination' | 'parasite' | 'checkup' | 'nutrition';
  title: string;
  description: string;
  daysUntil: number;
  priority: 'critical' | 'important' | 'normal';
}

const PetDashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<'today' | 'week' | 'health'>('today');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    // Simulación de carga de datos (reemplazar con API real)
    setTimeout(() => {
      setDashboardData({
        petName: 'Luna',
        species: 'canina',
        breed: 'Golden Retriever',
        ageStage: 'Adulto',
        healthScore: 85,
        todayTasks: [
          {
            id: '1',
            type: 'feeding',
            title: 'Alimentación matutina',
            time: '08:00',
            completed: true,
            priority: 'high'
          },
          {
            id: '2',
            type: 'exercise',
            title: 'Paseo del mediodía',
            time: '14:00',
            completed: false,
            priority: 'medium'
          },
          {
            id: '3',
            type: 'medication',
            title: 'Vitaminas',
            time: '18:00',
            completed: false,
            priority: 'high'
          }
        ],
        weekAlerts: [
          {
            id: '1',
            type: 'vaccination',
            title: 'Vacuna anual',
            description: 'Refuerzo de vacunas esenciales',
            daysUntil: 3,
            priority: 'critical'
          },
          {
            id: '2',
            type: 'checkup',
            title: 'Chequeo dental',
            description: 'Limpieza y revisión dental recomendada',
            daysUntil: 7,
            priority: 'important'
          }
        ],
        aiInsight: 'Luna está en excelente forma. Su nivel de actividad es óptimo para su raza y edad. Recomiendo mantener la rutina actual.',
        nextVaccination: '3 días',
        feedingProgress: { completed: 2, total: 3 },
        exerciseToday: { completed: 45, recommended: 60 }
      });
      setIsLoading(false);
    }, 1500);
  };

  const toggleTask = (taskId: string) => {
    if (!dashboardData) return;
    
    const updatedTasks = dashboardData.todayTasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    setDashboardData({
      ...dashboardData,
      todayTasks: updatedTasks
    });
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#f59e0b';
    return '#ef4444';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#ef4444';
      case 'important': return '#f59e0b';
      case 'high': return '#f97316';
      case 'medium': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'feeding': return '🍽️';
      case 'exercise': return '🏃‍♂️';
      case 'medication': return '💊';
      case 'hygiene': return '🛁';
      default: return '📋';
    }
  };

  const renderTodayTab = () => (
    <View style={styles.tabContent}>
      {/* Health Score Card */}
      <Animatable.View animation="fadeInUp" delay={200} style={styles.healthCard}>
        <View style={styles.healthHeader}>
          <Text style={styles.cardTitle}>Estado de Salud</Text>
          <View style={[styles.scoreCircle, { borderColor: getHealthScoreColor(dashboardData!.healthScore) }]}>
            <Text style={[styles.scoreText, { color: getHealthScoreColor(dashboardData!.healthScore) }]}>
              {dashboardData!.healthScore}
            </Text>
          </View>
        </View>
        <Text style={styles.aiInsight}>💡 {dashboardData!.aiInsight}</Text>
      </Animatable.View>

      {/* Progress Cards */}
      <View style={styles.progressGrid}>
        <Animatable.View animation="fadeInLeft" delay={400} style={styles.progressCard}>
          <Text style={styles.progressIcon}>🍽️</Text>
          <Text style={styles.progressTitle}>Alimentación</Text>
          <Text style={styles.progressValue}>
            {dashboardData!.feedingProgress.completed}/{dashboardData!.feedingProgress.total}
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(dashboardData!.feedingProgress.completed / dashboardData!.feedingProgress.total) * 100}%` }
              ]} 
            />
          </View>
        </Animatable.View>

        <Animatable.View animation="fadeInRight" delay={500} style={styles.progressCard}>
          <Text style={styles.progressIcon}>🏃‍♂️</Text>
          <Text style={styles.progressTitle}>Ejercicio</Text>
          <Text style={styles.progressValue}>
            {dashboardData!.exerciseToday.completed}/{dashboardData!.exerciseToday.recommended}min
          </Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(dashboardData!.exerciseToday.completed / dashboardData!.exerciseToday.recommended) * 100}%` }
              ]} 
            />
          </View>
        </Animatable.View>
      </View>

      {/* Today's Tasks */}
      <Animatable.View animation="fadeInUp" delay={600} style={styles.tasksCard}>
        <Text style={styles.cardTitle}>Tareas de Hoy</Text>
        {dashboardData!.todayTasks.map((task, index) => (
          <TouchableOpacity
            key={task.id}
            style={[styles.taskItem, task.completed && styles.taskCompleted]}
            onPress={() => toggleTask(task.id)}
          >
            <View style={styles.taskLeft}>
              <View style={[styles.taskIcon, { backgroundColor: getPriorityColor(task.priority) + '20' }]}>
                <Text style={styles.taskIconText}>{getTaskIcon(task.type)}</Text>
              </View>
              <View style={styles.taskInfo}>
                <Text style={[styles.taskTitle, task.completed && styles.taskTitleCompleted]}>
                  {task.title}
                </Text>
                <Text style={styles.taskTime}>{task.time}</Text>
              </View>
            </View>
            <View style={[styles.taskCheck, task.completed && styles.taskCheckCompleted]}>
              {task.completed && <Text style={styles.checkMark}>✓</Text>}
            </View>
          </TouchableOpacity>
        ))}
      </Animatable.View>
    </View>
  );

  const renderWeekTab = () => (
    <View style={styles.tabContent}>
      <Animatable.View animation="fadeInUp" delay={200} style={styles.alertsCard}>
        <Text style={styles.cardTitle}>Alertas de la Semana</Text>
        {dashboardData!.weekAlerts.map((alert, index) => (
          <View key={alert.id} style={styles.alertItem}>
            <View style={[styles.alertDot, { backgroundColor: getPriorityColor(alert.priority) }]} />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{alert.title}</Text>
              <Text style={styles.alertDescription}>{alert.description}</Text>
              <Text style={styles.alertTime}>En {alert.daysUntil} días</Text>
            </View>
          </View>
        ))}
      </Animatable.View>

      <Animatable.View animation="fadeInUp" delay={400} style={styles.calendarCard}>
        <Text style={styles.cardTitle}>Próximos Eventos</Text>
        <View style={styles.calendarItem}>
          <Text style={styles.calendarDate}>23</Text>
          <Text style={styles.calendarMonth}>Nov</Text>
          <Text style={styles.calendarEvent}>Vacuna anual</Text>
        </View>
        <View style={styles.calendarItem}>
          <Text style={styles.calendarDate}>27</Text>
          <Text style={styles.calendarMonth}>Nov</Text>
          <Text style={styles.calendarEvent}>Chequeo dental</Text>
        </View>
      </Animatable.View>
    </View>
  );

  const renderHealthTab = () => (
    <View style={styles.tabContent}>
      <Animatable.View animation="fadeInUp" delay={200} style={styles.healthDetailCard}>
        <Text style={styles.cardTitle}>Análisis de Salud Detallado</Text>
        
        <View style={styles.healthMetric}>
          <Text style={styles.metricLabel}>Estado General</Text>
          <Text style={styles.metricValue}>Excelente ✨</Text>
        </View>
        
        <View style={styles.healthMetric}>
          <Text style={styles.metricLabel}>Próxima Vacuna</Text>
          <Text style={styles.metricValue}>{dashboardData!.nextVaccination}</Text>
        </View>
        
        <View style={styles.healthMetric}>
          <Text style={styles.metricLabel}>Nivel de Actividad</Text>
          <Text style={styles.metricValue}>Óptimo 🏃‍♂️</Text>
        </View>
        
        <TouchableOpacity style={styles.upgradeCard}>
          <Text style={styles.upgradeTitle}>🚀 Análisis IA Avanzado</Text>
          <Text style={styles.upgradeDescription}>
            Desbloquea predicciones de salud, análisis comportamental y recomendaciones personalizadas
          </Text>
          <Text style={styles.upgradePrice}>Desde $9.99/mes</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Animatable.Text 
            animation="pulse" 
            iterationCount="infinite" 
            style={styles.loadingIcon}
          >
            🐾
          </Animatable.Text>
          <Text style={styles.loadingText}>Analizando a tu mascota...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Menu</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.petName}>{dashboardData!.petName}</Text>
          <Text style={styles.petDetails}>
            {dashboardData!.species === 'canina' ? '🐕' : '🐱'} {dashboardData!.breed} • {dashboardData!.ageStage}
          </Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/pet-profile')}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>
            Hoy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'week' && styles.activeTab]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[styles.tabText, activeTab === 'week' && styles.activeTabText]}>
            Semana
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'health' && styles.activeTab]}
          onPress={() => setActiveTab('health')}
        >
          <Text style={[styles.tabText, activeTab === 'health' && styles.activeTabText]}>
            Salud
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'today' && renderTodayTab()}
        {activeTab === 'week' && renderWeekTab()}
        {activeTab === 'health' && renderHealthTab()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  loadingText: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: '600',
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
  headerInfo: {
    alignItems: 'center',
  },
  petName: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  petDetails: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  profileButton: {
    backgroundColor: '#22c55e',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: 18,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    marginHorizontal: 20,
    marginVertical: 10,
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
    paddingHorizontal: 20,
  },
  tabContent: {
    paddingBottom: 30,
  },
  healthCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  healthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1e293b',
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '800',
  },
  aiInsight: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  progressGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 15,
  },
  progressCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  progressIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  progressTitle: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '800',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#22c55e',
    borderRadius: 3,
  },
  tasksCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  taskCompleted: {
    opacity: 0.6,
  },
  taskLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskIconText: {
    fontSize: 16,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 2,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  taskTime: {
    fontSize: 12,
    color: '#64748b',
  },
  taskCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckCompleted: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  alertsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  alertDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
    marginRight: 12,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  calendarCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  calendarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  calendarDate: {
    fontSize: 24,
    fontWeight: '800',
    color: '#22c55e',
    width: 40,
  },
  calendarMonth: {
    fontSize: 12,
    color: '#64748b',
    width: 40,
    fontWeight: '600',
  },
  calendarEvent: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
    flex: 1,
  },
  healthDetailCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  healthMetric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  metricLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '700',
  },
  upgradeCard: {
    backgroundColor: '#f0f9ff',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3b82f6',
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 8,
  },
  upgradeDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  upgradePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3b82f6',
  },
});

export default PetDashboard;