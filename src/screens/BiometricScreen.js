import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';

export default function BiometricScreen({ navigation }) {
    useEffect(() => {
        checkBiometric();
    }, []);

    const checkBiometric = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
            authenticateWithBiometric();
        } else {
            // No biometric available, go to PIN
            navigation.replace('Dashboard');
        }
    };

    const authenticateWithBiometric = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Разблокируйте Lumia Wallet',
                fallbackLabel: 'Использовать PIN',
            });

            if (result.success) {
                navigation.replace('Dashboard');
            }
        } catch (error) {
            console.error('Biometric auth error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#8B5CF6', '#3B82F6']}
                style={styles.smallLogo}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.logoIcon}>💎</Text>
            </LinearGradient>

            <View style={styles.fingerprintContainer}>
                <LinearGradient
                    colors={['#8B5CF6', '#3B82F6']}
                    style={styles.fingerprint}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.fingerprintIcon}>👆</Text>
                </LinearGradient>
            </View>

            <Text style={styles.text}>Коснитесь для разблокировки</Text>

            <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
                <Text style={styles.linkText}>Использовать PIN</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0F',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
    },
    smallLogo: {
        width: 60,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 80,
    },
    logoIcon: {
        fontSize: 28,
    },
    fingerprintContainer: {
        marginBottom: 40,
    },
    fingerprint: {
        width: 140,
        height: 140,
        borderRadius: 70,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 60,
        elevation: 20,
    },
    fingerprintIcon: {
        fontSize: 70,
    },
    text: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 80,
    },
    linkText: {
        color: '#8B5CF6',
        fontSize: 15,
        fontWeight: '600',
    },
});
