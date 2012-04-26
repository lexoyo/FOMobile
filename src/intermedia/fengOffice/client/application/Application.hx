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
		goAuthPage();
	}
	private function goAuthPage(errorMsg:String=""){
		DeeplinkManager.getInstance().setDeeplink("auth", function (deeplink:String) { goAuthPage(errorMsg); } );
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
		DeeplinkManager.getInstance().setDeeplink("home", function (deeplink:String) { goHome(e); } );
		
		widget.startTransition();
		
		var homeScreen = new HomeScreen(widget);
		homeScreen.onChange = goList;
	}
	private function goList(srv:ServiceType){
		DeeplinkManager.getInstance().setDeeplink("list", function (deeplink:String) { goListNoDeeplink(srv); });
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
		DeeplinkManager.getInstance().setDeeplink("detail", function (deeplink:String) { goDetail(srv, item); } );
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
