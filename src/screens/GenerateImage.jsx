import React, {useState, useEffect} from 'react';
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
  Platform,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import Compare, {
  Before,
  After,
  DefaultDragger,
} from 'react-native-before-after-slider-v2';
import apiService from '../services/apiService';

// Design types array
const designTypes = [
  {id: 1, name: 'Modern', image: require('../../assets/images/modern.jpg')},
  {
    id: 2,
    name: 'Industrial',
    image: require('../../assets/images/industrial.jpg'),
  },
  {
    id: 3,
    name: 'Bohemian',
    image: require('../../assets/images/bohemian.jpeg'),
  },
  {
    id: 4,
    name: 'Cottage',
    image: require('../../assets/images/scandinavian.jpg'),
  },
];

const App = () => {
  const {width: windowWidth} = useWindowDimensions();
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [roomImage, setRoomImage] = useState(null);
  const [additionalDescription, setAdditionalDescription] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState(null);
  const [originalImageUrl, setOriginalImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [state, setState] = useState({scrollEnabled: true});

  const handleDesignSelect = id => {
    setSelectedDesign(id);
  };

  const handleImageUpload = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 1024,
      maxHeight: 1024,
    };

    try {
      const result = await launchImageLibrary(options);

      if (result.didCancel) {
        return;
      }

      if (result.errorCode) {
        throw new Error(result.errorMessage);
      }

      if (result.assets && result.assets[0]) {
        setRoomImage(result.assets[0].uri);
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to upload image: ' + err.message);
    }
  };

  const validateInputs = () => {
    if (!roomImage) {
      Alert.alert('Error', 'Please upload a room image');
      return false;
    }
    if (!selectedDesign) {
      Alert.alert('Error', 'Please select a design type');
      return false;
    }
    return true;
  };

  const handleGenerateDesign = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', {
        uri: roomImage,
        type: 'image/jpeg',
        name: 'room.jpg',
      });

      // Match exactly with the example API body
      formData.append('prompt', 'Transform this living room into a modern');
      formData.append('roomType', 'living_room');
      formData.append('style', 'modern');

      const response = await apiService.generateImage(formData);

      console.log('API Response:', response);

      if (response && response.generatedImageUrl && response.originalImageUrl) {
        setGeneratedImageUrl(response.generatedImageUrl);
        setOriginalImageUrl(response.originalImageUrl);
      } else {
        throw new Error('No image generated');
      }
    } catch (err) {
      console.error('Generation Error:', err);
      setError(err.message || 'Failed to generate design');
      Alert.alert('Error', 'Failed to generate design. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onMoveStart = () => {
    setState({scrollEnabled: false});
  };

  const onMoveEnd = () => {
    setState({scrollEnabled: true});
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        scrollEnabled={state.scrollEnabled}>
        <Text style={styles.heading}>Transform Your Space with AI</Text>
        <Text style={styles.subHeading}>
          Upload a room photo, choose your style preferences, and watch as AI
          reimagines your space in seconds.
        </Text>

        {/* Room Photo Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Room Photo</Text>
          <TouchableOpacity
            style={[styles.imageUpload, {height: windowWidth * 0.5}]}
            onPress={handleImageUpload}>
            {roomImage ? (
              <Image source={{uri: roomImage}} style={styles.uploadedImage} />
            ) : (
              <>
                <Image
                  source={require('../../assets/images/upload.png')}
                  style={styles.uploadIcon}
                />
                <Text style={styles.imageUploadText}>
                  Select Image of your room
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Design Type Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interior Design Type</Text>
          <View style={styles.designGrid}>
            {designTypes.map(design => (
              <TouchableOpacity
                key={design.id}
                style={[
                  styles.designCard,
                  selectedDesign === design.id && styles.selectedCard,
                ]}
                onPress={() => handleDesignSelect(design.id)}>
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
            value={additionalDescription}
            onChangeText={setAdditionalDescription}
            maxLength={200}
          />
        </View>

        {/* Generate Design Button */}
        <View style={styles.buttonSection}>
          <Text style={styles.creditsText}>Uses 1 credit per design</Text>
          <TouchableOpacity
            style={[styles.generateButton, loading && styles.disabledButton]}
            onPress={handleGenerateDesign}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.generateButtonText}>Generate Design</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Before and After Slider */}
        {generatedImageUrl && originalImageUrl && (
          <View style={styles.sliderContainer}>
            <Text style={styles.resultTitle}>Generated Result</Text>
            <Compare
              initial={windowWidth / 2}
              draggerWidth={50}
              width={windowWidth - 48}
              height={windowWidth}
              onMoveStart={onMoveStart}
              onMoveEnd={onMoveEnd}>
              <Before>
                <Image
                  source={{uri: originalImageUrl}}
                  style={styles.sliderImage}
                  resizeMode="contain"
                />
              </Before>
              <After>
                <Image
                  source={{uri: generatedImageUrl}}
                  style={styles.sliderImage}
                  resizeMode="contain"
                />
              </After>
              <DefaultDragger />
            </Compare>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

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
    paddingBottom: 32,
  },
  heading: {
    fontSize: 24,
    color: '#2C2C2C',
    textAlign: 'center',
    marginBottom: 8,
    fontFamily: 'Outfit-Bold',
  },
  subHeading: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'Outfit-Regular',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 12,
    fontFamily: 'Outfit-Bold',
  },
  imageUpload: {
    width: '100%',
    backgroundColor: '#E8E8E8',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadIcon: {
    width: 40,
    height: 40,
    tintColor: '#7A7A7A',
    marginBottom: 8,
  },
  imageUploadText: {
    fontSize: 14,
    color: '#7A7A7A',
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  designGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  designCard: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 8,
  },
  selectedCard: {
    borderColor: '#FF6F61',
    borderWidth: 2,
  },
  designImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  designName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C2C2C',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'Outfit-Regular',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    height: 100,
    fontFamily: 'Outfit-Regular',
  },
  buttonSection: {
    alignItems: 'center',
    marginVertical: 24,
  },
  creditsText: {
    fontSize: 14,
    color: '#7A7A7A',
    marginBottom: 12,
    fontFamily: 'Outfit-Regular',
  },
  generateButton: {
    backgroundColor: '#FF6F61',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#FFB5AE',
  },
  generateButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    fontFamily: 'Outfit-Bold',
  },
  sliderContainer: {
    marginTop: 24,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C2C2C',
    marginBottom: 16,
    fontFamily: 'Outfit-Bold',
  },
});

export default App;
