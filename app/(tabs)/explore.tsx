import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todo', icon: '📋' },
    { id: 'tips', label: 'Consejos', icon: '💡' },
    { id: 'health', label: 'Salud', icon: '🏥' },
    { id: 'food', label: 'Comida', icon: '🍖' },
    { id: 'training', label: 'Entrenamiento', icon: '🎯' },
  ];

  const articles = [
    {
      id: 1,
      title: '10 Consejos para el Cuidado Diario de tu Perro',
      category: 'tips',
      excerpt: 'Descubre los mejores consejos para mantener a tu perro feliz y saludable.',
      readTime: '5 min',
      featured: true,
    },
    {
      id: 2,
      title: 'Alimentación Balanceada para Gatos',
      category: 'food',
      excerpt: 'Todo lo que necesitas saber sobre la nutrición felina.',
      readTime: '8 min',
      featured: false,
    },
    {
      id: 3,
      title: 'Síntomas de Alerta en Mascotas',
      category: 'health',
      excerpt: 'Aprende a identificar cuándo tu mascota necesita atención veterinaria.',
      readTime: '12 min',
      featured: true,
    },
    {
      id: 4,
      title: 'Entrenamiento Básico para Cachorros',
      category: 'training',
      excerpt: 'Técnicas efectivas para entrenar a tu cachorro desde pequeño.',
      readTime: '15 min',
      featured: false,
    },
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar artículos..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94a3b8"
          />
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <Text style={styles.sectionTitle}>Categorías</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text style={[
                styles.categoryLabel,
                selectedCategory === category.id && styles.categoryLabelActive
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.articlesContainer}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'Artículos Destacados' : `Artículos de ${categories.find(c => c.id === selectedCategory)?.label}`}
        </Text>
        
        {filteredArticles.map((article) => (
          <TouchableOpacity key={article.id} style={styles.articleCard}>
            <View style={styles.articleContent}>
              <View style={styles.articleHeader}>
                <Text style={styles.articleTitle}>{article.title}</Text>
                {article.featured && <Text style={styles.featuredBadge}>⭐</Text>}
              </View>
              <Text style={styles.articleExcerpt}>{article.excerpt}</Text>
              <View style={styles.articleFooter}>
                <Text style={styles.readTime}>📖 {article.readTime}</Text>
                <Text style={styles.categoryTag}>
                  {categories.find(c => c.id === article.category)?.icon} {categories.find(c => c.id === article.category)?.label}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {filteredArticles.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={styles.emptyText}>No se encontraron artículos</Text>
            <Text style={styles.emptySubtext}>Intenta con otros términos de búsqueda</Text>
          </View>
        )}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionIcon}>🏥</Text>
            <Text style={styles.quickActionText}>Veterinarios Cerca</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionIcon}>🏪</Text>
            <Text style={styles.quickActionText}>Tiendas de Mascotas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionIcon}>🎾</Text>
            <Text style={styles.quickActionText}>Parques para Perros</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionIcon}>📞</Text>
            <Text style={styles.quickActionText}>Emergencia Vet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    padding: 20,
    backgroundColor: '#1e293b',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingVertical: 24,
    backgroundColor: '#0f172a',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 16,
    paddingHorizontal: 20,
    letterSpacing: 0.5,
  },
  categoriesScroll: {
    paddingLeft: 20,
  },
  categoryButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    minWidth: 90,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryButtonActive: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  categoryIcon: {
    fontSize: 20,
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '600',
  },
  categoryLabelActive: {
    color: '#ffffff',
  },
  articlesContainer: {
    padding: 20,
    backgroundColor: '#0f172a',
  },
  articleCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  articleContent: {
    flex: 1,
  },
  articleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  articleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1e293b',
    flex: 1,
    marginRight: 8,
    lineHeight: 22,
  },
  featuredBadge: {
    fontSize: 16,
  },
  articleExcerpt: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: '500',
  },
  articleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  readTime: {
    fontSize: 13,
    color: '#22c55e',
    fontWeight: '600',
  },
  categoryTag: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
  },
  quickActions: {
    padding: 20,
    backgroundColor: '#1e293b',
    marginTop: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: (width - 60) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  quickActionIcon: {
    fontSize: 28,
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});