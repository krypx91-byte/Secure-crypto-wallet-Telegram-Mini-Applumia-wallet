import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LicenseScreen({ navigation }) {
    const [licenseKey, setLicenseKey] = useState('');
    const [loading, setLoading] = useState(false);

    const validateLicense = async () => {
        if (!licenseKey || licenseKey.length < 10) {
            Alert.alert('Ошибка', 'Введите корректный лицензионный ключ');
            return;
        }

        setLoading(true);

        try {
            // TODO: Replace with actual API call to your Telegram bot
            // For now, accept any key that starts with "LUMIA-"
            if (licenseKey.toUpperCase().startsWith('LUMIA-')) {
                await AsyncStorage.setItem('license', licenseKey);
                Alert.alert('Успех!', 'Лицензия активирована', [
                    { text: 'OK', onPress: () => navigation.replace('PinSetup') }
                ]);
            } else {
                Alert.alert('Ошибка', 'Неверный лицензионный ключ');
            }
        } catch (error) {
            Alert.alert('Ошибка', 'Не удалось активировать лицензию');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <View style={styles.content}>
                <View style={styles.header}>
                    <LinearGradient
                        colors={['#8B5CF6', '#3B82F6']}
                        style={styles.smallLogo}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                    >
                        <Text style={styles.logoIcon}>💎</Text>
                    </LinearGradient>
                    <Text style={styles.title}>Активация лицензии</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="LUMIA-XXXX-XXXX-XXXX-XXXX"
                        placeholderTextColor="#4B5563"
                        value={licenseKey}
                        onChangeText={setLicenseKey}
                        autoCapitalize="characters"
                        maxLength={29}
                    />
                    <Text style={styles.hint}>
                        Введите лицензионный ключ{'\n'}из Telegram бота
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={validateLicense}
                    disabled={loading}
                >
                    <LinearGradient
                        colors={['#8B5CF6', '#6366F1', '#3B82F6']}
                        style={styles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Проверка...' : 'Активировать'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0F',
    },
    content: {
        flex: 1,
        padding: 25,
        paddingTop: 70,
        justifyContent: 'space-between',
    },
    header: {
        alignItems: 'center',
    },
    smallLogo: {
        width: 70,
        height: 70,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 30,
        elevation: 10,
    },
    logoIcon: {
        fontSize: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 50,
        letterSpacing: -0.5,
    },
    inputContainer: {
        marginBottom: 40,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 16,
        padding: 22,
        color: '#fff',
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 3,
    },
    hint: {
        color: '#6B7280',
        fontSize: 13,
        textAlign: 'center',
        marginTop: 15,
        lineHeight: 20,
    },
    button: {
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 30,
        elevation: 10,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonGradient: {
        padding: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
