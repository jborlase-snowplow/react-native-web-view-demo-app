import React from 'react';
import { Button, View, Text } from 'react-native';
import { useTracker } from '../App';

const HomeScreen = ({ navigation }) => {
    const tracker = useTracker();
  
    const onPressTrackScreenViewEvent = () => {
      tracker.trackScreenViewEvent({ name: 'onlyRequired' });
      tracker.trackScrollChangedEvent({
        yOffset: 20,
        contentHeight: 100,
        viewHeight: 50,
      });
      tracker.trackListItemViewEvent({
        index: 1,
        itemsCount: 10,
      });
      tracker.trackScreenViewEvent({
        name: 'allPopulated',
        type: 'allPopulated',
        transitionType: 'test',
      });
      tracker.trackScreenViewEvent({
        name: 'allOptionalsNull',
        type: null,
        transitionType: null,
      });
      tracker.trackScreenViewEvent({
        name: 'allOptionalsUndefined',
        type: undefined,
        transitionType: undefined,
      });
      tracker.trackScreenViewEvent(
        {
          name: 'withContext and screenId',
          id: '5d79770b-015b-4af8-8c91-b2ed6faf4b1e',
        },
        [
          {
            schema:
              'iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0',
            data: { impressionId: 'test_imp_id' },
          },
        ]
      );
      tracker.trackScreenViewEvent({ name: 'withEmptyArrayContext' }, []);
    };
  
    const onPressTrackSelfDescribingEvent = () => {
      tracker.trackSelfDescribingEvent({
        schema: 'iglu:com.snowplowanalytics.snowplow/link_click/jsonschema/1-0-1',
        data: { targetUrl: 'test.test' },
      });
    };
  
    const onPressTrackStructuredEvent = () => {
      tracker.trackStructuredEvent({
        category: 'SeTest',
        action: 'allPopulated',
        label: 'valueIsFloat',
        property: 'property',
        value: 50.1,
      });
      tracker.trackStructuredEvent({
        category: 'SeTest',
        action: 'allPopulated',
        label: 'valueIsNullAndSoIsProperty',
        property: null,
        value: null,
      });
  
      tracker.trackStructuredEvent({
        category: 'SeTest',
        action: 'allPopulated',
        label: 'valueIsUndefined',
        property: 'property',
        value: undefined,
      });
      tracker.trackStructuredEvent({
        category: 'SeTest',
        action: 'onlyRequired',
      });
    };
  
    const onPressTrackPageViewEvent = () => {
      tracker.trackPageViewEvent({
        pageUrl: 'https://allpopulated.com',
        pageTitle: 'some title',
        referrer: 'http://refr.com',
      });
    };
  
    const onPressTrackDeepLinkReceivedEvent = () => {
      tracker.trackDeepLinkReceivedEvent({
        url: 'https://deeplink.com',
        referrer: 'http://refr.com',
      });
    };
  
    const onPressTrackMessageNotificationEvent = () => {
      tracker.trackMessageNotificationEvent({
        title: 'title1',
        body: 'body1',
        trigger: 'push',
        action: 'action1',
        attachments: [
          {
            identifier: 'att_id1',
            type: 'att_type1',
            url: 'http://att.url.1',
          },
        ],
        bodyLocArgs: ['bodyArg1', 'bodyArg2'],
        bodyLocKey: 'bodyKey1',
        category: 'category1',
        contentAvailable: true,
        group: 'group1',
        icon: 'icon1',
        notificationCount: 3,
        notificationTimestamp: '2022-02-02T15:17:42.767Z',
        sound: 'sound1',
        subtitle: 'subtitle1',
        tag: 'tag1',
        threadIdentifier: 'threadIdentifier1',
        titleLocArgs: ['titleArg1', 'titleArg2'],
        titleLocKey: 'titleKey1',
      });
    };
  
    const onPressShowMeSomeWarnings = () => {
      tracker.trackSelfDescribingEvent({});
      tracker.trackStructuredEvent({});
      tracker.trackPageViewEvent({});
      tracker.trackScreenViewEvent({});
    };
  
    const onPressTestSetSubject = async () => {
      try {
        await tracker.setSubjectData({
          userId: 'nextTester',
          domainUserId: '5d79770b-015b-4af8-8c91-b2ed6faf4b1e',
          language: 'es',
          colorDepth: 50,
          timezone: 'Europe/London',
          screenResolution: [300, 300],
        });
        await tracker.trackScreenViewEvent({ name: 'afterSetSubjectTestSV' });
      } catch (e) {
        console.log(e.message);
      }
    };
  
    const onPressPlayGC = async () => {
      try {
        await tracker.removeGlobalContexts('testTag');
        await tracker.addGlobalContexts({
          tag: 'testTagReloaded',
          globalContexts: [
            {
              schema:
                'iglu:com.snowplowanalytics.snowplow/ad_impression/jsonschema/1-0-0',
              data: { impressionId: 'test_global_contexts_Reloaded' },
            },
          ],
        });
        await tracker.trackPageViewEvent({ pageUrl: 'afterGCChange.test' });
      } catch (e) {
        console.log(e.message);
      }
    };
  
    const onPressLogSessionData = async () => {
      try {
        const sessionUserId = await tracker.getSessionUserId();
        const sessionId = await tracker.getSessionId();
        const sessionIdx = await tracker.getSessionIndex();
        const isInBg = await tracker.getIsInBackground();
        const bgIndex = await tracker.getBackgroundIndex();
        const fgIndex = await tracker.getForegroundIndex();
  
        const sessionData = {
          userId: sessionUserId,
          sessionId: sessionId,
          sessionIndex: sessionIdx,
          isInBackground: isInBg,
          backgroundIndex: bgIndex,
          foregroundIndex: fgIndex,
        };
        console.log(
          'SnowplowTracker: Session Data: ' + JSON.stringify(sessionData)
        );
      } catch (e) {
        console.log(e.message);
      }
    };
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to WebView"
          onPress={() => navigation.navigate('WebViewScreen')}
        />
  
        <Text>Press the buttons below to send events to the tracker</Text>
        <Button title="Track Screen View Event" onPress={onPressTrackScreenViewEvent} />
        <Button title="Track Self Describing Event" onPress={onPressTrackSelfDescribingEvent} />
        <Button title="Track Structured Event" onPress={onPressTrackStructuredEvent} />
        <Button title="Track Page View Event" onPress={onPressTrackPageViewEvent} />
        <Button title="Track Deep Link Received Event" onPress={onPressTrackDeepLinkReceivedEvent} />
        <Button title="Track Message Notification Event" onPress={onPressTrackMessageNotificationEvent} />
        <Button title="Show me some warnings" onPress={onPressShowMeSomeWarnings} />
        <Button title="Test Set Subject" onPress={onPressTestSetSubject} />
        <Button title="Play with Global Contexts" onPress={onPressPlayGC} />
        <Button title="Log Session Data" onPress={onPressLogSessionData} />

      </View>
    );
  };

export default HomeScreen;