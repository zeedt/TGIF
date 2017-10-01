package com.tgif;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.evollu.react.fcm.FIRMessagingPackage;
//import com.pilloxa.backgroundjob.BackgroundJobPackage;
//import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
//import com.wix.reactnativenotifications.RNNotificationsPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;
import com.tgif.ActivityStarterReactPackage;

public class ZeedApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
		  new ActivityStarterReactPackage(), // This is it!
            new FIRMessagingPackage(),
            //new BackgroundJobPackage(),
            //new ReactNativePushNotificationPackage(),
            //new RNNotificationsPackage(),
            //new RNNotificationsPackage(),
            new VectorIconsPackage()
			 //new RNNotificationsPackage(ZeedApplication.this)
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
