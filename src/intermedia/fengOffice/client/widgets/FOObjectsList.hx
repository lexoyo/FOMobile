package intermedia.fengOffice.client.widgets; 

import intermedia.fengOffice.client.application.AppState; 
import intermedia.fengOffice.client.application.Lang; 
import intermedia.fengOffice.client.application.Config; 
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
	private var _id : Int;
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
			_id = Math.round(10000*Math.random());
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
		//trace("paernt = "+parent+" - "+_prevItems.length+" - "+_prevItems[0]+" - "+_prevItems);
		var output = t.execute({items:items, hasParent:(_prevItems.length>0), parent:parent, curItem:_curItem, title:title, Lang:Lang, Config:Config, idList:_id});

		// attach to the dom
		_widget.getBodyElement().innerHTML = output;

		// add interactions
		var t = this;
		for (w in items){
		    Lib.document.getElementById("itemBtn"+_id+w.id).onclick = function(e){t.openItem(w);};
		    Lib.document.getElementById("selectBtn"+_id+w.id).onclick = function(e){t.selectItem(w);};
		}
		if (onChange != null) onChange(_curItem);

		if (_prevItems.length <= 0) disableUp();
		else enableUp();

		Lib.document.getElementById("upBtn"+_id).onclick = onUp;
		Lib.document.getElementById("refreshBtn"+_id).onclick = refresh;
		Lib.document.getElementById("selectBtn"+_id).onclick = function(e){t.selectItem(t._curItem);};


		// render the template for footer
		var str = haxe.Resource.getString("list_footer");
		var t = new haxe.Template(str);
		var title; 
		if (_curItem != null) title = _curItem.name;
		else title = "Select Item";
		var output = t.execute({items:items, title:title, curItem:_curItem});

		// attach to the dom
		_widget.getFooterElement().innerHTML = output;
		
		// refresh
		_widget.refresh();

		// add interactions
		Lib.document.getElementById("listFooterHomeBtn").onclick = onHome;
//		Lib.document.getElementById("listFooterBackBtn"+id).onclick = onBack;
//		Lib.document.getElementById("listFooterForwardBtn"+id).onclick = onForward;
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
		//_widget.setState(loading);
		_widget.startTransition();
		
		trace("call listMembers("+AppState.getInstance().curServiceType+", "+curId+"");
	    _api.listMembers(AppState.getInstance().curServiceType, curId,_displayItems, onError);
	}
	public function enableUp(){
			trace("upBtn enabled "+_id);
	      try{
		      cast(Lib.document.getElementById("upBtn"+_id)).disabled = false;
	      }catch(e:Dynamic){}
	}
	public function disableUp(){
			trace("upBtn disabled "+_id);
	      try{
		      cast(Lib.document.getElementById("upBtn"+_id)).disabled = true;
	      }catch(e:Dynamic){}
	}
}
