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
		if($userName === "" && $userPass === "") {
			php_Session::start();
			if(php_Session::exists("mobile_app_user_id")) {
				$id = php_Session::get("mobile_app_user_id");
				$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` \x0A\x09\x09\x09    \x09\x09WHERE `object_id`='" . $id . "'";
				$res = $this->_db->request($sql);
				if($res !== null && $res->getLength() > 0) {
					$user = $res->results()->first();
					$token = $user->token;
					$user = intermedia_fengOffice_cross_UserTools::fromDynamic($user);
					$user->token = $token;
					return $this->_getContactDetails($user);
				}
			}
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` \x0A\x09    \x09\x09WHERE `username`='" . $userName . "'";
		$res = $this->_db->request($sql);
		if($res === null || $res->getLength() === 0) {
			return intermedia_fengOffice_cross_UserTools::fromError("User not found");
		}
		$user = $res->results()->first();
		if(_hx_equal($user->disabled, 1)) {
			return intermedia_fengOffice_cross_UserTools::fromError("User is disabled");
		}
		$token = $user->token;
		if(sha1($user->salt . $userPass) !== $token) {
			return intermedia_fengOffice_cross_UserTools::fromError("Wrong user name or password");
		}
		$user = intermedia_fengOffice_cross_UserTools::fromDynamic($this->_getContactDetails($user));
		$user->token = $token;
		return $user;
	}
	public function _getDetails($obj, $table_name) {
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->created_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->created_by = intermedia_fengOffice_cross_UserTools::fromDynamic($this->_getContactDetails($res->next()));
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->updated_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->updated_by = intermedia_fengOffice_cross_UserTools::fromDynamic($this->_getContactDetails($res->next()));
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->trashed_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->trashed_by = intermedia_fengOffice_cross_UserTools::fromDynamic($this->_getContactDetails($res->next()));
		}
		$sql = "SELECT * FROM `" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "contacts` WHERE `object_id`=" . $obj->archived_by_id;
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$obj->archived_by = intermedia_fengOffice_cross_UserTools::fromDynamic($this->_getContactDetails($res->next()));
		}
		$sql = "SELECT COUNT(id) FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects \x0A\x09\x09\x09\x09\x09\x09\x09WHERE " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $table_name . ".`object_id` \x0A\x09\x09\x09\x09\x09\x09\x09FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $table_name . ")" . " AND (" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members WHERE `member_id`=" . $obj->id . ")" . " OR " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id` in (SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members WHERE `parent_member_id` in (SELECT id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members AS memberRq2 WHERE memberRq2.`object_id`=" . $obj->id . ")))";
		$res1 = $this->_db->request($sql);
		if($res1 !== null && $res1->getLength() > 0) {
			$obj->numChildren = Reflect::field($res1->next(), "COUNT(id)");
		} else {
			$obj->numChildren = 0;
		}
		return $obj;
	}
	public function _getContactDetails($obj) {
		$obj->picture_file = intermedia_fengOffice_cross_Utils::getFilePath($obj->picture_file);
		$obj->avatar_file = intermedia_fengOffice_cross_Utils::getFilePath($obj->avatar_file);
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
		$obj = $this->_getDetails($obj, $objTmp->table_name);
		$obj->type = $objTmp->type;
		$obj->icon = $objTmp->icon;
		$obj->table_name = $objTmp->table_name;
		$detailTableName = $obj->table_name;
		$sql = "SELECT repository_id, type_string, filesize, revision_number FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "project_file_revisions where file_id=" . $oid . " ORDER BY revision_number DESC LIMIT 1";
		$res = $this->_db->request($sql);
		if($res !== null && $res->getLength() > 0) {
			$objTmp1 = $res->next();
			$path = intermedia_fengOffice_cross_Utils::getFilePath($objTmp1->repository_id);
			if(_hx_equal($objTmp1->type_string, "text/html")) {
				$content = "";
				try {
					$content = php_io_File::getContent(intermedia_fengOffice_server_Config::getInstance()->FO_ROOT_PATH . $path);
				}catch(Exception $»e) {
					$_ex_ = ($»e instanceof HException) ? $»e->e : $»e;
					if(is_string($msg = $_ex_)){
						$content = "Error: failed to open stream: No such file or directory";
					} else throw $»e;;
				}
				$obj->properties->htmlContent = $content;
			} else {
				if(StringTools::startsWith($objTmp1->type_string, "image")) {
					$obj->properties->htmlContent = "<img src='" . intermedia_fengOffice_server_Config::getInstance()->ROOT_URL . $path . "' />";
				} else {
					if(StringTools::startsWith($objTmp1->type_string, "video")) {
						$str = haxe_Resource::getString("embed_file_video");
						$t = new haxe_Template($str);
						$output = $t->execute(_hx_anonymous(array("config" => _hx_qtype("intermedia.fengOffice.server.Config"), "src" => intermedia_fengOffice_server_Config::getInstance()->ROOT_URL . $path, "mime_type" => $objTmp1->type_string)), null);
						$obj->properties->htmlContent = $output;
					} else {
						$obj->properties->htmlContent = "<a href='" . intermedia_fengOffice_server_Config::getInstance()->ROOT_URL . $path . "'>" . $path . "</a> (" . $objTmp1->type_string . ")";
					}
				}
			}
			$obj->properties->url = intermedia_fengOffice_server_Config::getInstance()->ROOT_URL . $path;
			$obj->properties->filesize = $objTmp1->filesize;
			$obj->properties->revision_number = $objTmp1->revision_number;
		}
		return intermedia_fengOffice_cross_SafeObjectTools::fromDynamic($obj);
	}
	public function listMembers($srv, $parentId, $workspaceId, $contactId, $trashed, $user, $token) {
		if($trashed === null) {
			$trashed = false;
		}
		if($contactId === null) {
			$contactId = -1;
		}
		if($workspaceId === null) {
			$workspaceId = -1;
		}
		if($parentId === null) {
			$parentId = -1;
		}
		if(!$this->_checkAuth($user, $token)) {
			throw new HException("authentication faild");
		}
		if($srv !== "project_tasks" && $parentId > -1) {
			if($parentId > 0) {
				$workspaceId = $parentId;
			}
			$parentId = -1;
		}
		$sql = "SELECT * FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects ";
		$sql .= " \x0A\x09\x09\x09INNER JOIN (\x0A\x09\x09\x09\x09" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $srv . "\x0A\x09\x09\x09\x09) ON (" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $srv . ".`object_id`=" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id`";
		if($parentId > -1) {
			$sql .= " AND " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . $srv . ".`parent_id`=" . $parentId;
		}
		$sql .= (intermedia_fengOffice_server_Api_0($this, $contactId, $parentId, $sql, $srv, $token, $trashed, $user, $workspaceId)) . ")";
		if($workspaceId > -1) {
			if($srv === "workspaces") {
				if($workspaceId === 0) {
					$sql .= " \x0A\x09\x09\x09\x09\x09WHERE id IN (\x0A\x09\x09\x09\x09\x09\x09SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members\x0A\x09\x09\x09\x09\x09\x09WHERE `parent_member_id`=0\x0A\x09\x09\x09\x09\x09\x09AND `object_type_id`=1\x0A\x09\x09\x09\x09\x09)";
				} else {
					$sql .= " \x0A\x09\x09\x09\x09\x09WHERE id IN (\x0A\x09\x09\x09\x09\x09\x09SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members\x0A\x09\x09\x09\x09\x09\x09WHERE `parent_member_id`\x0A    \x09\x09\x09\x09\x09IN (\x0A\x09\x09\x09\x09\x09\x09\x09SELECT id\x0A\x09\x09\x09\x09\x09\x09\x09    FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "members AS memberRq2\x0A\x09\x09\x09\x09\x09\x09\x09    WHERE memberRq2.`object_id`=" . $workspaceId . "\x0A\x09\x09\x09\x09\x09\x09)\x0A\x09\x09\x09\x09\x09\x09AND `object_type_id`=1\x0A\x09\x09\x09\x09\x09)";
				}
			} else {
				$sql .= " \x0A\x09\x09\x09\x09WHERE id IN (\x0A\x09\x09\x09\x09\x09SELECT object_id FROM " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members\x0A\x09\x09\x09\x09\x09WHERE (\x0A\x09\x09\x09\x09\x09\x09" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members.`object_id`=" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id`\x0A\x09\x09\x09\x09\x09\x09AND " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members.`member_id`=" . $workspaceId . "\x0A\x09\x09\x09\x09\x09)\x0A\x09\x09\x09\x09)";
			}
		}
		if($contactId > -1) {
			$sql .= " \x0A\x09\x09\x09WHERE id IN (\x0A\x09\x09\x09\x09SELECT object_id " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members\x0A\x09\x09\x09\x09WHERE (\x0A\x09\x09\x09\x09\x09" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members.`object_id`=" . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`id`\x0A\x09\x09\x09\x09\x09AND " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "object_members.`member_id`=" . $contactId . "\x0A\x09\x09\x09\x09)\x0A\x09\x09\x09)";
		}
		$sql .= " ORDER BY updated_on DESC";
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
			$item = intermedia_fengOffice_cross_SafeObjectTools::fromDynamic($this->_getDetails($item, $srv));
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
function intermedia_fengOffice_server_Api_0(&$»this, &$contactId, &$parentId, &$sql, &$srv, &$token, &$trashed, &$user, &$workspaceId) {
	if($trashed) {
		return "";
	} else {
		return " AND " . intermedia_fengOffice_server_Config::getInstance()->TABLE_PREFIX . "objects.`trashed_by_id`=0";
	}
}
