package;
import intermedia.fengOffice.server.Api;
import intermedia.fengOffice.server.Db;
import intermedia.fengOffice.server.Config;
import intermedia.fengOffice.cross.Data;
import php.Lib;
import haxe.remoting.HttpConnection;
import haxe.remoting.Context;


class MainPhp {	
	public function new(){

		// **
		// init DB
		var db = new Db({
				host:Config.getInstance().DB_HOST, 
				user:Config.getInstance().DB_USER,
				pass:Config.getInstance().DB_PASS,
				database:Config.getInstance().DB_NAME
			});
		db.open();
		
		// **
		// create the API object
		var api:Api;
		try{
			api = new Api(db);
		}catch(e:Dynamic)
		{
			db.close();
			//trace("error "+e );
			// get the template
			var str = haxe.Resource.getString("not-activated");
			var t = new haxe.Template(str);
			var output = t.execute({config:Config.getInstance(), error:e});
 			Lib.print(output);
			return;
		}
		
		
		/////////////////////////////////////////////////////////////
		// UNIT TESTS 
		/////////////////////////////////////////////////////////////

/*		trace("************************<br />");
		trace("auth<br />");
		trace("************************<br />");
		trace("____a: "+api.authenticate("a", "a"));
		trace("<br />");
		trace("<br />");
		trace("____b: "+api.authenticate("test", "test"));
		trace("<br />"); 
		trace("<br />"); 
/**
		trace("************************<br />");
		trace("all Workspace<br />");
		trace("************************<br />");
//		var oid:Int = api.getContextList().first().id;
		var token = api.authenticate("a", "a").token;
		trace("workspaces "+api.listMembers(ServiceTypes.WORKSPACES, -1, 0, "a", token)+"<br />");
		for (workspace in api.listMembers(ServiceTypes.WORKSPACES, -1, 6, "a", token)){
//			trace(api.getObject(workspace.id).name+" = " +workspace.name+ "<br />");
			trace(workspace.name + " - "+workspace.id+ "<br />");
		}
		trace("<br />"); 
/** 	trace("************************<br />");
		trace("Tasks, files, ...<br />");
		trace("************************<br />");
//		var oid:Int = api.getContextList().first().id;
		var token = api.authenticate("a", "a").token;
		//trace("Members: "+api.listMembers(ServiceTypes.PROJECT_TASKS, 6, "a", token)+"<br /><br /><br /><br />");
//sub task:		for (obj in api.listMembers(ServiceTypes.PROJECT_TASKS, 7, "a", token)){
//tasks of a context
		for (obj in api.listMembers(ServiceTypes.PROJECT_TASKS, 0, 6, "a", token)){
//			trace(api.getObject(workspace.id).name+" = " +workspace.name+ "<br />");
//			trace(obj.name+", "+obj.id+", "+obj.numChildren+ "<br />");
			trace("<b>"+obj.name+"</b>, "+obj.id+", "+obj+ "<br /><br /><br />"); 
		}
		trace("<br />");
/*		trace("************************<br />");
		trace("Objects<br />");
		trace("************************<br />");
		var token = api.authenticate("a", "a").token;
		var oid:Int =102;//api.getContextList().first().id;
		trace("object with id "+oid+"<br />");
		trace("name = "+api.getObject(oid, "a", token).name+"<br />");
		trace(api.getObject(oid, "a", token)+"<br />");
/**/		// create an incoming connection and give access to the "instance" object 
		
		// **
		// answers the call
		var context = new Context(); 
		context.addObject("api",api); 
		try{
			if (HttpConnection.handleRequest(context)) {
			      db.close();
			      return;
			}
		}catch(e:Dynamic)
		{
			db.close();
			trace( "error: "+e);
		}

		// **
		// cleanup
		db.close();
		
		// **
		// handle normal request
		var str = haxe.Resource.getString("activated");
		var t = new haxe.Template(str);
		var output = t.execute({config:Config.getInstance()});
		Lib.print(output);
		return;
	}
	
	public static function main() {
		//trace("Hello From FDT haXe !");
		new MainPhp();
	}
}
