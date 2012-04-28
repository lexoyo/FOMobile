<?php

class intermedia_fengOffice_cross_Utils {
	public function __construct(){}
	static function getFilePath($fileRepositoryId) {
		if($fileRepositoryId === null || $fileRepositoryId === "" || StringTools::startsWith($fileRepositoryId, "/upload/")) {
			return $fileRepositoryId;
		}
		return "/upload/" . _hx_substr($fileRepositoryId, 0, 3) . "/" . _hx_substr($fileRepositoryId, 3, 3) . "/" . _hx_substr($fileRepositoryId, 6, 3) . "/" . _hx_substr($fileRepositoryId, 9, null);
	}
	function __toString() { return 'intermedia.fengOffice.cross.Utils'; }
}
