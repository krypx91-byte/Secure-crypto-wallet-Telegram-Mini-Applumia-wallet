import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Switch,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen({ navigation }) {
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [developerMode, setDeveloperMode] = useState(false);
    const [analytics, setAnalytics] = useState(true);

    const SettingsSection = ({ title, children }) => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.sectionContent}>
                {children}
            </View>
        </View>
    );

    const SettingsItem = ({ icon, label, value, onPress, showArrow = true }) => (
        <TouchableOpacity 
            style={styles.settingsItem} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.settingsItemLeft}>
                <Text style={styles.settingsIcon}>{icon}</Text>
                <Text style={styles.settingsLabel}>{label}</Text>
            </View>
            <View style={styles.settingsItemRight}>
                {value && <Text style={styles.settingsValue}>{value}</Text>}
                {showArrow && <Text style={styles.arrow}>›</Text>}
            </View>
        </TouchableOpacity>
    );

    const SettingsToggle = ({ icon, label, value, onValueChange }) => (
        <View style={styles.settingsItem}>
            <View style={styles.settingsItemLeft}>
                <Text style={styles.settingsIcon}>{icon}</Text>
                <Text style={styles.settingsLabel}>{label}</Text>
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#3E3E3E', true: '#A3E635' }}
                thumbColor={value ? '#fff' : '#f4f3f4'}
                ios_backgroundColor="#3E3E3E"
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Text style={styles.backIcon}>‹</Text>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>SETTINGS</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Account Section */}
                <SettingsSection title="Account">
                    <SettingsItem 
                        icon="👤" 
                        label="Profile" 
                        onPress={() => {}}
                    />
                    <SettingsItem 
                        icon="🔒" 
                        label="Security & Privacy" 
                        onPress={() => {}}
                    />
                    <SettingsItem 
                        icon="💾" 
                        label="Backup Wallet" 
                        onPress={() => {}}
                    />
                </SettingsSection>

                {/* Preferences Section */}
                <SettingsSection title="Preferences">
                    <SettingsItem 
                        icon="🌐" 
                        label="Language" 
                        value="English"
                        onPress={() => {}}
                    />
                    <SettingsItem 
                        icon="💱" 
                        label="Currency" 
                        value="USD"
                        onPress={() => {}}
                    />
                    <SettingsToggle 
                        icon="🌙" 
                        label="Dark Mode" 
                        value={darkMode}
                        onValueChange={setDarkMode}
                    />
                    <SettingsToggle 
                        icon="🔔" 
                        label="Notifications" 
                        value={notifications}
                        onValueChange={setNotifications}
                    />
                </SettingsSection>

                {/* Network Section */}
                <SettingsSection title="Network">
                    <SettingsItem 
                        icon="⚡" 
                        label="RPC Settings" 
                        onPress={() => {}}
                    />
                    <SettingsItem 
                        icon="🌐" 
                        label="Network Selection" 
                        onPress={() => {}}
                    />
                </SettingsSection>

                {/* Advanced Section */}
                <SettingsSection title="Advanced">
                    <SettingsToggle 
                        icon="🔧" 
                        label="Developer Mode" 
                        value={developerMode}
                        onValueChange={setDeveloperMode}
                    />
                    <SettingsToggle 
                        icon="📊" 
                        label="Analytics" 
                        value={analytics}
                        onValueChange={setAnalytics}
                    />
                </SettingsSection>

                {/* About Section */}
                <SettingsSection title="About">
                    <SettingsItem 
                        icon="ℹ️" 
                        label="Version 2.0.1" 
                        showArrow={false}
                        onPress={() => {}}
                    />
                    <SettingsItem 
                        icon="📄" 
                        label="Terms & Privacy" 
                        onPress={() => {}}
                    />
                    <SettingsItem 
                        icon="🆘" 
                        label="Support" 
                        onPress={() => {}}
                    />
                </SettingsSection>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton}>
                    <LinearGradient
                        colors={['rgba(239, 68, 68, 0.2)', 'rgba(220, 38, 38, 0.2)']}
                        style={styles.logoutGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.logoutText}>🚪 Logout</Text>
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    backIcon: {
        color: '#E5E7EB',
        fontSize: 28,
        fontWeight: '300',
    },
    backText: {
        color: '#E5E7EB',
        fontSize: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
        letterSpacing: 1,
    },
    headerSpacer: {
        width: 60,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#9CA3AF',
        letterSpacing: 1,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    sectionContent: {
        backgroundColor: 'rgba(255,255,255,0.04)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        borderRadius: 16,
        overflow: 'hidden',
    },
    settingsItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        flex: 1,
    },
    settingsIcon: {
        fontSize: 20,
    },
    settingsLabel: {
        color: '#E5E7EB',
        fontSize: 15,
        fontWeight: '500',
    },
    settingsItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    settingsValue: {
        color: '#9CA3AF',
        fontSize: 14,
    },
    arrow: {
        color: '#9CA3AF',
        fontSize: 24,
        fontWeight: '300',
    },
    logoutButton: {
        marginTop: 20,
        borderRadius: 16,
        overflow: 'hidden',
    },
    logoutGradient: {
        padding: 18,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    logoutText: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '700',
    },
});
