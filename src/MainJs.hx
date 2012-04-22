package;

import intermedia.fengOffice.client.application.Application;

class MainJs {
	public static function main() {
		haxe.Firebug.redirectTraces(); 
		new Application();
	}
}
