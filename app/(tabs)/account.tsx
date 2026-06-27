import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

// --- Types ---
interface MenuItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  badge?: string | number;
  badgeType?: 'notification' | 'text';
  isLast?: boolean;
}

// --- Reusable Menu Item Component ---
const MenuItem = ({ icon, label, badge, badgeType, isLast }: MenuItemProps) => {
  return (
    <TouchableOpacity style={[styles.menuItem, isLast && styles.noBorder]}>
      <View style={styles.menuItemLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={20} color="#2D71FA" />
        </View>
        <Text style={styles.menuItemLabel}>{label}</Text>
      </View>
      
      <View style={styles.menuItemRight}>
        {badge !== undefined && (
          <View style={[
            styles.badge, 
            badgeType === 'notification' ? styles.notificationBadge : styles.textBadge
          ]}>
            <Text style={[
              styles.badgeText, 
              badgeType === 'text' && styles.textBadgeColor
            ]}>
              {badge}
            </Text>
          </View>
        )}
        <Ionicons name="chevron-forward" size={16} color="#8E8E93" />
      </View>
    </TouchableOpacity>
  );
};

// --- Main Content Screen ---
const AccountScreenContent = () => {
  const insets = useSafeAreaInsets();
  const router=useRouter();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2D71FA" />
      
      {/* Smaller Fixed Blue Top Bar */}
      <View style={[styles.blueHeader, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.headerTitle}>Account</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {/* Clean, Non-overlapping User Profile Card */}
        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Saad Khan</Text>
            <Text style={styles.profileEmail}>saad@fastmart.app</Text>
            <View style={styles.proBadge}>
              <Text style={styles.proBadgeText}>PRO MEMBER</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileArrowBtn}>
            <Ionicons name="chevron-forward" size={20} color="#1C1C1E" />
          </TouchableOpacity>
        </View>

        {/* Group 1: Core User Actions */}
        <View style={styles.menuGroup}>
          <MenuItem icon="person-outline" label="My Details" />
          <MenuItem icon="cube-outline" label="Orders" badge={2} badgeType="notification" />
          <MenuItem icon="chatbubble-outline" label="Chat with driver" />
          <MenuItem icon="location-outline" label="Addresses" />
          <MenuItem icon="card-outline" label="Payment Methods" isLast />
        </View>

        {/* Group 2: Preferences & Settings */}
        <View style={styles.menuGroup}>
          <MenuItem icon="notifications-outline" label="Notifications" />
          <MenuItem icon="lock-closed-outline" label="Security" />
          <MenuItem icon="moon-outline" label="Theme" badge="Dark" badgeType="text" isLast />
        </View>

        {/* Group 3: Help & Business */}
        <View style={styles.menuGroup}>
          <MenuItem icon="storefront-outline" label="Seller Dashboard" />
          <MenuItem icon="help-circle-outline" label="Help Center" isLast />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={()=>{router.replace('/(auth)/auth')}}>
          <Ionicons name="log-out-outline" size={20} color="#FF3B30" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer Info */}
        <Text style={styles.footerText}>FastMart v1.0.0 · Made with care</Text>
      </ScrollView>
    </View>
  );
};

// --- Entry Point Wrapper ---
export default function AccountScreen() {
  return (
    <SafeAreaProvider>
      <AccountScreenContent />
    </SafeAreaProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  blueHeader: {
    backgroundColor: '#2D71FA',
    paddingHorizontal: 24,
    paddingBottom: 16, // Reduced padding for a smaller, compact bar
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  headerTitle: {
    fontSize: 22, // Slightly more compact font size to match the smaller bar
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  // Profile Card Styles (Adjusted for No Overlap)
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 20, // Replaced negative margin with clean, uniform spacing
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E5E5EA',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 6,
  },
  proBadge: {
    backgroundColor: '#EBF2FF',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  proBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#2D71FA',
  },
  profileArrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Menu Container Styles
  menuGroup: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#EBF2FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuItemLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Badge Styles
  badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  notificationBadge: {
    backgroundColor: '#FF3B30',
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  textBadge: {
    backgroundColor: '#F2F2F7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  textBadgeColor: {
    color: '#1C1C1E',
    fontSize: 13,
  },
  // Logout Button Styles
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFE5E5',
    borderRadius: 24,
    height: 50,
    marginTop: 10,
    marginBottom: 24,
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF3B30',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8E8E93',
  },
});