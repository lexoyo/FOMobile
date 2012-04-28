package intermedia.fengOffice.server;

/**
 * Config is a singleton
 */
class Config {	
	static private var _instance:Config;
	/**
	 * path of FO root folder
	 */
	public var FO_ROOT_PATH:String;
	/**
	 * plugin name as registered in the DB after install/activation
	 */
	public var PLUGIN_NAME:String;
	/**
	 * name of the folder of this plugin
	 */
	public var PLUGIN_FOLDER_NAME:String;
	/**
	 * path to the folder of this plugin
	 */
	public var PLUGIN_ROOT_PATH:String;
	/**
	 * DB config created by FO during install, comes from config/config.php
	 */
	public var TABLE_PREFIX:String;
	/**
	 * DB config created by FO during install, comes from config/config.php
	 */
	public var DB_HOST:String;
	/**
	 * DB config created by FO during install, comes from config/config.php
	 */ 
	public var DB_USER:String;
	/**
	 * DB config created by FO during install, comes from config/config.php
	 */
	public var DB_PASS:String;
	/**
	 * DB config created by FO during install, comes from config/config.php
	 */
	public var DB_NAME:String;
	/**
	 * DB config created by FO during install, comes from config/config.php
	 */
	public var ROOT_URL:String;
	/**
	 * Constructor, initialize all constants
	 * Private since Config is a singleton
	 */
	private function new(){
		FO_ROOT_PATH = "../..";
		PLUGIN_NAME  = "mobile_app";
		PLUGIN_FOLDER_NAME  = "mobile_app";
		PLUGIN_ROOT_PATH = FO_ROOT_PATH + "/plugins/"+PLUGIN_NAME;

		untyped __call__ ("include_once", FO_ROOT_PATH+"/config/config.php");
		
		TABLE_PREFIX = untyped __php__("TABLE_PREFIX");
		DB_HOST = untyped __php__("DB_HOST");
		DB_USER = untyped __php__("DB_USER");
		DB_PASS = untyped __php__("DB_PASS");
		DB_NAME = untyped __php__("DB_NAME");
		ROOT_URL = untyped __php__("ROOT_URL");

		
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
