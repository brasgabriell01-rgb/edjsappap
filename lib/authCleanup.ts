import AsyncStorage from '@react-native-async-storage/async-storage';

export const cleanupAuthState = async () => {
  try {
    // Clear all auth-related data from AsyncStorage
    const keys = await AsyncStorage.getAllKeys();
    const authKeys = keys.filter(key => 
      key.includes('supabase') || 
      key.includes('auth') || 
      key.includes('session')
    );
    
    if (authKeys.length > 0) {
      await AsyncStorage.multiRemove(authKeys);
    }
    
    console.log('Auth state cleaned up successfully');
  } catch (error) {
    console.error('Error cleaning up auth state:', error);
  }
};
