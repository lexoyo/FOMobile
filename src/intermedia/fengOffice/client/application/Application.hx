package intermedia.fengOffice.client.application;

import intermedia.fengOffice.client.Api;
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
		//objectLists = new Hash();
		
		goAuthPage();
	}
	private function goAuthPage(errorMsg:String=""){
		widget = new Widget("MainWidget", "Feng Office App", Lib.document.getElementById("main"));
		// get the template
		var str = haxe.Resource.getString("login");
		var t = new haxe.Template(str);
		var output = t.execute({config:Config, appState:this, error:errorMsg, isError:(errorMsg!="")});
		widget.setBody(output);
		Lib.document.getElementById("submitBtn").onclick = onSubmit;
	}
	private function onSubmit(event:Event){
		var userName = cast(Lib.document.getElementById("userName")).value;
		var userPass = cast(Lib.document.getElementById("userPass")).value;
		api.authenticate(userName, userPass, onAuth);
	}
	private function startAuth(userName:String, userPass:String){
		widget = new Widget("MainWidget", "Feng Office App", Lib.document.getElementById("main"));
		trace("authentication start");
		// get the template
		var str = haxe.Resource.getString("loading");
		var t = new haxe.Template(str);
		var output = t.execute({config:Config, appState:this});
		widget.setBody(output);
		
		api.authenticate(userName, userPass, onAuth);
	}
	private function onAuth(user:User){
		if (user == null){
			trace("authentication failed");
			goAuthPage("wrong user name or password");
			return;
		}
		trace("authentication success "+user.token);
		AppState.getInstance().curUser = user;
		goHome();
	}
	/**
	 * callback from the view
	 */
	private function goHome(e:Event = null){
		var homeScreen = new HomeScreen(widget);
		homeScreen.onChange = goList;
	}
	private function goList(srv:ServiceType){
		trace("List selected "+srv);
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
