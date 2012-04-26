<?php

class intermedia_fengOffice_cross_UserTools {
	public function __construct(){}
	static function fromError($msg) {
		return _hx_anonymous(array("error_msg" => $msg, "object_id" => -1, "first_name" => "", "surname" => "", "is_company" => false, "company_id" => -1, "brand_colors" => "", "department" => "", "job_title" => "", "birthday" => "", "timezone" => -1.0, "user_type" => -1, "is_active_user" => false, "token" => "", "display_name" => "", "username" => "", "picture_file" => "", "avatar_file" => "", "comments" => "", "last_login" => "", "last_visit" => "", "last_activity" => "", "disabled" => false));
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
		return _hx_anonymous(array("error_msg" => "", "object_id" => $obj->object_id, "first_name" => $obj->first_name, "surname" => $obj->surname, "is_company" => $obj->is_company, "company_id" => $obj->company_id, "brand_colors" => $obj->brand_colors, "department" => $obj->department, "job_title" => $obj->job_title, "birthday" => $obj->birthday, "timezone" => $obj->timezone, "user_type" => $obj->user_type, "is_active_user" => $obj->is_active_user, "token" => "", "display_name" => $obj->display_name, "username" => $obj->username, "picture_file" => $obj->picture_file, "avatar_file" => $obj->avatar_file, "comments" => $obj->comments, "last_login" => $obj->last_login, "last_visit" => $obj->last_visit, "last_activity" => $obj->last_activity, "disabled" => false));
	}
	function __toString() { return 'intermedia.fengOffice.cross.UserTools'; }
}
