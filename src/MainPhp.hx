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
				host:Config.getInstance().DB_HOST, 
				user:Config.getInstance().DB_USER,
				pass:Config.getInstance().DB_PASS,
				database:Config.getInstance().DB_NAME
			});
		db.open();
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
			var output = t.execute({config:Config, error:e});
 			Lib.print(output);
			return;
		}
/*		trace("************************<br />");
		trace("auth<br />");
		trace("************************<br />");
		trace("____a: "+api.authenticate("lexa", "lexalexa"));
		trace("<br />");
		trace("____b: "+api.authenticate("test", "test"));
		trace("<br />"); 

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
		trace("workspaces "+api.listMembers(ServiceTypes.WORKSPACES, 0, "a", "054af8831ee44863039ee5f00699ec8286dd8f2e")+"<br />");
		for (workspace in api.listMembers(ServiceTypes.WORKSPACES, 0, "a", "054af8831ee44863039ee5f00699ec8286dd8f2e")){
//			trace(api.getObject(workspace.id).name+" = " +workspace.name+ "<br />");
			trace(workspace.name+ "<br />");
		}
		trace("<br />");
/*		trace("************************<br />");
		trace("Tasks<br />");
		trace("************************<br />");
//		var oid:Int = api.getContextList().first().id;
		trace("Tasks "+api.listMembers(ServiceTypes.PROJECT_TASKS, 0)+"<br />");
		for (workspace in api.listMembers(ServiceTypes.PROJECT_TASKS, 3)){
//			trace(api.getObject(workspace.id).name+" = " +workspace.name+ "<br />");
			trace(workspace.name+ "<br />");
		}
		trace("<br />");
/*		trace("************************<br />");
		trace("1st Workspace<br />");
		trace("************************<br />");
		var oid:Int = 8;//api.getContextList().first().id;
		trace("workspace with id "+oid+"<br />");
		trace("name = "+api.getObject(oid).name+"<br />");
		trace(api.getObject(oid)+"<br />");
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
