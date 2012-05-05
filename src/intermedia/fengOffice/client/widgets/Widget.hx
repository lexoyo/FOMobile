package intermedia.fengOffice.client.widgets; 

import js.Lib;
import js.Dom;
import intermedia.fengOffice.client.application.Config;
import intermedia.fengOffice.client.application.Lang;

import feffects.Tween;
import feffects.easing.Quart;

enum WidgetState{
	loading;
	error(msg:String);
	none;
}


/**
 * main screen container, with header, body and footer
 * instanciate the widget.html template
 * querry FO objects and display them
 */
class Widget {
	public static inline var OLD_BODY_ID:String = "OLD_BODY_ID";
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
		  oldBody = null;
		  opacity = 0;
		  
		// render the template
		var str = haxe.Resource.getString("widget");
		var t = new haxe.Template(str);
		var output = t.execute({id:id, title:title});
		_container.innerHTML = output;


		// handle the size of the body
		Lib.window.onresize = refresh;
		refresh();
	}
	/**
	 * refresh the size of the body 
	 */
	public function refresh(e:Event = null):Void {
	      var desiredBodyHeight = Lib.document.body.clientHeight - (getTitleElement().clientHeight + getFooterElement().clientHeight);
	      //desiredBodyHeight -= 10;//65;
	      var body = getBodyElement();
	      body.style.height = desiredBodyHeight + "px";
		  
		  if (oldBody != null && opacity==0){
			opacity = 1;
			// start the transition
			body.parentNode.style.left =  "100px";//_container.clientWidth + "px"; 
	        // creating the tween
	        var tween = new Tween( _container.clientWidth, 0, 500, Quart.easeOut );
	        // setting the update function ( finished function is optional )
	        tween.setTweenHandlers( move, finished );
	        // launch the tween
	        tween.start();
		  }
	}
	private var oldBody:HtmlDom;
	/**
	 * 
	 */
	public function startTransition(){
		refresh();		
		if (oldBody != null)
			return;
		
		// create a new body so that the old one will disappear with an animation
		oldBody = getBodyElement();
		
		var animContainer:HtmlDom = Lib.document.createElement("div");
		var newBody:HtmlDom = Lib.document.createElement("div");
		newBody.style.overflow = "auto";
		Reflect.setField(newBody.style, "opacity", 0);
		animContainer.style.position="absolute";
		animContainer.style.width="100%";
		animContainer.appendChild(newBody);

		for (prop in Reflect.fields(oldBody.style))
			Reflect.setField(newBody.style, prop, Reflect.field(oldBody.style, prop));
		for (prop in Reflect.fields(oldBody.parentNode.style))
			Reflect.setField(animContainer.style, prop, Reflect.field(oldBody.parentNode.style, prop));

		// attach the new body to the dom and swith IDs
		oldBody.parentNode.parentNode.appendChild(animContainer);
		var tmpId:String = oldBody.id;
		oldBody.id = OLD_BODY_ID;
		newBody.id = tmpId;
    
	}
    function finished( e : Float )
    {
        trace ( "tween finished" );
		Reflect.setField(oldBody.style, "opacity", 0);
		Reflect.setField(getBodyElement().style, "opacity", 1);
		// remove the old body with a transition animation
		oldBody.parentNode.parentNode.removeChild(oldBody.parentNode);
		oldBody = null;
		opacity = 0;
		refresh();
    }		
	var opacity:Float;
    function move( e : Float )
    {
		var body = getBodyElement();
		body.parentNode.style.left = Math.round(e) + "px";
		Reflect.setField(oldBody.style, "opacity", opacity);
		Reflect.setField(body.style, "opacity", 1-opacity);
		opacity -= .03;
    }		
		
	/**
	 * refresh the size of the body 
	 */
	public function setState(state:WidgetState):Void {
		switch (state){
			case loading:
				// display the loading wheel
				var str = haxe.Resource.getString("loading");
				var t = new haxe.Template(str);
				var output = t.execute({config:Config, Lang:Lang});
				setBody(output);
			case error(msg):
				Lib.document.getElementById("errorMsg").innerHTML = msg;
				refresh();
			default:
		}
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
	 * get a reference to the old body element, which is being removed with a transition animation
	 */
	public function getOldBodyElement():HtmlDom {
	      return Lib.document.getElementById(OLD_BODY_ID);
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
		  refresh();
	}
	/**
	 * get the footer
	 */
	public function getFooter():String {
	      return Lib.document.getElementById("WindowsId"+_id+"Footer").innerHTML;
	}
}
