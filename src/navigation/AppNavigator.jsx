import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/homes/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateDesign from '../screens/CreateDesign';
import GenerateImage from '../screens/GenerateImage';
import SplashScreen from '../screens/SplashScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import MyDesigns from '../screens/MyDesigns';
import FavoritesScreen from '../screens/FavoritesScreen';
import ContactScreen from '../screens/ContactScreen';

// Import assets
import Menu from '../../assets/images/menu.png';
import Profile from '../../assets/images/profile.jpg';
import apiService from '../services/apiService';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await apiService.getProfile();
      setUserData(response);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.drawerHeader}>
        <Image source={Profile} style={styles.drawerProfileImage} />
        {loading ? (
          <ActivityIndicator size="small" color="#FF7B7B" />
        ) : (
          <>
            <Text style={styles.drawerProfileName}>
              {userData?.firstName} {userData?.lastName}
            </Text>
            <Text style={styles.drawerProfileEmail}>{userData?.email}</Text>
          </>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.drawerBody}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate('MainTabs', {
              screen: 'HomeTab',
            });
          }}>
          <Icon name="home-outline" size={24} color="#2D3436" />
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate('MainTabs', {
              screen: 'ProfileTab',
            });
          }}>
          <Icon name="person-outline" size={24} color="#2D3436" />
          <Text style={styles.drawerItemText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Create Design')}>
          <Icon name="add-circle-outline" size={24} color="#2D3436" />
          <Text style={styles.drawerItemText}>Create Design</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Generate Image')}>
          <Icon name="image-outline" size={24} color="#2D3436" />
          <Text style={styles.drawerItemText}>Generate Image</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate('MainTabs', {
              screen: 'MyDesignsTab',
            });
          }}>
          <Icon name="images-outline" size={24} color="#2D3436" />
          <Text style={styles.drawerItemText}>My Designs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => {
            navigation.navigate('MainTabs', {
              screen: 'FavoritesTab',
            });
          }}>
          <Icon name="heart-outline" size={24} color="#2D3436" />
          <Text style={styles.drawerItemText}>Favorites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Contact')}>
          <Icon name="mail-outline" size={24} color="#2D3436" />
          <Text style={styles.drawerItemText}>Contact Us</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out-outline" size={24} color="#FF7B7B" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Tab Navigator
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#FF7B7B',
        tabBarInactiveTintColor: '#636E72',
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'Outfit-Medium',
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyDesignsTab"
        component={MyDesigns}
        options={{
          tabBarLabel: 'My Designs',
          tabBarIcon: ({color, size}) => (
            <Icon name="images-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{
          tabBarLabel: 'Favorites',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart-outline" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

// Drawer Navigator
const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.headerIcon}>
            <Image source={Menu} style={styles.menuIcon} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => {
              // Navigate to the MainTabs first, then to ProfileTab
              navigation.navigate('MainTabs', {
                screen: 'ProfileTab',
              });
            }}
            style={styles.headerIcon}>
            <Image source={Profile} style={styles.profileIcon} />
          </TouchableOpacity>
        ),
        headerBackground: () => (
          <LinearGradient
            colors={['#F8F9FA', '#F8F9FA']}
            style={styles.headerBackground}
          />
        ),
      })}>
      <Drawer.Screen name="MainTabs" component={TabNavigator} />
      <Drawer.Screen name="Create Design" component={CreateDesign} />
      <Drawer.Screen name="Generate Image" component={GenerateImage} />
      <Drawer.Screen name="Contact" component={ContactScreen} />
    </Drawer.Navigator>
  );
};

// Main Navigator with Auth Flow
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        {/* Auth screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={SignUpScreen}
          options={{headerShown: false}}
        />

        {/* Main app screen (with drawer) */}
        <Stack.Screen
          name="MainApp"
          component={MainDrawer}
          options={{headerShown: false}}
        />

        {/* Forgot Password screen */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    marginHorizontal: 16,
    padding: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    padding: 5,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  headerBackground: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerHeader: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  drawerProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  drawerProfileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
  drawerProfileEmail: {
    fontSize: 14,
    color: '#636E72',
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
  },
  drawerBody: {
    flex: 1,
    paddingTop: 16,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#2D3436',
    marginLeft: 16,
    fontFamily: 'Outfit-Medium',
  },
  logoutButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FF7B7B',
    marginLeft: 8,
    fontFamily: 'Outfit-Bold',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 24,
  },
});

export default AppNavigator;
