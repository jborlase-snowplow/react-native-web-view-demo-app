import React, { useRef } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Colors, Header } from 'react-native/Libraries/NewAppScreen';
import {getWebViewCallback} from '@snowplow/react-native-tracker';
import { useTracker } from '../App';

const webViewEndpoint = process.env.EXPO_PUBLIC_WEBVIEW_ENDPOINT;
console.log(webViewEndpoint);

const WebViewScreen = () => {
  const webViewRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';
  const tracker = useTracker();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    webview: {
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* WebView Component */}
      <WebView
        ref={webViewRef}
        source={{ uri: webViewEndpoint }} // Load the WebView with the URL
        style={styles.webview}
        javaScriptEnabled={true}
        onMessage={getWebViewCallback()} // Handle messages from the WebView and send them to the Snowplow tracker
      />
  </SafeAreaView>
  );
};

export default WebViewScreen;