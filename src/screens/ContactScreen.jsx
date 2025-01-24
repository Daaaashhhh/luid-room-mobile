import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import apiService from '../services/apiService';

const ContactScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate form
    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      // Add contact endpoint to apiService when available
      // await apiService.contact(formData);
      Alert.alert('Success', 'Message sent successfully!');
      setFormData({name: '', email: '', subject: '', message: ''});
    } catch (error) {
      Alert.alert('Error', 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Get in Touch</Text>
        <Text style={styles.subtitle}>
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </Text>

        {/* Contact Info Cards */}
        <View style={styles.contactCards}>
          <View style={styles.contactCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>✉️</Text>
            </View>
            <Text style={styles.contactTitle}>Email Us</Text>
            <Text style={styles.contactInfo}>support@luiddevelopers.com</Text>
          </View>

          <View style={styles.contactCard}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>💬</Text>
            </View>
            <Text style={styles.contactTitle}>Live Chat</Text>
            <Text style={styles.contactInfo}>Available 9 AM - 5 PM EST</Text>
          </View>
        </View>

        {/* Contact Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Send us a Message</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              value={formData.name}
              onChangeText={text => setFormData({...formData, name: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="john@example.com"
              value={formData.email}
              onChangeText={text => setFormData({...formData, email: text})}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="How can we help?"
              value={formData.subject}
              onChangeText={text => setFormData({...formData, subject: text})}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChangeText={text => setFormData({...formData, message: text})}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.disabledButton]}
            onPress={handleSubmit}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Send Message</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 80,
  },
  scrollContainer: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    color: '#2D3436',
    marginBottom: 8,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#636E72',
    textAlign: 'center',
    marginBottom: 32,
    fontFamily: 'Outfit-Regular',
    lineHeight: 24,
  },
  contactCards: {
    marginBottom: 32,
  },
  contactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
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
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE7D6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
  },
  contactTitle: {
    fontSize: 18,
    color: '#2D3436',
    marginBottom: 4,
    fontFamily: 'Outfit-Bold',
  },
  contactInfo: {
    fontSize: 14,
    color: '#636E72',
    fontFamily: 'Outfit-Regular',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
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
  formTitle: {
    fontSize: 24,
    color: '#2D3436',
    marginBottom: 24,
    fontFamily: 'Outfit-Bold',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#2D3436',
    marginBottom: 8,
    fontFamily: 'Outfit-Medium',
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    fontFamily: 'Outfit-Regular',
  },
  messageInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#FF7B7B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#FFB5AE',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Outfit-Bold',
  },
});

export default ContactScreen;
