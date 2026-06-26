import { useColorScheme } from '@/hooks/use-color-scheme';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';



export default function RootLayout() {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  return (//DarkTheme instead of DefaultTheme
    <ThemeProvider value={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}> 
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown:false }} />
        <Stack.Screen name="(auth)/auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
