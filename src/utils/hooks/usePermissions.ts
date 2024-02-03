import {useEffect, useState} from 'react';

import {Platform} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  requestMultiple,
} from 'react-native-permissions';

export const usePermissions = (): boolean => {
  const [hasPermissions, setHasPermissions] = useState<boolean>(true);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        let hasPermission =
          (await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)) ===
            RESULTS.GRANTED ||
          (await check(PERMISSIONS.ANDROID.READ_MEDIA_AUDIO)) ===
            RESULTS.GRANTED;

        if (!hasPermission) {
          const _permissions = await requestMultiple([
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
            PERMISSIONS.ANDROID.READ_MEDIA_AUDIO,
          ]);

          hasPermission = _permissions ? true : false;
        }

        return hasPermission;
      }

      if (Platform.OS === 'ios') {
        let hasPermission =
          (await check(PERMISSIONS.IOS.MEDIA_LIBRARY)) === RESULTS.GRANTED;
        if (!hasPermission) {
          hasPermission =
            (await request(PERMISSIONS.IOS.MEDIA_LIBRARY)) === RESULTS.GRANTED;
        }

        return hasPermission;
      }

      return false;
    };

    (async () => {
      const permissions = await requestPermissions();
      setHasPermissions(permissions);
    })();
  }, []);

  return hasPermissions;
};
