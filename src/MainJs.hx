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
		widget.onCatBtn = _displayCat;
		widget.onTaskBtn = _displayTask;
		widget.onFilterBtn = _displayFliter;
	}
	private function _displayCat(){
	}
	private function _displayTask(){
		var workspaces : Tasks = new Tasks(api, widget.getBodyElement());
		workspaces.onSelect = function(w:Workspace){Lib.alert("loading workspace "+w.name);};
	}
	private function _displayFliter(){
		var workspaces : Workspaces = new Workspaces(api, widget.getBodyElement());
		workspaces.onSelect = function(w:Workspace){Lib.alert("loading workspace "+w.name);};
	}
	public static function main() {
		//trace("Hello From FDT haXe !");
		new MainJs();
	}
}
