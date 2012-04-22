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
		
		widget = new Widget("MainWidget", "Feng Office App", Lib.document.getElementById("main"));
		goHome();
	}
	/**
	 * callback from the view
	 */
	private function goHome(e:Event = null){
		var screen : HomeScreen = new HomeScreen(widget);
		screen.onChange = goList;
	}
	private function goList(srv:ServiceType){
		trace("List selected "+srv);
		AppState.getInstance().curServiceType = srv;
		
		var list : FOObjectsList = new FOObjectsList(api, widget, srv, AppState.getInstance().curWorkspace);
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
