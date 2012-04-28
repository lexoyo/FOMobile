<?php

interface php_db_ResultSet {
	//;
	//;
	function hasNext();
	function next();
	function results();
	function getResult($n);
	function getIntResult($n);
	function getFloatResult($n);
}
