import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export default function DashboardScreen({ navigation }) {
    const [balance, setBalance] = useState(1.2345);
    const [balanceUSD, setBalanceUSD] = useState(246.90);

    const transactions = [
        { id: 1, type: 'Swap SOL → USDC', amount: '+0.25 SOL', positive: true },
        { id: 2, type: 'Transfer', amount: '-0.10 SOL', positive: false },
        { id: 3, type: 'Swap USDC → SOL', amount: '+0.15 SOL', positive: true },
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.walletSelector}>
                        <View style={styles.walletDot} />
                        <Text style={styles.walletText}>Main Wallet</Text>
                    </View>

                    <View style={styles.headerButtons}>
                        <TouchableOpacity style={styles.headerButton}>
                            <Text style={styles.headerButtonIcon}>📷</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.headerButton}>
                            <Text style={styles.headerButtonIcon}>🔔</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.headerButton}
                            onPress={() => {
                                console.log('Settings button pressed!');
                                navigation.navigate('Settings');
                            }}
                        >
                            <Text style={styles.headerButtonIcon}>⚙️</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Balance Card */}
                <LinearGradient
                    colors={['rgba(139, 92, 246, 0.15)', 'rgba(59, 130, 246, 0.15)']}
                    style={styles.balanceCard}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.balanceLabel}>БАЛАНС</Text>
                    <Text style={styles.balanceAmount}>{balance.toFixed(4)} SOL</Text>
                    <Text style={styles.balanceUSD}>≈ ${balanceUSD.toFixed(2)}</Text>
                </LinearGradient>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('MultiSwap')}
                    >
                        <LinearGradient
                            colors={['#8B5CF6', '#3B82F6']}
                            style={styles.actionButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.actionButtonText}>🔄 Multi-Swap</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={() => navigation.navigate('MultiTransfer')}
                    >
                        <LinearGradient
                            colors={['#8B5CF6', '#3B82F6']}
                            style={styles.actionButtonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <Text style={styles.actionButtonText}>📤 Multi-Transfer</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Transactions */}
                <Text style={styles.transactionsTitle}>ПОСЛЕДНИЕ ТРАНЗАКЦИИ</Text>
                {transactions.map((tx) => (
                    <View key={tx.id} style={styles.transactionItem}>
                        <Text style={styles.txInfo}>{tx.type}</Text>
                        <Text style={[
                            styles.txAmount,
                            { color: tx.positive ? '#10B981' : '#EF4444' }
                        ]}>
                            {tx.amount}
                        </Text>
                    </View>
                ))}
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
    },
    walletSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    walletDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#A3E635',
        marginRight: 8,
    },
    walletText: {
        color: '#E5E7EB',
        fontSize: 14,
        fontWeight: '600',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonIcon: {
        fontSize: 18,
    },
    balanceCard: {
        borderRadius: 24,
        padding: 35,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 40,
        elevation: 10,
    },
    balanceLabel: {
        color: '#9CA3AF',
        fontSize: 13,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: 12,
    },
    balanceAmount: {
        fontSize: 42,
        fontWeight: '800',
        color: '#fff',
        marginBottom: 8,
        letterSpacing: -1,
    },
    balanceUSD: {
        color: '#9CA3AF',
        fontSize: 18,
        fontWeight: '500',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 40,
    },
    actionButton: {
        flex: 1,
        borderRadius: 18,
        overflow: 'hidden',
        shadowColor: '#8B5CF6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 25,
        elevation: 8,
    },
    actionButtonGradient: {
        padding: 24,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '700',
    },
    transactionsTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
        marginBottom: 20,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 18,
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        borderRadius: 14,
        marginBottom: 12,
    },
    txInfo: {
        color: '#E5E7EB',
        fontWeight: '500',
    },
    txAmount: {
        fontWeight: '700',
        fontSize: 15,
    },
});
