
import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  FlatList,
  Image,
  Animated
} from 'react-native';
const { width, height } = Dimensions.get('screen')
const App = () => {
  const dates = [
    'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6784133/samji_illustrator_4x.jpeg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/10940512/media/b2a8ea95c550e5f09d0ca07682a3c0da.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6629190/samji_illustrator__.jpg?compress=1&resize=800x600&vertical=top',
    'https://cdn.dribbble.com/users/3281732/screenshots/6852350/samji_illustrator.jpeg?compress=1&resize=800x600&vertical=top'
  ]
  const imageW = width * 0.7;
  const imageH = height * 0.7;
  const scrollX = React.useRef(new Animated.Value(0)).current
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }} >
      <StatusBar hidden />
      <View style={StyleSheet.absoluteFillObject}>
        {dates.map((img, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ]
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          })
          return (
            <Animated.Image
              key={`image-${index}`}
              source={{ uri: img }}
              style={[
                StyleSheet.absoluteFillObject,
                {
                  opacity
                }
              ]}
              blurRadius={50}
            />
          )
        })}
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={dates}
        keyExtractor={(idex) => idex.toString()}
        horizontal
        pagingEnabled
        renderItem={({ item }) => {
          return (
            <View style={{ width, justifyContent: 'center', alignItems: 'center' }}>
              <Image resizeMode='cover' source={{ uri: item }} style={{
                width: imageW,
                height: imageH,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOpacity: .5,
                shadowOffset: {
                  width: 0,
                  height: 0
                },
                shadowRadius:20
              }} />
            </View>
          )
        }}
      />
    </View>
  );
};

export default App;
