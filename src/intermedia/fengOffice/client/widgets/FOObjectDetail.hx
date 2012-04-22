package intermedia.fengOffice.client.widgets; 

import intermedia.fengOffice.cross.Data;
import js.Lib;
import js.Dom;

/**
 * Display the details of an object
 */
class FOObjectDetail {

	public var onChange:Dynamic->Void;
	public var onError:String->Void;
	public var onLoading:Bool->Void;

	public var onHome:Dynamic->Void;
	public var onBack:Dynamic->Void;
	public var onForward:Dynamic->Void;

	private var _api : Api;
	private var _widget : Widget;
	private var _serviceType : ServiceType;
	private var _item : Dynamic;
	/**
	 * @param	parentItem	the parent item, with a field "id"
	 */
	public function new(api:Api, widget:Widget, serviceType:ServiceType, item:Dynamic, parentItem:Dynamic=null):Void {
	      _api = api;
	      _widget = widget;
	      _serviceType = serviceType;
	      _item = item;
		  
	      // init the process
	      refresh();
	}
	private function _displayItem(itemDetail:Dynamic):Void {
		if (onLoading != null) onLoading(false);
		
		trace("***********************<br/>");
		trace("Details of "+_item.name+": "+itemDetail+"<br/>");
	    for (prop in Reflect.fields(itemDetail)){
			trace(prop+" = "+Reflect.field(itemDetail, prop)+"<br/>");
		}
		trace("***********************<br/>");

		// render the template
		var str = haxe.Resource.getString(_serviceType+"_detail");
		var t = new haxe.Template(str);
		var output = t.execute({item:itemDetail});

		// attach to the dom
		_widget.getBodyElement().innerHTML = output;

		// add interactions
/*		Lib.document.getElementById("upBtn").onclick = onUp;
		Lib.document.getElementById("refreshBtn").onclick = refresh;
		Lib.document.getElementById("selectBtn").onclick = function(e){t.selectItem(t._curItem);};
*/

		// render the template for footer
		var str = haxe.Resource.getString("list_footer");
		var t = new haxe.Template(str);
		var output = t.execute({item:itemDetail});

		// attach to the dom
		_widget.getFooterElement().innerHTML = output;
		
		// refresh
		_widget.refresh();

		// add interactions
		Lib.document.getElementById("listFooterHomeBtn").onclick = onHome;
		Lib.document.getElementById("listFooterBackBtn").onclick = onBack;
		Lib.document.getElementById("listFooterForwardBtn").onclick = onForward;
	}
	public function refresh(event:Event = null){
		if (onLoading != null) onLoading(true);
		
		trace("call getObject("+_item.id);
	    _api.getObject(_item.id,cast(_displayItem), onError);
	}
}
