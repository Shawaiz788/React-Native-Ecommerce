import { AntDesign, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import SegmentedToggle from '../SegmentedToggle';

const Auth = () => {
  const router=useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/login-banner.jpg')}
          style={{ width: '120%', height: '120%', position: 'absolute' }}
        />
        <LinearGradient
          colors={['#0A0E27', '#10133A', '#1B3FAE', '#3B6BFF']}
          locations={[0, 0.45, 0.75, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFillObject, { opacity: 0.8 }]}
        />
        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.txt}>Sign in to continue shopping.</Text>
      </View>

      <View style={{ flex: 2 ,width:"100%",padding:20}}>
        <View style={{ paddingTop: 24 }}>
          <SegmentedToggle options={['Login', 'Sign Up']} style={{ marginBottom: 20 }} />

          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#9099A8" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#9099A8"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#9099A8" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#9099A8"
              style={styles.input}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color="#9099A8"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TouchableOpacity
              style={styles.rememberRow}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxChecked]}>
                {rememberMe && <Ionicons name="checkmark" size={14} color="white" />}
              </View>
              <Text style={styles.rememberText}>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={()=>router.replace("/home")}>
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={18} color="#EA4335" />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-apple" size={20} color="black" />
              <Text style={styles.socialText}>Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  txt: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    position: 'relative',
    overflow: 'hidden',
    padding: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: 'white',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
    height: 56,
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDEEF2',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#0A0A0A',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#9099A8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#3B6BFF',
    borderColor: '#3B6BFF',
  },
  rememberText: {
    fontSize: 14,
    color: '#0A0A0A',
  },
  forgotText: {
    fontSize: 14,
    color: '#3B6BFF',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#3B6BFF',
    borderRadius: 30,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#3B6BFF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#EDEEF2',
  },
  dividerText: {
    fontSize: 13,
    color: '#9099A8',
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 52,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EDEEF2',
    backgroundColor: 'white',
  },
  socialText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0A0A0A',
  },
});

export default Auth;