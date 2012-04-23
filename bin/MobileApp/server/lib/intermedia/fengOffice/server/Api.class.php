<?php

class intermedia_fengOffice_server_Api {
	public function __construct($db) {
		if(!php_Boot::$skip_constructor) {
		$this->_db = $db;
		$this->_plugin = new intermedia_fengOffice_server_Plugin($this->_db);
		if($this->_plugin->isActivated() === false) {
			throw new HException("Error: Plugin is not activated yet, check <a href='http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_plugin_engine'>this article about activation</a>");
		}
	}}
	public $_plugin;
	public $_db;
	public function _checkAuth($userName, $token) {
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` \x0A\x09    WHERE `username`='" . $userName . "' AND `token`='" . $token . "'";
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return false;
		}
		return true;
	}
	public function authenticate($userName, $userPass) {
		include_once(intermedia_fengOffice_server_Config::getInstance()->FO_ROOT_PATH . "/application/functions.php");
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` \x0A\x09    \x09WHERE `username`='" . $userName . "'";
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return null;
		}
		$user = $res->results()->first();
		$sql = "SELECT id, contact_id, password_date, password FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contact_passwords\x0A\x09\x09  WHERE `contact_id`=" . $user->object_id;
		$res1 = $this->_db->request($sql);
		if($res1 === null || $res1->getLength() === 0) {
			return null;
		}
		$pass = $res1->results()->last();
		$timestamp = strtotime($pass->password_date);
		$decriptedPass = cp_decrypt($pass->password, $timestamp);
		if($decriptedPass !== $userPass || $user->disabled === true) {
		}
		{
			$_g = 0; $_g1 = Reflect::fields($user);
			while($_g < $_g1->length) {
				$prop = $_g1[$_g];
				++$_g;
				$propValue = Reflect::field($user, $prop);
				$»t = Type::typeof($propValue);
				switch($»t->index) {
				case 6:
				$c = $»t->params[0];
				{
					$user->{$prop} = "" . Std::string($propValue);
				}break;
				default:{
				}break;
				}
				unset($propValue,$prop);
			}
		}
		return _hx_anonymous(array("object_id" => $user->object_id, "first_name" => $user->first_name, "surname" => $user->surname, "is_company" => $user->is_company, "company_id" => $user->company_id, "brand_colors" => $user->brand_colors, "department" => $user->department, "job_title" => $user->job_title, "birthday" => $user->birthday, "timezone" => $user->timezone, "user_type" => $user->user_type, "is_active_user" => $user->is_active_user, "token" => $user->token, "display_name" => $user->display_name, "username" => $user->username, "picture_file" => $user->picture_file, "avatar_file" => $user->avatar_file, "comments" => $user->comments, "last_login" => $user->last_login, "last_visit" => $user->last_visit, "last_activity" => $user->last_activity, "disabled" => $user->disabled));
	}
	public function getObject($oid, $user, $token) {
		if(!$this->_checkAuth($user, $token)) {
			throw new HException("authentication faild");
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects` \x0A\x09\x09\x09\x09\x09\x09\x09WHERE " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.id = " . $oid;
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return null;
		}
		$obj = $res->next();
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_types` WHERE id=" . $obj->object_type_id;
		$res = $this->_db->request($sql);
		$detailTableName = $res->next()->table_name;
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $detailTableName . "` WHERE `object_id`=" . $oid;
		$res = $this->_db->request($sql);
		if($res !== null || $res->getLength() > 0) {
			$objTmp = $res->next();
			{
				$_g = 0; $_g1 = Reflect::fields($objTmp);
				while($_g < $_g1->length) {
					$prop = $_g1[$_g];
					++$_g;
					$obj->{$prop} = Reflect::field($objTmp, $prop);
					unset($prop);
				}
			}
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "searchable_objects` \x0A\x09\x09\x09\x09\x09\x09\x09WHERE `rel_object_id` in (SELECT MAX(object_id) FROM fo_project_file_revisions where file_id=" . $oid . ")";
		$res = $this->_db->request($sql);
		if($res !== null || $res->getLength() > 0) {
			$objTmp = $res->next();
			{
				$_g = 0; $_g1 = Reflect::fields($objTmp);
				while($_g < $_g1->length) {
					$prop = $_g1[$_g];
					++$_g;
					$obj->{$prop} = Reflect::field($objTmp, $prop);
					unset($prop);
				}
			}
		}
		{
			$_g = 0; $_g1 = Reflect::fields($obj);
			while($_g < $_g1->length) {
				$prop = $_g1[$_g];
				++$_g;
				$propValue = Reflect::field($obj, $prop);
				$»t = Type::typeof($propValue);
				switch($»t->index) {
				case 6:
				$c = $»t->params[0];
				{
					$obj->{$prop} = "" . Std::string($propValue);
				}break;
				default:{
				}break;
				}
				unset($propValue,$prop);
			}
		}
		return $obj;
	}
	public function listMembers($srv, $parentId, $user, $token) {
		if($parentId === null) {
			$parentId = -1;
		}
		if(!$this->_checkAuth($user, $token)) {
			throw new HException("authentication faild");
		}
		$sql = "SELECT * FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects \x0A\x09\x09\x09\x09\x09\x09\x09WHERE " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $srv . ".`object_id` \x0A\x09\x09\x09\x09\x09\x09\x09FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $srv . ")";
		if($parentId >= 0) {
			$sql .= "AND (" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members WHERE `member_id`='" . $parentId . "')";
			$sql .= "OR " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members WHERE `parent_member_id`='" . $parentId . "'))";
		}
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return new HList();
		}
		$l = new HList();
		$r = $res->results();
		if(null == $r) throw new HException('null iterable');
		$»it = $r->iterator();
		while($»it->hasNext()) {
			$item = $»it->next();
			{
				$_g = 0; $_g1 = Reflect::fields($item);
				while($_g < $_g1->length) {
					$prop = $_g1[$_g];
					++$_g;
					$propValue = Reflect::field($item, $prop);
					$»t = Type::typeof($propValue);
					switch($»t->index) {
					case 6:
					$c = $»t->params[0];
					{
						$item->{$prop} = "" . Std::string($propValue);
					}break;
					default:{
					}break;
					}
					unset($propValue,$prop);
				}
				unset($_g1,$_g);
			}
			$l->add($item);
		}
		return $l;
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
	function __toString() { return 'intermedia.fengOffice.server.Api'; }
}
