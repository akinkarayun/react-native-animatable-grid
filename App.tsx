/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Animatable" component={AnimatedScreen} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="IntepolateScreen" component={IntepolateScreen} />
    </Stack.Navigator>
  );
};

type RootStackParamList = {
  Home: any;
  Animatable: any;
  Details: {
    params: {name: string; color: string; code: string};
  };
  IntepolateScreen: any;
};

type Props = NativeStackScreenProps<RootStackParamList>;

const Home = ({navigation}: Props) => {
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
      }}>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ecd637',
          padding: 20,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('Animatable')}>
        <Text>Go to AnimatedScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const AnimatedScreen = ({navigation}: Props) => {
  const [items, setItems] = React.useState([
    {name: 'TURQUOISE', code: '#1abc9c'},
    {name: 'EMERALD', code: '#2ecc71'},
    {name: 'PETER RIVER', code: '#3498db'},
    {name: 'AMETHYST', code: '#9b59b6'},
    {name: 'WET ASPHALT', code: '#34495e'},
    {name: 'GREEN SEA', code: '#16a085'},
    {name: 'NEPHRITIS', code: '#27ae60'},
    {name: 'BELIZE HOLE', code: '#2980b9'},
    {name: 'WISTERIA', code: '#8e44ad'},
    {name: 'MIDNIGHT BLUE', code: '#2c3e50'},
    {name: 'SUN FLOWER', code: '#f1c40f'},
    {name: 'CARROT', code: '#e67e22'},
    {name: 'ALIZARIN', code: '#e74c3c'},
    {name: 'CLOUDS', code: '#ecf0f1'},
    {name: 'CONCRETE', code: '#95a5a6'},
    {name: 'ORANGE', code: '#f39c12'},
    {name: 'PUMPKIN', code: '#d35400'},
    {name: 'POMEGRANATE', code: '#c0392b'},
    {name: 'SILVER', code: '#bdc3c7'},
    {name: 'ASBESTOS', code: '#7f8c8d'},
  ]);

  return (
    <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      spacing={10}
      renderItem={({item, index}) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate('Details', {
              color: item.code,
              name: item.name,
              code: item.code,
            })
          }>
          <Animatable.View
            animation="fadeInUp"
            duration={200}
            delay={index * 300}
            style={[styles.itemContainer, {backgroundColor: item.code}]}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemCode}>{item.code}</Text>
          </Animatable.View>
        </TouchableOpacity>
      )}
    />
  );
};

const Details = ({route, navigation}: Props) => {
  const {color, name, code} = route.params;
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color,
      }}>
      <Text style={styles.itemName}>{name}</Text>
      <Text style={styles.itemCode}>{code}</Text>
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ecd637',
          padding: 20,
          borderRadius: 10,
        }}
        onPress={() => navigation.navigate('IntepolateScreen')}>
        <Text>Go to IntepolateScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const text = ['Hello', 'Linked In', 'How', 'You All', 'Doing?'];

const IntepolateScreen = ({navigation}: Props) => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      horizontal
      // pagingEnabled
      onScroll={scrollHandler}
      pagingEnabled
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}>
      {text.map((item, index) => {
        return (
          <Page
            translateX={translateX}
            key={index.toString()}
            title={item}
            index={index}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

interface IPageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const {height, width} = Dimensions.get('window');

const Page = ({title, translateX, index}: IPageProps) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadious = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, width / 2, 0],
      Extrapolate.CLAMP,
    );

    return {
      borderRadius: borderRadious,
      transform: [
        {
          scale,
        },
      ],
    };
  });

  const rStyleText = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateY,
        },
      ],
    };
  });
  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[styles.square, rStyle]} />
      <Animated.View style={[{position: 'absolute'}, rStyleText]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  pageContainer: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: width * 0.7,
    width: width * 0.7,
    backgroundColor: 'rgba(0,0,256,0.4)',
  },
  text: {
    fontSize: 70,
    textTransform: 'uppercase',
    color: 'white',
    fontWeight: 'bold',
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

export default App;
