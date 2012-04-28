<?php

class intermedia_fengOffice_server_Db {
	public function __construct($params) {
		if(!php_Boot::$skip_constructor) {
		$this->_params = $params;
	}}
	public $_connection;
	public $_params;
	public function open() {
		if($this->_connection === null) {
			$this->_connection = php_db_Mysql::connect($this->_params);
			if($this->_connection === null) {
				throw new HException("Could not connect to the database");
			}
		}
	}
	public function close() {
		if($this->_connection === null) {
			throw new HException("Database can not be closed because it is not connected");
		} else {
			$this->_connection->close();
		}
	}
	public function request($sql) {
		$this->open();
		return $this->_connection->request($sql);
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
	function __toString() { return 'intermedia.fengOffice.server.Db'; }
}
