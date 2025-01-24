import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import Compare, {
  Before,
  After,
  DefaultDragger,
} from 'react-native-before-after-slider-v2';
import apiService from '../services/apiService';
import {useFocusEffect} from '@react-navigation/native';

const {width: windowWidth} = Dimensions.get('window');

const FavoritesScreen = ({navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, setState] = useState({scrollEnabled: true});

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, []),
  );

  const fetchFavorites = async () => {
    try {
      const response = await apiService.getFavorites();
      console.log('Favorites response:', response);
      setFavorites(response);
    } catch (error) {
      console.error('Error details:', error.response?.data || error.message);
      setError('Failed to fetch favorites');
      Alert.alert('Error', 'Failed to load favorites');
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

  const handleUnfavorite = async id => {
    try {
      await apiService.toggleFavorite(id, false);
      setFavorites(prevFavorites =>
        prevFavorites.filter(design => design.id !== id),
      );
      Alert.alert('Success', 'Removed from favorites');
    } catch (error) {
      console.error('Error unfavoriting:', error);
      Alert.alert('Error', 'Failed to update favorite status');
    }
  };

  const renderDesignItem = ({item}) => (
    <View style={styles.designCard}>
      <View style={styles.designHeader}>
        <Text style={styles.designTitle}>Design #{item.id.slice(0, 8)}</Text>
        <Text style={styles.designDate}>
          {new Date(item.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.sliderContainer}>
        <Compare
          initial={windowWidth / 2}
          draggerWidth={50}
          width={windowWidth - 48}
          height={(windowWidth - 48) * 0.75}
          onMoveStart={onMoveStart}
          onMoveEnd={onMoveEnd}>
          <Before>
            <Image
              source={{uri: item.originalImageUrl}}
              style={styles.sliderImage}
              resizeMode="cover"
            />
          </Before>
          <After>
            <Image
              source={{uri: item.generatedImageUrl}}
              style={styles.sliderImage}
              resizeMode="cover"
            />
          </After>
          <DefaultDragger />
        </Compare>
      </View>

      <View style={styles.designInfo}>
        <Text style={styles.designPrompt}>{item.prompt}</Text>
        <View style={styles.designMeta}>
          <View style={styles.tagContainer}>
            <Text style={styles.tag}>{item.roomType.replace('_', ' ')}</Text>
            <Text style={styles.tag}>{item.style}</Text>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, styles.favoriteActive]}
            onPress={() => handleUnfavorite(item.id)}>
            <Text style={[styles.actionButtonText, styles.favoriteActiveText]}>
              Remove from Favorites
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF7B7B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchFavorites}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Favorite Designs</Text>
      <Text style={styles.subHeading}>Your collection of saved designs</Text>
      <FlatList
        data={favorites}
        renderItem={renderDesignItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        scrollEnabled={state.scrollEnabled}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorite designs yet</Text>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => navigation.navigate('My Designs')}>
              <Text style={styles.createButtonText}>Browse Your Designs</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 80,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  designCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  designHeader: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  designTitle: {
    fontSize: 18,
    color: '#2D3436',
    fontFamily: 'Outfit-Bold',
  },
  designDate: {
    fontSize: 14,
    color: '#636E72',
    fontFamily: 'Outfit-Regular',
  },
  sliderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderImage: {
    width: '100%',
    height: '100%',
  },
  designInfo: {
    padding: 16,
  },
  designPrompt: {
    fontSize: 14,
    color: '#2D3436',
    marginBottom: 12,
    fontFamily: 'Outfit-Regular',
  },
  designMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  tag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 12,
    color: '#636E72',
    fontFamily: 'Outfit-Medium',
    textTransform: 'capitalize',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#636E72',
    marginBottom: 16,
    fontFamily: 'Outfit-Regular',
  },
  createButton: {
    backgroundColor: '#FF7B7B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  errorText: {
    fontSize: 16,
    color: '#FF7B7B',
    marginBottom: 16,
    fontFamily: 'Outfit-Regular',
  },
  retryButton: {
    backgroundColor: '#FF7B7B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  actionButtonText: {
    fontSize: 12,
    color: '#636E72',
    fontFamily: 'Outfit-Medium',
  },
  favoriteActive: {
    backgroundColor: '#FFE7D6',
    borderColor: '#FF7B7B',
  },
  favoriteActiveText: {
    color: '#FF7B7B',
  },
  heading: {
    fontSize: 32,
    color: '#2D3436',
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    color: '#636E72',
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default FavoritesScreen;
