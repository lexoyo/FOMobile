<?php

class php_db_Mysql {
	public function __construct(){}
	static function connect($params) {
		$c = mysql_connect($params->host . (php_db_Mysql_0($params)) . (php_db_Mysql_1($params)), $params->user, $params->pass);
		if(!mysql_select_db($params->database, $c)) {
			throw new HException("Unable to connect to " . $params->database);
		}
		return new php_db__Mysql_MysqlConnection($c);
	}
	function __toString() { return 'php.db.Mysql'; }
}
function php_db_Mysql_0(&$params) {
	if($params->port === null) {
		return "";
	} else {
		return ":" . $params->port;
	}
}
function php_db_Mysql_1(&$params) {
	if($params->socket === null) {
		return "";
	} else {
		return ":" . $params->socket;
	}
}
