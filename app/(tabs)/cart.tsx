import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import useCartStore from '@/store/cartStore';

const CartScreenContent = () => {
  const insets = useSafeAreaInsets();
  const [promoCode, setPromoCode] = useState('');

  const products = useCartStore((state) => state.products);
  const totalItemsCount = useCartStore((state) => state.items);
  const addProduct = useCartStore((state) => state.addProduct);
  const reduceProduct = useCartStore((state) => state.reduceProduct);
  const clearCart = useCartStore((state) => state.clearCart);

  const shippingCost = 0; // "Free"

  const subtotal = products.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal + shippingCost);

  const updateQuantity = (id: number, delta: number) => {
    const targetItem = products.find((p) => p.id === id);
    if (!targetItem) return;

    if (delta > 0) {
      addProduct(targetItem);
    } else {
      reduceProduct(targetItem);
    }
  };

  // Uses reduceProduct repeatedly or clearCart if it's the last item type to wipe it
  const removeItem = (id: number) => {
    const targetItem = products.find((p) => p.id === id);
    if (!targetItem) return;
    
    // Completely clear item by running reduceProduct for its entire quantity
    const currentQty = targetItem.quantity;
    for (let i = 0; i < currentQty; i++) {
      reduceProduct(targetItem);
    }
  };

  // --- Render State 1: Empty Cart ---
  if (products.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <View style={styles.emptyIconWrapper}>
          <Ionicons name="bag-handle-outline" size={32} color="#4A5568" />
        </View>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add products to start checkout.</Text>
      </View>
    );
  }

  // --- Render State 2: Active Cart ---
  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.headerBlock}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={styles.headerTitle}>My Cart</Text>
              <Text style={styles.headerSubtitle}>{totalItemsCount} items total</Text>
            </View>
            <TouchableOpacity onPress={clearCart}>
              <Text style={{ color: '#FF3B30', fontWeight: '600' }}>Clear All</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemsList}>
          {products.map((item) => (
            <View key={item.id} style={styles.cartCard}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              
              <View style={styles.cardDetails}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.priceText}>${item.price}</Text>

                <View style={styles.controlsRow}>
                  <View style={styles.counterGroup}>
                    <TouchableOpacity 
                      style={styles.counterBtn} 
                      onPress={() => updateQuantity(item.id, -1)}
                    >
                      <Ionicons name="remove" size={16} color="#718096" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity 
                      style={styles.counterBtn} 
                      onPress={() => updateQuantity(item.id, 1)}
                    >
                      <Ionicons name="add" size={16} color="#2D71FA" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.deleteBtn} onPress={() => removeItem(item.id)}>
                    <Ionicons name="trash-outline" size={18} color="#FF3B30" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.promoWrapper}>
          <Ionicons name="pricetag-outline" size={20} color="#9099A8" style={styles.promoIcon} />
          <TextInput
            style={styles.promoInput}
            placeholder="Promo code"
            placeholderTextColor="#9099A8"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValueBold}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <Text style={styles.summaryValue}>Free</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Discount</Text>
            <Text style={styles.discountValueText}>- ${0}</Text>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={[styles.summaryRow, { marginBottom: 0 }]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity style={[styles.checkoutBtn, { marginBottom: insets.bottom + 16 }]}>
          <Text style={styles.checkoutBtnText}>Checkout · ${total.toFixed(2)}</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

export default function CartScreen() {
  return (
    <SafeAreaProvider>
      <CartScreenContent />
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  headerBlock: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1C1C1E',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 2,
  },
  itemsList: {
    gap: 16,
    marginBottom: 24,
  },
  cartCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
    backgroundColor: '#F2F2F7',
  },
  cardDetails: {
    flex: 1,
    marginLeft: 14,
  },
  brandText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A0AEC0',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
    marginTop: 2,
    lineHeight: 20,
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2D71FA',
    marginTop: 4,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  counterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    paddingHorizontal: 4,
    height: 32,
  },
  counterBtn: {
    paddingHorizontal: 10,
    height: '100%',
    justifyContent: 'center',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1C1C1E',
    minWidth: 16,
    textAlign: 'center',
  },
  deleteBtn: {
    padding: 6,
  },
  promoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2D71FA',
    borderStyle: 'dashed',
    height: 54,
    paddingLeft: 16,
    paddingRight: 6,
    marginBottom: 24,
  },
  promoIcon: {
    marginRight: 10,
  },
  promoInput: {
    flex: 1,
    fontSize: 15,
    color: '#1C1C1E',
  },
  // Fixed syntax error here
  applyBtn: {
    backgroundColor: '#2D71FA',
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    padding: 20,
    marginBottom: 24,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  summaryValueBold: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '700',
  },
  discountValueText: {
    fontSize: 14,
    color: '#00C853',
    fontWeight: '600',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 14,
  },
  totalLabel: {
    fontSize: 15,
    color: '#718096',
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 20,
    color: '#1C1C1E',
    fontWeight: '800',
  },
  checkoutBtn: {
    backgroundColor: '#2D71FA',
    borderRadius: 24,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2D71FA',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  checkoutBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#F0F4FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 28,
  },
  browseBtn: {
    backgroundColor: '#2D71FA',
    paddingHorizontal: 28,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});