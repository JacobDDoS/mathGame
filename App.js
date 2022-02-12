import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MathScreen from './src/MathScreen';

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          "tabBarIcon": ({ focused, size }) => {
            let iconName, color;
            size = 25;
            if (route.name == "Addition") {
              iconName = "plus";
              color = focused ? '#0096ff' : '#555';
            } else if (route.name == "Subtraction") {
              iconName = "minus";
              color = focused ? '#0096ff' : '#555'
            } else if (route.name == "Multiplication") {
              iconName = "times";
              color = focused ? '#0096ff' : '#555'
            } else if (route.name == "Division") {
              iconName = "divide";
              color = focused ? '#0096ff' : '#555'
            }
            return <FontAwesome5
              name={iconName}
              size={size}
              color={color}
            />
          },
          "tabBarActiveTintColor": "#0096ff",
          "tabBarInactiveTintColor": "#fff",
          "tabBarActiveBackgroundColor": "#555",
          "tabBarInactiveBackgroundColor": "#999",
          "tabBarShowLabel": false,
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ]
        })}
      >
        <Tab.Screen
          name="Addition"
          initialParams={{type: "Addition"}}
          component={MathScreen}
        />
        <Tab.Screen
          name="Subtraction"
          initialParams={{type: "Subtraction"}}
          component={MathScreen}
        />
        <Tab.Screen
          name="Multiplication"
          initialParams={{type: "Multiplication"}}
          component={MathScreen}
        />
        <Tab.Screen
          name="Division"
          initialParams={{type: "Division"}}
          component={MathScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
