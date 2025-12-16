import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function MultiTransferScreen({ navigation }) {
    const [isRunning, setIsRunning] = useState(false);

    const settings = [
        { label: 'Количество переводов', value: '800' },
        { label: 'Диапазон сумм', value: '$0.20 - $0.40' },
        { label: 'Длительность', value: '1 час' },
        { label: 'Макс. комиссия', value: '$0.003' },
        { label: 'Подключено кошельков', value: '15 💼' },
    ];

    const startMultiTransfer = () => {
        Alert.alert(
            'Multi-Transfer',
            'Функция будет доступна после интеграции с вашим Solana кошельком',
            [{ text: 'OK' }]
        );
    };

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Назад</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Multi-Transfer</Text>

                <View style={styles.settingsCard}>
                    {settings.map((setting, index) => (
                        <View
                            key={index}
                            style={[
                                styles.settingRow,
                                index === settings.length - 1 && styles.settingRowLast,
                            ]}
                        >
                            <Text style={styles.settingLabel}>{setting.label}</Text>
                            <Text style={styles.settingValue}>{setting.value}</Text>
                        </View>
                    ))}
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={startMultiTransfer}
                    disabled={isRunning}
                >
                    <LinearGradient
                        colors={['#8B5CF6', '#6366F1', '#3B82F6']}
                        style={styles.buttonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.buttonText}>
                            {isRunning ? 'Выполняется...' : 'Запустить Multi-Transfer'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </ScrollView>
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
    backButton: {
        marginBottom: 20,
    },
    backButtonText: {
        color: '#8B5CF6',
        fontSize: 16,
        fontWeight: '600',
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 30,
        letterSpacing: -0.5,
    },
    settingsCard: {
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
        borderRadius: 20,
        padding: 25,
        marginBottom: 30,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    settingRowLast: {
        borderBottomWidth: 0,
    },
    settingLabel: {
        color: '#9CA3AF',
        fontSize: 14,
        fontWeight: '500',
    },
    settingValue: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 15,
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
