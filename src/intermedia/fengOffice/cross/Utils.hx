package intermedia.fengOffice.cross;

class Utils {
	public static function getFilePath(fileRepositoryId:String):String{
		if (fileRepositoryId == null || fileRepositoryId == "" || StringTools.startsWith(fileRepositoryId, "/upload/"))
			return fileRepositoryId;
			
		return "/upload/" 
			+ fileRepositoryId.substr(0, 3) + "/" 
			+ fileRepositoryId.substr(3, 3) + "/"
			+ fileRepositoryId.substr(6, 3) + "/" 
			+ fileRepositoryId.substr(9);
	}
}
