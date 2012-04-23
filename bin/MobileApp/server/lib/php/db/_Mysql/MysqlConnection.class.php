<?php

class php_db__Mysql_MysqlConnection implements php_db_Connection{
	public function __construct($c) {
		if(!php_Boot::$skip_constructor) {
		$this->c = $c;
	}}
	public $c;
	public function close() {
		mysql_close($this->c);
		unset($this->c);
	}
	public function request($s) {
		$h = mysql_query($s, $this->c);
		if($h === false) {
			throw new HException("Error while executing " . $s . " (" . (mysql_error($this->c) . ")"));
		}
		return new php_db__Mysql_MysqlResultSet($h, $this->c);
	}
	public function escape($s) {
		return mysql_real_escape_string($s, $this->c);
	}
	public function quote($s) {
		return "'" . (mysql_real_escape_string($s, $this->c) . "'");
	}
	public function addValue($s, $v) {
		if(is_int($v) || is_null($v)) {
			$s->b .= $v;
		} else {
			if(is_bool($v)) {
				$s->b .= php_db__Mysql_MysqlConnection_0($this, $s, $v);
			} else {
				$s->b .= $this->quote(Std::string($v));
			}
		}
	}
	public function lastInsertId() {
		return mysql_insert_id($this->c);
	}
	public function dbName() {
		return "MySQL";
	}
	public function startTransaction() {
		$this->request("START TRANSACTION");
	}
	public function commit() {
		$this->request("COMMIT");
	}
	public function rollback() {
		$this->request("ROLLBACK");
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
	function __toString() { return 'php.db._Mysql.MysqlConnection'; }
}
function php_db__Mysql_MysqlConnection_0(&$»this, &$s, &$v) {
	if($v) {
		return 1;
	} else {
		return 0;
	}
}
