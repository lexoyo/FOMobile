package intermedia.fengOffice.server; 

import intermedia.fengOffice.cross.Data;
import intermedia.fengOffice.cross.Utils;
import php.db.ResultSet;
import php.Lib;
import php.io.File;

/**
 * this class do the querries to FO db tables
 * let you retrieve the needed data from your FO server
 */
class Api {	

	private var _plugin:Plugin;
	private var _db:Db;
	/**
	 * constructor
	 * takes a Db as parameter, in order to make the db calls
	 */
	public function new(db:Db){ 
		_db = db;
		_plugin = new Plugin(_db);
        if (_plugin.isActivated() == false)
            throw("Error: Plugin is not activated yet, check <a href='http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_plugin_engine'>this article about activation</a>");
	}
	/**
	 * after authentication, the userName and token are used to check the authentication status 
	 * @param	userName	the user name
	 * @param	userPass	the token returned by authenticate
	 * @return	true or false
	 */
    private function _checkAuth(userName:String, token:String):Bool{
        //object_id,first_name,surname,is_company,company_id,brand_colors,department,job_title,birthday,timezone,user_type,is_active_user,token,display_name,username,picture_file,avatar_file,comments,last_login,last_visit,last_activity,disabled,default_billing_id 
        var sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` 
	    WHERE `username`='"+userName+"' AND `token`='"+token+"'";
		var res = _db.request( sql );
        if(res == null || res.length == 0) { 
            return false;
        }
		return true;
	}
	/**
	 * authenticate the user and returns his token 
	 * @param	userName	the user name
	 * @param	userPass	the user password
	 * @return	the user object or "ko"
	 */
    public function authenticate(userName:String, userPass:String):Null<User>{
		
		//////////////////////////////
		// case of a returning user, with token in the session cookie
		if (userName == "" && userPass == ""){
		
			php.Session.start();
			if (php.Session.exists("mobile_app_user_id")){

				var id= php.Session.get("mobile_app_user_id");

		        var sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` 
			    		WHERE `object_id`='"+id+"'";
				
				//trace("-------------------<br/>"+sql+"<br/>-------------------<br/>");
				
				var res = _db.request( sql );
		        if(res != null && res.length > 0) { 
					var user:Dynamic = res.results().first();

					var token = user.token; 
					
					// safe fields only
					user = UserTools.fromDynamic(user);
					// force the token since we really want to send it 
					user.token = token;

					//trace("YES "+user);
			        return _getContactDetails(user);
				}
				
	        }
		}
		//////////////////////////////
		// Retrieve the user
        //object_id,first_name,surname,is_company,company_id,brand_colors,department,job_title,birthday,timezone,user_type,is_active_user,token,display_name,username,picture_file,avatar_file,comments,last_login,last_visit,last_activity,disabled,default_billing_id 
        var sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` 
	    		WHERE `username`='"+userName+"'";
		//trace("-------------------<br/>"+sql+"<br/>-------------------<br/>");
		var res = _db.request( sql );
        if(res == null || res.length == 0) { 
            return UserTools.fromError("User not found");
        }
		var user:Dynamic = res.results().first();
 
		//////////////////////////////
		// Retrieve disabled status
		if(user.disabled == 1)
			return UserTools.fromError("User is disabled");

		var token:String = user.token;
		//////////////////////////////
		// check user and pass
		//trace(haxe.SHA1.encode(user.salt + userPass) + " = "+token);
//		if(haxe.SHA1.encode(user.salt + userPass) != token)
		if(untyped __call__("sha1", user.salt + userPass) != token)
			return UserTools.fromError("Wrong user name or password");

		// safe fields only
		user = UserTools.fromDynamic(_getContactDetails(user));
		
		// force the token since we really want to send it 
		user.token = token;
		
        return user;
    }
	/**
	 * add details to the object
	 */
	private function _getDetails(obj:Dynamic):SafeObject{
		// ***
		// resolve contacts
		var sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` WHERE `object_id`="+obj.created_by_id; 
		var res = _db.request( sql );
		if (res != null && res.length > 0)
			obj.created_by = _getContactDetails(res.next());

		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` WHERE `object_id`="+obj.updated_by_id; 
		res = _db.request( sql );
		if (res != null && res.length > 0)
			obj.updated_by = _getContactDetails(res.next());

		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` WHERE `object_id`="+obj.trashed_by_id; 
		res = _db.request( sql );
		if (res != null && res.length > 0)
			obj.trashed_by = _getContactDetails(res.next());

		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` WHERE `object_id`="+obj.archived_by_id; 
		res = _db.request( sql );
		if (res != null && res.length > 0)
			obj.archived_by = _getContactDetails(res.next());
			
		//////////////////////////////
		// find the object detail table
		// SELECT * FROM `fo_object_types` WHERE id=4
		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"object_types` WHERE id="+obj.object_type_id;
		res = _db.request( sql );
		var objTmp:Dynamic = res.next();
		
		// keep several props
		obj.type = objTmp.type;
		obj.icon = objTmp.icon;
		obj.table_name = objTmp.table_name;
		
		// ***
		// compute number of children
		sql = "SELECT COUNT(id) FROM "+Config.getInstance().TABLE_PREFIX+"objects 
							WHERE "+Config.getInstance().TABLE_PREFIX+"objects.`id` in (SELECT "+Config.getInstance().TABLE_PREFIX+obj.table_name+".`object_id` 
							FROM "+Config.getInstance().TABLE_PREFIX+obj.table_name+")" 
							+ " AND ("+Config.getInstance().TABLE_PREFIX+"objects.`id` in (SELECT object_id FROM "+Config.getInstance().TABLE_PREFIX+"object_members WHERE `member_id`  in (SELECT id FROM "+Config.getInstance().TABLE_PREFIX+"members AS memberRq1 WHERE memberRq1.`object_id`="+obj.id+"))"
							+ " OR "+Config.getInstance().TABLE_PREFIX+"objects.`id` in (SELECT object_id FROM "+Config.getInstance().TABLE_PREFIX+"members WHERE `parent_member_id` in (SELECT id FROM "+Config.getInstance().TABLE_PREFIX+"members AS memberRq2 WHERE memberRq2.`object_id`="+obj.id+")))";
		
		var res = _db.request( sql );
		if(res != null && res.length > 0)
			obj.numChildren = Reflect.field(res.next(), "COUNT(id)");
		else obj.numChildren = 0;

		return obj;
	}
	/**
	 * add details to the contact
	 */
	private function _getContactDetails(obj:User):User{
		// TODO: user_type comments
		// resolve files paths
		obj.picture_file = Utils.getFilePath(obj.picture_file);
		obj.avatar_file = Utils.getFilePath(obj.avatar_file); 
		return obj;		
	}
	
	/** 
	 * Retrieves all object information
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	oid	the object id, integer - required
	 */
	public function getObject(oid:Int, user:String, token:String):Null<SafeObject> {
		if (!_checkAuth(user, token)) throw("authentication faild");

		//////////////////////////////
		// retrieve the object
		var sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"objects` 
							WHERE "+Config.getInstance().TABLE_PREFIX+"objects.id = "+oid; 

		var res = _db.request( sql );
		if(res == null || res.length == 0) { 
		    return SafeObjectTools.fromError("Object not found");
		}
		var obj:SafeObject = res.next();
		// trace("<br />----- retrieve the object <br />"+sql+"<br />--"+obj+"---<br />");

		//////////////////////////////
		// retrieve details of the object in the object detail table
		obj = _getDetails(obj);
		
		// store the name of the table containing the object details
		var detailTableName = obj.table_name;
		// trace("<br />----- find the object detail table <br />"+sql+"<br />--"+detailTableName+"---<br />");

		// retrieve details of the object in the object detail table
		//SELECT * FROM `fo_project_webpages` WHERE `object_id`=76
		var sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+detailTableName+"` WHERE `object_id`="+obj.id; 
		var res = _db.request( sql );

		// add details to the object
		obj.properties = {};
		if(res != null || res.length > 0) { 
			var objTmp = res.next();
			// add all attributes to the result
		    for (prop in Reflect.fields(objTmp)){
				Reflect.setField(obj.properties, prop, Reflect.field(objTmp, prop));
			}
		}
		
		
		//////////////////////////////
		// retrieve content of a file
		// SELECT repository_id, type_string FROM test3_project_file_revisions where file_id=11 ORDER BY revision_number DESC LIMIT 1
		sql = "SELECT repository_id, type_string, filesize, revision_number FROM "+Config.getInstance().TABLE_PREFIX+"project_file_revisions where file_id="+oid+" ORDER BY revision_number DESC LIMIT 1"; 
		res = _db.request( sql );

		// case of a file
		if(res != null && res.length > 0) { 
			//////////////////////////////
			// retrieve type of the file
			var objTmp:Dynamic = res.next();
			// trace("<br />----- retrieve content of a file <br />"+sql+"<br />--"+objTmp+"---<br />");
			// build the file path depending on the id (which equals project_file_revisions.repository_id)
			var path:String = Utils.getFilePath(objTmp.repository_id);
			//trace("file path: "+Config.getInstance().FO_ROOT_PATH+path+"<br />");
			// case of a text file
			if (objTmp.type_string == "text/html"){
				// retrieve the content of the file
				var content:String = "";
				try{
					content = File.getContent(Config.getInstance().FO_ROOT_PATH + path);
				}
				catch(msg:String){
					content = "Error: failed to open stream: No such file or directory";
				}
				// add html content to the object
				obj.properties.htmlContent = content; 
				// trace("<br />----- case of a text file <br />"+obj.properties.htmlContent+"<br />-----<br />");
			}
			// case of an image
			else if (StringTools.startsWith(objTmp.type_string,"image")){
				// add html content to the object
				obj.properties.htmlContent = "<img src='"+Config.getInstance().ROOT_URL+path+"' />"; 
				// trace("<br />----- case of an image <br />"+obj.properties.htmlContent+"<br />-----<br />");
			}
			// case of a video
			else if (StringTools.startsWith(objTmp.type_string,"video")){
				// get the template
				var str = haxe.Resource.getString("embed_file_video");
				var t = new haxe.Template(str);
				var output = t.execute({config:Config, src: Config.getInstance().ROOT_URL+path, mime_type:objTmp.type_string});
				
				// add html content to the object
				obj.properties.htmlContent = output; 
				// trace("<br />----- case of an image <br />"+obj.properties.htmlContent+"<br />-----<br />");
			}
			// other file tyes
			else{
				// add html content to the object
				obj.properties.htmlContent = "<a href='"+Config.getInstance().ROOT_URL+path+"'>"+path+"</a> ("+objTmp.type_string+")";
				// trace("<br />----- other file types <br />"+obj.properties.htmlContent+"<br />-----<br />");
			}
			// size
			obj.properties.url = Config.getInstance().ROOT_URL+path;
			obj.properties.filesize = objTmp.filesize;
			obj.properties.revision_number = objTmp.revision_number;
		}
		return SafeObjectTools.fromDynamic(obj);
	}
	/**
	 * Returns a list of members
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	srv	the member object type hander - required
	 * @return	array of objects
	 */
	public function listMembers(srv:ServiceType, parentId:Int = -1, user:String, token:String):List<Dynamic> {

		if (!_checkAuth(user, token)) throw("authentication faild");

		//////////////////////////////
		// get the list of workspaces 
		// SELECT * FROM fo_objects WHERE fo_objects.`id` in (SELECT fo_workspaces.`object_id` FROM fo_workspaces)
		var sql = "SELECT * FROM "+Config.getInstance().TABLE_PREFIX+"objects 
							WHERE "+Config.getInstance().TABLE_PREFIX+"objects.`id` in (SELECT "+Config.getInstance().TABLE_PREFIX+srv+".`object_id` 
							FROM "+Config.getInstance().TABLE_PREFIX+srv+")
							AND "+Config.getInstance().TABLE_PREFIX+"objects.`trashed_by_id`=0"; 
		// case with a parent
		/*	SELECT *
			FROM test3_objects
			WHERE test3_objects.`id`
			IN (
				SELECT test3_project_files.`object_id`
				FROM test3_project_files
			) AND (
				test3_objects.`id`
				IN (
					SELECT object_id
					FROM test3_object_members
					WHERE `member_id`
					IN (
						SELECT id
						FROM test3_members AS memberRq2
						WHERE memberRq2.`object_id` =4
					)
				)
				OR test3_objects.`id`
				IN (
					SELECT object_id
					FROM test3_members
					WHERE `parent_member_id`
					IN (
						SELECT id
						FROM test3_members AS memberRq2
						WHERE memberRq2.`object_id` =4
					)
				)
			)
			ORDER BY updated_on DESC
		 */
		if (parentId >= 0){
		    sql += " AND ("+Config.getInstance().TABLE_PREFIX+"objects.`id` in (SELECT object_id FROM "+Config.getInstance().TABLE_PREFIX+"object_members WHERE `member_id`  in (SELECT id FROM "+Config.getInstance().TABLE_PREFIX+"members AS memberRq1 WHERE memberRq1.`object_id`="+parentId+"))";
			if (parentId == 0)
			    sql += " OR "+Config.getInstance().TABLE_PREFIX+"objects.`id` in (SELECT object_id FROM "+Config.getInstance().TABLE_PREFIX+"members WHERE `parent_member_id`=0))";
			else
			    sql += " OR "+Config.getInstance().TABLE_PREFIX+"objects.`id` in (SELECT object_id FROM "+Config.getInstance().TABLE_PREFIX+"members WHERE `parent_member_id` in (SELECT id FROM "+Config.getInstance().TABLE_PREFIX+"members AS memberRq2 WHERE memberRq2.`object_id`="+parentId+")))";
		}
		sql += " ORDER BY updated_on DESC";

//		trace("<br />----- request <br />"+sql+"<br />-----<br />");
		var res = _db.request( sql );
		if(res == null || res.length == 0) { 
		    return new List();
		}
//		return res.results();

		// Convert dates to string
		var l=new List();
		//////////////////////////////
		// format each item
		var r:List<Dynamic> = res.results();
		for (item in r.iterator()){
			// retrieve details of the object in the object detail table
			item = SafeObjectTools.fromDynamic(_getDetails(item));
		    l.add(item);
		}
		return l;
	}
}
