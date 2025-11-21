# 🐾 PetUs - Aplicación de Bienestar para Mascotas

Una aplicación móvil moderna desarrollada con React Native y Expo que ayuda a los dueños de mascotas a gestionar el bienestar integral de sus compañeros peludos.

## 🚀 Características Principales

### 🏠 **Dashboard Inteligente**
- Información climatológica personalizada con recomendaciones específicas
- Vista general de todas las mascotas registradas
- Recordatorios próximos y tareas pendientes
- Accesos rápidos a servicios principales

### 🐕 **Gestión de Perfiles de Mascotas**
- Perfiles detallados con información completa
- Características físicas y temperamento
- Historial médico y vacunaciones
- Preferencias y necesidades especiales

### 🌤️ **Recomendaciones Climáticas Inteligentes**
- Integración con servicios meteorológicos
- Consejos personalizados según:
  - Temperatura y humedad
  - Especie y tamaño de la mascota
  - Edad y características específicas
- Alertas automáticas por condiciones extremas

### 🔔 **Sistema de Notificaciones**
- Recordatorios de vacunas y medicamentos
- Alertas de citas veterinarias
- Notificaciones de cuidado estético
- Avisos meteorológicos importantes

### 🏥 **Servicios Cercanos**
- Localizador de veterinarias
- Centros de estética canina
- Entrenadores profesionales
- Servicios de emergencia

### 📊 **Seguimiento de Actividades**
- Registro de paseos y ejercicio
- Control de alimentación
- Actividades de entrenamiento
- Historial de cuidados

## 🛠️ **Tecnologías Utilizadas**

### Frontend
- **React Native** con **Expo** - Framework multiplataforma
- **TypeScript** - Tipado estático para mayor robustez
- **React Navigation** - Navegación entre pantallas
- **Expo Location** - Servicios de geolocalización
- **Expo Notifications** - Sistema de notificaciones push
- **AsyncStorage** - Almacenamiento local persistente

### Backend (Simulado)
- **JSON Server** - API REST simulada para desarrollo
- **CORS** - Configuración para requests cross-origin

### Arquitectura
- **Context API** - Gestión de estado global
- **Custom Hooks** - Lógica reutilizable
- **Componentes modulares** - UI consistente y escalable
- **Servicios separados** - Separación de responsabilidades

## 📱 **Instalación y Configuración**

### Prerrequisitos
- Node.js 18.x o superior
- npm o yarn
- Expo CLI global
- Dispositivo iOS/Android o emulador

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar el backend simulado
```bash
cd backend
npm install
npm start
```
El servidor se ejecutará en `http://localhost:3001`

### 3. Iniciar la aplicación
```bash
npm start
```

### 4. Abrir en dispositivo
- Escanea el código QR con la app Expo Go
- O presiona `i` para iOS Simulator / `a` para Android Emulator

## 🔑 **Credenciales de Prueba**

Para probar la aplicación, usa estas credenciales:
- **Email:** `usuario@example.com`
- **Contraseña:** `password123`

## 📁 **Estructura del Proyecto**

```
PetUsApp/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── PetCard.tsx
│   │   └── LoadingSpinner.tsx
│   ├── screens/            # Pantallas de la aplicación
│   │   ├── WelcomeScreen.tsx
│   │   ├── RegisterUserScreen.tsx
│   │   ├── RegisterPetScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   └── PetProfileScreen.tsx
│   ├── navigation/         # Configuración de navegación
│   │   ├── AuthNavigator.tsx
│   │   └── AppNavigator.tsx
│   ├── context/           # Contextos de React
│   │   ├── AuthContext.tsx
│   │   └── PetContext.tsx
│   ├── services/          # Servicios y APIs
│   │   ├── locationService.ts
│   │   ├── weatherService.ts
│   │   └── notificationService.ts
│   ├── hooks/             # Custom hooks
│   │   ├── useWeatherRecommendations.ts
│   │   └── useNotifications.ts
│   ├── types/             # Definiciones TypeScript
│   │   └── index.ts
│   ├── constants/         # Constantes y configuración
│   │   └── colors.js
│   └── utils/             # Utilidades
├── backend/               # Backend simulado
│   ├── db.json           # Base de datos JSON
│   ├── server.js         # Servidor Express
│   └── package.json
├── assets/               # Recursos estáticos
│   ├── images/
│   └── pets/
└── App.tsx              # Componente principal
```

## 🎨 **Design System**

### Paleta de Colores
- **Primary:** `#64C9CC` (Verde Agua)
- **Secondary:** `#3D8C8E` (Verde Oscuro)
- **Accent:** `#FFD166` (Amarillo Suave)
- **Background:** `#F2F2F2` (Gris Claro)
- **Text Dark:** `#333333`
- **Text Light:** `#FFFFFF`

### Componentes UI
- **Botones:** 4 variantes (primary, secondary, outline, danger)
- **Inputs:** Con iconos, validación y estados de error
- **Cards:** Para mostrar información de mascotas y servicios
- **Indicadores:** Loading, estados vacíos, notificaciones

---

**PetUs** - *"Porque cada mascota merece el mejor cuidado"* 🐾❤️
