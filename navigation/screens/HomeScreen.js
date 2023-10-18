import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>

            {/* Header */}
            <Text style={styles.header}>Welcome to Stress Reliever!</Text>

            {/* Card: Previous Drawings */}
            <TouchableOpacity style={styles.card} onPress={() => alert('Show previous drawings')}>
                <Ionicons name="brush-outline" size={40} color="#4A90E2" />
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Previous Drawings</Text>
                    <Text style={styles.cardDetail}>Tap to view your artwork</Text>
                </View>
            </TouchableOpacity>

            {/* Card: Last Spin Counts */}
            <TouchableOpacity style={styles.card} onPress={() => alert('Show last spin counts')}>
                <Ionicons name="reload-outline" size={40} color="#F5A623" />
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Last Spin Counts</Text>
                    <Text style={styles.cardDetail}>You spun 5 times in the last session</Text>
                </View>
            </TouchableOpacity>

            {/* Card: Color Change Taps */}
            <TouchableOpacity style={styles.card} onPress={() => alert('Show color change taps')}>
                <Ionicons name="color-palette-outline" size={40} color="#A569BD" />
                <View style={styles.cardTextContainer}>
                    <Text style={styles.cardTitle}>Color Change Taps</Text>
                    <Text style={styles.cardDetail}>You tapped 12 times in the last session</Text>
                </View>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
                <Text style={styles.footerText}>Keep exploring and stay relaxed!</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDEDED',
        paddingHorizontal: 20,
        paddingTop: 50
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
        textAlign: 'center'
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 25,
        marginBottom: 25,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardTextContainer: {
        marginLeft: 15
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
    },
    cardDetail: {
        fontSize: 16,
        color: '#777',
        marginTop: 5
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    },
    footerText: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center'
    }
});
