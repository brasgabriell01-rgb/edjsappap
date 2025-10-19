# École du Jeune Spectateur - Mobile App

React Native mobile application converted from the original web app, maintaining the same design and functionality.

## 🚀 Features

- **Beautiful Splash Screen** with animated loading and "École du Jeune Spectateur" branding
- **Authentication Screen** with email/password login, registration, and guest access
- **Supabase Integration** for backend authentication and user management
- **Smooth Animations** using React Native Animated API
- **Native iOS Support** with Xcode project configuration
- **TypeScript** for type safety and better development experience

## 📱 Screens Converted

### ✅ SplashScreen (`screens/SplashScreen.tsx`)
- Animated title and subtitle with smooth transitions
- Progress bar with real-time loading animation
- Gradient background matching web design
- Auto-navigation after completion

### ✅ AuthScreen (`screens/AuthScreen.tsx`)
- Complete login form with email/password inputs
- Registration and consent mode support
- Guest access functionality
- Forgot password feature
- Full Supabase authentication integration
- Responsive design with keyboard handling
- Native alerts for user feedback

## 🛠 Setup Instructions

### Prerequisites
- Node.js (v16 or later)
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (Xcode) or Android Studio
- Expo Go app on your mobile device

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/brasgabriell01-rgb/edjsappap.git
cd edjsappap
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure Supabase:**
   - Open `lib/supabase.ts`
   - Update with your Supabase URL and anon key if needed

### Running the App

**Start Expo development server:**
```bash
npm start
```

**Choose your platform:**
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app on your device

**For native iOS development:**
```bash
npx expo run:ios
```

## 📋 Project Structure

```
edjsappap/
├── App.tsx                 # Main app component with navigation
├── AppSimple.tsx          # Minimal backup app component
├── package.json           # Dependencies and scripts
├── screens/
│   ├── AuthScreen.tsx     # Login/authentication screen
│   └── SplashScreen.tsx   # Loading/splash screen
├── hooks/
│   └── useAuth.tsx        # Authentication hook
├── lib/
│   ├── supabase.ts        # Supabase client configuration
│   └── authCleanup.ts     # Auth state cleanup utility
├── assets/                # App icons and images
└── ios/                   # iOS native project files
```

## 🎯 Key Features Maintained

1. **Same Visual Design**: Colors, typography, and layout match the web version
2. **Authentication Flow**: Complete Supabase integration with user management
3. **Responsive Layout**: Adapts to different screen sizes
4. **Native Animations**: Smooth transitions and loading states
5. **Error Handling**: User-friendly alert dialogs
6. **Type Safety**: Full TypeScript implementation

## 🔧 Technical Details

### Dependencies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **@supabase/supabase-js**: Backend integration
- **expo-linear-gradient**: Gradient backgrounds
- **@react-navigation/native**: Navigation system
- **@react-native-async-storage/async-storage**: Local storage
- **react-native-safe-area-context**: Safe area handling

### Animations
- **Splash Screen**: Uses `Animated.Value` with smooth transitions
- **Progress Bar**: Custom animated width with interpolation
- **Safe Areas**: Modern SafeAreaView implementation

### Authentication
- **Supabase Auth**: Email/password authentication
- **Session Management**: Persistent login with AsyncStorage
- **User Profiles**: Integration with profiles table
- **Consent Management**: Privacy and terms acceptance

## 🚀 Deployment

### iOS App Store
1. Open `ios/HelloPlanetMobile.xcworkspace` in Xcode
2. Configure signing and provisioning profiles
3. Archive and upload to App Store Connect

### Android Play Store
1. Build APK: `npx expo build:android`
2. Follow Google Play Console upload process

### Expo Updates
```bash
npx expo publish
```

## 🐛 Troubleshooting

**Common Issues:**

1. **Metro bundler issues**: Run `npx expo start --clear`
2. **iOS simulator not working**: Ensure Xcode is installed and simulators are available
3. **Type errors**: Check TypeScript configuration and imports
4. **Supabase connection**: Verify credentials in `lib/supabase.ts`

**Development Tips:**
- Use `AppSimple.tsx` for testing if main app has issues
- Check Expo logs for detailed error information
- Use tunnel mode for better connectivity: `npx expo start --tunnel`

## 📞 Support

For issues and questions:
- Check the [Expo documentation](https://docs.expo.dev/)
- Review [React Native guides](https://reactnative.dev/docs/getting-started)
- Consult [Supabase documentation](https://supabase.com/docs)

## 📄 License

This project is part of the École du Jeune Spectateur application suite.

---

**Built with ❤️ using React Native and Expo**
