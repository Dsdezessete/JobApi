import React from 'react';
import { 
    GestureResponderEvent, 
    TouchableOpacity, 
    Text, 
    ViewStyle, 
    TextStyle, 
    StyleProp 
} from "react-native";
import styles from "./styles";

export type ButtonProps = {
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    children?: React.ReactNode;
    color?: 'red' | 'blue' | 'white' | 'primary' | 'secondary' | 'success' | 'warning' | 'neutral';
    onPress?: (event: GestureResponderEvent) => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    disabled?: boolean;
    accessibilityLabel?: string;
}

export function Button({ 
    children, 
    size = 'medium', 
    color = "blue", 
    onPress, 
    style, 
    textStyle,
    disabled = false,
    accessibilityLabel,
    ...props 
}: ButtonProps) {
    return (
        <TouchableOpacity 
            disabled={disabled}
            style={[
                styles.wrapper, 
                styles[size], 
                styles[color], 
                style,
                disabled && styles.disabled
            ]}  
            onPress={onPress} 
            accessibilityLabel={accessibilityLabel || (typeof children === 'string' ? children : undefined)}
            accessibilityRole="button"
            {...props}
        >
            <Text 
                style={[
                    styles.text, 
                    { 
                        fontSize: styles[size].fontSize, 
                        color: styles[color].color 
                    },
                    textStyle,
                    disabled && styles.disabledText
                ]}
            >
                {children}
            </Text>
        </TouchableOpacity>
    );
}
