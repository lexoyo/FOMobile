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
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` \x0A\x09    \x09\x09WHERE `username`='" . $userName . "'";
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return intermedia_fengOffice_cross_UserTools::fromError("User not found");
		}
		$user = $res->results()->first();
		if(_hx_equal($user->disabled, 1)) {
			return intermedia_fengOffice_cross_UserTools::fromError("User is disabled");
		}
		if(!_hx_equal(haxe_SHA1::encode($user->salt . $userPass), $user->token)) {
			return intermedia_fengOffice_cross_UserTools::fromError("Wrong user name or password");
		}
		{
			$_g = 0; $_g1 = Reflect::fields($user);
			while($_g < $_g1->length) {
				$prop = $_g1[$_g];
				++$_g;
				$propValue = Reflect::field($user, $prop);
				$�t = (Type::typeof($propValue));
				switch($�t->index) {
				case 6:
				$c = $�t->params[0];
				{
					$user->{$prop} = "" . Std::string($propValue);
				}break;
				default:{
				}break;
				}
				unset($propValue,$prop);
			}
		}
		return intermedia_fengOffice_cross_UserTools::fromDynamic($user);
	}
	public function _getDetails($obj) {
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->created_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->created_by = $res->next();
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->updated_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->updated_by = $res->next();
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->trashed_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->trashed_by = $res->next();
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->archived_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->archived_by = $res->next();
		}
		return $obj;
	}
	public function getObject($oid, $user, $token) {
		if(!$this->_checkAuth($user, $token)) {
			throw new HException("authentication faild");
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects` \x0A\x09\x09\x09\x09\x09\x09\x09WHERE " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.id = " . $oid;
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return intermedia_fengOffice_cross_SafeObjectTools::fromError("Object not found");
		}
		$obj = $res->next();
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_types` WHERE id=" . $obj->object_type_id;
		$res = $this->_db->request($sql);
		$objTmp = $res->next();
		$obj->type = $objTmp->type;
		$detailTableName = $objTmp->table_name;
		$sql1 = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $detailTableName . "` WHERE `object_id`=" . $obj->id;
		$res1 = $this->_db->request($sql1);
		$obj->properties = _hx_anonymous(array());
		if($res1 !== null || $res1->getLength() > 0) {
			$objTmp1 = $res1->next();
			{
				$_g = 0; $_g1 = Reflect::fields($objTmp1);
				while($_g < $_g1->length) {
					$prop = $_g1[$_g];
					++$_g;
					$obj->properties->{$prop} = Reflect::field($objTmp1, $prop);
					unset($prop);
				}
			}
		}
		$obj = $this->_getDetails($obj);
		$sql1 = "SELECT repository_id, type_string, filesize, revision_number FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "project_file_revisions where file_id=" . $oid . " ORDER BY revision_number DESC LIMIT 1";
		$res1 = $this->_db->request($sql1);
		if($res1 !== null && $res1->getLength() > 0) {
			$objTmp1 = $res1->next();
			$path = "/upload/" . _hx_string_call($objTmp1->repository_id, "substr", array(0, 3)) . "/" . _hx_string_call($objTmp1->repository_id, "substr", array(3, 3)) . "/" . _hx_string_call($objTmp1->repository_id, "substr", array(6, 3)) . "/" . _hx_string_call($objTmp1->repository_id, "substr", array(9));
			if(_hx_equal($objTmp1->type_string, "text/html")) {
				$content = php_io_File::getContent(intermedia_fengOffice_server_Config::getInstance()->FO_ROOT_PATH . $path);
				$obj->properties->htmlContent = $content;
			} else {
				if(StringTools::startsWith($objTmp1->type_string, "image")) {
					$obj->properties->htmlContent = "<img src='" . intermedia_fengOffice_server_Config::getInstance()->ROOT_URL . $path . "' />";
				} else {
					$obj->properties->htmlContent = "<a href='" . intermedia_fengOffice_server_Config::getInstance()->ROOT_URL . $path . "'>" . $path . "</a> (" . $objTmp1->type_string . ")";
				}
			}
			$obj->properties->url = intermedia_fengOffice_server_Config::getInstance()->ROOT_URL . $path;
			$obj->properties->filesize = $objTmp1->filesize;
			$obj->properties->revision_number = $objTmp1->revision_number;
		}
		return intermedia_fengOffice_cross_SafeObjectTools::fromDynamic($obj);
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
			$sql .= " AND (" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members WHERE `member_id`  in (SELECT id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members AS memberRq1 WHERE memberRq1.`object_id`=" . $parentId . "))";
			if($parentId === 0) {
				$sql .= " OR " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members WHERE `parent_member_id`=0))";
			} else {
				$sql .= " OR " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members WHERE `parent_member_id` in (SELECT id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members AS memberRq2 WHERE memberRq2.`object_id`=" . $parentId . ")))";
			}
		}
		$sql .= " ORDER BY updated_on DESC";
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return new HList();
		}
		$l = new HList();
		$r = $res->results();
		if(null == $r) throw new HException('null iterable');
		$�it = $r->iterator();
		while($�it->hasNext()) {
			$item = $�it->next();
			$item = intermedia_fengOffice_cross_SafeObjectTools::fromDynamic($this->_getDetails($item));
			$l->add($item);
		}
		return $l;
	}
	public function __call($m, $a) {
		if(isset($this->$m) && is_callable($this->$m))
			return call_user_func_array($this->$m, $a);
		else if(isset($this->�dynamics[$m]) && is_callable($this->�dynamics[$m]))
			return call_user_func_array($this->�dynamics[$m], $a);
		else if('toString' == $m)
			return $this->__toString();
		else
			throw new HException('Unable to call �'.$m.'�');
	}
	function __toString() { return 'intermedia.fengOffice.server.Api'; }
}
