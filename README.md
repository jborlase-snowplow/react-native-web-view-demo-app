# Example Snowplow React Native App with WebView

This repository serves to show a very basic example for how to implement the Snowplow React Native Tracker (version 4.2+) as well as how to integrate the Snowplow WebView plugin released in version 4.3.1 of the Snowplow JavaScript tracker. It builds on top of the Expo Managed workflow as the latest Snowplow React Native tracker is now fully JavaScript based and no longer requires access to the underlying iOS or Android libraries which were provided in the Bare Workflow.

It creates an app with two screens - the first which has a series of buttons to trigger Snowplow Events from the React Native Tracker, and the second to open up a WebView to show how events can be forwarded using the React Native tracker.

## Components

* HomeScreen.js - To help understand how to trigger Snowplow React Native events.
* WebViewScreen.js - To show how to integrate the Snowplow WebView plugin with the Snowplow React Native tracker.

## Configuration
The repo contains an example .env file (as seen below) which you should create in your project root directory to populate the Snowplow Collector Endpoint and WebView endpoint URLs. The Snowplow Console API Keys are optional if you would like to additionally test Snowtype.

```
EXPO_PUBLIC_COLLECTOR_ENDPOINT=http://localhost:9090/
EXPO_PUBLIC_WEBVIEW_ENDPOINT=http://localhost:3000/
SNOWPLOW_CONSOLE_API_KEY=MY-API-KEY
SNOWPLOW_CONSOLE_API_KEY_ID=MY-API-KEY-ID
```

## WebView Plugin
To have events forwarded from the WebView to the React Native app, you must have the WebView plugin enabled on the site loaded within the WebView. [See more details here](https://docs.snowplow.io/docs/sources/trackers/javascript-trackers/web-tracker/tracking-events/webview/)
