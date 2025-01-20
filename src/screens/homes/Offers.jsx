import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import BeforeImage from "../../../assets/images/before.png"
import AfterImage from "../../../assets/images/after.png"

const OfferingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.mainTitle}>Our Offerings</Text>
          
          {/* Before Section */}
          <View style={styles.section}>
            <Image
              source={BeforeImage} // Replace with your image
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>Before</Text>
              <Text style={styles.description}>
                Visualize the dramatic transformation as our AI analyzes
                your space and recommends personalized design ideas.
              </Text>
            </View>
          </View>

          {/* After Section */}
          <View style={styles.section}>
            <Image
              source={AfterImage} // Replace with your image
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.textContainer}>
              <Text style={styles.title}>After</Text>
              <Text style={styles.description}>
                Experience the power of AI-driven design optimization.
                Our tool seamlessly blends form and function.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5', // Light pink background
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: '500',
    color: '#2D3436',
    marginBottom: 24,
    textAlign: 'center',
    fontFamily: 'GlassAntiqua-Regular', // Make sure to link this font
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: (width - 40) * 0.6, // Maintain aspect ratio
    borderRadius: 12,
  },
  textContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#636E72',
    lineHeight: 24,
  },
});

export default OfferingsScreen;