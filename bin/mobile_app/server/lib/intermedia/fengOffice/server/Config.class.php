<?php

class intermedia_fengOffice_server_Config {
	public function __construct() {
		if(!php_Boot::$skip_constructor) {
		$this->FO_ROOT_PATH = "../..";
		$this->PLUGIN_NAME = "mobile_app";
		$this->PLUGIN_FOLDER_NAME = "mobile_app";
		$this->PLUGIN_ROOT_PATH = $this->FO_ROOT_PATH . "/plugins/" . $this->PLUGIN_NAME;
		include_once($this->FO_ROOT_PATH . "/config/config.php");
		$this->TABLE_PREFIX = TABLE_PREFIX;
		$this->DB_HOST = DB_HOST;
		$this->DB_USER = DB_USER;
		$this->DB_PASS = DB_PASS;
		$this->DB_NAME = DB_NAME;
		$this->ROOT_URL = ROOT_URL;
	}}
	public $FO_ROOT_PATH;
	public $PLUGIN_NAME;
	public $PLUGIN_FOLDER_NAME;
	public $PLUGIN_ROOT_PATH;
	public $TABLE_PREFIX;
	public $DB_HOST;
	public $DB_USER;
	public $DB_PASS;
	public $DB_NAME;
	public $ROOT_URL;
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->»dynamics[$m]) && is_callable($this->»dynamics[$m]))
			return call_user_func_array($this->»dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call «'.$m.'»');
	}
	static $_instance;
	static function getInstance() {
		if(intermedia_fengOffice_server_Config::$_instance === null) {
			intermedia_fengOffice_server_Config::$_instance = new intermedia_fengOffice_server_Config();
		}
		return intermedia_fengOffice_server_Config::$_instance;
	}
	function __toString() { return 'intermedia.fengOffice.server.Config'; }
}
