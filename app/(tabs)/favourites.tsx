import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Interface ---
export interface Product {
  id: number;          
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount: number;
  image: string;
  rating: number;
  reviewsCount: number;
  isFavorite: boolean;
}

// --- Mock Data ---
const INITIAL_FAVORITES: Product[] = [
  {
    id: 1,
    brand: 'RØDE',
    title: 'RØDE PodMic Broadcast Microphone',
    price: 199,
    originalPrice: 249,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=300&auto=format&fit=crop',
    rating: 4.8,
    reviewsCount: 1284,
    isFavorite: true,
  },
];

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        {product.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}

        <TouchableOpacity style={styles.favoriteBadge}>
          <Ionicons 
            name={product.isFavorite ? "heart" : "heart-outline"} 
            size={16} 
            color={product.isFavorite ? '#FF3B30' : '#8E8E93'} 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.brandText}>{product.brand?.toUpperCase()}</Text>
        
        <Text style={styles.titleText} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#FFCC00" style={styles.starIcon} />
          <Text style={styles.ratingText}>{product.rating || 0} </Text>
          <Text style={styles.reviewsText}>({(product.reviewsCount || 0).toLocaleString()})</Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.currentPrice}>${product.price}</Text>
            {product.originalPrice && product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>${product.originalPrice}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// --- Main Screen Content ---
const FavoritesScreenContent = () => {
  const insets = useSafeAreaInsets();
  const [favorites, setFavorites] = useState<Product[]>(INITIAL_FAVORITES);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.headerTitle}>Favorites</Text>
            <Text style={styles.headerSubtitle}>{favorites.length} saved items</Text>
          </View>
        }
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};

// --- Screen Export ---
export default function FavoritesScreen() {
  return (
    <SafeAreaProvider>
      <FavoritesScreenContent />
    </SafeAreaProvider>
  );
}

// --- Stylesheet Configuration ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerBlock: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  gridRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  
  // Card Container (Width set to roughly half screen width minus margins)
  cardContainer: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#F2F2F7',
    padding: 8,
    // Soft drop shadow matching image mockup style
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    aspectRatio: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Details Layout
  detailsContainer: {
    paddingHorizontal: 6,
    paddingTop: 10,
    paddingBottom: 4,
  },
  brandText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#A0AEC0',
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 4,
    lineHeight: 18,
    minHeight: 36, // Guarantees visual alignment across uneven item title links
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  starIcon: {
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  reviewsText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  currentPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  originalPrice: {
    fontSize: 12,
    color: '#8E8E93',
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  addButton: {
    backgroundColor: '#2D71FA',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});