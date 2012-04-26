package intermedia.fengOffice.client.widgets; 

import js.Lib;
import js.Dom;
import intermedia.fengOffice.client.application.Config;
import intermedia.fengOffice.client.application.AppState;
import intermedia.fengOffice.client.application.Lang;
import intermedia.fengOffice.cross.Data;

/**
 * home screen, with current selection (workspace, tags, filter) + tabs (docs, emails, contact...)
 * instanciate the home.html template
 */
class HomeScreen {
	/**
	 * parent container
	 */
	private var _widget : Widget;
	/**
	 * ID of this widget, used in the ID of all UIs in the HTML template
	 */
	private var _id : String;

	/**
	 * callback for a click on an icon
	 */
	public var onChange:ServiceType->Void;
	/**
	 * constructor
	 */
	public function new(widget:Widget):Void {
	     _widget = widget;
		 refresh();
	}
	public function refresh(){
		var rand = Math.round(10000*Math.random());
		
		// render the template
		var str = haxe.Resource.getString("home");
		var t = new haxe.Template(str);
		var output = t.execute({config:Config, appState:AppState.getInstance(), Lang:Lang, Config:Config, id:rand});
		
		// body
		_widget.getBodyElement().innerHTML = output;
		
		// no menu
		_widget.getFooterElement().innerHTML = "";
		
		_widget.refresh();
		
		// callbacks for click on the icons 
		Lib.document.getElementById("workspaceBtn"+rand).onclick = _workspaceBtnCallback;
		Lib.document.getElementById("filesBtn"+rand).onclick = _filesBtnCallback;
		Lib.document.getElementById("tasksBtn"+rand).onclick = _tasksBtnCallback;
		Lib.document.getElementById("notesBtn"+rand).onclick = _notesBtnCallback;
		Lib.document.getElementById("emailsBtn"+rand).onclick = _emailsBtnCallback;
		Lib.document.getElementById("linksBtn"+rand).onclick = _linksBtnCallback;
		Lib.document.getElementById("calendarBtn"+rand).onclick = _calendarBtnCallback;
		Lib.document.getElementById("contactsBtn"+rand).onclick = _contactsBtnCallback;
	}
	public function _workspaceBtnCallback(e:Event){
		// workaround no persistence
		AppState.getInstance().curWorkspace = SafeObjectTools.createEmpty();		
		if (onChange != null) 
			onChange(ServiceTypes.WORKSPACES);
	}
	public function _filesBtnCallback(e:Event){
		if (onChange != null) 
			onChange(ServiceTypes.PROJECT_FILES);
	}
	public function _tasksBtnCallback(e:Event){
		if (onChange != null) 
			onChange(ServiceTypes.PROJECT_TASKS);
	}
	public function _notesBtnCallback(e:Event){
		if (onChange != null) 
			onChange(ServiceTypes.PROJECT_MESSAGES);
	}
	public function _emailsBtnCallback(e:Event){
		if (onChange != null) 
			onChange(ServiceTypes.MAIL_CONTENTS);
	}
	public function _linksBtnCallback(e:Event){
		if (onChange != null) 
			onChange(ServiceTypes.PROJECT_WEBPAGES);
	}
	public function _calendarBtnCallback(e:Event){
		if (onChange != null) 
			onChange(ServiceTypes.PROJECT_EVENTS);
	}
	public function _contactsBtnCallback(e:Event){
		if (onChange != null) 
			onChange(ServiceTypes.CONTACTS);
	}
}
