import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import slides from '../slides';


const Onboarding = () => {

    const [index, setIndex] = useState(0);

    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const slidesRef = useRef(null);

    return (
        <View style={styles.container}>
            <View style={{ flex: 3}}>
                <FlatList 
                    data={slides} 
                    renderItem={({item}) => <OnboardingItem item={item}/>} 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bounces={false}
                    keyExtractor={(item) => item.id}
                    onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                />
            </View>
            <Paginator data={slides} scrollX={scrollX}/>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
