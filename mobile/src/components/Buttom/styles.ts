import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    small: {
        height: 40,
        width: 108,
        fontSize: 18, 
        fontWeight: '500',
    },
    medium: {
        height: 40,
        width: 126,
        fontSize: 18,
        fontWeight: '500',
    },
    large: {
        height: 40,
        width: 157,
        fontSize: 18,
        fontWeight: '500',
    },
    xlarge: {
        height: 53,
        width: 299,
        fontWeight: '700',
        fontSize: 20,
    },
    // Professional Primary Colors
    primary: {
        backgroundColor: '#1A5F7A', // Deep teal
        color: "#FFFFFF"
    },
    secondary: {
        backgroundColor: '#2C7DA0', // Muted blue
        color: "#FFFFFF"
    },
    // Accent Colors
    success: {
        backgroundColor: '#2D6A4F', // Deep green for positive actions
        color: "#FFFFFF"
    },
    warning: {
        backgroundColor: '#F48C4E', // Warm orange for caution
        color: "#FFFFFF"
    },
    // Neutral Colors
    neutral: {
        backgroundColor: '#F8F9FA', // Light gray
        color: "#333333"
    },
    // Previously existing colors
    blue: {
        backgroundColor: '#004CBF',
        color: "#FFFFFF"
    },
    red: {
        backgroundColor: '#DC0D00',
        color: "#FFFFFF",
    },
    white: {
        backgroundColor: '#E7E7E7',
        color: "#004CBF"
    },
    text: {
        color: '#FAFAFA',
        textAlign: 'center',
    },
});

export default styles;
