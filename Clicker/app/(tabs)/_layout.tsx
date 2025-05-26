
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabsLayout() {
  return (
    <Tabs
  screenOptions={{
    tabBarActiveTintColor: '#000',
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerShadowVisible: false,
    headerTintColor: 'black',
    tabBarStyle: {
    backgroundColor: '#fff',
    },
  }}
>

<Tabs.Screen
        name="index"
        options={{
          title: 'Clicker',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'game-controller' : 'game-controller'} color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Achievements',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'trophy' : 'trophy'} color={color} size={24}/>
          ),
        }}
      />
        <Tabs.Screen 
      name="not-found" 
      options={{ 
         }} />
      
    </Tabs>
  );
}
