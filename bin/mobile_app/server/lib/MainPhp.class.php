<?php

class MainPhp {
	public function __construct() { if(!php_Boot::$skip_constructor) {
		$db = new intermedia_fengOffice_server_Db(_hx_anonymous(array("host" => intermedia_fengOffice_server_Config::getInstance()->DB_HOST, "user" => intermedia_fengOffice_server_Config::getInstance()->DB_USER, "pass" => intermedia_fengOffice_server_Config::getInstance()->DB_PASS, "database" => intermedia_fengOffice_server_Config::getInstance()->DB_NAME)));
		$db->open();
		$api = null;
		try {
			$api = new intermedia_fengOffice_server_Api($db);
		}catch(Exception $»e) {
			$_ex_ = ($»e instanceof HException) ? $»e->e : $»e;
			$e = $_ex_;
			{
				$db->close();
				$str = haxe_Resource::getString("not-activated");
				$t = new haxe_Template($str);
				$output = $t->execute(_hx_anonymous(array("config" => intermedia_fengOffice_server_Config::getInstance(), "error" => $e)), null);
				php_Lib::hprint($output);
				return;
			}
		}
		$context = new haxe_remoting_Context();
		$context->addObject("api", $api, null);
		try {
			if(haxe_remoting_HttpConnection::handleRequest($context)) {
				$db->close();
				return;
			}
		}catch(Exception $»e) {
			$_ex_ = ($»e instanceof HException) ? $»e->e : $»e;
			$e2 = $_ex_;
			{
				$db->close();
				haxe_Log::trace("error: " . $e2, _hx_anonymous(array("fileName" => "MainPhp.hx", "lineNumber" => 104, "className" => "MainPhp", "methodName" => "new")));
			}
		}
		$db->close();
		$str = haxe_Resource::getString("activated");
		$t = new haxe_Template($str);
		$output = $t->execute(_hx_anonymous(array("config" => intermedia_fengOffice_server_Config::getInstance())), null);
		php_Lib::hprint($output);
		return;
	}}
	static function main() {
		new MainPhp();
	}
	function __toString() { return 'MainPhp'; }
}
