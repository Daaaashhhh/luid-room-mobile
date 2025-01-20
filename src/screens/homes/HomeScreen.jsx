import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import Compare, { Before, After, DefaultDragger } from 'react-native-before-after-slider-v2';
import BeforeImage from "../../../assets/images/before.png"
import AfterImage from "../../../assets/images/after.png"
import Offers from "./Offers"
import PotentialScreen from './PotentialScreen';

// Custom Plus Icon component using pure React Native
const PlusIcon = () => (
  <View style={styles.plusIcon}>
    <View style={styles.plusIconHorizontal} />
    <View style={styles.plusIconVertical} />
  </View>
);

const WelcomeScreen = ({ navigation }) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const [state, setState] = useState({ scrollEnabled: true });
  
  const onMoveStart = () => {
    setState({ scrollEnabled: false });
  };
  const onMoveEnd = () => {
    setState({ scrollEnabled: true });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        scrollEnabled={state.scrollEnabled}
      >
        <LinearGradient 
          colors={['#fcedf2', '#fffafb']} 
          style={styles.content}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.title}>Revolutionize Your Living Spaces with AI Design</Text>
            {/* <Text style={styles.subtitle}>
              Create and manage your AI-powered room designs
            </Text> */}
          </View>
            <View style={styles.contentContainer}>
              <Text style={styles.subtitle}>
                Experience the future of interior design. Our AI-powered platform transforms your ideas into stunning room designs in seconds.
              </Text>
          </View>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderTitle}>Witness the Transformation</Text>
            <Compare
              initial={deviceWidth / 2}
              draggerWidth={50}
              width={deviceWidth - 48}
              onMoveStart={onMoveStart}
              onMoveEnd={onMoveEnd}
            >
              <Before>
                <Image
                  source={BeforeImage}
                  style={styles.sliderImage}
                />
              </Before>
              <After>
                <Image
                  source={AfterImage}
                  style={styles.sliderImage}
                />
              </After>
              <DefaultDragger />
            </Compare>
          </View>

          <View style={styles.contentContainer}>
              <Text style={styles.subtitle}>
              See the power of AI-driven design with our before and after comparisons
              </Text>
          </View>

          <TouchableOpacity 
              style={styles.button}
              onPress={() => {
                navigation.navigate('Create Design');
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.secondButton]}
              onPress={() => {
                navigation.navigate('Create Design');
              }}
            >
              <Text style={styles.secondButtonText}>See how it works!</Text>
            </TouchableOpacity>

          {/* Card Section */}

          
            <Offers />
         
         
           
              <PotentialScreen navigation={navigation}/>
       
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    marginVertical: 24,
    marginTop: 60,
    marginBottom: 30
  },
  title: {
    fontSize: 42,
    color: 'black',
    marginBottom: 12,
    letterSpacing: 0.5,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        fontFamily: 'GlassAntiqua-Regular',
      },
      android: {
        fontFamily: 'GlassAntiqua-Regular',
      },
    }),
  },
  sliderContainer: {
    marginBottom: 24,
    alignItems: 'center',
  },
  sliderTitle: {
    fontSize: 40,
    fontFamily: 'GlassAntiqua-Regular',
    textAlign: "center",
    color: '#2D3436',
    marginBottom: 30,
    letterSpacing: 0.5,
  },
  sliderImage: {
    width: width - 48,
    height: (width - 48) * 0.75,
    borderRadius: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#636E72',
    textAlign: 'center',
    lineHeight: 26,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Outfit-Regular',
      },
    }),
  },
  contentContainer: {
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF3F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    ...Platform.select({
      ios: {
        shadowColor: '#FF7B7B',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  plusIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIconHorizontal: {
    position: 'absolute',
    width: 24,
    height: 3,
    backgroundColor: '#FF7B7B',
    borderRadius: 2,
  },
  plusIconVertical: {
    position: 'absolute',
    width: 3,
    height: 24,
    backgroundColor: '#FF7B7B',
    borderRadius: 2,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2D3436',
    marginBottom: 16,
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  uploadText: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 32,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Roboto',
      },
    }),
  },
  button: {
    backgroundColor: '#FF7B7B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#FF7B7B',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  secondButton: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: "white"
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Outfit-Bold',
      },
    }),
  },
  secondButtonText: {
    color: '#636E72',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'System',
      },
      android: {
        fontFamily: 'Outfit-Bold',
      },
    }),
  },
});

export default WelcomeScreen;