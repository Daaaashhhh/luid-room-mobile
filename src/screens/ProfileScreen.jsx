import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
  ScrollView,
  Platform,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import apiService from '../services/apiService';
import Profile from '../../assets/images/profile.jpg';

const ProfileScreen = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await apiService.getProfile();
      setProfileData(response);
      setEditForm({
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
      });
    } catch (error) {
      setError(error.message);
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const updateData = {
        ...profileData,
        ...editForm,
      };

      await apiService.updateProfile(updateData);
      await fetchProfile(); // Refresh profile data
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert(
        'Update Failed',
        error.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const renderEditForm = () => (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={editForm.firstName}
          onChangeText={text => setEditForm({...editForm, firstName: text})}
          placeholder="Enter first name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={editForm.lastName}
          onChangeText={text => setEditForm({...editForm, lastName: text})}
          placeholder="Enter last name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={editForm.email}
          onChangeText={text => setEditForm({...editForm, email: text})}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => setIsEditing(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleUpdate}>
          <Text style={[styles.buttonText, styles.saveButtonText]}>
            Save Changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF7B7B" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading profile</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.header}>
          <Image source={Profile} style={styles.profileImage} />
          {!isEditing && (
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => setIsEditing(true)}>
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>

        {isEditing ? (
          renderEditForm()
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.name}>
                {profileData?.firstName} {profileData?.lastName}
              </Text>
              <Text style={styles.email}>{profileData?.email}</Text>
            </View>

            {/* Subscription Info */}
            <View style={styles.card}>
              <View style={styles.subscriptionHeader}>
                <Text style={styles.cardTitle}>Subscription</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        profileData?.subscriptionType === 'premium'
                          ? '#FFE7D6'
                          : '#E8E8E8',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          profileData?.subscriptionType === 'premium'
                            ? '#FF7B7B'
                            : '#636E72',
                      },
                    ]}>
                    {profileData?.subscriptionType?.toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={styles.creditsContainer}>
                <Text style={styles.creditsLabel}>Available Credits</Text>
                <Text style={styles.creditsValue}>{profileData?.credits}</Text>
              </View>
            </View>

            {/* Account Details */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Account Details</Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Account Status</Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor: profileData?.isActive
                        ? '#E1F8E8'
                        : '#FFE7D6',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color: profileData?.isActive ? '#4CAF50' : '#FF7B7B',
                      },
                    ]}>
                    {profileData?.isActive ? 'ACTIVE' : 'INACTIVE'}
                  </Text>
                </View>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Role</Text>
                <Text style={styles.detailValue}>
                  {profileData?.role?.toUpperCase()}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Member Since</Text>
                <Text style={styles.detailValue}>
                  {new Date(profileData?.createdAt).toLocaleDateString()}
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContainer: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF7B7B',
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
  },
  header: {
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 40 : 0,
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
    fontFamily: 'Outfit-Bold',
  },
  email: {
    fontSize: 16,
    color: '#636E72',
    fontFamily: 'Outfit-Regular',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 16,
    fontFamily: 'Outfit-Bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'Outfit-Bold',
  },
  creditsContainer: {
    alignItems: 'center',
  },
  creditsLabel: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
    fontFamily: 'Outfit-Regular',
  },
  creditsValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2D3436',
    fontFamily: 'Outfit-Bold',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 14,
    color: '#636E72',
    fontFamily: 'Outfit-Regular',
  },
  detailValue: {
    fontSize: 14,
    color: '#2D3436',
    fontWeight: '500',
    fontFamily: 'Outfit-Medium',
  },
  editButton: {
    backgroundColor: '#FF7B7B',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  editButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Outfit-Medium',
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
    fontFamily: 'Outfit-Medium',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    fontFamily: 'Outfit-Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  saveButton: {
    backgroundColor: '#FF7B7B',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Outfit-Medium',
    color: '#636E72',
  },
  saveButtonText: {
    color: '#FFFFFF',
  },
});

export default ProfileScreen;
