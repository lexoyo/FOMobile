package intermedia.fengOffice.server;
import php.db.Mysql;
import php.db.Connection;
import php.db.ResultSet;

class Db {
	private var _connection:Connection;
	private var _params:Dynamic;
	public function new(params:Dynamic){  
		_params = params;
	}
    public function open() {
		if (_connection == null){
	        _connection = Mysql.connect(_params);
			_connection.request("SET NAMES utf8");
			
	        if (_connection == null) {
	            throw ('Could not connect to the database');
	        }
		}
    }
    public function close() {
        if (_connection == null) {
            throw ('Database can not be closed because it is not connected');
        }
		else {
	        _connection.close();
		}
    }
    public function request (sql:String):ResultSet {
		open();
		return _connection.request ( sql );
	}
}
