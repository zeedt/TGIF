package com.tgif;
import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.provider.Settings;
import android.util.Log;
import android.content.DialogInterface;
import android.app.AlertDialog;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.CatalystInstance;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeArray;
import com.tgif.ExampleActivity;
import com.tgif.ExampleActivitytwo;
import com.tgif.ChatHeadService;
import com.tgif.ChatHeadService2;
import javax.annotation.Nonnull;
import android.view.View;
import android.widget.Toast;
class ActivityStarterModule extends ReactContextBaseJavaModule {

    ActivityStarterModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ActivityStarter";
    }

    @ReactMethod
    void navigateToExample() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, ExampleActivity.class);
		intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
	@ReactMethod
    void navigateToExample2() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, ExampleActivitytwo.class);
		intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
    @ReactMethod
    void dialNumber(@Nonnull String number) {
        Intent intent = new Intent(Intent.ACTION_DIAL, Uri.parse("tel:" + number));
        getReactApplicationContext().startActivity(intent);
    }
	
    @ReactMethod
    void navigateToExample3() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, ChatHeadService.class);
        context.startService(intent);
        //finish();
    }
	@ReactMethod
    void navigateToExample4() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, Main.class);
		intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }
	@ReactMethod
    void navigateToExample5() {
        ReactApplicationContext context = getReactApplicationContext();
        Intent intent = new Intent(context, ChatHeadService2.class);
        context.startService(intent);
    }

   // @ReactMethod
   // void getActivityName(@Nonnull Callback callback) {
     //   Activity activity = getCurrentActivity();
       // if (activity != null) {
         //   callback.invoke(activity.getClass().getSimpleName());
       // }
    //}
}