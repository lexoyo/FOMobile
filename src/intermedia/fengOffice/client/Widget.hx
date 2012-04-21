package intermedia.fengOffice.client; 

import js.Lib;
import js.Dom;

/**
 * this class do the querries to FO db tables
 * let you retrieve the needed data from your FO server
 */
class Widget {
	private var _container : HtmlDom;
	private var _id : String;

	public var onCatBtn:Void->Void;
	public var onTaskBtn:Void->Void;
	public var onFilterBtn:Void->Void;
	/**
	 * constructor
	 */
	public function new(id:String, title:String, container:HtmlDom){
	      _container = container;
	      _id = id;
		// render the template
		var str = haxe.Resource.getString("widget");
		var t = new haxe.Template(str);
		var output = t.execute({id:id, title:title});

		_container.innerHTML = output;

		Lib.document.getElementById("WindowsId"+_id+"CatBtn").onclick = _onCatBtn;
		Lib.document.getElementById("WindowsId"+_id+"TaskBtn").onclick = _onTaskBtn;
		Lib.document.getElementById("WindowsId"+_id+"FilterBtn").onclick = _onFilterBtn;

		Lib.window.onresize = refresh;


		refresh();
	}
	public function _onCatBtn(e:Event){
		if (onCatBtn != null) onCatBtn();
	}
	public function _onTaskBtn(e:Event){
		if (onTaskBtn != null) onTaskBtn();
	}
	public function _onFilterBtn(e:Event){
		if (onFilterBtn != null) onFilterBtn();
	}
	/**
	 * refresh the size and positions of body 
	 */
	public function refresh(e:Event = null):Void {
	      var desiredBodyHeight = Lib.document.body.clientHeight - (getTitleElement().clientHeight + getFooterElement().clientHeight);
	      desiredBodyHeight -= 65;
	      getBodyElement().style.height = desiredBodyHeight + "px";
	}
	/**
	 * get a reference to the title dom
	 */
	public function getTitleElement():HtmlDom {
	      return Lib.document.getElementById("WindowsId"+_id+"Title");
	}
	/**
	 * get a reference to the title dom
	 */
	public function getBodyElement():HtmlDom {
	      return Lib.document.getElementById("WindowsId"+_id+"Body");
	}
	/**
	 * get a reference to the title dom
	 */
	public function getFooterElement():HtmlDom {
	      return Lib.document.getElementById("WindowsId"+_id+"Footer");
	}
	/**
	 * set the title 
	 */
	public function setTitle(title:String):Void {
	      Lib.document.getElementById("WindowsId"+_id+"Title").innerHTML = title;
	}
	/**
	 * get the title 
	 */
	public function getTitle():String {
	      return Lib.document.getElementById("WindowsId"+_id+"Title").innerHTML;
	}
	/**
	 * set the body 
	 */
	public function setBody(body:String):Void {
	      Lib.document.getElementById("WindowsId"+_id+"Body").innerHTML = body;
	}
	/**
	 * get the body 
	 */
	public function getBody():String {
	      return Lib.document.getElementById("WindowsId"+_id+"Body").innerHTML;
	}
	/**
	 * set the footer
	 */
	public function setFooter(footer:String):Void{
	      Lib.document.getElementById("WindowsId"+_id+"Footer").innerHTML = footer;
	}
	/**
	 * get the footer
	 */
	public function getFooter():String {
	      return Lib.document.getElementById("WindowsId"+_id+"Footer").innerHTML;
	}
}
