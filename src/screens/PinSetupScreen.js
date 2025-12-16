import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PinSetupScreen({ navigation }) {
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);

    const handleNumberPress = (num) => {
        if (isConfirming) {
            if (confirmPin.length < 6) {
                const newConfirmPin = confirmPin + num;
                setConfirmPin(newConfirmPin);

                if (newConfirmPin.length === 6) {
                    verifyPin(newConfirmPin);
                }
            }
        } else {
            if (pin.length < 6) {
                const newPin = pin + num;
                setPin(newPin);

                if (newPin.length === 6) {
                    setIsConfirming(true);
                }
            }
        }
    };

    const handleDelete = () => {
        if (isConfirming) {
            setConfirmPin(confirmPin.slice(0, -1));
        } else {
            setPin(pin.slice(0, -1));
        }
    };

    const verifyPin = async (confirmedPin) => {
        if (pin === confirmedPin) {
            try {
                await AsyncStorage.setItem('pin', pin);
                Alert.alert('Успех!', 'PIN-код создан', [
                    { text: 'OK', onPress: () => navigation.replace('Dashboard') }
                ]);
            } catch (error) {
                Alert.alert('Ошибка', 'Не удалось сохранить PIN');
            }
        } else {
            Alert.alert('Ошибка', 'PIN-коды не совпадают', [
                {
                    text: 'OK', onPress: () => {
                        setPin('');
                        setConfirmPin('');
                        setIsConfirming(false);
                    }
                }
            ]);
        }
    };

    const renderDots = () => {
        const currentPin = isConfirming ? confirmPin : pin;
        return (
            <View style={styles.dotsContainer}>
                {[...Array(6)].map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index < currentPin.length && styles.dotFilled,
                        ]}
                    />
                ))}
            </View>
        );
    };

    const renderKeypad = () => {
        const keys = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9'],
            ['', '0', '⌫'],
        ];

        return (
            <View style={styles.keypad}>
                {keys.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.keypadRow}>
                        {row.map((key, keyIndex) => (
                            <TouchableOpacity
                                key={keyIndex}
                                style={styles.key}
                                onPress={() => {
                                    if (key === '⌫') handleDelete();
                                    else if (key) handleNumberPress(key);
                                }}
                                disabled={!key}
                            >
                                <Text style={styles.keyText}>{key}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isConfirming ? 'Подтвердите PIN-код' : 'Создайте PIN-код'}
            </Text>

            {renderDots()}

            <Text style={styles.hint}>
                {isConfirming
                    ? 'Введите PIN-код еще раз'
                    : 'Вы будете использовать этот PIN\nдля доступа к кошельку'
                }
            </Text>

            {renderKeypad()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0F',
        padding: 25,
        paddingTop: 70,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 80,
        letterSpacing: -0.5,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 18,
        marginBottom: 100,
    },
    dot: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 3,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    dotFilled: {
        backgroundColor: '#8B5CF6',
        borderColor: '#8B5CF6',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 5,
    },
    hint: {
        color: '#6B7280',
        fontSize: 13,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 60,
    },
    keypad: {
        marginTop: 'auto',
    },
    keypadRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    key: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyText: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '500',
    },
});
