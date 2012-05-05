package intermedia.fengOffice.client; 

import intermedia.fengOffice.cross.Data;
import intermedia.fengOffice.client.application.Config;

/**
 * this class do the querries to FO db tables
 * let you retrieve the needed data from your FO server
 */
class Api {
	/*
	 * authenticated user
	 */
	private var _user:User;
	/**
	 * constructor
	 */
	public function new(){ 
	}
	
	/**
	 * default error function, used only when you do not provide error callback in the methods of this class
	 */
	private function defaultOnError(err)
	{
		trace("Error (API default error handler) : "+Std.string(err));
	}

	/**
	 * check if we have authenticated successfully
	 * @param	userName	the user name - required
	 * @param	userPass	the user password - required
	 */
	private function _checkAuth():Bool {
		if (_user == null)
			throw("Not authenticated!");
		return true;
	}
	/**
	 * authenticate the user and returns his token 
	 * @param	userName	the user name - required
	 * @param	userPass	the user password - required
	 * @param	onAuth		takes a User as param, and the user.error_msg will be "" when success or an error message otherwise
	 */
	public function authenticate(userName:String, userPass:String, onAuth:User->Void, onError:Dynamic->Void = null):Void {
		var cnx = haxe.remoting.HttpAsyncConnection.urlConnect(Config.GATEWAY_URL);
		
		if (onError != null)
			cnx.setErrorHandler( onError );
		else
			cnx.setErrorHandler( defaultOnError );
		  
		var t = this;
		cnx.api.authenticate.call([userName, userPass], function(user:User){
			if (user == null){
				trace("authentication failed");
			}
			else{
				trace("authentication success");
				t._user = user;
			}
			onAuth(user);
		});
	}
	/**
	 * Retrieves all object information
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	onResult	the callback to handle data when success - required
	 * @param	onError		the callback to handle the error, by default it displays the error with trace
	 * @param	oid		the object id, integer - required
	 */
	public function getObject(oid:Int, onResult:Dynamic->Void, onError:Dynamic->Void = null):Void {
		if (!_checkAuth()) return;
		
		var cnx = haxe.remoting.HttpAsyncConnection.urlConnect(Config.GATEWAY_URL);
		
		if (onError != null)
			cnx.setErrorHandler( onError );
		else
			cnx.setErrorHandler( defaultOnError );
		  
		cnx.api.getObject.call([oid, _user.username, _user.token], onResult);
	}
	/**
	 * Returns a list of members
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	srv	the member object type hander - required
	 */
	public function listMembers(srv:ServiceType, parentId:Int = -1, workspaceId:Int = -1, contactId:Int = -1, trashed:Bool = false, onResult:List<Dynamic>->Void, onError:Dynamic->Void = null):Void {
		if (!_checkAuth()) return;

		var cnx = haxe.remoting.HttpAsyncConnection.urlConnect(Config.GATEWAY_URL);

		if (onError != null)
			cnx.setErrorHandler( onError );
		else
			cnx.setErrorHandler( defaultOnError );
		  
		cnx.api.listMembers.call([srv, parentId, workspaceId, contactId, trashed, _user.username, _user.token], onResult);
	}
	/**
	 * Generic list for Feng Office content objects
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	srv	the object type handler, ServiceType value - required
	 * @param	order_dir
	 * @param	order
	 * @param	members
	 * @param	created_by_id
	 * @param	assigned_to
	 * @param	status
	 * @return	array of objects
	 */
/*	public function listing(
				srv:String, 
				order_dir:String = "", 
				order:String = "", 
				members:String = "", 
				created_by_id:String = "", 
				assigned_to:String = "", 
				status:String = "" ):Void {
	}
*/
}
