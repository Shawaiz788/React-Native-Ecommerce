
import { getCategories } from '@/api/category';
import { getProducts, Product } from '@/api/product';
import useCartStore from '@/store/cartStore';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const DEALS_OF_THE_DAY: Product[] = [
  {
    id: 1,
    title: 'Sony WH-1000XM6 Wireless Headphones',
    brand: 'Sony',
    price: 419.99,
    originalPrice: 549.99,
    discount: 24,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    rating: 4.8,
    reviewsCount: 1240,
    isFavorite: true,
  },
  {
    id: 2,
    title: 'Mechanical Gaming Keyboard RGB',
    brand: 'Logitech',
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    rating: 4.5,
    reviewsCount: 432,
    isFavorite: false,
  },
  {
    id: 3,
    title: 'Ultra-Wide Curved Monitor 34"',
    brand: 'Samsung',
    price: 349.99,
    originalPrice: 449.99,
    discount: 22,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80',
    rating: 4.7,
    reviewsCount: 89,
    isFavorite: false,
  }
];




const TopContainer = () => {
  return (
    <View style={styles.topContainer}>
      <Image source={require('../../assets/images/pfp.png')} style={styles.profile} />
      <View>
        <Text style={styles.bodytext}>Hello, Shawaiz</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="location-outline" size={15} color="blue" />
          <Text style={styles.heading}>Lahore, Punjab</Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginLeft: 'auto', gap: 8, marginRight: 10 }}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={20} color="#111" />
          <View style={styles.badge} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="menu" size={20} color="#111" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SearchBar = () => {
  return (
    <View style={styles.inputWrapper}>
      <Ionicons name="search" size={18} color="#9099A8" />
      <TextInput
        placeholder="Search for products, brands and more"
        placeholderTextColor="#9099A8"
        style={styles.searchInput}
      />
    </View>
  );
};

const PromotionalBanner = () => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannerScroll} contentContainerStyle={styles.bannerContainer}>
      <View style={[styles.banner, { backgroundColor: '#2D71FA' }]}>
        <Text style={styles.bannerTag}>TODAY ONLY</Text>
        <Text style={styles.bannerTitle}>Mega Tech Sale</Text>
        <Text style={styles.bannerSubtitle}>Up to 40% off premium audio</Text>
        <TouchableOpacity style={styles.shopNowBtn}>
          <Text style={styles.shopNowText}>Shop now</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.banner, { backgroundColor: '#00C853' }]}>
        <Text style={styles.bannerTag}>TODAY ONLY</Text>
        <Text style={styles.bannerTitle}>Free Delivery</Text>
        <Text style={styles.bannerSubtitle}>On everything</Text>
        <TouchableOpacity style={styles.shopNowBtn}>
          <Text style={styles.shopNowText}>Learn more</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const Categories = () => {
  const queryClient = useQueryClient();
  const { data: CategoryData, isError: status } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });
  if (status) {
    console.log('Error fetching categories');
  }
  return (
    <FlatList
      style={{ marginLeft: 20, marginRight: 20, marginBottom: 10 }}
      data={[{ id: 0, title: '🌐 All' }, ...(CategoryData || [])]}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.categoryItem}>
          <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 12 }}>{item.title}</Text>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const DealsOfTheDayHeader = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);
      const difference = endOfDay.getTime() - now.getTime();

      if (difference <= 0) return '00:00:00';

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      const pad = (num: number) => String(num).padStart(2, '0');
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.sectionHeaderContainer}>
      <View>
        <Text style={styles.title}>Deals of the Day</Text>
        <Text style={styles.subtitle}>Ends in {timeLeft}</Text>
      </View>
      <TouchableOpacity onPress={() => console.log('See all pressed')}>
        <Text style={styles.seeAllText}>See all</Text>
      </TouchableOpacity>
    </View>
  );
};
const ProductCard = ({ product }: { product: Product }) => {
  const{addProduct} = useCartStore();
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        
        {product.originalPrice!=product.price && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{Math.round((1 - product.price / product.originalPrice) * 100)}%</Text>
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

          <TouchableOpacity style={styles.addButton} onPress={() => addProduct(product)}>
            <Ionicons name="add" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


const home = () => {

   const queryClient = useQueryClient();
  const { data: ProductsData, isError: status } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  if (status) {
    console.log('Error fetching products');
  }

  return (
    <FlatList
      data={[]} 
      renderItem={null}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          <TopContainer />
          <SearchBar />
          <PromotionalBanner />
          <Categories />
          
          <DealsOfTheDayHeader />
          <FlatList
            data={DEALS_OF_THE_DAY}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 14, paddingBottom: 10 ,gap: 10}}
            renderItem={({ item }) => <ProductCard product={item} />}
            keyExtractor={(item) => item.id.toString()}
          />

         <View style={[styles.sectionHeaderContainer, { marginTop: 10 }]}>
            <View>
              <Text style={styles.title}>Recommended for You</Text>
              <Text style={styles.subtitle}>Based on your recent activity</Text>
            </View>
          </View>
        </>
      }
      ListFooterComponent={
        <View style={styles.productsGridContainer}>
          {ProductsData?.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </View>
      }
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.08,
    paddingHorizontal: 16,
    gap: 8,
    justifyContent: 'center',
  },
  profile: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#2670F2',
    marginTop: 'auto',
  },
  heading: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  bodytext: {
    fontSize: 14,
    color: 'gray',
  },
  iconButton: {
    position: 'relative',
    padding: 4,
    backgroundColor: '#E5E5EA',
    borderRadius: 16,
    height: 32,
    width: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'red',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 20,
    marginTop: 25,
    paddingLeft: 16,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    height: 46,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  bannerScroll: {
    marginBottom: 16,
  },
  bannerContainer: {
    paddingHorizontal: 16,
  },
  banner: {
    width: windowWidth * 0.70,
    height: 135,
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    justifyContent: 'center',
  },
  bannerTag: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  bannerSubtitle: {
    color: '#FFF',
    fontSize: 12,
    marginBottom: 10,
    opacity: 0.9,
  },
  shopNowBtn: {
    backgroundColor: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  shopNowText: {
    color: '#2D71FA',
    fontSize: 12,
    fontWeight: '700',
  },
  categoryItem: {
    width: 70,
    height: 34,
    backgroundColor: 'white',
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    marginRight: 8,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 1,
  },
  seeAllText: {
    fontSize: 13,
    color: '#2874F0',
    fontWeight: '500',
  },
  productsGridContainer: {
    paddingHorizontal: 14,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    width: (windowWidth - 40) / 2, 
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 135,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#ff3b30',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  favoriteBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  detailsContainer: {
    padding: 8,
  },
  brandText: {
    fontSize: 10,
    color: '#8e8e93',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  titleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1c1c1e',
    marginTop: 2,
    height: 34,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  starIcon: {
    color: '#ffcc00',
    fontSize: 12,
    marginRight: 3,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  reviewsText: {
    fontSize: 11,
    color: '#8e8e93',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  originalPrice: {
    fontSize: 11,
    color: '#8e8e93',
    textDecorationLine: 'line-through',
    marginTop: 1,
  },
  addButton: {
    backgroundColor: '#2f74fa',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -2,
  },
});

export default home;

