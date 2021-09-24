import React, { useState, useRef } from 'react'
import { StyleSheet, Text, View, FlatList, Animated } from 'react-native';
import OnboardingItem from './OnboardingItem';
import Paginator from './Paginator';
import slides from '../slides';
import Nextbutton from './Nextbutton';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Onboarding = ({ navigation, ...props }) => {

    const [index, setIndex] = useState(props.route.params && props.route.params.index ? props.route.params.index : 0);

    // if (props.route.params) {
    //     const { index } = props.route.params;
    //     setIndex(index);
    // }    

    const scrollX = useRef(new Animated.Value(0)).current;

    const viewableItemsChanged = useRef(({ viewableItems }) => {
        setIndex(viewableItems[0].index);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const slidesRef = useRef(null);

    const scrollToIndex = async () => {
        if(index < slides.length - 1) {
            slidesRef.current.scrollToIndex({
                index: index + 1,
            });
        }
        else {
            try {
                AsyncStorage.setItem('@viewedOnboarding', 'true');
                navigation.navigate('HomeScreen');
            } catch (e) {
                console.log(e);
            }
        }
    };

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
            <Nextbutton scrollTo={scrollToIndex} percentage = {(index + 1) * (100 / slides.length)}/>
        </View>
    )
}

export default Onboarding

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    }
})
