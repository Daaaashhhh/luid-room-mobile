import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      // Navigate to appropriate screen based on token existence
      navigation.replace(token ? 'MainApp' : 'Login');
    } catch (error) {
      navigation.replace('Login');
    }
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF7B7B" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default SplashScreen;
