import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Mock Data ---
const INITIAL_RECENT_SEARCHES = [
  'Wireless headphones',
  'Smart watch',
  'Kitchen appliances',
  'Backpacks',
];

const POPULAR_TAGS = [
  '#Headphones',
  '#Watches',
  '#Speakers',
  '#Books',
  '#Kindle',
  '#RØDE',
  '#Sony',
  '#Backpack',
];

const SearchScreenContent = () => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);

  // Remove a single item from recent searches
  const handleRemoveSearch = (indexToRemove: number) => {
    setRecentSearches(recentSearches.filter((_, index) => index !== indexToRemove));
  };

  // Clear all recent searches
  const handleClearAll = () => {
    setRecentSearches([]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Search Header Row */}
      <View style={styles.headerRow}>
        <View style={styles.searchBarWrapper}>
          <Ionicons name="search-outline" size={20} color="#9099A8" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search FastMart..."
            placeholderTextColor="#9099A8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.micButton}>
            <Ionicons name="mic" size={20} color="#2D71FA" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Recent Searches Section */}
        {recentSearches.length > 0 && (
          <View style={styles.sectionContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent searches</Text>
              <TouchableOpacity onPress={handleClearAll}>
                <Text style={styles.clearAllText}>Clear all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.recentList}>
              {recentSearches.map((item, index) => (
                <View key={index} style={styles.recentItem}>
                  <View style={styles.recentItemLeft}>
                    <Ionicons name="time-outline" size={20} color="#9099A8" style={styles.clockIcon} />
                    <Text style={styles.recentText}>{item}</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleRemoveSearch(index)} style={styles.closeButton}>
                    <Ionicons name="close" size={18} color="#9099A8" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Popular Right Now Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleUnique}>Popular right now</Text>
          <View style={styles.tagsContainer}>
            {POPULAR_TAGS.map((tag, index) => (
              <TouchableOpacity key={index} style={styles.tagPill}>
                <Text style={styles.tagText}>{tag}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

// --- Entry Point Wrapper ---
export default function SearchScreen() {
  return (
    <SafeAreaProvider>
      <SearchScreenContent />
    </SafeAreaProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  searchBarWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    height: 50,
    paddingLeft: 16,
    paddingRight: 8,
    // Soft shadow setup matching your wrapper preference
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
  micButton: {
    padding: 8,
  },
  filterButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2D71FA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D71FA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  sectionContainer: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  sectionTitleUnique: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  clearAllText: {
    fontSize: 14,
    color: '#2D71FA',
    fontWeight: '600',
  },
  recentList: {
    gap: 4,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  recentItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  clockIcon: {
    marginRight: 14,
  },
  recentText: {
    fontSize: 15,
    color: '#2C3E50',
    fontWeight: '500',
  },
  closeButton: {
    padding: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tagPill: {
    backgroundColor: '#F0F4FA',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  tagText: {
    color: '#1C1C1E',
    fontSize: 13,
    fontWeight: '600',
  },
});