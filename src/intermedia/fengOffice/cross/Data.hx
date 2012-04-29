package intermedia.fengOffice.cross;

typedef ServiceType = String;
typedef SafeObject = Dynamic;


class ServiceTypes {
	public static inline var WORKSPACES:String = "workspaces";
	public static inline var PROJECT_MESSAGES:String = "project_messages";
	public static inline var PROJECT_WEBPAGES:String = "project_webpages";
	public static inline var PROJECT_TASKS:String = "project_tasks";
	public static inline var PROJECT_FILES:String = "project_files";
	public static inline var PROJECT_FORMS:String = "project_forms";
	public static inline var PROJECT_CHARTS:String = "project_charts";
	public static inline var PROJECT_MILESTONES:String = "project_milestones";
	public static inline var PROJECT_EVENTS:String = "project_events";
	public static inline var REPORTS:String = "reports";
	public static inline var CO_TEMPLATES:String = "templates";
	public static inline var COMMENTS:String = "comments";
	public static inline var BILLINGS:String = "billings";
	public static inline var CONTACTS:String = "contacts";
	public static inline var PROJECT_FILE_REVISIONS:String = "file_revisions";
	public static inline var TIMESLOTS:String = "timeslots";
	public static inline var MAIL_CONTENTS:String = "mail_contents";
}
/**
 * a user object transfered to the client
 */
typedef User = {
	error_msg:String,
    object_id:Int,
    first_name:String,
    surname:String,
    is_company:Bool,
    company_id:Int,
    brand_colors:String,
    department:String,
    job_title:String,
    birthday:String,
    timezone:Float,
    user_type:Int,
    is_active_user:Bool,
    token:String,
    display_name:String,
    username:String,
    picture_file:String,
    avatar_file:String,
    comments:String,
    last_login:String,
    last_visit:String,
    last_activity:String,
    disabled:Bool
}
/**
 * contains properties which can be transfered to the client
 */
/*
typedef SafeObject = {
	error_msg:String,

    object_id:Int,
    id : Int, 
    name : String, 

	// specific properties, for file, task, link...
	properties:Null<Dynamic>,
	numChildren:Int,
	
	// from object_types table
    object_type_id : Int, 
	type : String,
	icon : String,
	table_name : String,

    created_on : String, 
    created_by_id : Int, 

    updated_on : String, 
    updated_by_id : Int, 

    trashed_on : String, 
    trashed_by_id : Int, 

    archived_on : String,
    archived_by_id : Int, 
	
	// attributes resolved from the contacts table
	created_by : Null<User>,
	updated_by : Null<User>,
	trashed_by : Null<User>,
	archived_by : Null<User>

}
/**
 * helper class for SafeObject manipulation 
 */
class SafeObjectTools{
	public static function fromError(msg:String):SafeObject{
		return {
			error_msg:msg,
		    object_id:-1,
		    id : -1, 
		    name : "", 

//			properties : null,
			numChildren : 0,
						
		    object_type_id : -1, 
			type : "",
			icon : "",
			table_name : "",
		
		    created_on : "", 
		    created_by_id : -1, 
		    created_by : null, 
		
		    updated_on : "", 
		    updated_by_id : -1, 
			updated_by : null,
		
		    trashed_on : "", 
		    trashed_by_id : -1, 
			trashed_by : null,
		
		    archived_on : "", 
		    archived_by_id : -1, 
			archived_by : null
		};
	}
	public static function fromDynamic(obj:Dynamic):SafeObject{
		// input check
		if (obj == null)
			return null;
		
		//////////////////////////////
		// Convert dates to string
	    for (prop in Reflect.fields(obj)){
			var propValue = Reflect.field(obj, prop);
			switch (Type.typeof(propValue)){
			    case TClass(c):
					Reflect.setField(obj, prop, ""+Std.string(propValue));
			    default:
			}
		}
/*	    for (prop in Reflect.fields(obj.properties)){
			var propValue = Reflect.field(obj.properties, prop);
			switch (Type.typeof(propValue)){
			    case TClass(c):
					Reflect.setField(obj.properties, prop, ""+Std.string(propValue));
			    default:
			}
		}*/
		var res:Dynamic = {};
	    for (prop in Reflect.fields(obj)){
			var propValue = Reflect.field(obj, prop);
			Reflect.setField(res, prop, propValue);
		}
		return res;
		// returns only the safe fields
/*		return {
			error_msg:"",
		    object_id:obj.object_id,
		    id : obj.id, 
		    name : obj.name, 
			
			properties: obj.properties,
			numChildren: obj.numChildren,
			
			object_type_id : obj.object_type_id, 
			type : obj.type, 
			icon : obj.icon, 
			table_name : obj.table_name, 
		
		    created_on : obj.created_on, 
		    created_by_id : obj.created_by_id, 
		    created_by : UserTools.fromDynamic(obj.created_by), 
		
		    updated_on : obj.updated_on, 
		    updated_by_id : obj.updated_by_id, 
		    updated_by : UserTools.fromDynamic(obj.updated_by), 
		
		    trashed_on : obj.trashed_on, 
		    trashed_by_id : obj.trashed_by_id, 
		    trashed_by : UserTools.fromDynamic(obj.trashed_by), 
		
		    archived_on : obj.archived_on, 
		    archived_by_id : obj.archived_by_id,
		    archived_by : UserTools.fromDynamic(obj.archived_by) 
		};*/
	}
	public static function createEmpty():SafeObject{
		return {
			error_msg: "",
		    object_id:-1,
		    id : 0, // to list only items in the root folder, -1 would list all workspaces 
		    name : "All Workspaces", 
			
//			properties : {},
			numChildren : 0,
			
		    object_type_id : -1,
			type:"", 
			icon:"", 
			table_name:"", 
		
		    created_on : "", 
		    created_by_id : -1, 
		
		    updated_on : "", 
		    updated_by_id : -1, 
		
		    trashed_on : "", 
		    trashed_by_id : -1, 
		
		    archived_on : "", 
		    archived_by_id : -1,

			updated_by : null,
			created_by : null,
			trashed_by : null,
			archived_by : null
		};
	}
}

/**
 * helper class for User manipulation 
 */
class UserTools{
	public static function fromError(msg:String):User{
		return {
			error_msg:msg,
		    object_id:-1,
		    first_name:"",
		    surname:"",
		    is_company:false,
		    company_id:-1,
		    brand_colors:"",
		    department:"",
		    job_title:"",
		    birthday:"",
		    timezone:-1.0,
		    user_type:-1,
		    is_active_user:false,
		    token:"",
		    display_name:"",
		    username:"",
		    picture_file:"",
		    avatar_file:"",
		    comments:"",
		    last_login:"",
		    last_visit:"",
		    last_activity:"",
		    disabled:false
		};
	}
	public static function fromDynamic(obj:Dynamic):User{
		// input check
		if (obj == null)
			return null;
			
		//////////////////////////////
		// Convert dates to string
	    for (prop in Reflect.fields(obj)){
			var propValue = Reflect.field(obj, prop);
			switch (Type.typeof(propValue)){
			    case TClass(c):
					Reflect.setField(obj, prop, ""+Std.string(propValue));
			    default:
			}
		}
		// returns only the safe fields
		return {
			error_msg:"",
		    object_id:obj.object_id,
		    first_name:obj.first_name,
		    surname:obj.surname,
		    is_company:obj.is_company,
		    company_id:obj.company_id,
		    brand_colors:obj.brand_colors,
		    department:obj.department,
		    job_title:obj.job_title,
		    birthday:obj.birthday,
		    timezone:obj.timezone,
		    user_type:obj.user_type,
		    is_active_user:obj.is_active_user,
		    token:"", //obj.token,
		    display_name:obj.display_name,
		    username:obj.username,
		    picture_file:obj.picture_file,
		    avatar_file:obj.avatar_file,
		    comments:obj.comments,
		    last_login:obj.last_login,
		    last_visit:obj.last_visit,
		    last_activity:obj.last_activity,
		    disabled:false
		};
	}
}