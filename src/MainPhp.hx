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
		var db = new Db({
				host:"", 
				user:Config.DB_USER,
				pass:Config.DB_PASS,
				database:Config.DB_NAME
			});
		db.open();
		var api = new Api(db);
/*		trace("************************<br />");
		trace("auth<br />");
		trace("************************<br />");
		trace("a: "+api.authenticate("a", "a"));
		trace("<br />");
		trace("b: "+api.authenticate("b", "b"));
		trace("<br />");
		var api = new Api(db);
/*		trace("************************<br />");
		trace("workspaces<br />");
		trace("************************<br />");
		for (workspace in api.getContextList()){
			trace(workspace.name+"<br />");
		}
		trace("<br />");
/*		trace("************************<br />");
		trace("all Workspace<br />");
		trace("************************<br />");
//		var oid:Int = api.getContextList().first().id;
		trace("workspaces "+api.listMembers(ServiceTypes.WORKSPACES)+"<br />");
		for (workspace in api.listMembers(ServiceTypes.WORKSPACES)){
//			trace(api.getObject(workspace.id).name+" = " +workspace.name+ "<br />");
			trace(workspace.name+ "<br />");
		}
		trace("<br />");
/*		trace("************************<br />");
		trace("Tasks<br />");
		trace("************************<br />");
//		var oid:Int = api.getContextList().first().id;
		trace("Tasks "+api.listMembers(ServiceTypes.PROJECT_TASKS)+"<br />");
		for (workspace in api.listMembers(ServiceTypes.PROJECT_TASKS)){
//			trace(api.getObject(workspace.id).name+" = " +workspace.name+ "<br />");
			trace(workspace.name+ "<br />");
		}
		trace("<br />");
/*		trace("************************<br />");
		trace("1st Workspace<br />");
		trace("************************<br />");
		var oid:Int = api.getContextList().first().id;
		trace("workspace with id "+oid+"<br />");
		trace("name = "+api.getObject(oid).name+"<br />");
		trace("<br />");
*/
/**/		// create an incoming connection and give access to the "instance" object 
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
/**/
		db.close();
		// handle normal request
		Lib.print("This is a remoting server !");
	}
	
	public static function main() {
		//trace("Hello From FDT haXe !");
		new MainPhp();
	}
}
