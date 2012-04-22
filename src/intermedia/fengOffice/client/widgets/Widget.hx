package intermedia.fengOffice.client.widgets; 

import js.Lib;
import js.Dom;

/**
 * main screen container, with header, body and footer
 * instanciate the widget.html template
 * querry FO objects and display them
 */
class Widget {
	/**
	 * parent container
	 */
	private var _container : HtmlDom;
	/**
	 * ID of this widget, used in the ID of all UIs in the HTML template
	 */
	private var _id : String;

/*	public var onHomeBtn:Void->Void;
	public var onWorkspaceBtn:Void->Void;
	public var onTabBtn:Void->Void;
	public var onListBtn:Void->Void;
*/	/**
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

/*		Lib.document.getElementById("WindowsId"+_id+"HomeBtn").onclick = _onHomeBtn;
		Lib.document.getElementById("WindowsId"+_id+"WorkspaceBtn").onclick = _onWorkspaceBtn;
		Lib.document.getElementById("WindowsId"+_id+"TabBtn").onclick = _onTabBtn;
		Lib.document.getElementById("WindowsId"+_id+"ListBtn").onclick = _onListBtn;
//		Lib.document.getElementById("WindowsId"+_id+"FilterBtn").onclick = _onFilterBtn;
*/

		// handle the size of the body
		Lib.window.onresize = refresh;
		refresh();
	}
/*	public function _onHomeBtn(e:Event){
		if (onHomeBtn != null) onHomeBtn();
	}
	public function _onWorkspaceBtn(e:Event){
		if (onWorkspaceBtn != null) onWorkspaceBtn();
	}
	public function _onTabBtn(e:Event){
		if (onTabBtn != null) onTabBtn();
	}
	public function _onListBtn(e:Event){
		if (onListBtn != null) onListBtn();
	}
*/	/**
	 * refresh the size of the body 
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
