import * as React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Animated,
  Dimensions,
  Text,
  FlatList,
  TouchableOpacity
} from 'react-native';
import concat from 'lodash/concat';
import { color } from 'react-native-reanimated';
import Header from '../components/HeaderDetail'
const { width } = Dimensions.get('window')
const pad = 40
const widthImage = width - 2 * pad;
const heightImage = (widthImage * 278) / 300;

const GettingStart = ({ navigation }) => {
  const {navigate, goBack} = navigation
  const [scrollX] = React.useState(new Animated.Value(0));
  const scrollRef = React.useRef(null)
  const [current, setCurrent] = React.useState(0)
  const data = [
    {
      image: require('../assets/images/getting-1.png'),
      title: 'Store Manager',
      subTitle: ''
    },
    {
      image: require('../assets/images/getting-2.png'),
      title: 'Simplified Dashboard',
      subTitle: ''
    },
    {
      image: require('../assets/images/getting-3.png'),
      title: 'Real Time Reporting',
      subTitle: ''
    },
  ]
  const clickScroll = () => {
    const currentTo = current + 1;
    if (currentTo === data.length) {
      navigate('Login')
    } else {
      if (scrollRef?.current?.scrollTo) {
        scrollRef.current.scrollTo({
          x: currentTo * width,
          y: 0,
          animated: true,
        });
        setCurrent(currentTo);
      }
    }
  };

  const position = Animated.divide(scrollX, width);
  let dots = [];

  for (let i = 0; i < data.length; i++) {
    let sizeDot = position.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: [6, 26, 6],
      extrapolate: 'clamp',
    });
    let colorDot = position.interpolate({
      inputRange: [i - 1, i, i + 1],
      outputRange: ['red', 'green', 'blue'],
      extrapolate: 'clamp',
    });
    dots = concat(
      dots,
      <Animated.View
        key={i}
        style={[
          styles.dot,
          {
            width: sizeDot,
            backgroundColor: colorDot,
          },
        ]}
      />,
    );
  }

  return (
    <View style={styles.container}>
      <Header skip="Skip" onPressRight={()=>{navigate('Login')}}/>
      <View style={styles.container}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true}
          scrollEnabled={true}
          scrollEventThrottle={16}
          ref={scrollRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              listener: event => {
                const indexScroll = Math.round(
                  event.nativeEvent.contentOffset.x / width,
                );
                if (current !== indexScroll) {
                  setCurrent(indexScroll);
                }
              },
              useNativeDriver: false,
            },
            { useNativeDriver: false },
          )}>
          {data.map((value, index) => (
            <View key={index} style={styles.item}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.viewInfo}>
                  <Image source={value.image} style={styles.image} />
                  <View style={styles.viewTextItem}>
                    <Text
                      medium
                      h2
                      h2Style={[styles.textItem, styles.textTitle]}>
                      {value.title}
                    </Text>
                    <Text secondary style={styles.textItem}>
                      {value.subTitle}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={clickScroll}
          style={styles.button}
        >
          <Text>{current < data.length - 1 ? 'Next' : 'Get Start'}</Text>
        </TouchableOpacity>   
        <View style={styles.viewDot}>{dots.map(dot => dot)}</View>
      </View>
    </View>
  )
}
export default GettingStart

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: "100%",
    width,
  },
  viewInfo: {
    paddingHorizontal: 40
  },
  image: {
    width: widthImage,
    height: heightImage,
  },
  textItem: {
    textAlign: 'center',
  },
  textTitle: {
    marginBottom: 10,
  },
  footer: {
    alignItems: 'center',
  },
  viewDot: {
    flexDirection: 'row',
    marginBottom: 36,
    backgroundColor: 'red'
  },
  button: {
    width: 142,
    borderWidth: 1,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, 
    marginBottom: 40,
    marginTop: 20,
  },
  viewTextItem: {
    alignItems: 'center',
    marginVertical: 40,
  },
})