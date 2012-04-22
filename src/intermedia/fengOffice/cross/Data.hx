package intermedia.fengOffice.cross;

typedef ServiceType = String;

// todo: structures
typedef Tab = Dynamic;
typedef Task = Dynamic;

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
typedef Workspace = {
    object_id:Int,
    id : Int, 
    object_type_id : Int, 
    name : String, 

    created_on : String, 
    created_by_id : Int, 

    updated_on : String, 
    updated_by_id : Int, 

    trashed_on : String, 
    trashed_by_id : Int, 

    archived_on : String, 
    archived_by_id : Int 
}

typedef User = {
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
    disabled:Bool,
}

