package intermedia.fengOffice.client;

class DeeplinkManager {
	private var _deeplinkArray:Hash<Deeplink>;
	private static var _instance:DeeplinkManager;
	private function new(){
		_deeplinkArray = new Hash();
		_initDeepLinking();
	}
	public static function getInstance():DeeplinkManager{
		if (_instance == null)
			_instance = new DeeplinkManager();
		return _instance;
	}
	private function _initDeepLinking(){
		var t = this;
		untyped{
			window.onpopstate = function(event) {  
				//alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
				t._onDeeplinkChanged(event.state);
			};
  		}
	}
	public function _onDeeplinkChanged(deeplink:String){
		trace("_onDeeplinkChanged("+deeplink);
		if (_deeplinkArray.exists(deeplink)){
			_deeplinkArray.get(deeplink).cbk(deeplink);
		}
	}
	public function setDeeplink(deeplink:String, callbackFunction:String->Void){
		untyped{
			//alert("push state "+deeplink+", "+ callbackFunction);
			_deeplinkArray.set(deeplink, {deeplink: deeplink, cbk: callbackFunction});
			history.pushState(deeplink, deeplink, "?"+deeplink);
 		}
	}
}
typedef Deeplink = {
	deeplink:String,
	cbk:String->Void
}