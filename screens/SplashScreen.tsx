import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface SplashScreenProps {
  onFinish: () => void;
}

const { width } = Dimensions.get('window');

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const fadeAnim = new Animated.Value(0);
  const titleAnim = new Animated.Value(20);
  const subtitleAnim = new Animated.Value(20);
  const progressAnim = new Animated.Value(0);
  const loadingTextAnim = new Animated.Value(0);
  const progressWidthAnim = new Animated.Value(0);

  useEffect(() => {
    // Start animations
    Animated.sequence([
      Animated.timing(titleAnim, {
        toValue: 0,
        duration: 600,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(subtitleAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 300,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(loadingTextAnim, {
        toValue: 1,
        duration: 300,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: 300,
      useNativeDriver: true,
    }).start();

    // Progress timer
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev >= 100 ? 100 : prev + 2;
        
        // Animate the progress bar width
        Animated.timing(progressWidthAnim, {
          toValue: newProgress,
          duration: 50,
          useNativeDriver: false, // Width animation requires useNativeDriver: false
        }).start();
        
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 300);
        }
        return newProgress;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#3b82f6', '#6366f1', 'rgba(59, 130, 246, 0.8)']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* App Title */}
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: titleAnim }],
              },
            ]}
          >
            <Text style={styles.title}>École du Jeune Spectateur</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.subtitleContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: subtitleAnim }],
              },
            ]}
          >
            <Text style={styles.subtitle}>Découvrez la magie du théâtre</Text>
          </Animated.View>

          {/* Progress Bar */}
          <Animated.View
            style={[
              styles.progressContainer,
              {
                opacity: progressAnim,
              },
            ]}
          >
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressWidthAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
          </Animated.View>

          {/* Loading Text */}
          <Animated.View
            style={[
              styles.loadingContainer,
              {
                opacity: loadingTextAnim,
              },
            ]}
          >
            <Text style={styles.loadingText}>Chargement...</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 34,
  },
  subtitleContainer: {
    marginBottom: 48,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  progressContainer: {
    width: width * 0.64,
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 2,
  },
  loadingContainer: {
    marginTop: 16,
  },
  loadingText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});

export default SplashScreen;
