package;

import intermedia.fengOffice.client.Api;
import intermedia.fengOffice.client.Config;
import intermedia.fengOffice.cross.Data;
import intermedia.fengOffice.client.Widget;
import intermedia.fengOffice.client.widgets.Workspaces;
import intermedia.fengOffice.client.widgets.Tasks;
import haxe.remoting.HttpAsyncConnection;
import js.Lib;
import js.Dom;

class MainJs {	
	private var api : Api;
	private var widget : Widget;
	public function new(){
		haxe.Firebug.redirectTraces(); 

		api = new Api();
		widget = new Widget("MainWidget", "Feng Office App", Lib.document.getElementById("main"));
		widget.onHomeBtn = _onHomeBtn;
		widget.onWorkspaceBtn = _onWorkspaceBtn;
		widget.onTabBtn = _onTabBtn;
		widget.onListBtn = _onListBtn;

		_onHomeBtn();
	}
	private function _onHomeBtn(){
		widget.getBodyElement().innerHTML = "<p>Welcome!</p><p>Choose a workspace, a tab and you will view the Feng Office objects.</p>";
	}
	private function _onWorkspaceBtn(){
		var workspaces : Tasks = new Tasks(api, widget.getBodyElement());
		var t = this;
		workspaces.onSelect = function(w:Workspace){Lib.alert("Workspace selected "+w.name);t._onListBtn();};
	}
	private function _onTabBtn(){
		var workspaces : Workspaces = new Workspaces(api, widget.getBodyElement());
		var t = this;
		workspaces.onSelect = function(w:Workspace){Lib.alert("Tab selected "+w.name);t._onListBtn();};
	}
	private function _onListBtn(){
		widget.getBodyElement().innerHTML = "<p>Here comes the list of objects (docs, tasks, contacts...).</p>";
	}
	public static function main() {
		//trace("Hello From FDT haXe !");
		new MainJs();
	}
}
class AppState{
	static public var selectedWorkspace:Workspace;
//	static public var selectedTab:Tab;
}