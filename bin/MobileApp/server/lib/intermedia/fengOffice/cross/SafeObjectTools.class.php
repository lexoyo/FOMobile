<?php

class intermedia_fengOffice_cross_SafeObjectTools {
	public function __construct(){}
	static function fromError($msg) {
		return _hx_anonymous(array("error_msg" => $msg, "object_id" => -1, "id" => -1, "name" => "", "properties" => null, "numChildren" => 0, "object_type_id" => -1, "type" => "", "icon" => "", "table_name" => "", "created_on" => "", "created_by_id" => -1, "created_by" => null, "updated_on" => "", "updated_by_id" => -1, "updated_by" => null, "trashed_on" => "", "trashed_by_id" => -1, "trashed_by" => null, "archived_on" => "", "archived_by_id" => -1, "archived_by" => null));
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
				$퍁 = (Type::typeof($propValue));
				switch($퍁->index) {
				case 6:
				$c = $퍁->params[0];
				{
					$obj->{$prop} = "" . Std::string($propValue);
				}break;
				default:{
				}break;
				}
				unset($propValue,$prop);
			}
		}
		{
			$_g = 0; $_g1 = Reflect::fields($obj->properties);
			while($_g < $_g1->length) {
				$prop = $_g1[$_g];
				++$_g;
				$propValue = Reflect::field($obj->properties, $prop);
				$퍁 = (Type::typeof($propValue));
				switch($퍁->index) {
				case 6:
				$c = $퍁->params[0];
				{
					$obj->properties->{$prop} = "" . Std::string($propValue);
				}break;
				default:{
				}break;
				}
				unset($propValue,$prop);
			}
		}
		return _hx_anonymous(array("error_msg" => "", "object_id" => $obj->object_id, "id" => $obj->id, "name" => $obj->name, "properties" => $obj->properties, "numChildren" => $obj->numChildren, "object_type_id" => $obj->object_type_id, "type" => $obj->type, "icon" => $obj->icon, "table_name" => $obj->table_name, "created_on" => $obj->created_on, "created_by_id" => $obj->created_by_id, "created_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->created_by), "updated_on" => $obj->updated_on, "updated_by_id" => $obj->updated_by_id, "updated_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->updated_by), "trashed_on" => $obj->trashed_on, "trashed_by_id" => $obj->trashed_by_id, "trashed_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->trashed_by), "archived_on" => $obj->archived_on, "archived_by_id" => $obj->archived_by_id, "archived_by" => intermedia_fengOffice_cross_UserTools::fromDynamic($obj->archived_by)));
	}
	static function createEmpty() {
		return _hx_anonymous(array("error_msg" => "", "object_id" => -1, "id" => 0, "name" => "All Workspaces", "properties" => _hx_anonymous(array()), "numChildren" => 0, "object_type_id" => -1, "type" => "", "icon" => "", "table_name" => "", "created_on" => "", "created_by_id" => -1, "updated_on" => "", "updated_by_id" => -1, "trashed_on" => "", "trashed_by_id" => -1, "archived_on" => "", "archived_by_id" => -1, "updated_by" => null, "created_by" => null, "trashed_by" => null, "archived_by" => null));
	}
	function __toString() { return 'intermedia.fengOffice.cross.SafeObjectTools'; }
}
