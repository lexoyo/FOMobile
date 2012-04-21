package intermedia.fengOffice.client.widgets; 

import intermedia.fengOffice.cross.Data;
import js.Lib;
import js.Dom;

/**
 * this class do the querries to FO db tables
 * let you retrieve the needed data from your FO server
 */
class Tasks {

	public var onSelect:Workspace->Void;
	public var onChange:Workspace->Void;
	public var onError:String->Void;
	public var onLoading:Bool->Void;

	private var _api : Api;
	private var _container : HtmlDom;
	private var _prevWorkspaces : Array<Workspace>;
	private var _curWorkspace : Workspace;
	/**
	 */
	public function new(api:Api, container:HtmlDom):Void {
	      _api = api;
	      _container = container;
	      // init the process, get the top level contexts
	      _prevWorkspaces = [];
	      _curWorkspace = null;
	      refresh();
	}
	private function _displayContexts(workspaces:List<Workspace>):Void {
		if (onLoading != null) onLoading(false);
 		trace("workspaces: "+workspaces);
		// render the template
		var str = haxe.Resource.getString("tasks");
		var t = new haxe.Template(str);
		var title; 
		if (_curWorkspace != null) title = _curWorkspace.name;
		else title = "Select Task";
		var output = t.execute({workspaces:workspaces, title:title});
//		trace(output);

		// attach to the dom
		_container.innerHTML = output;

		// add interactions
		var t = this;
		for (w in workspaces){
		    Lib.document.getElementById("workspaceId"+w.id).onclick = function(e){t.openWorkspace(w);};
		    Lib.document.getElementById("workspacesSelect"+w.id).onclick = function(e){t.selectWorkspace(w);};
		}
		if (onChange != null) onChange(_curWorkspace);

		if (_prevWorkspaces.length <= 0) disableUp();
		else enableUp();

		Lib.document.getElementById("workspacesUp").onclick = selectWorkspaceUp;
		Lib.document.getElementById("workspacesRefresh").onclick = refresh;
		Lib.document.getElementById("workspacesSelect").onclick = function(e){t.selectWorkspace(t._curWorkspace);};
	}
	public function openWorkspace(workspace:Workspace){
	      _prevWorkspaces.push(_curWorkspace);
	      _curWorkspace = workspace;
	      refresh();
	}
	public function selectWorkspace(workspace:Workspace){
	      if (onSelect != null) onSelect(workspace);
	}
	public function selectWorkspaceUp(event:Event = null){
	      if (_prevWorkspaces.length <= 0) return;
	      _curWorkspace = _prevWorkspaces.pop();
	      refresh();
	}
	public function refresh(event:Event = null){
	      //trace("refresh "+_curWorkspace);
	      var curId : Int;
	      if (_curWorkspace != null) curId = _curWorkspace.id;
	      else curId = -1; // the root of the contexts
  
		if (onLoading != null) onLoading(true);

	      _api.listMembers(ServiceTypes.PROJECT_TASKS, curId,cast(_displayContexts), onError);
	}
	public function enableUp(){
	      try{
		      cast(Lib.document.getElementById("workspacesUp")).disabled = false;
	      }catch(e:Dynamic){}
	}
	public function disableUp(){
	      try{
		      cast(Lib.document.getElementById("workspacesUp")).disabled = true;
	      }catch(e:Dynamic){}
	}
}
