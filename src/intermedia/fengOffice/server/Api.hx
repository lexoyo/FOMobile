package intermedia.fengOffice.server; 

import intermedia.fengOffice.cross.Data;
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
	 * get workspaces 
	 * if a parent is given, then select only the children of that parent 
	 * @param	parentId	the parent id or null
	 * @return	a list of workspaces
	 */
/*    public function getContextList(parentId:String = null):List<Workspace>{

		if (parentId != null)
			throw ("not implemented");
			
        var sql = "SELECT * FROM `"+Config.TABLE_PREFIX+"objects` 
						WHERE "+Config.TABLE_PREFIX+"objects.id in (SELECT "+Config.TABLE_PREFIX+"workspaces.object_id 
						FROM "+Config.TABLE_PREFIX+"workspaces)"; 

        var res = _db.request( sql );
        if(res == null || res.length == 0) { 
            return new List();
        }
        return cast(res.results());
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

		//////////////////////////////
		// Retrieve the pass object
/*        sql = "SELECT id, contact_id, password_date, password FROM "+Config.getInstance().TABLE_PREFIX+"contact_passwords
		  		WHERE `contact_id`="+user.object_id; 
		//trace("-------------------<br/>"+sql+"<br/>-------------------<br/>");
        var res = _db.request( sql );
        if(res == null || res.length == 0) { 
            return null;
        }
		var pass:Dynamic = res.results().last();
*/
		//////////////////////////////
		// check user and pass
		//trace(haxe.SHA1.encode(user.salt + userPass) + " = "+user.token);
		if(haxe.SHA1.encode(user.salt + userPass) != user.token)
			return UserTools.fromError("Wrong user name or password");
/*

//trace(pass+" - "+userPass+"<br/>");
	untyped __call__ ("include_once", Config.getInstance().FO_ROOT_PATH+"/application/functions.php");
	//untyped __call__ ("include_once", Config.getInstance().FO_ROOT_PATH+"/config/config.php");
	//untyped __call__("define", "SEED", user.salt);
	//var timestamp = untyped __call__("mktime", pass.password_date("H"), pass.password_date("i"), pass.password_date("s"), pass.password_date("m"), pass.password_date("d"), pass.password_date("y")); 
//	var timestamp = untyped __call__("strtotime", pass.password_date); 
	var timestamp = Date.fromString(pass.password_date).getTime(); 
	var decriptedPass = untyped __call__("cp_decrypt", pass.password, timestamp);

//var encriptedPass = untyped __call__("cp_decrypt", userPass, timestamp);
//trace("pass in db="+pass.password+" - userPass="+userPass+" - pass decrypted="+decriptedPass+" - pass encrypted="+encriptedPass+"<br/>");

trace("<br/><br/>********** AUTH "+userName+", "+userPass+"********** <br/><br/>");
trace("date="+Date.fromString(pass.password_date)+" - timestamp="+Date.fromString(pass.password_date).getTime()+" - date="+Date.fromTime(Date.fromString(pass.password_date).getTime())+"<br/>");
trace("pass in db="+pass.password+" - userPass="+userPass+" - pass decrypted="+decriptedPass+"<br/>");
if (user.disabled) trace("USER DISABLED !!!<br />");
if (decriptedPass == userPass && user.disabled == false)
	trace("Auth result: TRUE<br/><br/>");
else
	trace("Auth result: FALSE<br/><br/>");

        if(decriptedPass != userPass || user.disabled == true) { 
            return null;
        }
*/

		//////////////////////////////
		// Convert dates to string
	    for (prop in Reflect.fields(user)){
			var propValue = Reflect.field(user, prop);
			switch (Type.typeof(propValue)){
			    case TClass(c):
					Reflect.setField(user, prop, ""+Std.string(propValue));
			    default:
			}
		}

        return UserTools.fromDynamic(user);
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
			obj.created_by = res.next();

		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` WHERE `object_id`="+obj.updated_by_id; 
		res = _db.request( sql );
		if (res != null && res.length > 0)
			obj.updated_by = res.next();

		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` WHERE `object_id`="+obj.trashed_by_id; 
		res = _db.request( sql );
		if (res != null && res.length > 0)
			obj.trashed_by = res.next();

		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"contacts` WHERE `object_id`="+obj.archived_by_id; 
		res = _db.request( sql );
		if (res != null && res.length > 0)
			obj.archived_by = res.next();

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
		// find the object detail table
		// SELECT * FROM `fo_object_types` WHERE id=4
		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"object_types` WHERE id="+obj.object_type_id;
		res = _db.request( sql );
		var objTmp:Dynamic = res.next();
		obj.type = objTmp.type;
		var detailTableName = objTmp.table_name;
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
		// retrieve details of the object in the object detail table
		obj = _getDetails(obj);
		
		
		//////////////////////////////
		// retrieve details of the latest version of a file
/*		//SELECT * FROM `fo_searchable_objects` WHERE `rel_object_id` in (SELECT MAX(object_id) FROM fo_project_file_revisions where file_id=8)
		sql = "SELECT * FROM `"+Config.getInstance().TABLE_PREFIX+"searchable_objects` 
							WHERE `rel_object_id` in (SELECT MAX(object_id) FROM "+Config.getInstance().TABLE_PREFIX+"project_file_revisions where file_id="+oid+")"; 
//		trace(sql+"<br/>***********<br/>");
		res = _db.request( sql );
		
		// add details to the object
		if(res != null || res.length > 0) { 
			var objTmp:Dynamic = res.next();
		    for (prop in Reflect.fields(objTmp)){
				Reflect.setField(obj, prop, Reflect.field(objTmp, prop));
			}
		}
*/		//////////////////////////////
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
			var path:String = "/upload/" 
				+ objTmp.repository_id.substr(0, 3) + "/" 
				+ objTmp.repository_id.substr(3, 3) + "/"
				+ objTmp.repository_id.substr(6, 3) + "/" 
				+ objTmp.repository_id.substr(9);
			// trace("file path: "+path+"<br />");
			// case of a text file
			if (objTmp.type_string == "text/html"){
				// retrieve the content of the file
				var content:String = File.getContent(Config.getInstance().FO_ROOT_PATH + path);
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
							FROM "+Config.getInstance().TABLE_PREFIX+srv+")"; 
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
/*
l.add({name:"test1"});
l.add({name:"test2"});
return l;
*/
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
	/**
	 * Generic list for Feng Office content objects
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	srv	the object type handler, ServiceType value � required
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
				status:String = "" ):List<Dynamic> {

		return null;
	}
*/
}
