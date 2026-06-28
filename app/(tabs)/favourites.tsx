import { getProducts, Product, updateProduct } from '@/api/product';
import useFavouriteStore from '@/store/favouriteStore';
import { Ionicons } from '@expo/vector-icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useMemo } from 'react';
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






const ProductCard = ({ product, onToggleFavourite }: { product: Product; onToggleFavourite: (p: Product) => void }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        {product.discount > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discount}%</Text>
          </View>
        )}

        <TouchableOpacity style={styles.favoriteBadge} onPress={() => onToggleFavourite(product)}>
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
  const queryClient = useQueryClient();

  const { favoriteIds, toggleFavorite, setFavorites } = useFavouriteStore();

  // If user favorites came from home just now, keep `isFavorite` in sync in the
  // local query cache so this screen re-renders immediately.
  React.useEffect(() => {
    if (!ProductsData?.length) return;
    if (!favoriteIds.length) return;

    queryClient.setQueryData<Product[]>(['products'], (old) => {
      if (!old) return old;
      return old.map((p) => ({ ...p, isFavorite: favoriteIds.includes(p.id) }));
    });
  }, [favoriteIds, ProductsData?.length, queryClient]);

  const { data: ProductsData, isError: status } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  // First sync: if we fetched products that already have isFavorite set,
  // initialize Zustand from server (only once / when store is empty).
  useEffect(() => {
    if (!ProductsData?.length) return;
    if (favoriteIds.length) return;

    const serverFavoriteIds = ProductsData.filter((p) => p.isFavorite).map((p) => p.id);
    setFavorites(serverFavoriteIds);
  }, [ProductsData, favoriteIds.length, setFavorites]);

  const filteredFavorites = useMemo(() => {
    if (!ProductsData?.length) return [] as Product[];
    if (!favoriteIds.length) return [] as Product[];
    return ProductsData.filter((p) => favoriteIds.includes(p.id));
  }, [ProductsData, favoriteIds]);

  const toggleFavouriteMutation = useMutation({
    mutationFn: async (product: Product) => {
      return updateProduct({
        ...product,
        isFavorite: !product.isFavorite,
      });
    },
    onMutate: async (product: Product) => {
      await queryClient.cancelQueries({ queryKey: ['products'] });
      const prev = queryClient.getQueryData<Product[]>(['products']);

      // Optimistic UI: update server cache immediately.
      queryClient.setQueryData<Product[]>(['products'], (old) => {
        if (!old) return old;
        return old.map((p) => (p.id === product.id ? { ...p, isFavorite: !p.isFavorite } : p));
      });

      // Optimistic local store: keep Zustand in sync.
      toggleFavorite(product.id);

      return { prev };
    },
    onError: (_err: unknown, _product: Product, context: { prev?: Product[] }) => {
      // Rollback server cache.
      if (context?.prev) {
        queryClient.setQueryData(['products'], context.prev);
      }
      // Rollback local store by toggling again (since we toggled optimistically).
      toggleFavorite(_product.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const toggleFavourite = (product: Product) => {
    toggleFavouriteMutation.mutate(product);
  };

  if (status) {
    console.log('Error fetching products');
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerBlock}>
            <Text style={styles.headerTitle}>Favorites</Text>
            <Text style={styles.headerSubtitle}>{filteredFavorites.length} saved items</Text>
          </View>
        }
        renderItem={({ item }) => <ProductCard product={item} onToggleFavourite={toggleFavourite} />}
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