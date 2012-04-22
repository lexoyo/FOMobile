package intermedia.fengOffice.server;

class Config {	
	static private var _instance:Config;
	public var FO_ROOT_PATH:String;
	public var PLUGIN_NAME:String;
	public var PLUGIN_ROOT_PATH:String;
	public var TABLE_PREFIX:String;
	public var DB_HOST:String;
	public var DB_USER:String;
	public var DB_PASS:String;
	public var DB_NAME:String;
	private function new(){
		FO_ROOT_PATH = "../..";
		PLUGIN_NAME  = "Mobile App";
		PLUGIN_ROOT_PATH = FO_ROOT_PATH + "/plugins/"+PLUGIN_NAME;

		untyped __call__ ("include_once", FO_ROOT_PATH+"/config/config.php");
		
		TABLE_PREFIX = untyped __php__("TABLE_PREFIX");
		DB_HOST = untyped __php__("DB_HOST");
		DB_USER = untyped __php__("DB_USER");
		DB_PASS = untyped __php__("DB_PASS");
		DB_NAME = untyped __php__("DB_NAME");

		
	}
	/**
	 * singleton pattern
	 */
	static public function getInstance():Config{
		if (_instance == null){
			_instance = new Config();
		}
		return _instance;
	}
}
