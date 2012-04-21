package;

import intermedia.fengOffice.client.Api;
import intermedia.fengOffice.client.Config;
import intermedia.fengOffice.cross.Data;
import intermedia.fengOffice.client.Widget;
import intermedia.fengOffice.client.widgets.Workspaces;
import haxe.remoting.HttpAsyncConnection;
import js.Lib;
import js.Dom;

class MainJs {	
	private var workspaces : Workspaces;
	public function new(){
		var api = new Api();
		var workspaceWidget = new Widget("Workspaces", "Workspaces", Lib.document.getElementById("main"));
		workspaces = new Workspaces(api, workspaceWidget.getBodyElement());
		workspaces.fillFooter(workspaceWidget.getFooterElement());
		workspaces.onSelect = function(w:Workspace){Lib.alert("loading workspace "+w.name);};
	}
	public static function main() {
		//trace("Hello From FDT haXe !");
		new MainJs();
	}
}
