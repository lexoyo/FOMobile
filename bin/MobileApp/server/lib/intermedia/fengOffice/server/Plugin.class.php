<?php

class intermedia_fengOffice_server_Plugin {
	public function __construct($db) {
		if(!php_Boot::$skip_constructor) {
		$this->_db = $db;
	}}
	public $_db;
	public function isActivated() {
		$sql = "SELECT id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "plugins WHERE name = '" . intermedia_fengOffice_server_Config::getInstance()->PLUGIN_NAME . "'";
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			return true;
		}
		return false;
	}
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
	function __toString() { return 'intermedia.fengOffice.server.Plugin'; }
}
