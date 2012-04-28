<?php

class intermedia_fengOffice_cross_UserError {
	public function __construct(){}
	static function fromString($msg) {
		return _hx_anonymous(array("error_msg" => $msg, "object_id" => -1, "first_name" => "", "surname" => "", "is_company" => false, "company_id" => -1, "brand_colors" => "", "department" => "", "job_title" => "", "birthday" => "", "timezone" => -1.0, "user_type" => -1, "is_active_user" => false, "token" => "", "display_name" => "", "username" => "", "picture_file" => "", "avatar_file" => "", "comments" => "", "last_login" => "", "last_visit" => "", "last_activity" => "", "disabled" => false));
	}
	function __toString() { return 'intermedia.fengOffice.cross.UserError'; }
}
