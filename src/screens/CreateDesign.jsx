import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import ModernDesign from '../../assets/images/modern.jpg';
import BohemianDesign from '../../assets/images/bohemian.jpeg';
import IndustrialDesign from '../../assets/images/industrial.jpg';
import ScandinavianDesign from '../../assets/images/scandinavian.jpg';
import apiService from '../services/apiService';

const PlusIcon = () => (
  <View style={styles.plusIcon}>
    <View style={styles.plusIconHorizontal} />
    <View style={styles.plusIconVertical} />
  </View>
);

const DesignChoice = ({title, image, description, selected, onPress}) => (
  <TouchableOpacity
    style={[styles.designChoice, selected && styles.designChoiceSelected]}
    onPress={onPress}>
    <Image source={image} style={styles.designChoiceImage} resizeMode="cover" />
    <View style={styles.designChoiceContent}>
      <Text
        style={[
          styles.designChoiceTitle,
          selected && styles.designChoiceTextSelected,
        ]}>
        {title}
      </Text>
      <Text style={styles.designChoiceDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const CreateDesign = () => {
  const navigation = useNavigation();
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const [state, setState] = useState({scrollEnabled: true});
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const designStyles = [
    {
      id: 'modern',
      title: 'Modern',
      image: ModernDesign,
      description: 'Clean lines and minimal decoration',
    },
    {
      id: 'scandinavian',
      title: 'Scandinavian',
      image: ScandinavianDesign,
      description: 'Light, airy and functional',
    },
    {
      id: 'industrial',
      title: 'Industrial',
      image: IndustrialDesign,
      description: 'Raw materials and urban feel',
    },
    {
      id: 'bohemian',
      title: 'Bohemian',
      image: BohemianDesign,
      description: 'Artistic and free-spirited',
    },
  ];

  const onMoveStart = () => {
    setState({scrollEnabled: false});
  };
  const onMoveEnd = () => {
    setState({scrollEnabled: true});
  };

  const handleSaveDesign = async () => {
    try {
      const response = await apiService.createDesign(designData);
      // Handle the response
    } catch (error) {
      // Handle any UI-specific error states
    }
  };

  return (
    <LinearGradient colors={['#fcedf2', '#fffafb']} style={styles.background}>
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Choose Your Style</Text>

        <View style={styles.card}>
          <View style={styles.iconContainer}>
            <PlusIcon />
          </View>

          <Text style={styles.cardTitle}>Start Your First Design</Text>
          <Text style={styles.cardSubtitle}>
            Transform any room with AI-powered interior design.
          </Text>
          <Text style={styles.uploadText}>Upload a photo to begin.</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('Generate Image');
            }}>
            <Text style={styles.buttonText}>Create New Design</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-center',
    paddingBottom: 50,
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
    color: '#2D3436',
    marginBottom: 16,
    letterSpacing: 0.5,
    ...Platform.select({
      ios: {
        fontFamily: 'Outfit-Bold',
      },
      android: {
        fontFamily: 'Outfit-Bold',
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
        fontFamily: 'Outfit-Regular',
      },
      android: {
        fontFamily: 'Outfit-Regular',
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
        fontFamily: 'Outfit-Regular',
      },
      android: {
        fontFamily: 'Outfit-Regular',
      },
    }),
  },
  button: {
    backgroundColor: '#FF7B7B',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
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
  styleTitle: {
    fontSize: 18,
    color: '#2D3436',
    marginBottom: 16,
    alignSelf: 'flex-start',
    ...Platform.select({
      ios: {
        fontFamily: 'Outfit-Bold',
      },
      android: {
        fontFamily: 'Outfit-Bold',
      },
    }),
  },
  sectionTitle: {
    fontSize: 24,
    color: '#2D3436',
    marginBottom: 20,
    marginLeft: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'Outfit-Bold',
      },
      android: {
        fontFamily: 'Outfit-Bold',
      },
    }),
  },
  choicesContainer: {
    marginBottom: 24,
    maxHeight: 180,
  },
  choicesContentContainer: {
    paddingHorizontal: 4,
  },
  designChoice: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  designChoiceSelected: {
    borderWidth: 2,
    borderColor: '#FF7B7B',
  },
  designChoiceImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#F8F9FA', // placeholder color
  },
  designChoiceContent: {
    padding: 12,
  },
  designChoiceTitle: {
    fontSize: 16,
    color: '#2D3436',
    marginBottom: 4,
    ...Platform.select({
      ios: {
        fontFamily: 'Outfit-Bold',
      },
      android: {
        fontFamily: 'Outfit-Bold',
      },
    }),
  },
  designChoiceDescription: {
    fontSize: 14,
    color: '#636E72',
    ...Platform.select({
      ios: {
        fontFamily: 'Outfit-Regular',
      },
      android: {
        fontFamily: 'Outfit-Regular',
      },
    }),
  },
  designChoiceTextSelected: {
    color: '#FF7B7B',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F3F5',
    width: '100%',
    marginBottom: 24,
  },
});

export default CreateDesign;
