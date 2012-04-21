package intermedia.fengOffice.server;
import php.FileSystem;

class Plugin {	
	private var _db:Db;
	public function new(db:Db){
		_db = db;
	}
	/**
	 * check if the plugin is activated
	 */
    public function isActivated(){
        var sql = "SELECT id FROM " + Config.TABLE_PREFIX + "plugins WHERE name = '" + Config.PLUGIN_NAME + "'";
        var res = _db.request( sql );
        if(res != null && res.length > 0) { 
            return true;
        }
        return false;
    }
}
