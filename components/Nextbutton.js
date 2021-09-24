import React, { useEffect, useRef } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import Svg, { G, Circle } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';

const Nextbutton = ({ percentage, scrollTo }) => {
    const size = 128;

    const strokeWidth = 2;

    const center = size / 2;

    const radius = center - strokeWidth / 2;

    const circumference = 2 * Math.PI * radius;

    const progressAnimation = useRef(new Animated.Value(0)).current;

    const progressRef = useRef(null);

    const animation = (toValue) => {
        return Animated.timing(progressAnimation, {
            toValue,
            duration: 250,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        animation(percentage);
    }, [percentage]);

    useEffect(() => {
        progressAnimation.addListener(({ value }) => {
            const strokeDashoffset = circumference - (circumference * value) / 100;

            if(progressRef?.current) {
                progressRef.current.setNativeProps({
                    strokeDashoffset,
                });
            }
    }, [percentage]);

    return () => {
        progressAnimation.removeAllListeners();
    };
},[]);

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <G origin={center} rotation={-90}>
                    <Circle cx={center} cy={center} r={radius} strokeWidth={strokeWidth} stroke="#E6E7E8"/>
                    <Circle ref={progressRef} cx={center} cy={center} r={radius} 
                    strokeWidth={strokeWidth} stroke="#F4338F" strokeDasharray={circumference} 
                    />
                </G>
            </Svg>
            <TouchableOpacity onPress={scrollTo} activeOpacity={0.6} style={styles.button}>
                <AntDesign name="arrowright" size={32} color="#fff" />
            </TouchableOpacity>
        </View>
    )
}

export default Nextbutton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        backgroundColor: '#F4338F',
        borderRadius: 100,
        padding: 20
    }
})
