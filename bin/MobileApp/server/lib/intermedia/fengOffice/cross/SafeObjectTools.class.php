<?php

class intermedia_fengOffice_cross_SafeObjectTools {
	public function __construct(){}
	static function fromError($msg) {
		return _hx_anonymous(array("error_msg" => $msg, "object_id" => -1, "id" => -1, "name" => "", "properties" => null, "object_type_id" => -1, "type" => "", "created_on" => "", "created_by_id" => -1, "created_by" => null, "updated_on" => "", "updated_by_id" => -1, "updated_by" => null, "trashed_on" => "", "trashed_by_id" => -1, "trashed_by" => null, "archived_on" => "", "archived_by_id" => -1, "archived_by" => null));
	}
	static function fromDynamic($obj) {
		if($obj === null) {
			return null;
		}
		{
			$_g = 0; $_g1 = Reflect::fields($obj);
			while($_g < $_g1->length) {
				$prop = $_g1[$_g];
				++$_g;
				$propValue = Reflect::field($obj, $prop);
				$»t = (Type::typeof($propValue));
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
		return _hx_anonymous(array("error_msg" => "", "object_id" => $obj->object_id, "id" => $obj->id, "name" => $obj->name, "properties" => $obj->properties, "object_type_id" => $obj->object_type_id, "type" => $obj->object_type, "created_on" => $obj->created_on, "created_by_id" => $obj->created_by_id, "created_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->created_by), "updated_on" => $obj->updated_on, "updated_by_id" => $obj->updated_by_id, "updated_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->updated_by), "trashed_on" => $obj->trashed_on, "trashed_by_id" => $obj->trashed_by_id, "trashed_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->trashed_by), "archived_on" => $obj->archived_on, "archived_by_id" => $obj->archived_by_id, "archived_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->archived_by)));
	}
	static function createEmpty() {
		return _hx_anonymous(array("error_msg" => "", "object_id" => -1, "id" => 0, "name" => "All Workspaces", "properties" => _hx_anonymous(array()), "object_type_id" => -1, "type" => "", "created_on" => "", "created_by_id" => -1, "updated_on" => "", "updated_by_id" => -1, "trashed_on" => "", "trashed_by_id" => -1, "archived_on" => "", "archived_by_id" => -1, "updated_by" => null, "created_by" => null, "trashed_by" => null, "archived_by" => null));
	}
	function __toString() { return 'intermedia.fengOffice.cross.SafeObjectTools'; }
}
