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
import {StyleSheet, Text, View} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notifications" component={AnimatedScreen} />
    </Stack.Navigator>
  );
};

const Home = ({navigation}: any) => {
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
        onPress={() => navigation.navigate('Notifications')}>
        <Text>Go to AnimatedScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const AnimatedScreen = () => {
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
        <Animatable.View
          animation="fadeInUp"
          duration={300}
          delay={index * 100}
          style={[styles.itemContainer, {backgroundColor: item.code}]}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemCode}>{item.code}</Text>
        </Animatable.View>
      )}
    />
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
