package com.tgif;

import com.facebook.react.ReactActivity;
import android.content.Intent;
public class ExampleActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
		
		System.out.println("Regiostering component three");
        return "TGIF3";
    }
	
   @Override
   public void onNewIntent (Intent intent) {
     super.onNewIntent(intent);
       setIntent(intent);
   }
}
