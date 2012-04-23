package intermedia.fengOffice.client.widgets; 

import intermedia.fengOffice.client.application.AppState; 
import intermedia.fengOffice.cross.Data;
import js.Lib;
import js.Dom;

/**
 * Show list of FO objects, and let the user navigate in the objects and sub objects
 */
class FOObjectsList {

	public var onSelect:Dynamic->Void;
	public var onChange:Dynamic->Void;
	public var onError:String->Void;
	public var onLoading:Bool->Void;

	public var onHome:Dynamic->Void;
	public var onBack:Dynamic->Void;
	public var onForward:Dynamic->Void;

	private var _api : Api;
	private var _widget : Widget;
	private var _prevItems : Array<Dynamic>;
	private var _curItem : Dynamic;
	/**
	 * @param	parentItem	the parent item, with a field "id"
	 */
	public function new(api:Api, widget:Widget):Void {
	      _api = api;
	      _widget = widget;
		  //_curItem = AppState.getInstance().curWorkspace;
	      // init the process, get the top level contexts
	      _prevItems = new Array();
	      refresh();
	}
	private function _displayItems(items:List<Dynamic>):Void {
		if (onLoading != null) onLoading(false);
 		trace("Items: "+items);
		// render the template
		var str = haxe.Resource.getString(AppState.getInstance().curServiceType);
		var t = new haxe.Template(str);
		var title; 
		if (_curItem != null) title = _curItem.name;
		else title = "Select Item";
		var parent = null;
		if (_prevItems.length>0) parent = _prevItems[_prevItems.length-1];
		trace("paernt = "+parent+" - "+_prevItems.length+" - "+_prevItems[0]+" - "+_prevItems);
		var output = t.execute({items:items, hasParent:(_prevItems.length>0), parent:parent, curItem:_curItem, title:title});

		// attach to the dom
		_widget.getBodyElement().innerHTML = output;

		// add interactions
		var t = this;
		for (w in items){
		    Lib.document.getElementById("itemBtn"+w.id).onclick = function(e){t.openItem(w);};
		    Lib.document.getElementById("selectBtn"+w.id).onclick = function(e){t.selectItem(w);};
		}
		if (onChange != null) onChange(_curItem);

		if (_prevItems.length <= 0) disableUp();
		else enableUp();

		Lib.document.getElementById("upBtn").onclick = onUp;
		Lib.document.getElementById("refreshBtn").onclick = refresh;
		Lib.document.getElementById("selectBtn").onclick = function(e){t.selectItem(t._curItem);};


		// render the template for footer
		var str = haxe.Resource.getString("list_footer");
		var t = new haxe.Template(str);
		var title; 
		if (_curItem != null) title = _curItem.name;
		else title = "Select Item";
		var output = t.execute({items:items, title:title});

		// attach to the dom
		_widget.getFooterElement().innerHTML = output;
		
		// refresh
		_widget.refresh();

		// add interactions
		Lib.document.getElementById("listFooterHomeBtn").onclick = onHome;
//		Lib.document.getElementById("listFooterBackBtn").onclick = onBack;
//		Lib.document.getElementById("listFooterForwardBtn").onclick = onForward;
	}
	public function openItem(item:Dynamic){
	      _prevItems.push(_curItem);
	      _curItem = item;
	      refresh();
	}
	public function selectItem(item:Dynamic){
	      if (onSelect != null) onSelect(item);
	}
	public function onUp(event:Event = null){
	      if (_prevItems.length <= 0) return;
	      _curItem = _prevItems.pop();
	      refresh();
	}
	public function refresh(event:Event = null){
		//trace("refresh "+_curItem);
		var curId : Int;
		if (_curItem != null) curId = _curItem.id;
		else curId = AppState.getInstance().curWorkspace.id; // -1 means all items
  
		if (onLoading != null) onLoading(true);
		
		trace("call listMembers("+AppState.getInstance().curServiceType+", "+curId+"");
	    _api.listMembers(AppState.getInstance().curServiceType, curId,_displayItems, onError);
	}
	public function enableUp(){
	      try{
		      cast(Lib.document.getElementById("upBtn")).disabled = false;
	      }catch(e:Dynamic){}
	}
	public function disableUp(){
	      try{
		      cast(Lib.document.getElementById("upBtn")).disabled = true;
	      }catch(e:Dynamic){}
	}
}
