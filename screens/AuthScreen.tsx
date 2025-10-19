import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import { cleanupAuthState } from '../lib/authCleanup';

interface AuthScreenProps {
  navigation: any;
}

const AuthScreen = ({ navigation }: AuthScreenProps) => {
  const [mode, setMode] = useState<'login' | 'register' | 'consent'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsConsent, setNeedsConsent] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      checkUserConsent();
    }
  }, [user]);

  useEffect(() => {
    const handleAuthStateChange = async (event: any, session: any) => {
      if (event === 'SIGNED_IN') {
        checkUserConsent();
      } else if (event === 'SIGNED_OUT') {
        // Handle sign out
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      subscription.unsubscribe();
    };
  }, [navigation]);

  const checkUserConsent = async () => {
    if (!user) return;

    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('privacy_accepted, terms_accepted')
        .eq('user_id', user.id)
        .single();

      if (profile && (!profile.privacy_accepted || !profile.terms_accepted)) {
        setNeedsConsent(true);
        setMode('consent');
      } else {
        redirectUser();
      }
    } catch (error) {
      console.error('Error checking consent:', error);
      Alert.alert('Success', 'Login successful! Welcome to Hello Planet Mobile!');
    }
  };

  const redirectUser = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('user_type, admin_role, verification_status')
        .eq('user_id', user!.id)
        .single();

      Alert.alert('Success', 'Login successful! Welcome to Hello Planet Mobile!');
      // Here you would navigate to appropriate screens based on user type
      // For demo purposes, we'll just show a success message
    } catch (error) {
      console.error('Error getting profile:', error);
      Alert.alert('Success', 'Login successful! Welcome to Hello Planet Mobile!');
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);

    try {
      await cleanupAuthState();
      
      try {
        await supabase.auth.signOut({ scope: 'global' } as any);
      } catch { }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          Alert.alert('Erreur de connexion', 'Email ou mot de passe incorrect');
        } else if (error.message.includes('Email not confirmed')) {
          Alert.alert('Email non confirmé', 'Veuillez vérifier votre email et cliquer sur le lien de confirmation');
        } else {
          Alert.alert('Erreur de connexion', error.message);
        }
      } else if (data?.user) {
        Alert.alert('Connexion réussie', 'Bienvenue !');
        checkUserConsent();
      }
    } catch (error: any) {
      Alert.alert('Erreur', 'Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert('Email requis', 'Veuillez entrer votre email pour réinitialiser votre mot de passe');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);

      if (error) throw error;

      Alert.alert('Email envoyé', 'Vérifiez votre boîte mail pour réinitialiser votre mot de passe');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestAccess = () => {
    Alert.alert('Mode Invité', 'Fonctionnalité à implémenter - Navigation vers la sélection du type d\'utilisateur');
  };

  if (mode === 'register') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Inscription</Text>
          <Text style={styles.subtitle}>Formulaire d'inscription à implémenter</Text>
          <TouchableOpacity onPress={() => setMode('login')} style={styles.backButton}>
            <Text style={styles.backButtonText}>Retour à la connexion</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (mode === 'consent') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Consentement</Text>
          <Text style={styles.subtitle}>Formulaire de consentement à implémenter</Text>
          <TouchableOpacity 
            onPress={() => {
              setNeedsConsent(false);
              redirectUser();
            }} 
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>Accepter et continuer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <LinearGradient
            colors={['#f8fafc', '#f1f5f9']}
            style={styles.gradient}
          >
            <View style={styles.content}>
              {/* Heading */}
              <View style={styles.header}>
                <Text style={styles.title}>Bienvenue</Text>
                <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
              </View>

              {/* Input fields */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  editable={!loading}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor="#64748b"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mot de passe"
                  value={password}
                  onChangeText={setPassword}
                  editable={!loading}
                  secureTextEntry
                  placeholderTextColor="#64748b"
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  style={[styles.primaryButton, loading && styles.disabledButton]}
                >
                  {loading ? (
                    <ActivityIndicator color="#ffffff" size="small" />
                  ) : (
                    <Text style={styles.primaryButtonText}>Se connecter</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setMode('register')}
                  disabled={loading}
                  style={styles.secondaryButton}
                >
                  <Text style={styles.secondaryButtonText}>S'inscrire</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleGuestAccess}
                  disabled={loading}
                  style={styles.ghostButton}
                >
                  <Text style={styles.ghostButtonText}>Continuer en tant qu'invité</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleForgotPassword}
                  disabled={loading}
                  style={styles.forgotButton}
                >
                  <Text style={styles.forgotButtonText}>Mot de passe oublié?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    marginBottom: 32,
  },
  input: {
    width: '100%',
    height: 64,
    paddingHorizontal: 24,
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    color: '#0f172a',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    fontSize: 16,
    marginBottom: 16,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
  },
  primaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: '#3b82f6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    height: 56,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ghostButton: {
    width: '100%',
    height: 56,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  ghostButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotButton: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotButtonText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  backButton: {
    padding: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    margin: 16,
  },
  backButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AuthScreen;
