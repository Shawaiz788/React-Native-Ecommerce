import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout(){
      const colorScheme = useColorScheme();

    return (
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}>
    <Tabs >
            <Tabs.Screen name="home" options={{headerShown:false, tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            )}} />
            <Tabs.Screen name="search" options={{headerShown:false, tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            )}} />
            <Tabs.Screen name="cart" options={{headerShown:false, tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart" size={size} color={color} />
            )}} />
            <Tabs.Screen name="favourites" options={{headerShown:false, tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            )}} />
            <Tabs.Screen name="account" options={{headerShown:false, tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            )}} />
    </Tabs>
    <StatusBar style="auto" />
    
    </ThemeProvider>)
}