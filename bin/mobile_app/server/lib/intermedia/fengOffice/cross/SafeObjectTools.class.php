<?php

class intermedia_fengOffice_cross_SafeObjectTools {
	public function __construct(){}
	static function fromError($msg) {
		return _hx_anonymous(array("error_msg" => $msg, "object_id" => -1, "id" => -1, "name" => "", "numChildren" => 0, "object_type_id" => -1, "type" => "", "icon" => "", "table_name" => "", "created_on" => "", "created_by_id" => -1, "created_by" => null, "updated_on" => "", "updated_by_id" => -1, "updated_by" => null, "trashed_on" => "", "trashed_by_id" => -1, "trashed_by" => null, "archived_on" => "", "archived_by_id" => -1, "archived_by" => null));
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
		$res = _hx_anonymous(array());
		{
			$_g = 0; $_g1 = Reflect::fields($obj);
			while($_g < $_g1->length) {
				$prop = $_g1[$_g];
				++$_g;
				$propValue = Reflect::field($obj, $prop);
				$res->{$prop} = $propValue;
				unset($propValue,$prop);
			}
		}
		return $res;
	}
	static function createEmpty() {
		return _hx_anonymous(array("error_msg" => "", "object_id" => -1, "id" => 0, "name" => "All Workspaces", "numChildren" => 0, "object_type_id" => -1, "type" => "", "icon" => "", "table_name" => "", "created_on" => "", "created_by_id" => -1, "updated_on" => "", "updated_by_id" => -1, "trashed_on" => "", "trashed_by_id" => -1, "archived_on" => "", "archived_by_id" => -1, "updated_by" => null, "created_by" => null, "trashed_by" => null, "archived_by" => null));
	}
	function __toString() { return 'intermedia.fengOffice.cross.SafeObjectTools'; }
}
