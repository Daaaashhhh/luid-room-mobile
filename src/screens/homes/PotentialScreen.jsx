import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions
} from 'react-native';
import BedRoom from '../../../assets/images/bed-room.png';

const PotentialScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
          <Image
            source={BedRoom}
            style={styles.image}
            resizeMode="cover"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Unlock the Full Potential of Your</Text>
          <Text style={styles.description}>
            Transform your living spaces with our cutting-edge AI-powered interior design solutions. Analyze your unique needs, blend style and functionality.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('About')}
            >
              <Text style={styles.buttonText}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => navigation.navigate('Contact')}
            >
              <Text style={styles.buttonText}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageContainer: {
    flex: 1,
    borderRadius: 24,
    overflow: 'hidden',
    margin: 16,
  },
  image: {
    width: '100%',
    height: height * 0.4, // Image height based on screen size
    borderRadius: 24,
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    color: '#2D3436',
    marginBottom: 16,
    lineHeight: 34,
    fontFamily: 'GlassAntiqua-Regular',
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 32,
    lineHeight: 24,
    textAlign: 'center'
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE5E5',
  },
  buttonText: {
    fontSize: 16,
    color: '#2D3436',
    fontWeight: '500',
  },
});

export default PotentialScreen;
