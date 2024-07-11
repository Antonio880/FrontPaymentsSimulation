import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import TransactionHistoryPage from './src/screens/HistoryScreen';
import { TabBarIcon } from './src/components/TabBarIcon';

const Tab = createBottomTabNavigator();
let iconName: "home-sharp" | "home-outline" | "settings-sharp" | "settings-outline";

const App: React.FC = () => {
  return (
    <NavigationContainer >
      <Tab.Navigator
        
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            // let iconName: string;

            if (route.name === 'Home') {
              iconName = focused ? 'home-sharp' : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused ? 'settings-sharp' : 'settings-outline';
            }

            return <TabBarIcon name={iconName} color={color} />;
          },
          tabBarActiveTintColor: 'black', 
          tabBarInactiveTintColor: 'gray',
          tabBarHideOnKeyboard: true,
        })}
        
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={TransactionHistoryPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;