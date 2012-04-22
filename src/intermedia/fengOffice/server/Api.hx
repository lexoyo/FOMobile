package intermedia.fengOffice.server; 

import intermedia.fengOffice.cross.Data;
import php.db.ResultSet;

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
    public function getContextList(parentId:String = null):List<Workspace>{

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
	 * authenticate the user and returns his token 
	 * @param	userName	the user name
	 * @param	userPass	the user password
	 * @return	the user object or "ko"
	 */
    public function authenticate(userName:String, userPass:String):Null<User>{

	untyped __call__ ("include_once", Config.FO_ROOT_PATH+"/application/functions.php");

        var sql = "SELECT * FROM `"+Config.TABLE_PREFIX+"contacts` 
	    WHERE `username`='"+userName+"'";
        //object_id,first_name,surname,is_company,company_id,brand_colors,department,job_title,birthday,timezone,user_type,is_active_user,token,display_name,username,picture_file,avatar_file,comments,last_login,last_visit,last_activity,disabled,default_billing_id 
	var res = _db.request( sql );
        if(res == null || res.length == 0) { 
            return null;
        }
	
	var user:User = res.results().first();
 
//trace(user+"<br/>");
        sql = "SELECT * FROM "+Config.TABLE_PREFIX+"contact_passwords
		  WHERE `contact_id`="+user.object_id; 
//trace("-------------------<br/>"+sql+"<br/>-------------------<br/>");

        var res = _db.request( sql );
        if(res == null || res.length == 0) { 
            return null;
        }
	var pass:Dynamic = res.results().first();

/// todo: cp_decrypt
return user;

//trace(pass+" - "+userPass+"<br/>");
	untyped __call__("define", "SEED", user.salt);
	var timestamp = untyped __call__("mktime", pass.password_date("H"), pass.password_date("i"), pass.password_date("s"), pass.password_date("m"), pass.password_date("d"), pass.password_date("y")); 
	var decriptedPass = untyped __call__("cp_decrypt", pass.password, timestamp);

trace(pass+" - "+userPass+" - "+decriptedPass+"<br/>");

        if(decriptedPass != userPass) { 
            return null;
        }

        return user;
    }
	/**
	 * Retrieves all object information
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	oid	the object id, integer - required
	 */
	public function getObject(oid:Int):Null<Dynamic> {
		// retrieve the object
		var sql = "SELECT * FROM `"+Config.TABLE_PREFIX+"objects` 
							WHERE "+Config.TABLE_PREFIX+"objects.id = "+oid; 

		var res = _db.request( sql );
		if(res == null || res.length == 0) { 
		    return null;
		}
		var obj:Dynamic = res.next();

		// find the object detail table
		// SELECT * FROM `fo_object_types` WHERE id=4
		sql = "SELECT * FROM `"+Config.TABLE_PREFIX+"object_types` WHERE id="+obj.object_type_id;
		res = _db.request( sql );
		var detailTableName = res.next().table_name;

		// retrieve details of the object in the object detail table
		//SELECT * FROM `fo_project_webpages` WHERE `object_id`=76
		sql = "SELECT * FROM `"+Config.TABLE_PREFIX+detailTableName+"` WHERE `object_id`="+oid; 
		res = _db.request( sql );
		
		// add details to the object
		if(res != null || res.length > 0) { 
			var objTmp:Dynamic = res.next();
		    for (prop in Reflect.fields(objTmp)){
				Reflect.setField(obj, prop, Reflect.field(objTmp, prop));
			}
		}
		// retrieve details of the latest version of a file
		//SELECT * FROM `fo_searchable_objects` WHERE `rel_object_id` in (SELECT MAX(object_id) FROM fo_project_file_revisions where file_id=8)
		sql = "SELECT * FROM `"+Config.TABLE_PREFIX+"searchable_objects` 
							WHERE `rel_object_id` in (SELECT MAX(object_id) FROM fo_project_file_revisions where file_id="+oid+")"; 
//		trace(sql+"<br/>***********<br/>");
		res = _db.request( sql );
		
		// add details to the object
		if(res != null || res.length > 0) { 
			var objTmp:Dynamic = res.next();
		    for (prop in Reflect.fields(objTmp)){
				Reflect.setField(obj, prop, Reflect.field(objTmp, prop));
			}
		}
		// Convert dates to string
	    for (prop in Reflect.fields(obj)){
			var propValue = Reflect.field(obj, prop);
			switch (Type.typeof(propValue)){
			    case TClass(c):
					Reflect.setField(obj, prop, ""+Std.string(propValue));
			    default:
			}
		}
		return obj;
	}
	/**
	 * Returns a list of members
	 * mimic the name of the service in v1 api, http://www.fengoffice.com/web/wiki/doku.php/feng_office_2_api_documentation
	 * @param	srv	the member object type hander - required
	 * @return	array of objects
	 */
	public function listMembers(srv:ServiceType, parentId:Int = -1):List<Dynamic> {
		// SELECT * FROM fo_objects WHERE fo_objects.`id` in (SELECT fo_workspaces.`object_id` FROM fo_workspaces)
		var sql = "SELECT * FROM "+Config.TABLE_PREFIX+"objects 
							WHERE "+Config.TABLE_PREFIX+"objects.`id` in (SELECT "+Config.TABLE_PREFIX+srv+".`object_id` 
							FROM "+Config.TABLE_PREFIX+srv+")"; 
		// case with a parent
		// SELECT * FROM fo_objects WHERE fo_objects.`id` in (SELECT fo_workspaces.`object_id` FROM fo_workspaces) AND fo_objects.`id` in (SELECT id FROM fo_members WHERE `parent_member_id`="3")
		// SELECT * FROM fo_objects WHERE fo_objects.`id` in (SELECT fo_project_tasks.`object_id` FROM fo_project_tasks) AND fo_objects.`id` in (SELECT object_id FROM fo_object_members WHERE `member_id`='3') 
		if (parentId >= 0){
		    sql += "AND ("+Config.TABLE_PREFIX+"objects.`id` in (SELECT object_id FROM "+Config.TABLE_PREFIX+"object_members WHERE `member_id`='"+parentId+"')";
		    sql += "OR "+Config.TABLE_PREFIX+"objects.`id` in (SELECT id FROM "+Config.TABLE_PREFIX+"members WHERE `parent_member_id`='"+parentId+"'))";
		}

//		trace("request "+sql+"<br />");
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
		var r:List<Dynamic> = res.results();
		for (item in r.iterator()){
		    for (prop in Reflect.fields(item)){
				var propValue = Reflect.field(item, prop);
				switch (Type.typeof(propValue)){
				    case TClass(c):
				//trace(propValue+" - "+Type.typeof(propValue)+" - "+Std.string(propValue)+" - "+Type.typeof(""+Std.string(propValue))+"<br/>");
					Reflect.setField(item, prop, ""+Std.string(propValue));
				    default:
				}
		    }
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
	public function listing(
				srv:String, 
				order_dir:String = "", 
				order:String = "", 
				members:String = "", 
				created_by_id:String = "", 
				assigned_to:String = "", 
				status:String = "" ):List<Dynamic> {

		return null;
	}
}
