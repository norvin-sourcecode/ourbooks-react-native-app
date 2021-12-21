export default {
  name: "final-client",
  expo: {
    name: "final-client",
    slug: "final-client",
    owner: "norvin_klinkmann",
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/test.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.bilgisaraylabs.ourbooks",
      buildNumber: "1.0.0"
    },
    android: {
      package: "com.bilgisaraylabs.ourbooks",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF'
      }
    },
    web: {
      favicon: './assets/favicon.png'
    },
  }
};