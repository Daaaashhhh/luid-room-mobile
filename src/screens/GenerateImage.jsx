import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import ModernDesign from '../../assets/images/modern.jpg';
import BohemianDesign from '../../assets/images/bohemian.jpeg';
import IndustrialDesign from '../../assets/images/industrial.jpg';
import ScandinavianDesign from '../../assets/images/scandinavian.jpg';
import UploadIcon from '../../assets/images/upload.png';
const designTypes = [
  { id: 1, name: 'Modern', image: ModernDesign },
  { id: 2, name: 'Industrial', image: IndustrialDesign },
  { id: 3, name: 'Bohemian', image: BohemianDesign },
  { id: 4, name: 'Cottage', image: ScandinavianDesign },
];

const App = () => {
  const [selectedDesign, setSelectedDesign] = useState(null);

  const handleDesignSelect = (id) => {
    setSelectedDesign(id);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.heading}>Transform Your Space with AI</Text>
        <Text style={styles.subHeading}>
          Upload a room photo, choose your style preferences, and watch as AI
          reimagines your space in seconds.
        </Text>

        {/* Room Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Photo</Text>
          <TouchableOpacity style={styles.imageUpload}>
            <Image
              source={UploadIcon} // Replace with your upload icon
              style={styles.uploadIcon}
            />
          </TouchableOpacity>
          <Text style={styles.imageUploadText}>Select Image of your room</Text>
        </View>

        {/* Design Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interior Design Type</Text>
          <View style={styles.designGrid}>
            {designTypes.map((design) => (
              <TouchableOpacity
                key={design.id}
                style={[
                  styles.designCard,
                  selectedDesign === design.id && styles.selectedCard,
                ]}
                onPress={() => handleDesignSelect(design.id)}
              >
                <Image source={design.image} style={styles.designImage} />
                <Text style={styles.designName}>{design.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Additional Requirements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Enter Additional Requirements (Optional)
          </Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Describe any specific preferences or needs..."
          />
        </View>

        {/* Generate Design Button */}
        <View style={styles.buttonSection}>
          <Text style={styles.creditsText}>Uses 1 credit per design</Text>
          <TouchableOpacity style={styles.generateButton}>
            <Text style={styles.generateButtonText}>Generate Design</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'android' ? 50 : 0,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    fontSize: 24,
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: "Outfit-Bold"
  },
  subHeading: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: "Outfit-Regular"
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 8,
    fontFamily: "Outfit-Bold"
  },
  imageUpload: {
    width: '100%',
    height: width * 0.5,
    backgroundColor: '#E8E8E8',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  uploadIcon: {
    width: 40,
    height: 40,
    tintColor: '#7A7A7A',
  },
  imageUploadText: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    fontFamily: "Outfit-Regular"
  },
  designGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  designCard: {
    width: (width - 48) / 2,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  selectedCard: {
    borderColor: '#FF6F61',
    borderWidth: 2,
  },
  designImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  designName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 8,
    fontFamily: "Outfit-Regular"
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 80,
  },
  buttonSection: {
    alignItems: 'center',
    marginTop: 16,
  },
  creditsText: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 8,
  },
  generateButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  generateButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
  },
});

export default App;
