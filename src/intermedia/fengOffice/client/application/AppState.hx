package intermedia.fengOffice.client.application;

import intermedia.fengOffice.cross.Data;
import intermedia.fengOffice.client.application.Config;
import js.Dom;
import js.Lib;

/**
 * this is a singleton with app state and defaults
 */
class AppState{
	public var curWorkspace:Workspace;
	public var curItem:Dynamic;
	public var curServiceType:ServiceType;
	public var homeHtmlDom:HtmlDom;
	public var docsHtmlDom:HtmlDom;
	public var tasksHtmlDom:HtmlDom;
	
	static private var _instance:AppState;
		
	/**
	 * apply defaults
	 */
	private function new(){
		curServiceType = "";
		curWorkspace = {
		    object_id:-1,
		    id : 0, // to list only items in the root folder, -1 would list all workspaces 
		    object_type_id : -1, 
		    name : "All Workspaces", 
		
		    created_on : "", 
		    created_by_id : -1, 
		
		    updated_on : "", 
		    updated_by_id : -1, 
		
		    trashed_on : "", 
		    trashed_by_id : -1, 
		
		    archived_on : "", 
		    archived_by_id : -1 
		}
		// get the template
		var str = haxe.Resource.getString("loading");
		var t = new haxe.Template(str);
		var output = t.execute({config:Config, appState:this});
		
		// create empty doms
		homeHtmlDom = Lib.document.createElement("div");
		homeHtmlDom.innerHTML = output;
		docsHtmlDom = Lib.document.createElement("div");
		docsHtmlDom.innerHTML = output;
		tasksHtmlDom = Lib.document.createElement("div");
		tasksHtmlDom.innerHTML = output;
	}
	/**
	 * singleton pattern
	 */
	static public function getInstance():AppState{
		if (_instance == null){
			_instance = new AppState();
		}
		return _instance;
	}
}
