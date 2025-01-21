import * as React from 'react';
import { useEffect, useState, createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WebViewScreen from './components/WebViewScreen';
import HomeScreen from './components/HomeScreen';
import { newTracker } from '@snowplow/react-native-tracker';

const collectorEndpoint = process.env.EXPO_PUBLIC_COLLECTOR_ENDPOINT;
console.log(collectorEndpoint);

const Stack = createStackNavigator();
const TrackerContext = createContext();

const useTracker = () => {
  return useContext(TrackerContext);
};

const App = () => {
  const [tracker, setTracker] = useState(null); // State to hold the initialized tracker

  // Initialize the tracker asynchronously
  useEffect(() => {
    const initializeTracker = async () => {
      try {
        const trackerInstance = await newTracker({
          namespace: 'jb-react-native-app-tracker',
          appId: 'jb-react-native-app',
          endpoint: collectorEndpoint,
        });
        setTracker(trackerInstance); // Save the initialized tracker in state
        trackerInstance.trackScreenViewEvent({ name: 'HomeScreen' });
      } catch (error) {
        console.error('Error initializing tracker:', error);
      }
    };

    initializeTracker();
  }, []);

  return (
    <TrackerContext.Provider value={tracker}>
      <NavigationContainer
      onStateChange={(state) => {
        if (tracker) {
          console.log("Tracking Screen View Event");
          tracker.trackScreenViewEvent({ name: state.routes[state.index].name });
        } 
      }}>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" component={HomeScreen} tracker={tracker} />
          <Stack.Screen name="WebViewScreen" component={WebViewScreen} tracker={tracker}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TrackerContext.Provider>
  );
};

export default App;
export { useTracker };