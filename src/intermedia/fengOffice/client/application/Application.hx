package intermedia.fengOffice.client.application;

import intermedia.fengOffice.client.Api;
import intermedia.fengOffice.client.DeeplinkManager;
import intermedia.fengOffice.client.Input;
import intermedia.fengOffice.client.application.Config;
import intermedia.fengOffice.client.application.AppState;
import intermedia.fengOffice.cross.Data;
import intermedia.fengOffice.client.widgets.HomeScreen;
import intermedia.fengOffice.client.widgets.Widget;
import intermedia.fengOffice.client.widgets.FOObjectsList;
import intermedia.fengOffice.client.widgets.FOObjectDetail;
import haxe.remoting.HttpAsyncConnection;
import js.Lib;
import js.Dom;

/**
 * entry point for the application
 */
class Application {
	//private var objectLists : Hash<FOObjectsList>;
	/**
	 * FO API
	 */
	private var api : Api;
	/**
	 * main screen container, with header, body and footer
	 */
	private var widget : Widget;
	/**
	 * init the application
	 */
	public function new(){
		api = new Api();
		
/*		if (js.Cookie.exists("PHPSESSID")){
			Lib.alert("PHPSESSID = "+js.Cookie.get("PHPSESSID"));
			Lib.alert("PHPSESSID = "+js.Cookie.get("http___localhost_8888_repositories_tests_fengoffice2token"));
		}
*/		
		// **
		// check if the user is allready authenticated in FO
		
		// check the cookie of FO  
		var str = StringTools.replace(Lib.window.location.href, "/","_");
		str = StringTools.replace(str, ":","_");
		str = str.substr(0, str.indexOf("_plugins_"+Config.PLUGIN_NAME));
		var autoAuth:Bool = js.Cookie.exists(str+"id");

		// check the "autoAuth" param (used in the redirection of the mobile_app FO plugin)
		autoAuth = autoAuth || (Lib.window.location.href.indexOf("autoAuth") > 0);		
		if (autoAuth){
			trace("Allready authenticated in FO, try to enter");
			doOnSubmit("", "");
		}
		else{
			goAuthPage();
		}
	}
	private function goAuthPage(errorMsg:String=""){
		var t = this;
		DeeplinkManager.getInstance().setDeeplink("auth", function (deeplink:String) { t.goAuthPage(errorMsg); } );
		// get the template
		var str = haxe.Resource.getString("login");
		var t = new haxe.Template(str);
		var output = t.execute({config:Config, appState:this, error:errorMsg, isError:(errorMsg!=""), Lang:Lang});
		//widget = new Widget("MainWidget", "Feng Office App", Lib.document.getElementById("main"));
		//widget.setBody(output);
		Lib.document.getElementById("main").innerHTML = output;
		Lib.document.getElementById("submitBtn").onclick = onSubmit;
	}
	private function onSubmit(event:Event){
		var userName = cast(Lib.document.getElementById("userName")).value;
		var userPass = cast(Lib.document.getElementById("userPass")).value;
		doOnSubmit(userName, userPass);
	}
	private function doOnSubmit(userName:String, userPass:String){
		widget = new Widget("MainWidget", "Feng Office App", Lib.document.getElementById("main"));
		widget.setState(loading);
		api.authenticate(userName, userPass, onAuth);
	}
	private function onAuth(user:User){
		if (user.error_msg != ""){
			trace("authentication failed");
			goAuthPage(user.error_msg);
			return;
		}
		Input.initPhoneGap();
		trace("authentication success "+user.token);
		AppState.getInstance().curUser = user;
		goHome();
	}
	/**
	 * callback from the view
	 */
	private function goHome(e:Event = null){
		var t = this;
		DeeplinkManager.getInstance().setDeeplink("home", function (deeplink:String) { t.goHome(e); } );
		
		widget.startTransition();
		
		var homeScreen = new HomeScreen(widget);
		homeScreen.onChange = goList;
	}
	private function goList(srv:ServiceType){
		var t = this;
		DeeplinkManager.getInstance().setDeeplink("list", function (deeplink:String) { t.goListNoDeeplink(srv); });
		trace("List selected "+srv);
		goListNoDeeplink(srv);
	}
	private function goListNoDeeplink(srv:ServiceType){
		AppState.getInstance().curServiceType = srv;
		
		var list : FOObjectsList;
/*		if (objectLists.exists(srv)){
			list = objectLists.get(srv);
			list.refresh();
		}
		else{
			list = new FOObjectsList(api, widget);
			objectLists.set(srv, list);
		}
*/		
		list = new FOObjectsList(api, widget);
		list.onHome = goHome;
		list.onSelect = _onSelectItem;
	}
	private function goDetail(srv:ServiceType, item:Dynamic){
		var t = this;
		DeeplinkManager.getInstance().setDeeplink("detail", function (deeplink:String) { t.goDetail(srv, item); } );
		trace("Show detail of "+item);
		AppState.getInstance().curServiceType = srv;
		AppState.getInstance().curItem = item;
		
		var detailView : FOObjectDetail = new FOObjectDetail(api, widget, srv, item, AppState.getInstance().curWorkspace);
		detailView.onHome = goHome;
		//detailView.onChange = ;
	}
	private function _onSelectItem(item:Dynamic){
		trace("item selected: "+item);
		switch (AppState.getInstance().curServiceType){
			case ServiceTypes.WORKSPACES:
				AppState.getInstance().curWorkspace = item;
				AppState.getInstance().curItem = null;
				goHome();
			default:
				goDetail(AppState.getInstance().curServiceType, item);
		}
	}
}
