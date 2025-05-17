import React from 'react';
import { HotUpdater } from '@hot-updater/react-native';
import { ActivityIndicator, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppProvider from '../contexts/AppContext';
import { usePermissions } from '../hooks';
import Navigation from './screens/navigation/Navigation';
import { Modal, ProgressBar } from '../components';

const App = () => {
  usePermissions();

  return (
    <AppProvider>
      <GestureHandlerRootView className="flex-1">
        <Navigation />
      </GestureHandlerRootView>
    </AppProvider>
  );
};

export default HotUpdater.wrap({
  source: 'https://veztrsdcupuupewujfgr.supabase.co/functions/v1/update-server',
  requestHeaders: {
    // if you want to use the request headers, you can add them here
  },
  fallbackComponent: ({ progress, status }) => {
    const showModal = status === 'UPDATING' || status === 'CHECK_FOR_UPDATE';

    return (
      <Modal
        isOpen={showModal}
        showCloseButton={false}
        header="Live update is in progress">
        <View className="modal-content flex-1">
          {status === 'CHECK_FOR_UPDATE' && progress === 0 && (
            <>
              <ActivityIndicator size="large" color="#000" />
              <Text className="text-black text-center">
                Checking for Updates...
              </Text>
            </>
          )}
          {progress > 0 && (
            <>
              <Text className="text-base sm:text-sm md:text-lg text-black text-center font-medium">
                Applying the live update ensures you will get the latest version
                of the application.
              </Text>
              <Text className="text-xs md:text-base text-black text-center font-semibold my-2.5">
                Downloading ({progress})%
              </Text>
              <View className="">
                <ProgressBar progress={Math.round(progress * 100)} size="small" variant="success" />
              </View>
            </>
          )}

        </View>
      </Modal>
    );
  },
})(App);
