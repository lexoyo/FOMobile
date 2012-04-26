$estr = function() { return js.Boot.__string_rec(this,''); }
if(typeof haxe=='undefined') haxe = {}
if(!haxe.remoting) haxe.remoting = {}
haxe.remoting.AsyncConnection = function() { }
haxe.remoting.AsyncConnection.__name__ = ["haxe","remoting","AsyncConnection"];
haxe.remoting.AsyncConnection.prototype.resolve = null;
haxe.remoting.AsyncConnection.prototype.call = null;
haxe.remoting.AsyncConnection.prototype.setErrorHandler = null;
haxe.remoting.AsyncConnection.prototype.__class__ = haxe.remoting.AsyncConnection;
StringTools = function() { }
StringTools.__name__ = ["StringTools"];
StringTools.urlEncode = function(s) {
	return encodeURIComponent(s);
}
StringTools.urlDecode = function(s) {
	return decodeURIComponent(s.split("+").join(" "));
}
StringTools.htmlEscape = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
StringTools.htmlUnescape = function(s) {
	return s.split("&gt;").join(">").split("&lt;").join("<").split("&amp;").join("&");
}
StringTools.startsWith = function(s,start) {
	return s.length >= start.length && s.substr(0,start.length) == start;
}
StringTools.endsWith = function(s,end) {
	var elen = end.length;
	var slen = s.length;
	return slen >= elen && s.substr(slen - elen,elen) == end;
}
StringTools.isSpace = function(s,pos) {
	var c = s.charCodeAt(pos);
	return c >= 9 && c <= 13 || c == 32;
}
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) r++;
	if(r > 0) return s.substr(r,l - r); else return s;
}
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) r++;
	if(r > 0) return s.substr(0,l - r); else return s;
}
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
}
StringTools.rpad = function(s,c,l) {
	var sl = s.length;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		s += c.substr(0,l - sl);
		sl = l;
	} else {
		s += c;
		sl += cl;
	}
	return s;
}
StringTools.lpad = function(s,c,l) {
	var ns = "";
	var sl = s.length;
	if(sl >= l) return s;
	var cl = c.length;
	while(sl < l) if(l - sl < cl) {
		ns += c.substr(0,l - sl);
		sl = l;
	} else {
		ns += c;
		sl += cl;
	}
	return ns + s;
}
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
}
StringTools.hex = function(n,digits) {
	var s = "";
	var hexChars = "0123456789ABCDEF";
	do {
		s = hexChars.charAt(n & 15) + s;
		n >>>= 4;
	} while(n > 0);
	if(digits != null) while(s.length < digits) s = "0" + s;
	return s;
}
StringTools.fastCodeAt = function(s,index) {
	return s.cca(index);
}
StringTools.isEOF = function(c) {
	return c != c;
}
StringTools.prototype.__class__ = StringTools;
if(typeof intermedia=='undefined') intermedia = {}
if(!intermedia.fengOffice) intermedia.fengOffice = {}
if(!intermedia.fengOffice.client) intermedia.fengOffice.client = {}
intermedia.fengOffice.client.Api = function(p) {
}
intermedia.fengOffice.client.Api.__name__ = ["intermedia","fengOffice","client","Api"];
intermedia.fengOffice.client.Api.prototype._user = null;
intermedia.fengOffice.client.Api.prototype.defaultOnError = function(err) {
	haxe.Log.trace("Error : " + Std.string(err),{ fileName : "Api.hx", lineNumber : 26, className : "intermedia.fengOffice.client.Api", methodName : "defaultOnError"});
}
intermedia.fengOffice.client.Api.prototype._checkAuth = function() {
	if(this._user == null) throw "Not authenticated!";
	return true;
}
intermedia.fengOffice.client.Api.prototype.authenticate = function(userName,userPass,onAuth,onError) {
	var cnx = haxe.remoting.HttpAsyncConnection.urlConnect("." + "/indexPhp.php");
	if(onError != null) cnx.setErrorHandler(onError); else cnx.setErrorHandler($closure(this,"defaultOnError"));
	var t = this;
	cnx.resolve("api").resolve("authenticate").call([userName,userPass],function(user) {
		if(user == null) haxe.Log.trace("authentication failed",{ fileName : "Api.hx", lineNumber : 56, className : "intermedia.fengOffice.client.Api", methodName : "authenticate"}); else {
			haxe.Log.trace("authentication success",{ fileName : "Api.hx", lineNumber : 59, className : "intermedia.fengOffice.client.Api", methodName : "authenticate"});
			t._user = user;
		}
		onAuth(user);
	});
}
intermedia.fengOffice.client.Api.prototype.getObject = function(oid,onResult,onError) {
	if(!this._checkAuth()) return;
	var cnx = haxe.remoting.HttpAsyncConnection.urlConnect("." + "/indexPhp.php");
	if(onError != null) cnx.setErrorHandler(onError); else cnx.setErrorHandler($closure(this,"defaultOnError"));
	cnx.resolve("api").resolve("getObject").call([oid,this._user.username,this._user.token],onResult);
}
intermedia.fengOffice.client.Api.prototype.listMembers = function(srv,parentId,onResult,onError) {
	if(parentId == null) parentId = -1;
	if(!this._checkAuth()) return;
	var cnx = haxe.remoting.HttpAsyncConnection.urlConnect("." + "/indexPhp.php");
	if(onError != null) cnx.setErrorHandler(onError); else cnx.setErrorHandler($closure(this,"defaultOnError"));
	cnx.resolve("api").resolve("listMembers").call([srv,parentId,this._user.username,this._user.token],onResult);
}
intermedia.fengOffice.client.Api.prototype.__class__ = intermedia.fengOffice.client.Api;
Reflect = function() { }
Reflect.__name__ = ["Reflect"];
Reflect.hasField = function(o,field) {
	if(o.hasOwnProperty != null) return o.hasOwnProperty(field);
	var arr = Reflect.fields(o);
	var $it0 = arr.iterator();
	while( $it0.hasNext() ) {
		var t = $it0.next();
		if(t == field) return true;
	}
	return false;
}
Reflect.field = function(o,field) {
	var v = null;
	try {
		v = o[field];
	} catch( e ) {
	}
	return v;
}
Reflect.setField = function(o,field,value) {
	o[field] = value;
}
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
}
Reflect.fields = function(o) {
	if(o == null) return new Array();
	var a = new Array();
	if(o.hasOwnProperty) {
		for(var i in o) if( o.hasOwnProperty(i) ) a.push(i);
	} else {
		var t;
		try {
			t = o.__proto__;
		} catch( e ) {
			t = null;
		}
		if(t != null) o.__proto__ = null;
		for(var i in o) if( i != "__proto__" ) a.push(i);
		if(t != null) o.__proto__ = t;
	}
	return a;
}
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && f.__name__ == null;
}
Reflect.compare = function(a,b) {
	return a == b?0:a > b?1:-1;
}
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) return true;
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) return false;
	return f1.scope == f2.scope && f1.method == f2.method && f1.method != null;
}
Reflect.isObject = function(v) {
	if(v == null) return false;
	var t = typeof(v);
	return t == "string" || t == "object" && !v.__enum__ || t == "function" && v.__name__ != null;
}
Reflect.deleteField = function(o,f) {
	if(!Reflect.hasField(o,f)) return false;
	delete(o[f]);
	return true;
}
Reflect.copy = function(o) {
	var o2 = { };
	var _g = 0, _g1 = Reflect.fields(o);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		o2[f] = Reflect.field(o,f);
	}
	return o2;
}
Reflect.makeVarArgs = function(f) {
	return function() {
		var a = new Array();
		var _g1 = 0, _g = arguments.length;
		while(_g1 < _g) {
			var i = _g1++;
			a.push(arguments[i]);
		}
		return f(a);
	};
}
Reflect.prototype.__class__ = Reflect;
if(!intermedia.fengOffice.client.application) intermedia.fengOffice.client.application = {}
intermedia.fengOffice.client.application.Config = function() { }
intermedia.fengOffice.client.application.Config.__name__ = ["intermedia","fengOffice","client","application","Config"];
intermedia.fengOffice.client.application.Config.prototype.__class__ = intermedia.fengOffice.client.application.Config;
if(!intermedia.fengOffice.client.widgets) intermedia.fengOffice.client.widgets = {}
intermedia.fengOffice.client.widgets.FOObjectDetail = function(api,widget,serviceType,item,parentItem) {
	if( api === $_ ) return;
	this._api = api;
	this._widget = widget;
	this._serviceType = serviceType;
	this._item = item;
	this.refresh();
}
intermedia.fengOffice.client.widgets.FOObjectDetail.__name__ = ["intermedia","fengOffice","client","widgets","FOObjectDetail"];
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.onChange = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.onError = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.onLoading = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.onHome = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.onBack = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.onForward = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype._api = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype._widget = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype._serviceType = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype._item = null;
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype._displayItem = function(itemDetail) {
	if(this.onLoading != null) this.onLoading(false);
	haxe.Log.trace("***********************<br/>",{ fileName : "FOObjectDetail.hx", lineNumber : 39, className : "intermedia.fengOffice.client.widgets.FOObjectDetail", methodName : "_displayItem"});
	haxe.Log.trace("Details of " + this._item.name + ": " + itemDetail + "<br/>",{ fileName : "FOObjectDetail.hx", lineNumber : 40, className : "intermedia.fengOffice.client.widgets.FOObjectDetail", methodName : "_displayItem"});
	var _g = 0, _g1 = Reflect.fields(itemDetail);
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		haxe.Log.trace(prop + " = " + Reflect.field(itemDetail,prop) + "<br/>",{ fileName : "FOObjectDetail.hx", lineNumber : 42, className : "intermedia.fengOffice.client.widgets.FOObjectDetail", methodName : "_displayItem"});
	}
	haxe.Log.trace("*********************** properties:<br/>",{ fileName : "FOObjectDetail.hx", lineNumber : 44, className : "intermedia.fengOffice.client.widgets.FOObjectDetail", methodName : "_displayItem"});
	var _g = 0, _g1 = Reflect.fields(itemDetail.properties);
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		haxe.Log.trace(prop + " = " + Reflect.field(itemDetail.properties,prop) + "<br/>",{ fileName : "FOObjectDetail.hx", lineNumber : 46, className : "intermedia.fengOffice.client.widgets.FOObjectDetail", methodName : "_displayItem"});
	}
	haxe.Log.trace("***********************<br/>",{ fileName : "FOObjectDetail.hx", lineNumber : 48, className : "intermedia.fengOffice.client.widgets.FOObjectDetail", methodName : "_displayItem"});
	var str = haxe.Resource.getString(this._serviceType + "_detail");
	var t = new haxe.Template(str);
	var output = t.execute({ item : itemDetail});
	this._widget.getBodyElement().innerHTML = output;
	var str1 = haxe.Resource.getString("list_footer");
	var t1 = new haxe.Template(str1);
	var output1 = t1.execute({ item : itemDetail});
	this._widget.getFooterElement().innerHTML = output1;
	this._widget.refresh();
	js.Lib.document.getElementById("listFooterHomeBtn").onclick = this.onHome;
}
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.refresh = function(event) {
	if(this.onLoading != null) this.onLoading(true);
	haxe.Log.trace("call getObject(" + this._item.id,{ fileName : "FOObjectDetail.hx", lineNumber : 82, className : "intermedia.fengOffice.client.widgets.FOObjectDetail", methodName : "refresh"});
	this._api.getObject(this._item.id,$closure(this,"_displayItem"),this.onError);
}
intermedia.fengOffice.client.widgets.FOObjectDetail.prototype.__class__ = intermedia.fengOffice.client.widgets.FOObjectDetail;
haxe.Log = function() { }
haxe.Log.__name__ = ["haxe","Log"];
haxe.Log.trace = function(v,infos) {
	js.Boot.__trace(v,infos);
}
haxe.Log.clear = function() {
	js.Boot.__clear_trace();
}
haxe.Log.prototype.__class__ = haxe.Log;
intermedia.fengOffice.client.application.AppState = function(p) {
	if( p === $_ ) return;
	this.curServiceType = "";
	this.curWorkspace = intermedia.fengOffice.cross.SafeObjectTools.createEmpty();
}
intermedia.fengOffice.client.application.AppState.__name__ = ["intermedia","fengOffice","client","application","AppState"];
intermedia.fengOffice.client.application.AppState._instance = null;
intermedia.fengOffice.client.application.AppState.getInstance = function() {
	if(intermedia.fengOffice.client.application.AppState._instance == null) intermedia.fengOffice.client.application.AppState._instance = new intermedia.fengOffice.client.application.AppState();
	return intermedia.fengOffice.client.application.AppState._instance;
}
intermedia.fengOffice.client.application.AppState.prototype.curWorkspace = null;
intermedia.fengOffice.client.application.AppState.prototype.curItem = null;
intermedia.fengOffice.client.application.AppState.prototype.curServiceType = null;
intermedia.fengOffice.client.application.AppState.prototype.curUser = null;
intermedia.fengOffice.client.application.AppState.prototype.__class__ = intermedia.fengOffice.client.application.AppState;
StringBuf = function(p) {
	if( p === $_ ) return;
	this.b = new Array();
}
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype.add = function(x) {
	this.b[this.b.length] = x == null?"null":x;
}
StringBuf.prototype.addSub = function(s,pos,len) {
	this.b[this.b.length] = s.substr(pos,len);
}
StringBuf.prototype.addChar = function(c) {
	this.b[this.b.length] = String.fromCharCode(c);
}
StringBuf.prototype.toString = function() {
	return this.b.join("");
}
StringBuf.prototype.b = null;
StringBuf.prototype.__class__ = StringBuf;
intermedia.fengOffice.client.widgets.FOObjectsList = function(api,widget) {
	if( api === $_ ) return;
	this._api = api;
	this._widget = widget;
	this._prevItems = new Array();
	this.refresh();
}
intermedia.fengOffice.client.widgets.FOObjectsList.__name__ = ["intermedia","fengOffice","client","widgets","FOObjectsList"];
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onSelect = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onChange = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onError = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onLoading = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onHome = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onBack = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onForward = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype._api = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype._widget = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype._prevItems = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype._curItem = null;
intermedia.fengOffice.client.widgets.FOObjectsList.prototype._displayItems = function(items) {
	if(this.onLoading != null) this.onLoading(false);
	haxe.Log.trace("Items: " + items,{ fileName : "FOObjectsList.hx", lineNumber : 41, className : "intermedia.fengOffice.client.widgets.FOObjectsList", methodName : "_displayItems"});
	var str = haxe.Resource.getString(intermedia.fengOffice.client.application.AppState.getInstance().curServiceType);
	var t = new haxe.Template(str);
	var title;
	if(this._curItem != null) title = this._curItem.name; else title = "Select Item";
	var parent = null;
	if(this._prevItems.length > 0) parent = this._prevItems[this._prevItems.length - 1];
	var output = t.execute({ items : items, hasParent : this._prevItems.length > 0, parent : parent, curItem : this._curItem, title : title, Lang : intermedia.fengOffice.client.application.Lang, Config : intermedia.fengOffice.client.application.Config});
	this._widget.getBodyElement().innerHTML = output;
	var t1 = this;
	var $it0 = items.iterator();
	while( $it0.hasNext() ) {
		var w = $it0.next();
		var w1 = [w];
		js.Lib.document.getElementById("itemBtn" + w1[0].id).onclick = (function(w1) {
			return function(e) {
				t1.openItem(w1[0]);
			};
		})(w1);
		js.Lib.document.getElementById("selectBtn" + w1[0].id).onclick = (function(w1) {
			return function(e) {
				t1.selectItem(w1[0]);
			};
		})(w1);
	}
	if(this.onChange != null) this.onChange(this._curItem);
	if(this._prevItems.length <= 0) this.disableUp(); else this.enableUp();
	js.Lib.document.getElementById("upBtn").onclick = $closure(this,"onUp");
	js.Lib.document.getElementById("refreshBtn").onclick = $closure(this,"refresh");
	js.Lib.document.getElementById("selectBtn").onclick = function(e) {
		t1.selectItem(t1._curItem);
	};
	var str1 = haxe.Resource.getString("list_footer");
	var t2 = new haxe.Template(str1);
	var title1;
	if(this._curItem != null) title1 = this._curItem.name; else title1 = "Select Item";
	var output1 = t2.execute({ items : items, title : title1, curItem : this._curItem});
	this._widget.getFooterElement().innerHTML = output1;
	this._widget.refresh();
	js.Lib.document.getElementById("listFooterHomeBtn").onclick = this.onHome;
}
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.openItem = function(item) {
	this._prevItems.push(this._curItem);
	this._curItem = item;
	this.refresh();
}
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.selectItem = function(item) {
	if(this.onSelect != null) this.onSelect(item);
}
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.onUp = function(event) {
	if(this._prevItems.length <= 0) return;
	this._curItem = this._prevItems.pop();
	this.refresh();
}
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.refresh = function(event) {
	var curId;
	if(this._curItem != null) curId = this._curItem.id; else curId = intermedia.fengOffice.client.application.AppState.getInstance().curWorkspace.id;
	if(this.onLoading != null) this.onLoading(true);
	haxe.Log.trace("call listMembers(" + intermedia.fengOffice.client.application.AppState.getInstance().curServiceType + ", " + curId + "",{ fileName : "FOObjectsList.hx", lineNumber : 112, className : "intermedia.fengOffice.client.widgets.FOObjectsList", methodName : "refresh"});
	this._api.listMembers(intermedia.fengOffice.client.application.AppState.getInstance().curServiceType,curId,$closure(this,"_displayItems"),this.onError);
}
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.enableUp = function() {
	try {
		js.Lib.document.getElementById("upBtn").disabled = false;
	} catch( e ) {
	}
}
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.disableUp = function() {
	try {
		js.Lib.document.getElementById("upBtn").disabled = true;
	} catch( e ) {
	}
}
intermedia.fengOffice.client.widgets.FOObjectsList.prototype.__class__ = intermedia.fengOffice.client.widgets.FOObjectsList;
MainJs = function() { }
MainJs.__name__ = ["MainJs"];
MainJs.main = function() {
	haxe.Firebug.redirectTraces();
	new intermedia.fengOffice.client.application.Application();
}
MainJs.prototype.__class__ = MainJs;
intermedia.fengOffice.client.widgets.HomeScreen = function(widget) {
	if( widget === $_ ) return;
	this._widget = widget;
	this.refresh();
}
intermedia.fengOffice.client.widgets.HomeScreen.__name__ = ["intermedia","fengOffice","client","widgets","HomeScreen"];
intermedia.fengOffice.client.widgets.HomeScreen.prototype._widget = null;
intermedia.fengOffice.client.widgets.HomeScreen.prototype._id = null;
intermedia.fengOffice.client.widgets.HomeScreen.prototype.onChange = null;
intermedia.fengOffice.client.widgets.HomeScreen.prototype.refresh = function() {
	var str = haxe.Resource.getString("home");
	var t = new haxe.Template(str);
	var output = t.execute({ config : intermedia.fengOffice.client.application.Config, appState : intermedia.fengOffice.client.application.AppState.getInstance(), Lang : intermedia.fengOffice.client.application.Lang, Config : intermedia.fengOffice.client.application.Config});
	this._widget.getBodyElement().innerHTML = output;
	this._widget.getFooterElement().innerHTML = "";
	this._widget.refresh();
	js.Lib.document.getElementById("workspaceBtn").onclick = $closure(this,"_workspaceBtnCallback");
	js.Lib.document.getElementById("filesBtn").onclick = $closure(this,"_filesBtnCallback");
	js.Lib.document.getElementById("tasksBtn").onclick = $closure(this,"_tasksBtnCallback");
	js.Lib.document.getElementById("notesBtn").onclick = $closure(this,"_notesBtnCallback");
	js.Lib.document.getElementById("emailsBtn").onclick = $closure(this,"_emailsBtnCallback");
	js.Lib.document.getElementById("linksBtn").onclick = $closure(this,"_linksBtnCallback");
	js.Lib.document.getElementById("calendarBtn").onclick = $closure(this,"_calendarBtnCallback");
	js.Lib.document.getElementById("contactsBtn").onclick = $closure(this,"_contactsBtnCallback");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._workspaceBtnCallback = function(e) {
	intermedia.fengOffice.client.application.AppState.getInstance().curWorkspace = intermedia.fengOffice.cross.SafeObjectTools.createEmpty();
	if(this.onChange != null) this.onChange("workspaces");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._filesBtnCallback = function(e) {
	if(this.onChange != null) this.onChange("project_files");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._tasksBtnCallback = function(e) {
	if(this.onChange != null) this.onChange("project_tasks");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._notesBtnCallback = function(e) {
	if(this.onChange != null) this.onChange("project_messages");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._emailsBtnCallback = function(e) {
	if(this.onChange != null) this.onChange("mail_contents");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._linksBtnCallback = function(e) {
	if(this.onChange != null) this.onChange("project_webpages");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._calendarBtnCallback = function(e) {
	if(this.onChange != null) this.onChange("project_events");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype._contactsBtnCallback = function(e) {
	if(this.onChange != null) this.onChange("contacts");
}
intermedia.fengOffice.client.widgets.HomeScreen.prototype.__class__ = intermedia.fengOffice.client.widgets.HomeScreen;
intermedia.fengOffice.client.application.Application = function(p) {
	if( p === $_ ) return;
	this.api = new intermedia.fengOffice.client.Api();
	this.goAuthPage();
}
intermedia.fengOffice.client.application.Application.__name__ = ["intermedia","fengOffice","client","application","Application"];
intermedia.fengOffice.client.application.Application.prototype.api = null;
intermedia.fengOffice.client.application.Application.prototype.widget = null;
intermedia.fengOffice.client.application.Application.prototype.goAuthPage = function(errorMsg) {
	if(errorMsg == null) errorMsg = "";
	var me = this;
	intermedia.fengOffice.client.DeeplinkManager.getInstance().setDeeplink("auth",function(deeplink) {
		me.goAuthPage(errorMsg);
	});
	var str = haxe.Resource.getString("login");
	var t = new haxe.Template(str);
	var output = t.execute({ config : intermedia.fengOffice.client.application.Config, appState : this, error : errorMsg, isError : errorMsg != "", Lang : intermedia.fengOffice.client.application.Lang});
	js.Lib.document.getElementById("main").innerHTML = output;
	js.Lib.document.getElementById("submitBtn").onclick = $closure(this,"onSubmit");
}
intermedia.fengOffice.client.application.Application.prototype.onSubmit = function(event) {
	var userName = js.Lib.document.getElementById("userName").value;
	var userPass = js.Lib.document.getElementById("userPass").value;
	this.widget = new intermedia.fengOffice.client.widgets.Widget("MainWidget","Feng Office App",js.Lib.document.getElementById("main"));
	this.api.authenticate(userName,userPass,$closure(this,"onAuth"));
}
intermedia.fengOffice.client.application.Application.prototype.startAuth = function(userName,userPass) {
	haxe.Log.trace("authentication start",{ fileName : "Application.hx", lineNumber : 55, className : "intermedia.fengOffice.client.application.Application", methodName : "startAuth"});
	var str = haxe.Resource.getString("loading");
	var t = new haxe.Template(str);
	var output = t.execute({ config : intermedia.fengOffice.client.application.Config, appState : this, Lang : intermedia.fengOffice.client.application.Lang});
	this.widget.setBody(output);
	this.api.authenticate(userName,userPass,$closure(this,"onAuth"));
}
intermedia.fengOffice.client.application.Application.prototype.onAuth = function(user) {
	if(user.error_msg != "") {
		haxe.Log.trace("authentication failed",{ fileName : "Application.hx", lineNumber : 66, className : "intermedia.fengOffice.client.application.Application", methodName : "onAuth"});
		this.goAuthPage(user.error_msg);
		return;
	}
	intermedia.fengOffice.client.Input.initPhoneGap();
	haxe.Log.trace("authentication success " + user.token,{ fileName : "Application.hx", lineNumber : 71, className : "intermedia.fengOffice.client.application.Application", methodName : "onAuth"});
	intermedia.fengOffice.client.application.AppState.getInstance().curUser = user;
	this.goHome();
}
intermedia.fengOffice.client.application.Application.prototype.goHome = function(e) {
	var me = this;
	intermedia.fengOffice.client.DeeplinkManager.getInstance().setDeeplink("home",function(deeplink) {
		me.goHome(e);
	});
	var homeScreen = new intermedia.fengOffice.client.widgets.HomeScreen(this.widget);
	homeScreen.onChange = $closure(this,"goList");
}
intermedia.fengOffice.client.application.Application.prototype.goList = function(srv) {
	var me = this;
	intermedia.fengOffice.client.DeeplinkManager.getInstance().setDeeplink("list",function(deeplink) {
		me.goListNoDeeplink(srv);
	});
	haxe.Log.trace("List selected " + srv,{ fileName : "Application.hx", lineNumber : 85, className : "intermedia.fengOffice.client.application.Application", methodName : "goList"});
	this.goListNoDeeplink(srv);
}
intermedia.fengOffice.client.application.Application.prototype.goListNoDeeplink = function(srv) {
	intermedia.fengOffice.client.application.AppState.getInstance().curServiceType = srv;
	var list;
	list = new intermedia.fengOffice.client.widgets.FOObjectsList(this.api,this.widget);
	list.onHome = $closure(this,"goHome");
	list.onSelect = $closure(this,"_onSelectItem");
}
intermedia.fengOffice.client.application.Application.prototype.goDetail = function(srv,item) {
	var me = this;
	intermedia.fengOffice.client.DeeplinkManager.getInstance().setDeeplink("detail",function(deeplink) {
		me.goDetail(srv,item);
	});
	haxe.Log.trace("Show detail of " + item,{ fileName : "Application.hx", lineNumber : 107, className : "intermedia.fengOffice.client.application.Application", methodName : "goDetail"});
	intermedia.fengOffice.client.application.AppState.getInstance().curServiceType = srv;
	intermedia.fengOffice.client.application.AppState.getInstance().curItem = item;
	var detailView = new intermedia.fengOffice.client.widgets.FOObjectDetail(this.api,this.widget,srv,item,intermedia.fengOffice.client.application.AppState.getInstance().curWorkspace);
	detailView.onHome = $closure(this,"goHome");
}
intermedia.fengOffice.client.application.Application.prototype._onSelectItem = function(item) {
	haxe.Log.trace("item selected: " + item,{ fileName : "Application.hx", lineNumber : 116, className : "intermedia.fengOffice.client.application.Application", methodName : "_onSelectItem"});
	switch(intermedia.fengOffice.client.application.AppState.getInstance().curServiceType) {
	case "workspaces":
		intermedia.fengOffice.client.application.AppState.getInstance().curWorkspace = item;
		intermedia.fengOffice.client.application.AppState.getInstance().curItem = null;
		this.goHome();
		break;
	default:
		this.goDetail(intermedia.fengOffice.client.application.AppState.getInstance().curServiceType,item);
	}
}
intermedia.fengOffice.client.application.Application.prototype.__class__ = intermedia.fengOffice.client.application.Application;
if(!haxe._Template) haxe._Template = {}
haxe._Template.TemplateExpr = { __ename__ : ["haxe","_Template","TemplateExpr"], __constructs__ : ["OpVar","OpExpr","OpIf","OpStr","OpBlock","OpForeach","OpMacro"] }
haxe._Template.TemplateExpr.OpVar = function(v) { var $x = ["OpVar",0,v]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpExpr = function(expr) { var $x = ["OpExpr",1,expr]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpIf = function(expr,eif,eelse) { var $x = ["OpIf",2,expr,eif,eelse]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpStr = function(str) { var $x = ["OpStr",3,str]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpBlock = function(l) { var $x = ["OpBlock",4,l]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpForeach = function(expr,loop) { var $x = ["OpForeach",5,expr,loop]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
haxe._Template.TemplateExpr.OpMacro = function(name,params) { var $x = ["OpMacro",6,name,params]; $x.__enum__ = haxe._Template.TemplateExpr; $x.toString = $estr; return $x; }
EReg = function(r,opt) {
	if( r === $_ ) return;
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
}
EReg.__name__ = ["EReg"];
EReg.prototype.r = null;
EReg.prototype.match = function(s) {
	this.r.m = this.r.exec(s);
	this.r.s = s;
	this.r.l = RegExp.leftContext;
	this.r.r = RegExp.rightContext;
	return this.r.m != null;
}
EReg.prototype.matched = function(n) {
	return this.r.m != null && n >= 0 && n < this.r.m.length?this.r.m[n]:(function($this) {
		var $r;
		throw "EReg::matched";
		return $r;
	}(this));
}
EReg.prototype.matchedLeft = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.l == null) return this.r.s.substr(0,this.r.m.index);
	return this.r.l;
}
EReg.prototype.matchedRight = function() {
	if(this.r.m == null) throw "No string matched";
	if(this.r.r == null) {
		var sz = this.r.m.index + this.r.m[0].length;
		return this.r.s.substr(sz,this.r.s.length - sz);
	}
	return this.r.r;
}
EReg.prototype.matchedPos = function() {
	if(this.r.m == null) throw "No string matched";
	return { pos : this.r.m.index, len : this.r.m[0].length};
}
EReg.prototype.split = function(s) {
	var d = "#__delim__#";
	return s.replace(this.r,d).split(d);
}
EReg.prototype.replace = function(s,by) {
	return s.replace(this.r,by);
}
EReg.prototype.customReplace = function(s,f) {
	var buf = new StringBuf();
	while(true) {
		if(!this.match(s)) break;
		buf.add(this.matchedLeft());
		buf.add(f(this));
		s = this.matchedRight();
	}
	buf.b[buf.b.length] = s == null?"null":s;
	return buf.b.join("");
}
EReg.prototype.__class__ = EReg;
haxe.Template = function(str) {
	if( str === $_ ) return;
	var tokens = this.parseTokens(str);
	this.expr = this.parseBlock(tokens);
	if(!tokens.isEmpty()) throw "Unexpected '" + tokens.first().s + "'";
}
haxe.Template.__name__ = ["haxe","Template"];
haxe.Template.prototype.expr = null;
haxe.Template.prototype.context = null;
haxe.Template.prototype.macros = null;
haxe.Template.prototype.stack = null;
haxe.Template.prototype.buf = null;
haxe.Template.prototype.execute = function(context,macros) {
	this.macros = macros == null?{ }:macros;
	this.context = context;
	this.stack = new List();
	this.buf = new StringBuf();
	this.run(this.expr);
	return this.buf.b.join("");
}
haxe.Template.prototype.resolve = function(v) {
	if(Reflect.hasField(this.context,v)) return Reflect.field(this.context,v);
	var $it0 = this.stack.iterator();
	while( $it0.hasNext() ) {
		var ctx = $it0.next();
		if(Reflect.hasField(ctx,v)) return Reflect.field(ctx,v);
	}
	if(v == "__current__") return this.context;
	return Reflect.field(haxe.Template.globals,v);
}
haxe.Template.prototype.parseTokens = function(data) {
	var tokens = new List();
	while(haxe.Template.splitter.match(data)) {
		var p = haxe.Template.splitter.matchedPos();
		if(p.pos > 0) tokens.add({ p : data.substr(0,p.pos), s : true, l : null});
		if(data.charCodeAt(p.pos) == 58) {
			tokens.add({ p : data.substr(p.pos + 2,p.len - 4), s : false, l : null});
			data = haxe.Template.splitter.matchedRight();
			continue;
		}
		var parp = p.pos + p.len;
		var npar = 1;
		while(npar > 0) {
			var c = data.charCodeAt(parp);
			if(c == 40) npar++; else if(c == 41) npar--; else if(c == null) throw "Unclosed macro parenthesis";
			parp++;
		}
		var params = data.substr(p.pos + p.len,parp - (p.pos + p.len) - 1).split(",");
		tokens.add({ p : haxe.Template.splitter.matched(2), s : false, l : params});
		data = data.substr(parp,data.length - parp);
	}
	if(data.length > 0) tokens.add({ p : data, s : true, l : null});
	return tokens;
}
haxe.Template.prototype.parseBlock = function(tokens) {
	var l = new List();
	while(true) {
		var t = tokens.first();
		if(t == null) break;
		if(!t.s && (t.p == "end" || t.p == "else" || t.p.substr(0,7) == "elseif ")) break;
		l.add(this.parse(tokens));
	}
	if(l.length == 1) return l.first();
	return haxe._Template.TemplateExpr.OpBlock(l);
}
haxe.Template.prototype.parse = function(tokens) {
	var t = tokens.pop();
	var p = t.p;
	if(t.s) return haxe._Template.TemplateExpr.OpStr(p);
	if(t.l != null) {
		var pe = new List();
		var _g = 0, _g1 = t.l;
		while(_g < _g1.length) {
			var p1 = _g1[_g];
			++_g;
			pe.add(this.parseBlock(this.parseTokens(p1)));
		}
		return haxe._Template.TemplateExpr.OpMacro(p,pe);
	}
	if(p.substr(0,3) == "if ") {
		p = p.substr(3,p.length - 3);
		var e = this.parseExpr(p);
		var eif = this.parseBlock(tokens);
		var t1 = tokens.first();
		var eelse;
		if(t1 == null) throw "Unclosed 'if'";
		if(t1.p == "end") {
			tokens.pop();
			eelse = null;
		} else if(t1.p == "else") {
			tokens.pop();
			eelse = this.parseBlock(tokens);
			t1 = tokens.pop();
			if(t1 == null || t1.p != "end") throw "Unclosed 'else'";
		} else {
			t1.p = t1.p.substr(4,t1.p.length - 4);
			eelse = this.parse(tokens);
		}
		return haxe._Template.TemplateExpr.OpIf(e,eif,eelse);
	}
	if(p.substr(0,8) == "foreach ") {
		p = p.substr(8,p.length - 8);
		var e = this.parseExpr(p);
		var efor = this.parseBlock(tokens);
		var t1 = tokens.pop();
		if(t1 == null || t1.p != "end") throw "Unclosed 'foreach'";
		return haxe._Template.TemplateExpr.OpForeach(e,efor);
	}
	if(haxe.Template.expr_splitter.match(p)) return haxe._Template.TemplateExpr.OpExpr(this.parseExpr(p));
	return haxe._Template.TemplateExpr.OpVar(p);
}
haxe.Template.prototype.parseExpr = function(data) {
	var l = new List();
	var expr = data;
	while(haxe.Template.expr_splitter.match(data)) {
		var p = haxe.Template.expr_splitter.matchedPos();
		var k = p.pos + p.len;
		if(p.pos != 0) l.add({ p : data.substr(0,p.pos), s : true});
		var p1 = haxe.Template.expr_splitter.matched(0);
		l.add({ p : p1, s : p1.indexOf("\"") >= 0});
		data = haxe.Template.expr_splitter.matchedRight();
	}
	if(data.length != 0) l.add({ p : data, s : true});
	var e;
	try {
		e = this.makeExpr(l);
		if(!l.isEmpty()) throw l.first().p;
	} catch( s ) {
		if( js.Boot.__instanceof(s,String) ) {
			throw "Unexpected '" + s + "' in " + expr;
		} else throw(s);
	}
	return function() {
		try {
			return e();
		} catch( exc ) {
			throw "Error : " + Std.string(exc) + " in " + expr;
		}
	};
}
haxe.Template.prototype.makeConst = function(v) {
	haxe.Template.expr_trim.match(v);
	v = haxe.Template.expr_trim.matched(1);
	if(v.charCodeAt(0) == 34) {
		var str = v.substr(1,v.length - 2);
		return function() {
			return str;
		};
	}
	if(haxe.Template.expr_int.match(v)) {
		var i = Std.parseInt(v);
		return function() {
			return i;
		};
	}
	if(haxe.Template.expr_float.match(v)) {
		var f = Std.parseFloat(v);
		return function() {
			return f;
		};
	}
	var me = this;
	return function() {
		return me.resolve(v);
	};
}
haxe.Template.prototype.makePath = function(e,l) {
	var p = l.first();
	if(p == null || p.p != ".") return e;
	l.pop();
	var field = l.pop();
	if(field == null || !field.s) throw field.p;
	var f = field.p;
	haxe.Template.expr_trim.match(f);
	f = haxe.Template.expr_trim.matched(1);
	return this.makePath(function() {
		return Reflect.field(e(),f);
	},l);
}
haxe.Template.prototype.makeExpr = function(l) {
	return this.makePath(this.makeExpr2(l),l);
}
haxe.Template.prototype.makeExpr2 = function(l) {
	var p = l.pop();
	if(p == null) throw "<eof>";
	if(p.s) return this.makeConst(p.p);
	switch(p.p) {
	case "(":
		var e1 = this.makeExpr(l);
		var p1 = l.pop();
		if(p1 == null || p1.s) throw p1.p;
		if(p1.p == ")") return e1;
		var e2 = this.makeExpr(l);
		var p2 = l.pop();
		if(p2 == null || p2.p != ")") throw p2.p;
		return (function($this) {
			var $r;
			switch(p1.p) {
			case "+":
				$r = function() {
					return e1() + e2();
				};
				break;
			case "-":
				$r = function() {
					return e1() - e2();
				};
				break;
			case "*":
				$r = function() {
					return e1() * e2();
				};
				break;
			case "/":
				$r = function() {
					return e1() / e2();
				};
				break;
			case ">":
				$r = function() {
					return e1() > e2();
				};
				break;
			case "<":
				$r = function() {
					return e1() < e2();
				};
				break;
			case ">=":
				$r = function() {
					return e1() >= e2();
				};
				break;
			case "<=":
				$r = function() {
					return e1() <= e2();
				};
				break;
			case "==":
				$r = function() {
					return e1() == e2();
				};
				break;
			case "!=":
				$r = function() {
					return e1() != e2();
				};
				break;
			case "&&":
				$r = function() {
					return e1() && e2();
				};
				break;
			case "||":
				$r = function() {
					return e1() || e2();
				};
				break;
			default:
				$r = (function($this) {
					var $r;
					throw "Unknown operation " + p1.p;
					return $r;
				}($this));
			}
			return $r;
		}(this));
	case "!":
		var e = this.makeExpr(l);
		return function() {
			var v = e();
			return v == null || v == false;
		};
	case "-":
		var e = this.makeExpr(l);
		return function() {
			return -e();
		};
	}
	throw p.p;
}
haxe.Template.prototype.run = function(e) {
	var $e = (e);
	switch( $e[1] ) {
	case 0:
		var v = $e[2];
		this.buf.add(Std.string(this.resolve(v)));
		break;
	case 1:
		var e1 = $e[2];
		this.buf.add(Std.string(e1()));
		break;
	case 2:
		var eelse = $e[4], eif = $e[3], e1 = $e[2];
		var v = e1();
		if(v == null || v == false) {
			if(eelse != null) this.run(eelse);
		} else this.run(eif);
		break;
	case 3:
		var str = $e[2];
		this.buf.add(str);
		break;
	case 4:
		var l = $e[2];
		var $it0 = l.iterator();
		while( $it0.hasNext() ) {
			var e1 = $it0.next();
			this.run(e1);
		}
		break;
	case 5:
		var loop = $e[3], e1 = $e[2];
		var v = e1();
		try {
			if(v.hasNext == null) {
				var x = v.iterator();
				if(x.hasNext == null) throw null;
				v = x;
			}
		} catch( e2 ) {
			throw "Cannot iter on " + v;
		}
		this.stack.push(this.context);
		var v1 = v;
		while( v1.hasNext() ) {
			var ctx = v1.next();
			this.context = ctx;
			this.run(loop);
		}
		this.context = this.stack.pop();
		break;
	case 6:
		var params = $e[3], m = $e[2];
		var v = Reflect.field(this.macros,m);
		var pl = new Array();
		var old = this.buf;
		pl.push($closure(this,"resolve"));
		var $it1 = params.iterator();
		while( $it1.hasNext() ) {
			var p = $it1.next();
			var $e = (p);
			switch( $e[1] ) {
			case 0:
				var v1 = $e[2];
				pl.push(this.resolve(v1));
				break;
			default:
				this.buf = new StringBuf();
				this.run(p);
				pl.push(this.buf.b.join(""));
			}
		}
		this.buf = old;
		try {
			this.buf.add(Std.string(v.apply(this.macros,pl)));
		} catch( e1 ) {
			var plstr = (function($this) {
				var $r;
				try {
					$r = pl.join(",");
				} catch( e2 ) {
					$r = "???";
				}
				return $r;
			}(this));
			var msg = "Macro call " + m + "(" + plstr + ") failed (" + Std.string(e1) + ")";
			throw msg;
		}
		break;
	}
}
haxe.Template.prototype.__class__ = haxe.Template;
if(!haxe.io) haxe.io = {}
haxe.io.Bytes = function(length,b) {
	if( length === $_ ) return;
	this.length = length;
	this.b = b;
}
haxe.io.Bytes.__name__ = ["haxe","io","Bytes"];
haxe.io.Bytes.alloc = function(length) {
	var a = new Array();
	var _g = 0;
	while(_g < length) {
		var i = _g++;
		a.push(0);
	}
	return new haxe.io.Bytes(length,a);
}
haxe.io.Bytes.ofString = function(s) {
	var a = new Array();
	var _g1 = 0, _g = s.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = s.cca(i);
		if(c <= 127) a.push(c); else if(c <= 2047) {
			a.push(192 | c >> 6);
			a.push(128 | c & 63);
		} else if(c <= 65535) {
			a.push(224 | c >> 12);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		} else {
			a.push(240 | c >> 18);
			a.push(128 | c >> 12 & 63);
			a.push(128 | c >> 6 & 63);
			a.push(128 | c & 63);
		}
	}
	return new haxe.io.Bytes(a.length,a);
}
haxe.io.Bytes.ofData = function(b) {
	return new haxe.io.Bytes(b.length,b);
}
haxe.io.Bytes.prototype.length = null;
haxe.io.Bytes.prototype.b = null;
haxe.io.Bytes.prototype.get = function(pos) {
	return this.b[pos];
}
haxe.io.Bytes.prototype.set = function(pos,v) {
	this.b[pos] = v & 255;
}
haxe.io.Bytes.prototype.blit = function(pos,src,srcpos,len) {
	if(pos < 0 || srcpos < 0 || len < 0 || pos + len > this.length || srcpos + len > src.length) throw haxe.io.Error.OutsideBounds;
	var b1 = this.b;
	var b2 = src.b;
	if(b1 == b2 && pos > srcpos) {
		var i = len;
		while(i > 0) {
			i--;
			b1[i + pos] = b2[i + srcpos];
		}
		return;
	}
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		b1[i + pos] = b2[i + srcpos];
	}
}
haxe.io.Bytes.prototype.sub = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	return new haxe.io.Bytes(len,this.b.slice(pos,pos + len));
}
haxe.io.Bytes.prototype.compare = function(other) {
	var b1 = this.b;
	var b2 = other.b;
	var len = this.length < other.length?this.length:other.length;
	var _g = 0;
	while(_g < len) {
		var i = _g++;
		if(b1[i] != b2[i]) return b1[i] - b2[i];
	}
	return this.length - other.length;
}
haxe.io.Bytes.prototype.readString = function(pos,len) {
	if(pos < 0 || len < 0 || pos + len > this.length) throw haxe.io.Error.OutsideBounds;
	var s = "";
	var b = this.b;
	var fcc = String.fromCharCode;
	var i = pos;
	var max = pos + len;
	while(i < max) {
		var c = b[i++];
		if(c < 128) {
			if(c == 0) break;
			s += fcc(c);
		} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
			var c2 = b[i++];
			s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
		} else {
			var c2 = b[i++];
			var c3 = b[i++];
			s += fcc((c & 15) << 18 | (c2 & 127) << 12 | c3 << 6 & 127 | b[i++] & 127);
		}
	}
	return s;
}
haxe.io.Bytes.prototype.toString = function() {
	return this.readString(0,this.length);
}
haxe.io.Bytes.prototype.toHex = function() {
	var s = new StringBuf();
	var chars = [];
	var str = "0123456789abcdef";
	var _g1 = 0, _g = str.length;
	while(_g1 < _g) {
		var i = _g1++;
		chars.push(str.charCodeAt(i));
	}
	var _g1 = 0, _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		var c = this.b[i];
		s.b[s.b.length] = String.fromCharCode(chars[c >> 4]);
		s.b[s.b.length] = String.fromCharCode(chars[c & 15]);
	}
	return s.b.join("");
}
haxe.io.Bytes.prototype.getData = function() {
	return this.b;
}
haxe.io.Bytes.prototype.__class__ = haxe.io.Bytes;
haxe.Firebug = function() { }
haxe.Firebug.__name__ = ["haxe","Firebug"];
haxe.Firebug.detect = function() {
	try {
		return console != null && console.error != null;
	} catch( e ) {
		return false;
	}
}
haxe.Firebug.redirectTraces = function() {
	haxe.Log.trace = haxe.Firebug.trace;
	js.Lib.setErrorHandler(haxe.Firebug.onError);
}
haxe.Firebug.onError = function(err,stack) {
	var buf = err + "\n";
	var _g = 0;
	while(_g < stack.length) {
		var s = stack[_g];
		++_g;
		buf += "Called from " + s + "\n";
	}
	haxe.Firebug.trace(buf,null);
	return true;
}
haxe.Firebug.trace = function(v,inf) {
	var type = inf != null && inf.customParams != null?inf.customParams[0]:null;
	if(type != "warn" && type != "info" && type != "debug" && type != "error") type = inf == null?"error":"log";
	console[type]((inf == null?"":inf.fileName + ":" + inf.lineNumber + " : ") + Std.string(v));
}
haxe.Firebug.prototype.__class__ = haxe.Firebug;
IntIter = function(min,max) {
	if( min === $_ ) return;
	this.min = min;
	this.max = max;
}
IntIter.__name__ = ["IntIter"];
IntIter.prototype.min = null;
IntIter.prototype.max = null;
IntIter.prototype.hasNext = function() {
	return this.min < this.max;
}
IntIter.prototype.next = function() {
	return this.min++;
}
IntIter.prototype.__class__ = IntIter;
haxe.io.Error = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] }
haxe.io.Error.Blocked = ["Blocked",0];
haxe.io.Error.Blocked.toString = $estr;
haxe.io.Error.Blocked.__enum__ = haxe.io.Error;
haxe.io.Error.Overflow = ["Overflow",1];
haxe.io.Error.Overflow.toString = $estr;
haxe.io.Error.Overflow.__enum__ = haxe.io.Error;
haxe.io.Error.OutsideBounds = ["OutsideBounds",2];
haxe.io.Error.OutsideBounds.toString = $estr;
haxe.io.Error.OutsideBounds.__enum__ = haxe.io.Error;
haxe.io.Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe.io.Error; $x.toString = $estr; return $x; }
haxe.remoting.HttpAsyncConnection = function(data,path) {
	if( data === $_ ) return;
	this.__data = data;
	this.__path = path;
}
haxe.remoting.HttpAsyncConnection.__name__ = ["haxe","remoting","HttpAsyncConnection"];
haxe.remoting.HttpAsyncConnection.urlConnect = function(url) {
	return new haxe.remoting.HttpAsyncConnection({ url : url, error : function(e) {
		throw e;
	}},[]);
}
haxe.remoting.HttpAsyncConnection.prototype.__data = null;
haxe.remoting.HttpAsyncConnection.prototype.__path = null;
haxe.remoting.HttpAsyncConnection.prototype.resolve = function(name) {
	var c = new haxe.remoting.HttpAsyncConnection(this.__data,this.__path.copy());
	c.__path.push(name);
	return c;
}
haxe.remoting.HttpAsyncConnection.prototype.setErrorHandler = function(h) {
	this.__data.error = h;
}
haxe.remoting.HttpAsyncConnection.prototype.call = function(params,onResult) {
	var h = new haxe.Http(this.__data.url);
	var s = new haxe.Serializer();
	s.serialize(this.__path);
	s.serialize(params);
	h.setHeader("X-Haxe-Remoting","1");
	h.setParameter("__x",s.toString());
	var error = this.__data.error;
	h.onData = function(response) {
		var ok = true;
		var ret;
		try {
			if(response.substr(0,3) != "hxr") throw "Invalid response : '" + response + "'";
			var s1 = new haxe.Unserializer(response.substr(3));
			ret = s1.unserialize();
		} catch( err ) {
			ret = null;
			ok = false;
			error(err);
		}
		if(ok && onResult != null) onResult(ret);
	};
	h.onError = error;
	h.request(true);
}
haxe.remoting.HttpAsyncConnection.prototype.__class__ = haxe.remoting.HttpAsyncConnection;
haxe.remoting.HttpAsyncConnection.__interfaces__ = [haxe.remoting.AsyncConnection];
Type = function() { }
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null;
	if(o.__enum__ != null) return null;
	return o.__class__;
}
Type.getEnum = function(o) {
	if(o == null) return null;
	return o.__enum__;
}
Type.getSuperClass = function(c) {
	return c.__super__;
}
Type.getClassName = function(c) {
	var a = c.__name__;
	return a.join(".");
}
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
}
Type.resolveClass = function(name) {
	var cl;
	try {
		cl = eval(name);
	} catch( e ) {
		cl = null;
	}
	if(cl == null || cl.__name__ == null) return null;
	return cl;
}
Type.resolveEnum = function(name) {
	var e;
	try {
		e = eval(name);
	} catch( err ) {
		e = null;
	}
	if(e == null || e.__ename__ == null) return null;
	return e;
}
Type.createInstance = function(cl,args) {
	if(args.length <= 3) return new cl(args[0],args[1],args[2]);
	if(args.length > 8) throw "Too many arguments";
	return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
}
Type.createEmptyInstance = function(cl) {
	return new cl($_);
}
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw "No such constructor " + constr;
	if(Reflect.isFunction(f)) {
		if(params == null) throw "Constructor " + constr + " need parameters";
		return f.apply(e,params);
	}
	if(params != null && params.length != 0) throw "Constructor " + constr + " does not need parameters";
	return f;
}
Type.createEnumIndex = function(e,index,params) {
	var c = e.__constructs__[index];
	if(c == null) throw index + " is not a valid enum constructor index";
	return Type.createEnum(e,c,params);
}
Type.getInstanceFields = function(c) {
	var a = Reflect.fields(c.prototype);
	a.remove("__class__");
	return a;
}
Type.getClassFields = function(c) {
	var a = Reflect.fields(c);
	a.remove("__name__");
	a.remove("__interfaces__");
	a.remove("__super__");
	a.remove("prototype");
	return a;
}
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.copy();
}
Type["typeof"] = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = v.__class__;
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ != null) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
}
Type.enumEq = function(a,b) {
	if(a == b) return true;
	try {
		if(a[0] != b[0]) return false;
		var _g1 = 2, _g = a.length;
		while(_g1 < _g) {
			var i = _g1++;
			if(!Type.enumEq(a[i],b[i])) return false;
		}
		var e = a.__enum__;
		if(e != b.__enum__ || e == null) return false;
	} catch( e ) {
		return false;
	}
	return true;
}
Type.enumConstructor = function(e) {
	return e[0];
}
Type.enumParameters = function(e) {
	return e.slice(2);
}
Type.enumIndex = function(e) {
	return e[1];
}
Type.prototype.__class__ = Type;
haxe.Unserializer = function(buf) {
	if( buf === $_ ) return;
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = new Array();
	this.cache = new Array();
	var r = haxe.Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe.Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
}
haxe.Unserializer.__name__ = ["haxe","Unserializer"];
haxe.Unserializer.initCodes = function() {
	var codes = new Array();
	var _g1 = 0, _g = haxe.Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe.Unserializer.BASE64.cca(i)] = i;
	}
	return codes;
}
haxe.Unserializer.run = function(v) {
	return new haxe.Unserializer(v).unserialize();
}
haxe.Unserializer.prototype.buf = null;
haxe.Unserializer.prototype.pos = null;
haxe.Unserializer.prototype.length = null;
haxe.Unserializer.prototype.cache = null;
haxe.Unserializer.prototype.scache = null;
haxe.Unserializer.prototype.resolver = null;
haxe.Unserializer.prototype.setResolver = function(r) {
	if(r == null) this.resolver = { resolveClass : function(_) {
		return null;
	}, resolveEnum : function(_) {
		return null;
	}}; else this.resolver = r;
}
haxe.Unserializer.prototype.getResolver = function() {
	return this.resolver;
}
haxe.Unserializer.prototype.get = function(p) {
	return this.buf.cca(p);
}
haxe.Unserializer.prototype.readDigits = function() {
	var k = 0;
	var s = false;
	var fpos = this.pos;
	while(true) {
		var c = this.buf.cca(this.pos);
		if(c != c) break;
		if(c == 45) {
			if(this.pos != fpos) break;
			s = true;
			this.pos++;
			continue;
		}
		if(c < 48 || c > 57) break;
		k = k * 10 + (c - 48);
		this.pos++;
	}
	if(s) k *= -1;
	return k;
}
haxe.Unserializer.prototype.unserializeObject = function(o) {
	while(true) {
		if(this.pos >= this.length) throw "Invalid object";
		if(this.buf.cca(this.pos) == 103) break;
		var k = this.unserialize();
		if(!Std["is"](k,String)) throw "Invalid object key";
		var v = this.unserialize();
		o[k] = v;
	}
	this.pos++;
}
haxe.Unserializer.prototype.unserializeEnum = function(edecl,tag) {
	var constr = Reflect.field(edecl,tag);
	if(constr == null) throw "Unknown enum tag " + Type.getEnumName(edecl) + "." + tag;
	if(this.buf.cca(this.pos++) != 58) throw "Invalid enum format";
	var nargs = this.readDigits();
	if(nargs == 0) {
		this.cache.push(constr);
		return constr;
	}
	var args = new Array();
	while(nargs > 0) {
		args.push(this.unserialize());
		nargs -= 1;
	}
	var e = constr.apply(edecl,args);
	this.cache.push(e);
	return e;
}
haxe.Unserializer.prototype.unserialize = function() {
	switch(this.buf.cca(this.pos++)) {
	case 110:
		return null;
	case 116:
		return true;
	case 102:
		return false;
	case 122:
		return 0;
	case 105:
		return this.readDigits();
	case 100:
		var p1 = this.pos;
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(this.buf.substr(p1,this.pos - p1));
	case 121:
		var len = this.readDigits();
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid string length";
		var s = this.buf.substr(this.pos,len);
		this.pos += len;
		s = StringTools.urlDecode(s);
		this.scache.push(s);
		return s;
	case 107:
		return Math.NaN;
	case 109:
		return Math.NEGATIVE_INFINITY;
	case 112:
		return Math.POSITIVE_INFINITY;
	case 97:
		var buf = this.buf;
		var a = new Array();
		this.cache.push(a);
		while(true) {
			var c = this.buf.cca(this.pos);
			if(c == 104) {
				this.pos++;
				break;
			}
			if(c == 117) {
				this.pos++;
				var n = this.readDigits();
				a[a.length + n - 1] = null;
			} else a.push(this.unserialize());
		}
		return a;
	case 111:
		var o = { };
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 114:
		var n = this.readDigits();
		if(n < 0 || n >= this.cache.length) throw "Invalid reference";
		return this.cache[n];
	case 82:
		var n = this.readDigits();
		if(n < 0 || n >= this.scache.length) throw "Invalid string reference";
		return this.scache[n];
	case 120:
		throw this.unserialize();
		break;
	case 99:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		this.unserializeObject(o);
		return o;
	case 119:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		return this.unserializeEnum(edecl,this.unserialize());
	case 106:
		var name = this.unserialize();
		var edecl = this.resolver.resolveEnum(name);
		if(edecl == null) throw "Enum not found " + name;
		this.pos++;
		var index = this.readDigits();
		var tag = Type.getEnumConstructs(edecl)[index];
		if(tag == null) throw "Unknown enum index " + name + "@" + index;
		return this.unserializeEnum(edecl,tag);
	case 108:
		var l = new List();
		this.cache.push(l);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) l.add(this.unserialize());
		this.pos++;
		return l;
	case 98:
		var h = new Hash();
		this.cache.push(h);
		var buf = this.buf;
		while(this.buf.cca(this.pos) != 104) {
			var s = this.unserialize();
			h.set(s,this.unserialize());
		}
		this.pos++;
		return h;
	case 113:
		var h = new IntHash();
		this.cache.push(h);
		var buf = this.buf;
		var c = this.buf.cca(this.pos++);
		while(c == 58) {
			var i = this.readDigits();
			h.set(i,this.unserialize());
			c = this.buf.cca(this.pos++);
		}
		if(c != 104) throw "Invalid IntHash format";
		return h;
	case 118:
		var d = Date.fromString(this.buf.substr(this.pos,19));
		this.cache.push(d);
		this.pos += 19;
		return d;
	case 115:
		var len = this.readDigits();
		var buf = this.buf;
		if(this.buf.cca(this.pos++) != 58 || this.length - this.pos < len) throw "Invalid bytes length";
		var codes = haxe.Unserializer.CODES;
		if(codes == null) {
			codes = haxe.Unserializer.initCodes();
			haxe.Unserializer.CODES = codes;
		}
		var i = this.pos;
		var rest = len & 3;
		var size = (len >> 2) * 3 + (rest >= 2?rest - 1:0);
		var max = i + (len - rest);
		var bytes = haxe.io.Bytes.alloc(size);
		var bpos = 0;
		while(i < max) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			var c3 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			var c4 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c3 << 6 | c4) & 255;
		}
		if(rest >= 2) {
			var c1 = codes[buf.cca(i++)];
			var c2 = codes[buf.cca(i++)];
			bytes.b[bpos++] = (c1 << 2 | c2 >> 4) & 255;
			if(rest == 3) {
				var c3 = codes[buf.cca(i++)];
				bytes.b[bpos++] = (c2 << 4 | c3 >> 2) & 255;
			}
		}
		this.pos += len;
		this.cache.push(bytes);
		return bytes;
	case 67:
		var name = this.unserialize();
		var cl = this.resolver.resolveClass(name);
		if(cl == null) throw "Class not found " + name;
		var o = Type.createEmptyInstance(cl);
		this.cache.push(o);
		o.hxUnserialize(this);
		if(this.buf.cca(this.pos++) != 103) throw "Invalid custom data";
		return o;
	default:
	}
	this.pos--;
	throw "Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos;
}
haxe.Unserializer.prototype.__class__ = haxe.Unserializer;
if(!intermedia.fengOffice.cross) intermedia.fengOffice.cross = {}
intermedia.fengOffice.cross.ServiceTypes = function() { }
intermedia.fengOffice.cross.ServiceTypes.__name__ = ["intermedia","fengOffice","cross","ServiceTypes"];
intermedia.fengOffice.cross.ServiceTypes.prototype.__class__ = intermedia.fengOffice.cross.ServiceTypes;
intermedia.fengOffice.cross.SafeObjectTools = function() { }
intermedia.fengOffice.cross.SafeObjectTools.__name__ = ["intermedia","fengOffice","cross","SafeObjectTools"];
intermedia.fengOffice.cross.SafeObjectTools.fromError = function(msg) {
	return { error_msg : msg, object_id : -1, id : -1, name : "", properties : null, numChildren : 0, object_type_id : -1, type : "", icon : "", table_name : "", created_on : "", created_by_id : -1, created_by : null, updated_on : "", updated_by_id : -1, updated_by : null, trashed_on : "", trashed_by_id : -1, trashed_by : null, archived_on : "", archived_by_id : -1, archived_by : null};
}
intermedia.fengOffice.cross.SafeObjectTools.fromDynamic = function(obj) {
	if(obj == null) return null;
	var _g = 0, _g1 = Reflect.fields(obj);
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		var propValue = Reflect.field(obj,prop);
		var $e = (Type["typeof"](propValue));
		switch( $e[1] ) {
		case 6:
			var c = $e[2];
			obj[prop] = "" + Std.string(propValue);
			break;
		default:
		}
	}
	var _g = 0, _g1 = Reflect.fields(obj.properties);
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		var propValue = Reflect.field(obj.properties,prop);
		var $e = (Type["typeof"](propValue));
		switch( $e[1] ) {
		case 6:
			var c = $e[2];
			obj.properties[prop] = "" + Std.string(propValue);
			break;
		default:
		}
	}
	return { error_msg : "", object_id : obj.object_id, id : obj.id, name : obj.name, properties : obj.properties, numChildren : obj.numChildren, object_type_id : obj.object_type_id, type : obj.type, icon : obj.icon, table_name : obj.table_name, created_on : obj.created_on, created_by_id : obj.created_by_id, created_by : intermedia.fengOffice.cross.UserTools.fromDynamic(obj.created_by), updated_on : obj.updated_on, updated_by_id : obj.updated_by_id, updated_by : intermedia.fengOffice.cross.UserTools.fromDynamic(obj.updated_by), trashed_on : obj.trashed_on, trashed_by_id : obj.trashed_by_id, trashed_by : intermedia.fengOffice.cross.UserTools.fromDynamic(obj.trashed_by), archived_on : obj.archived_on, archived_by_id : obj.archived_by_id, archived_by : intermedia.fengOffice.cross.UserTools.fromDynamic(obj.archived_by)};
}
intermedia.fengOffice.cross.SafeObjectTools.createEmpty = function() {
	return { error_msg : "", object_id : -1, id : 0, name : "All Workspaces", properties : { }, numChildren : 0, object_type_id : -1, type : "", icon : "", table_name : "", created_on : "", created_by_id : -1, updated_on : "", updated_by_id : -1, trashed_on : "", trashed_by_id : -1, archived_on : "", archived_by_id : -1, updated_by : null, created_by : null, trashed_by : null, archived_by : null};
}
intermedia.fengOffice.cross.SafeObjectTools.prototype.__class__ = intermedia.fengOffice.cross.SafeObjectTools;
intermedia.fengOffice.cross.UserTools = function() { }
intermedia.fengOffice.cross.UserTools.__name__ = ["intermedia","fengOffice","cross","UserTools"];
intermedia.fengOffice.cross.UserTools.fromError = function(msg) {
	return { error_msg : msg, object_id : -1, first_name : "", surname : "", is_company : false, company_id : -1, brand_colors : "", department : "", job_title : "", birthday : "", timezone : -1.0, user_type : -1, is_active_user : false, token : "", display_name : "", username : "", picture_file : "", avatar_file : "", comments : "", last_login : "", last_visit : "", last_activity : "", disabled : false};
}
intermedia.fengOffice.cross.UserTools.fromDynamic = function(obj) {
	if(obj == null) return null;
	var _g = 0, _g1 = Reflect.fields(obj);
	while(_g < _g1.length) {
		var prop = _g1[_g];
		++_g;
		var propValue = Reflect.field(obj,prop);
		var $e = (Type["typeof"](propValue));
		switch( $e[1] ) {
		case 6:
			var c = $e[2];
			obj[prop] = "" + Std.string(propValue);
			break;
		default:
		}
	}
	return { error_msg : "", object_id : obj.object_id, first_name : obj.first_name, surname : obj.surname, is_company : obj.is_company, company_id : obj.company_id, brand_colors : obj.brand_colors, department : obj.department, job_title : obj.job_title, birthday : obj.birthday, timezone : obj.timezone, user_type : obj.user_type, is_active_user : obj.is_active_user, token : "", display_name : obj.display_name, username : obj.username, picture_file : obj.picture_file, avatar_file : obj.avatar_file, comments : obj.comments, last_login : obj.last_login, last_visit : obj.last_visit, last_activity : obj.last_activity, disabled : false};
}
intermedia.fengOffice.cross.UserTools.prototype.__class__ = intermedia.fengOffice.cross.UserTools;
Std = function() { }
Std.__name__ = ["Std"];
Std["is"] = function(v,t) {
	return js.Boot.__instanceof(v,t);
}
Std.string = function(s) {
	return js.Boot.__string_rec(s,"");
}
Std["int"] = function(x) {
	if(x < 0) return Math.ceil(x);
	return Math.floor(x);
}
Std.parseInt = function(x) {
	var v = parseInt(x,10);
	if(v == 0 && x.charCodeAt(1) == 120) v = parseInt(x);
	if(isNaN(v)) return null;
	return v;
}
Std.parseFloat = function(x) {
	return parseFloat(x);
}
Std.random = function(x) {
	return Math.floor(Math.random() * x);
}
Std.prototype.__class__ = Std;
haxe.Serializer = function(p) {
	if( p === $_ ) return;
	this.buf = new StringBuf();
	this.cache = new Array();
	this.useCache = haxe.Serializer.USE_CACHE;
	this.useEnumIndex = haxe.Serializer.USE_ENUM_INDEX;
	this.shash = new Hash();
	this.scount = 0;
}
haxe.Serializer.__name__ = ["haxe","Serializer"];
haxe.Serializer.run = function(v) {
	var s = new haxe.Serializer();
	s.serialize(v);
	return s.toString();
}
haxe.Serializer.prototype.buf = null;
haxe.Serializer.prototype.cache = null;
haxe.Serializer.prototype.shash = null;
haxe.Serializer.prototype.scount = null;
haxe.Serializer.prototype.useCache = null;
haxe.Serializer.prototype.useEnumIndex = null;
haxe.Serializer.prototype.toString = function() {
	return this.buf.b.join("");
}
haxe.Serializer.prototype.serializeString = function(s) {
	var x = this.shash.get(s);
	if(x != null) {
		this.buf.add("R");
		this.buf.add(x);
		return;
	}
	this.shash.set(s,this.scount++);
	this.buf.add("y");
	s = StringTools.urlEncode(s);
	this.buf.add(s.length);
	this.buf.add(":");
	this.buf.add(s);
}
haxe.Serializer.prototype.serializeRef = function(v) {
	var vt = typeof(v);
	var _g1 = 0, _g = this.cache.length;
	while(_g1 < _g) {
		var i = _g1++;
		var ci = this.cache[i];
		if(typeof(ci) == vt && ci == v) {
			this.buf.add("r");
			this.buf.add(i);
			return true;
		}
	}
	this.cache.push(v);
	return false;
}
haxe.Serializer.prototype.serializeFields = function(v) {
	var _g = 0, _g1 = Reflect.fields(v);
	while(_g < _g1.length) {
		var f = _g1[_g];
		++_g;
		this.serializeString(f);
		this.serialize(Reflect.field(v,f));
	}
	this.buf.add("g");
}
haxe.Serializer.prototype.serialize = function(v) {
	var $e = (Type["typeof"](v));
	switch( $e[1] ) {
	case 0:
		this.buf.add("n");
		break;
	case 1:
		if(v == 0) {
			this.buf.add("z");
			return;
		}
		this.buf.add("i");
		this.buf.add(v);
		break;
	case 2:
		if(Math.isNaN(v)) this.buf.add("k"); else if(!Math.isFinite(v)) this.buf.add(v < 0?"m":"p"); else {
			this.buf.add("d");
			this.buf.add(v);
		}
		break;
	case 3:
		this.buf.add(v?"t":"f");
		break;
	case 6:
		var c = $e[2];
		if(c == String) {
			this.serializeString(v);
			return;
		}
		if(this.useCache && this.serializeRef(v)) return;
		switch(c) {
		case Array:
			var ucount = 0;
			this.buf.add("a");
			var l = v["length"];
			var _g = 0;
			while(_g < l) {
				var i = _g++;
				if(v[i] == null) ucount++; else {
					if(ucount > 0) {
						if(ucount == 1) this.buf.add("n"); else {
							this.buf.add("u");
							this.buf.add(ucount);
						}
						ucount = 0;
					}
					this.serialize(v[i]);
				}
			}
			if(ucount > 0) {
				if(ucount == 1) this.buf.add("n"); else {
					this.buf.add("u");
					this.buf.add(ucount);
				}
			}
			this.buf.add("h");
			break;
		case List:
			this.buf.add("l");
			var v1 = v;
			var $it0 = v1.iterator();
			while( $it0.hasNext() ) {
				var i = $it0.next();
				this.serialize(i);
			}
			this.buf.add("h");
			break;
		case Date:
			var d = v;
			this.buf.add("v");
			this.buf.add(d.toString());
			break;
		case Hash:
			this.buf.add("b");
			var v1 = v;
			var $it1 = v1.keys();
			while( $it1.hasNext() ) {
				var k = $it1.next();
				this.serializeString(k);
				this.serialize(v1.get(k));
			}
			this.buf.add("h");
			break;
		case IntHash:
			this.buf.add("q");
			var v1 = v;
			var $it2 = v1.keys();
			while( $it2.hasNext() ) {
				var k = $it2.next();
				this.buf.add(":");
				this.buf.add(k);
				this.serialize(v1.get(k));
			}
			this.buf.add("h");
			break;
		case haxe.io.Bytes:
			var v1 = v;
			var i = 0;
			var max = v1.length - 2;
			var chars = "";
			var b64 = haxe.Serializer.BASE64;
			while(i < max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				var b3 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt((b2 << 2 | b3 >> 6) & 63) + b64.charAt(b3 & 63);
			}
			if(i == max) {
				var b1 = v1.b[i++];
				var b2 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt((b1 << 4 | b2 >> 4) & 63) + b64.charAt(b2 << 2 & 63);
			} else if(i == max + 1) {
				var b1 = v1.b[i++];
				chars += b64.charAt(b1 >> 2) + b64.charAt(b1 << 4 & 63);
			}
			this.buf.add("s");
			this.buf.add(chars.length);
			this.buf.add(":");
			this.buf.add(chars);
			break;
		default:
			this.cache.pop();
			if(v.hxSerialize != null) {
				this.buf.add("C");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				v.hxSerialize(this);
				this.buf.add("g");
			} else {
				this.buf.add("c");
				this.serializeString(Type.getClassName(c));
				this.cache.push(v);
				this.serializeFields(v);
			}
		}
		break;
	case 4:
		if(this.useCache && this.serializeRef(v)) return;
		this.buf.add("o");
		this.serializeFields(v);
		break;
	case 7:
		var e = $e[2];
		if(this.useCache && this.serializeRef(v)) return;
		this.cache.pop();
		this.buf.add(this.useEnumIndex?"j":"w");
		this.serializeString(Type.getEnumName(e));
		if(this.useEnumIndex) {
			this.buf.add(":");
			this.buf.add(v[1]);
		} else this.serializeString(v[0]);
		this.buf.add(":");
		var l = v["length"];
		this.buf.add(l - 2);
		var _g = 2;
		while(_g < l) {
			var i = _g++;
			this.serialize(v[i]);
		}
		this.cache.push(v);
		break;
	case 5:
		throw "Cannot serialize function";
		break;
	default:
		throw "Cannot serialize " + Std.string(v);
	}
}
haxe.Serializer.prototype.serializeException = function(e) {
	this.buf.add("x");
	this.serialize(e);
}
haxe.Serializer.prototype.__class__ = haxe.Serializer;
intermedia.fengOffice.client.DeeplinkManager = function(p) {
	if( p === $_ ) return;
	this._deeplinkArray = new Hash();
	this._initDeepLinking();
}
intermedia.fengOffice.client.DeeplinkManager.__name__ = ["intermedia","fengOffice","client","DeeplinkManager"];
intermedia.fengOffice.client.DeeplinkManager._instance = null;
intermedia.fengOffice.client.DeeplinkManager.getInstance = function() {
	if(intermedia.fengOffice.client.DeeplinkManager._instance == null) intermedia.fengOffice.client.DeeplinkManager._instance = new intermedia.fengOffice.client.DeeplinkManager();
	return intermedia.fengOffice.client.DeeplinkManager._instance;
}
intermedia.fengOffice.client.DeeplinkManager.prototype._deeplinkArray = null;
intermedia.fengOffice.client.DeeplinkManager.prototype._initDeepLinking = function() {
	var t = this;
	window.onpopstate = function(event) {
		t._onDeeplinkChanged(event.state);
	};
}
intermedia.fengOffice.client.DeeplinkManager.prototype._onDeeplinkChanged = function(deeplink) {
	haxe.Log.trace("_onDeeplinkChanged(" + deeplink,{ fileName : "DeeplinkManager.hx", lineNumber : 25, className : "intermedia.fengOffice.client.DeeplinkManager", methodName : "_onDeeplinkChanged"});
	if(this._deeplinkArray.exists(deeplink)) this._deeplinkArray.get(deeplink).cbk(deeplink);
}
intermedia.fengOffice.client.DeeplinkManager.prototype.setDeeplink = function(deeplink,callbackFunction) {
	this._deeplinkArray.set(deeplink,{ deeplink : deeplink, cbk : callbackFunction});
	history.pushState(deeplink,deeplink,"?" + deeplink);
}
intermedia.fengOffice.client.DeeplinkManager.prototype.__class__ = intermedia.fengOffice.client.DeeplinkManager;
intermedia.fengOffice.client.application.Lang = function() { }
intermedia.fengOffice.client.application.Lang.__name__ = ["intermedia","fengOffice","client","application","Lang"];
intermedia.fengOffice.client.application.Lang.prototype.__class__ = intermedia.fengOffice.client.application.Lang;
List = function(p) {
	if( p === $_ ) return;
	this.length = 0;
}
List.__name__ = ["List"];
List.prototype.h = null;
List.prototype.q = null;
List.prototype.length = null;
List.prototype.add = function(item) {
	var x = [item];
	if(this.h == null) this.h = x; else this.q[1] = x;
	this.q = x;
	this.length++;
}
List.prototype.push = function(item) {
	var x = [item,this.h];
	this.h = x;
	if(this.q == null) this.q = x;
	this.length++;
}
List.prototype.first = function() {
	return this.h == null?null:this.h[0];
}
List.prototype.last = function() {
	return this.q == null?null:this.q[0];
}
List.prototype.pop = function() {
	if(this.h == null) return null;
	var x = this.h[0];
	this.h = this.h[1];
	if(this.h == null) this.q = null;
	this.length--;
	return x;
}
List.prototype.isEmpty = function() {
	return this.h == null;
}
List.prototype.clear = function() {
	this.h = null;
	this.q = null;
	this.length = 0;
}
List.prototype.remove = function(v) {
	var prev = null;
	var l = this.h;
	while(l != null) {
		if(l[0] == v) {
			if(prev == null) this.h = l[1]; else prev[1] = l[1];
			if(this.q == l) this.q = prev;
			this.length--;
			return true;
		}
		prev = l;
		l = l[1];
	}
	return false;
}
List.prototype.iterator = function() {
	return { h : this.h, hasNext : function() {
		return this.h != null;
	}, next : function() {
		if(this.h == null) return null;
		var x = this.h[0];
		this.h = this.h[1];
		return x;
	}};
}
List.prototype.toString = function() {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	s.b[s.b.length] = "{" == null?"null":"{";
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = ", " == null?"null":", ";
		s.add(Std.string(l[0]));
		l = l[1];
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
List.prototype.join = function(sep) {
	var s = new StringBuf();
	var first = true;
	var l = this.h;
	while(l != null) {
		if(first) first = false; else s.b[s.b.length] = sep == null?"null":sep;
		s.add(l[0]);
		l = l[1];
	}
	return s.b.join("");
}
List.prototype.filter = function(f) {
	var l2 = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		if(f(v)) l2.add(v);
	}
	return l2;
}
List.prototype.map = function(f) {
	var b = new List();
	var l = this.h;
	while(l != null) {
		var v = l[0];
		l = l[1];
		b.add(f(v));
	}
	return b;
}
List.prototype.__class__ = List;
haxe.Http = function(url) {
	if( url === $_ ) return;
	this.url = url;
	this.headers = new Hash();
	this.params = new Hash();
	this.async = true;
}
haxe.Http.__name__ = ["haxe","Http"];
haxe.Http.requestUrl = function(url) {
	var h = new haxe.Http(url);
	h.async = false;
	var r = null;
	h.onData = function(d) {
		r = d;
	};
	h.onError = function(e) {
		throw e;
	};
	h.request(false);
	return r;
}
haxe.Http.prototype.url = null;
haxe.Http.prototype.async = null;
haxe.Http.prototype.postData = null;
haxe.Http.prototype.headers = null;
haxe.Http.prototype.params = null;
haxe.Http.prototype.setHeader = function(header,value) {
	this.headers.set(header,value);
}
haxe.Http.prototype.setParameter = function(param,value) {
	this.params.set(param,value);
}
haxe.Http.prototype.setPostData = function(data) {
	this.postData = data;
}
haxe.Http.prototype.request = function(post) {
	var me = this;
	var r = new js.XMLHttpRequest();
	var onreadystatechange = function() {
		if(r.readyState != 4) return;
		var s = (function($this) {
			var $r;
			try {
				$r = r.status;
			} catch( e ) {
				$r = null;
			}
			return $r;
		}(this));
		if(s == undefined) s = null;
		if(s != null) me.onStatus(s);
		if(s != null && s >= 200 && s < 400) me.onData(r.responseText); else switch(s) {
		case null: case undefined:
			me.onError("Failed to connect or resolve host");
			break;
		case 12029:
			me.onError("Failed to connect to host");
			break;
		case 12007:
			me.onError("Unknown host");
			break;
		default:
			me.onError("Http Error #" + r.status);
		}
	};
	if(this.async) r.onreadystatechange = onreadystatechange;
	var uri = this.postData;
	if(uri != null) post = true; else {
		var $it0 = this.params.keys();
		while( $it0.hasNext() ) {
			var p = $it0.next();
			if(uri == null) uri = ""; else uri += "&";
			uri += StringTools.urlDecode(p) + "=" + StringTools.urlEncode(this.params.get(p));
		}
	}
	try {
		if(post) r.open("POST",this.url,this.async); else if(uri != null) {
			var question = this.url.split("?").length <= 1;
			r.open("GET",this.url + (question?"?":"&") + uri,this.async);
			uri = null;
		} else r.open("GET",this.url,this.async);
	} catch( e ) {
		this.onError(e.toString());
		return;
	}
	if(this.headers.get("Content-Type") == null && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	var $it1 = this.headers.keys();
	while( $it1.hasNext() ) {
		var h = $it1.next();
		r.setRequestHeader(h,this.headers.get(h));
	}
	r.send(uri);
	if(!this.async) onreadystatechange();
}
haxe.Http.prototype.onData = function(data) {
}
haxe.Http.prototype.onError = function(msg) {
}
haxe.Http.prototype.onStatus = function(status) {
}
haxe.Http.prototype.__class__ = haxe.Http;
ValueType = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] }
ValueType.TNull = ["TNull",0];
ValueType.TNull.toString = $estr;
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.toString = $estr;
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.toString = $estr;
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.toString = $estr;
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.toString = $estr;
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.toString = $estr;
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; $x.toString = $estr; return $x; }
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.toString = $estr;
ValueType.TUnknown.__enum__ = ValueType;
if(typeof js=='undefined') js = {}
js.Lib = function() { }
js.Lib.__name__ = ["js","Lib"];
js.Lib.isIE = null;
js.Lib.isOpera = null;
js.Lib.document = null;
js.Lib.window = null;
js.Lib.alert = function(v) {
	alert(js.Boot.__string_rec(v,""));
}
js.Lib.eval = function(code) {
	return eval(code);
}
js.Lib.setErrorHandler = function(f) {
	js.Lib.onerror = f;
}
js.Lib.prototype.__class__ = js.Lib;
haxe.Resource = function() { }
haxe.Resource.__name__ = ["haxe","Resource"];
haxe.Resource.content = null;
haxe.Resource.listNames = function() {
	var names = new Array();
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		names.push(x.name);
	}
	return names;
}
haxe.Resource.getString = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return x.str;
			var b = haxe.Unserializer.run(x.data);
			return b.toString();
		}
	}
	return null;
}
haxe.Resource.getBytes = function(name) {
	var _g = 0, _g1 = haxe.Resource.content;
	while(_g < _g1.length) {
		var x = _g1[_g];
		++_g;
		if(x.name == name) {
			if(x.str != null) return haxe.io.Bytes.ofString(x.str);
			return haxe.Unserializer.run(x.data);
		}
	}
	return null;
}
haxe.Resource.prototype.__class__ = haxe.Resource;
js.Boot = function() { }
js.Boot.__name__ = ["js","Boot"];
js.Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
}
js.Boot.__trace = function(v,i) {
	var msg = i != null?i.fileName + ":" + i.lineNumber + ": ":"";
	msg += js.Boot.__unhtml(js.Boot.__string_rec(v,"")) + "<br/>";
	var d = document.getElementById("haxe:trace");
	if(d == null) alert("No haxe:trace element defined\n" + msg); else d.innerHTML += msg;
}
js.Boot.__clear_trace = function() {
	var d = document.getElementById("haxe:trace");
	if(d != null) d.innerHTML = "";
}
js.Boot.__closure = function(o,f) {
	var m = o[f];
	if(m == null) return null;
	var f1 = function() {
		return m.apply(o,arguments);
	};
	f1.scope = o;
	f1.method = m;
	return f1;
}
js.Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ != null || o.__ename__ != null)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__ != null) {
				if(o.length == 2) return o[0];
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2, _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) str += "," + js.Boot.__string_rec(o[i],s); else str += js.Boot.__string_rec(o[i],s);
				}
				return str + ")";
			}
			var l = o.length;
			var i;
			var str = "[";
			s += "\t";
			var _g = 0;
			while(_g < l) {
				var i1 = _g++;
				str += (i1 > 0?",":"") + js.Boot.__string_rec(o[i1],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString) {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) { ;
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js.Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
}
js.Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0, _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js.Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js.Boot.__interfLoop(cc.__super__,cl);
}
js.Boot.__instanceof = function(o,cl) {
	try {
		if(o instanceof cl) {
			if(cl == Array) return o.__enum__ == null;
			return true;
		}
		if(js.Boot.__interfLoop(o.__class__,cl)) return true;
	} catch( e ) {
		if(cl == null) return false;
	}
	switch(cl) {
	case Int:
		return Math.ceil(o%2147483648.0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return o === true || o === false;
	case String:
		return typeof(o) == "string";
	case Dynamic:
		return true;
	default:
		if(o == null) return false;
		return o.__enum__ == cl || cl == Class && o.__name__ != null || cl == Enum && o.__ename__ != null;
	}
}
js.Boot.__init = function() {
	js.Lib.isIE = typeof document!='undefined' && document.all != null && typeof window!='undefined' && window.opera == null;
	js.Lib.isOpera = typeof window!='undefined' && window.opera != null;
	Array.prototype.copy = Array.prototype.slice;
	Array.prototype.insert = function(i,x) {
		this.splice(i,0,x);
	};
	Array.prototype.remove = Array.prototype.indexOf?function(obj) {
		var idx = this.indexOf(obj);
		if(idx == -1) return false;
		this.splice(idx,1);
		return true;
	}:function(obj) {
		var i = 0;
		var l = this.length;
		while(i < l) {
			if(this[i] == obj) {
				this.splice(i,1);
				return true;
			}
			i++;
		}
		return false;
	};
	Array.prototype.iterator = function() {
		return { cur : 0, arr : this, hasNext : function() {
			return this.cur < this.arr.length;
		}, next : function() {
			return this.arr[this.cur++];
		}};
	};
	if(String.prototype.cca == null) String.prototype.cca = String.prototype.charCodeAt;
	String.prototype.charCodeAt = function(i) {
		var x = this.cca(i);
		if(x != x) return null;
		return x;
	};
	var oldsub = String.prototype.substr;
	String.prototype.substr = function(pos,len) {
		if(pos != null && pos != 0 && len != null && len < 0) return "";
		if(len == null) len = this.length;
		if(pos < 0) {
			pos = this.length + pos;
			if(pos < 0) pos = 0;
		} else if(len < 0) len = this.length + len - pos;
		return oldsub.apply(this,[pos,len]);
	};
	$closure = js.Boot.__closure;
}
js.Boot.prototype.__class__ = js.Boot;
IntHash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
IntHash.__name__ = ["IntHash"];
IntHash.prototype.h = null;
IntHash.prototype.set = function(key,value) {
	this.h[key] = value;
}
IntHash.prototype.get = function(key) {
	return this.h[key];
}
IntHash.prototype.exists = function(key) {
	return this.h[key] != null;
}
IntHash.prototype.remove = function(key) {
	if(this.h[key] == null) return false;
	delete(this.h[key]);
	return true;
}
IntHash.prototype.keys = function() {
	var a = new Array();
	for( x in this.h ) a.push(x);
	return a.iterator();
}
IntHash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref[i];
	}};
}
IntHash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
IntHash.prototype.__class__ = IntHash;
intermedia.fengOffice.client.Input = function() { }
intermedia.fengOffice.client.Input.__name__ = ["intermedia","fengOffice","client","Input"];
intermedia.fengOffice.client.Input.initPhoneGap = function() {
	document.addEventListener("backKeyDown",function(e) {
		window.history.back();
	},false);
}
intermedia.fengOffice.client.Input.prototype.__class__ = intermedia.fengOffice.client.Input;
intermedia.fengOffice.client.widgets.Widget = function(id,title,container) {
	if( id === $_ ) return;
	this._container = container;
	this._id = id;
	var str = haxe.Resource.getString("widget");
	var t = new haxe.Template(str);
	var output = t.execute({ id : id, title : title});
	this._container.innerHTML = output;
	js.Lib.window.onresize = $closure(this,"refresh");
	this.refresh();
}
intermedia.fengOffice.client.widgets.Widget.__name__ = ["intermedia","fengOffice","client","widgets","Widget"];
intermedia.fengOffice.client.widgets.Widget.prototype._container = null;
intermedia.fengOffice.client.widgets.Widget.prototype._id = null;
intermedia.fengOffice.client.widgets.Widget.prototype.refresh = function(e) {
	var desiredBodyHeight = js.Lib.document.body.clientHeight - (this.getTitleElement().clientHeight + this.getFooterElement().clientHeight);
	this.getBodyElement().style.height = desiredBodyHeight + "px";
}
intermedia.fengOffice.client.widgets.Widget.prototype.getTitleElement = function() {
	return js.Lib.document.getElementById("WindowsId" + this._id + "Title");
}
intermedia.fengOffice.client.widgets.Widget.prototype.getBodyElement = function() {
	return js.Lib.document.getElementById("WindowsId" + this._id + "Body");
}
intermedia.fengOffice.client.widgets.Widget.prototype.getFooterElement = function() {
	return js.Lib.document.getElementById("WindowsId" + this._id + "Footer");
}
intermedia.fengOffice.client.widgets.Widget.prototype.setTitle = function(title) {
	js.Lib.document.getElementById("WindowsId" + this._id + "Title").innerHTML = title;
}
intermedia.fengOffice.client.widgets.Widget.prototype.getTitle = function() {
	return js.Lib.document.getElementById("WindowsId" + this._id + "Title").innerHTML;
}
intermedia.fengOffice.client.widgets.Widget.prototype.setBody = function(body) {
	js.Lib.document.getElementById("WindowsId" + this._id + "Body").innerHTML = body;
}
intermedia.fengOffice.client.widgets.Widget.prototype.getBody = function() {
	return js.Lib.document.getElementById("WindowsId" + this._id + "Body").innerHTML;
}
intermedia.fengOffice.client.widgets.Widget.prototype.setFooter = function(footer) {
	js.Lib.document.getElementById("WindowsId" + this._id + "Footer").innerHTML = footer;
}
intermedia.fengOffice.client.widgets.Widget.prototype.getFooter = function() {
	return js.Lib.document.getElementById("WindowsId" + this._id + "Footer").innerHTML;
}
intermedia.fengOffice.client.widgets.Widget.prototype.__class__ = intermedia.fengOffice.client.widgets.Widget;
Hash = function(p) {
	if( p === $_ ) return;
	this.h = {}
	if(this.h.__proto__ != null) {
		this.h.__proto__ = null;
		delete(this.h.__proto__);
	}
}
Hash.__name__ = ["Hash"];
Hash.prototype.h = null;
Hash.prototype.set = function(key,value) {
	this.h["$" + key] = value;
}
Hash.prototype.get = function(key) {
	return this.h["$" + key];
}
Hash.prototype.exists = function(key) {
	try {
		key = "$" + key;
		return this.hasOwnProperty.call(this.h,key);
	} catch( e ) {
		for(var i in this.h) if( i == key ) return true;
		return false;
	}
}
Hash.prototype.remove = function(key) {
	if(!this.exists(key)) return false;
	delete(this.h["$" + key]);
	return true;
}
Hash.prototype.keys = function() {
	var a = new Array();
	for(var i in this.h) a.push(i.substr(1));
	return a.iterator();
}
Hash.prototype.iterator = function() {
	return { ref : this.h, it : this.keys(), hasNext : function() {
		return this.it.hasNext();
	}, next : function() {
		var i = this.it.next();
		return this.ref["$" + i];
	}};
}
Hash.prototype.toString = function() {
	var s = new StringBuf();
	s.b[s.b.length] = "{" == null?"null":"{";
	var it = this.keys();
	while( it.hasNext() ) {
		var i = it.next();
		s.b[s.b.length] = i == null?"null":i;
		s.b[s.b.length] = " => " == null?"null":" => ";
		s.add(Std.string(this.get(i)));
		if(it.hasNext()) s.b[s.b.length] = ", " == null?"null":", ";
	}
	s.b[s.b.length] = "}" == null?"null":"}";
	return s.b.join("");
}
Hash.prototype.__class__ = Hash;
$_ = {}
js.Boot.__res = {}
js.Boot.__init();
{
	var d = Date;
	d.now = function() {
		return new Date();
	};
	d.fromTime = function(t) {
		var d1 = new Date();
		d1["setTime"](t);
		return d1;
	};
	d.fromString = function(s) {
		switch(s.length) {
		case 8:
			var k = s.split(":");
			var d1 = new Date();
			d1["setTime"](0);
			d1["setUTCHours"](k[0]);
			d1["setUTCMinutes"](k[1]);
			d1["setUTCSeconds"](k[2]);
			return d1;
		case 10:
			var k = s.split("-");
			return new Date(k[0],k[1] - 1,k[2],0,0,0);
		case 19:
			var k = s.split(" ");
			var y = k[0].split("-");
			var t = k[1].split(":");
			return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
		default:
			throw "Invalid date format : " + s;
		}
	};
	d.prototype["toString"] = function() {
		var date = this;
		var m = date.getMonth() + 1;
		var d1 = date.getDate();
		var h = date.getHours();
		var mi = date.getMinutes();
		var s = date.getSeconds();
		return date.getFullYear() + "-" + (m < 10?"0" + m:"" + m) + "-" + (d1 < 10?"0" + d1:"" + d1) + " " + (h < 10?"0" + h:"" + h) + ":" + (mi < 10?"0" + mi:"" + mi) + ":" + (s < 10?"0" + s:"" + s);
	};
	d.prototype.__class__ = d;
	d.__name__ = ["Date"];
}
{
	String.prototype.__class__ = String;
	String.__name__ = ["String"];
	Array.prototype.__class__ = Array;
	Array.__name__ = ["Array"];
	Int = { __name__ : ["Int"]};
	Dynamic = { __name__ : ["Dynamic"]};
	Float = Number;
	Float.__name__ = ["Float"];
	Bool = { __ename__ : ["Bool"]};
	Class = { __name__ : ["Class"]};
	Enum = { };
	Void = { __ename__ : ["Void"]};
}
{
	Math.__name__ = ["Math"];
	Math.NaN = Number["NaN"];
	Math.NEGATIVE_INFINITY = Number["NEGATIVE_INFINITY"];
	Math.POSITIVE_INFINITY = Number["POSITIVE_INFINITY"];
	Math.isFinite = function(i) {
		return isFinite(i);
	};
	Math.isNaN = function(i) {
		return isNaN(i);
	};
}
{
	js.Lib.document = document;
	js.Lib.window = window;
	onerror = function(msg,url,line) {
		var f = js.Lib.onerror;
		if( f == null )
			return false;
		return f(msg,[url+":"+line]);
	}
}
haxe.Resource.content = [{ name : "list_footer", data : "s1002:IDxkaXYgaWQ9Imxpc3RGb290ZXIiIHN0eWxlPSJiYWNrZ3JvdW5kLXNpemU6IDEwMCU7IG1hcmdpbiA6IDBweDsgcGFkZGluZyA6IDFweDsgIj4NCgk8dWwgc3R5bGU9Im1hcmdpbjogMDsgcGFkZGluZzogMTA7IGxpc3Qtc3R5bGUtdHlwZTogbm9uZTsgIj4NCgkgICAgPGxpIGlkPSJsaXN0Rm9vdGVySG9tZUJ0biI%DQoJICAgIAk8aW1nIHNyYz0iLi9hc3NldHMvbmF2aWdhdGlvbi9sb2dvX2JpZy5wbmciIHN0eWxlPSJtYXJnaW4gOiAwcHg7IHdpZHRoOiA0MHB4OyBoZWlnaHQ6IDQwcHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgIiAvPg0KCSAgICA8L2xpPg0KPCEtLSAgICAgPGxpIGlkPSJsaXN0Rm9vdGVyQmFja0J0biIgc3R5bGU9ImJhY2tncm91bmQtaW1hZ2U6IHVybChhc3NldHMvbmF2aWdhdGlvbi9hcnJvd19sZWZ0LnBuZyk7IG1hcmdpbiA6IDBweDsgd2lkdGg6IDUwcHg7IGhlaWdodDogNTBweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAiPjwvbGk%DQoJICAgIDxsaSBpZD0ibGlzdEZvb3RlckZvcndhcmRCdG4iIHN0eWxlPSJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzL25hdmlnYXRpb24vYXJyb3dfcmlnaHQucG5nKTsgbWFyZ2luIDogMHB4OyB3aWR0aDogNTBweDsgaGVpZ2h0OiA1MHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7ICI%PC9saT4NCi0tPgk8L3VsPg0KICA8L2Rpdj4NCjwhLS0gYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vYXNzZXRzL3doaXRlLXRvcC1ib3R0b20uZ2lmKTsgIC0tPg"},{ name : "widget", data : "s764:ICA8ZGl2IGlkPSJXaW5kb3dzSWQ6OmlkOjoiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgYmFja2dyb3VuZC1zaXplOiAxMDAlOyBtYXJnaW4gOiAwcHg7IHBhZGRpbmcgOiAxcHg7IGhlaWdodDoxMDAlOyB3aWR0aDoxMDAlICI%DQogICAgPGRpdiBpZD0iV2luZG93c0lkOjppZDo6Qm9keSIgc3R5bGU9InBhZGRpbmc6IDEwcHg7IG1hcmdpbjogMHB4OyBvdmVyZmxvdzogYXV0bzsgb3ZlcmZsb3cteDogaGlkZGVuOyANCgkgICAgcGFkZGluZzogMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgYm9yZGVyLXJhZGl1czogMHB4OyAiPjwvZGl2Pg0KICAgIDxkaXYgaWQ9IldpbmRvd3NJZDo6aWQ6OkZvb3RlciIgPg0KICAgIDwvZGl2Pg0KICAgPHAgaWQ9IldpbmRvd3NJZDo6aWQ6OlRpdGxlIiBzdHlsZT0iZGlzcGxheTpub25lOyBtYXJnaW46MDsgZm9udC1mYW1pbHk6IFZlcmRhbmEsQXJpYWw7IHRleHQtYWxpZ246IHJpZ2h0OyI%Ojp0aXRsZTo6PC9wPiAgDQogIDwvZGl2Pg0KPCEtLSBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9hc3NldHMvd2hpdGUtdG9wLWJvdHRvbS5naWYpOyAgLS0%"},{ name : "mail_contents", data : "s3235:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuSVRFTV9TRUxFQ1Q6OjwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImhlaWdodDozMHB4OyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwcHg7ICI%DQogICAgCTwhLS0gIDxoMj46OnRpdGxlOjo8L2gyPiAtLT4NCiAgICAJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDEwMHB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAzMHB4IDEwcHg7ICI%DQoJICAgIAk8ZGl2Pg0KCSAgICAJCTxpbWcgc3JjPSJhc3NldHMvb2JqZWN0cy9lbWFpbC5wbmciIHN0eWxlPSJtYXJnaW46IDVweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgZmxvYXQ6bGVmdDsgIi8%DQoJICAgIAk8L2Rpdj4NCgkgICAgCTxkaXY%DQoJCQkgICAJOjppZiBoYXNQYXJlbnQ6Og0KCQkJCSAgIAk8dWwgc3R5bGU9Imxpc3Qtc3R5bGUtdHlwZTpub25lOyAiPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgb246IDo6Y3VySXRlbS5jcmVhdGVkX29uOjo8L2xpPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgYnk6IDo6Y3VySXRlbS5jcmVhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGN1ckl0ZW0uY3JlYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6Y3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjpjdXJJdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBieTogOjpjdXJJdGVtLnVwZGF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgPC91bD4NCgkJCSAgICA6OmVsc2U6Og0KCQkgICAgCQk6OkxhbmcuRU1BSUxTX1RFWFQ6Og0KCQkJICAgIDo6ZW5kOjoNCgkJCSA8L2Rpdj4NCgkgICAgPC9zbWFsbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IHN0eWxlPSJib3JkZXItdG9wOiAxcHggZG90dGVkOyAiPg0KCTx1bCBzdHlsZT0ibGlzdC1zdHlsZS10eXBlOiBub25lOyB0ZXh0LWFsaWduOnJpZ2h0OyBtYXJnaW46MDtwYWRkaW5nOjAiPjo6Zm9yZWFjaCBpdGVtczo6DQoJICA8bGkgc3R5bGU9Im1hcmdpbi1ib3R0b206IDBweDsgcGFkZGluZy1ib3R0b206IDVweDsgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZDsgaGVpZ2h0OiAzNnB4ICI%DQoJCSAgPGRpdiBzdHlsZT0ibWFyZ2luOiAwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHdoaXRlLXNwYWNlOm5vd3JhcDsgZmxvYXQ6bGVmdDsgIj4NCgkJICAJCTxpbWcgaWQ9Iml0ZW1CdG46OmlkOjoiIHN0eWxlPSJtYXJnaW46IDAgMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBmbG9hdDpsZWZ0OyB3aWR0aDozNnB4OyA6OmlmIG51bUNoaWxkcmVuOjo6OmVsc2U6OmRpc3BsYXk6IG5vbmU7IDo6ZW5kOjoiIA0KCQkgIAkJCXNyYz0iOjpDb25maWcuRk9fVVJMOjovcHVibGljL2Fzc2V0cy90aGVtZXMvZGVmYXVsdC9leHRqcy9pbWFnZXMvZGVmYXVsdC90cmVlL2VsYm93LXBsdXMuZ2lmIiAvPg0KCQkgIAkJPGltZyBzdHlsZT0ibWFyZ2luOiAwIDEwcHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZmxvYXQ6bGVmdDsgd2lkdGg6MzZweDsgOjppZiBudW1DaGlsZHJlbjo6ZGlzcGxheTogbm9uZTsgOjplbmQ6OiIgDQoJCSAgCQkJc3JjPSI6OkNvbmZpZy5GT19VUkw6Oi9wdWJsaWMvYXNzZXRzL3RoZW1lcy9kZWZhdWx0L2V4dGpzL2ltYWdlcy9kZWZhdWx0L3RyZWUvZWxib3cuZ2lmIiAvPg0KCQkJCTxkaXYgaWQ9InNlbGVjdEJ0bjo6aWQ6OiIgc3R5bGU9IiB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBtYXJnaW4tdG9wOiA1OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGhlaWdodDogMTAwJTsgIj4NCgkJCQkJOjpuYW1lOjo8c21hbGw%IDo6dXBkYXRlZF9vbjo6IGJ5IDo6dXBkYXRlZF9ieS51c2VybmFtZTo6PC9zbWFsbD4NCgkJCQk8L2Rpdj4NCgkJICA8L2Rpdj4NCgkgIDwvbGk%OjplbmQ6Og0KCTwvdWw%DQogICAgPC9kaXY%DQogIDwvZGl2Pg0KPCEtLSAgIDo6aXRlbXM6OiAgLS0%ICAgDQo8YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48aHIgLz4NCkRlYnVnOg0KPHNtYWxsPjo6aXRlbXM6Ojwvc21hbGw%ICA"},{ name : "home", data : "s3987:ICA8ZGl2IGlkPSJob21lU2NyZWVuIiBzdHlsZT0icGFkZGluZzogMTBweDsgIj4NCjwhLS0gaG9tZSBzY3JlZW4gPSBjdXJyZW50IHNlbGVjdGlvbiAod29ya3NwYWNlLCB0YWdzLCBmaWx0ZXIpICsgdGFicyAoZG9jcywgZW1haWxzLCBjb250YWN0Li4uKSAgLS0%DQoJPHVsIHN0eWxlPSJtYXJnaW46IDIwOyBwYWRkaW5nOiAwOyBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyAiPg0KCQk8bGkgaWQ9IndvcmtzcGFjZUJ0biIgc3R5bGU9Im1hcmdpbiA6IDBweDsgbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAiPg0KCQkJPGltZyBzcmM9Ii4vYXNzZXRzL25hdmlnYXRpb24vbG9nb19iaWcucG5nIiBzdHlsZT0ibWFyZ2luIDogMHB4OyB3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7ICIgLz4NCgkJCTxkaXYgc3R5bGU9ImRpc3BsYXk6IGlubGluZS1ibG9jazsgdmVydGljYWwtYWxpZ246IHRvcDsgIiA%DQoJCQkJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDA7IHBhZGRpbmc6IDA7ICI%OjpMYW5nLkNVUlJFTlRfV09SS1NQQUNFX0xBQkVMOjo8L3NtYWxsPjxiciAvPg0KCQkJCTxzdHJvbmcgc3R5bGU9Im1hcmdpbjogMDsgcGFkZGluZzogMDsgIj46OmFwcFN0YXRlLmN1cldvcmtzcGFjZS5uYW1lOjo8L3N0cm9uZz4NCgkJCQk8c21hbGwgc3R5bGU9Im1hcmdpbjogMDsgcGFkZGluZzogMDsgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7ICI%OjpMYW5nLkNIQU5HRV9XT1JLU1BBQ0VfTEFCRUw6Ojwvc21hbGw%DQoJCQk8L2Rpdj4NCgkJPC9saT4NCgk8L3VsPg0KCTx1bCBzdHlsZT0ibWFyZ2luOiAwOyBwYWRkaW5nOiAwOyBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyAiPg0KCSAgIAk8bGkgaWQ9ImZpbGVzQnRuIiBzdHlsZT0ibWFyZ2luIDogMjBweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAiPg0KICAgIAkJPGRpdiBzdHlsZT0iYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy9vYmplY3RzL2ZpbGVzLnBuZyk7IG1hcmdpbiA6IDBweDsgd2lkdGg6IDUwcHg7IGhlaWdodDogNTBweDsgIj48L2Rpdj4NCiAgICAJCTxwIHN0eWxlPSJtYXJnaW4gOiAwcHg7IHdpZHRoOiA1MHB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgIj46OkxhbmcuRklMRVNfTEFCRUw6OjwvcD4NCiAgICAJPC9saT4NCiAgICAJPGxpIGlkPSJ0YXNrc0J0biIgc3R5bGU9Im1hcmdpbiA6IDIwcHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgIj4NCiAgICAJCTxkaXYgc3R5bGU9ImJhY2tncm91bmQtaW1hZ2U6IHVybChhc3NldHMvb2JqZWN0cy90YXNrcy5wbmcpOyBtYXJnaW4gOiAwcHg7IHdpZHRoOiA1MHB4OyBoZWlnaHQ6IDUwcHg7ICI%PC9kaXY%DQogICAgCQk8cCBzdHlsZT0ibWFyZ2luIDogMHB4OyB3aWR0aDogNTBweDsgdGV4dC1hbGlnbjpjZW50ZXI7ICI%OjpMYW5nLlRBU0tTX0xBQkVMOjo8L3A%DQoJICAgIDwvbGk%DQogICAgCTxsaSBpZD0ibm90ZXNCdG4iIHN0eWxlPSJtYXJnaW4gOiAyMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7ICI%DQogICAgCQk8ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzL29iamVjdHMvbm90ZS5wbmcpOyBtYXJnaW4gOiAwcHg7IHdpZHRoOiA1MHB4OyBoZWlnaHQ6IDUwcHg7ICI%PC9kaXY%DQogICAgCQk8cCBzdHlsZT0ibWFyZ2luIDogMHB4OyB3aWR0aDogNTBweDsgdGV4dC1hbGlnbjpjZW50ZXI7ICI%OjpMYW5nLk5PVEVTX0xBQkVMOjo8L3A%DQogICAgCTwvbGk%DQogICAgCTxsaSBpZD0iZW1haWxzQnRuIiBzdHlsZT0ibWFyZ2luIDogMjBweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAiPg0KICAgIAkJPGRpdiBzdHlsZT0iYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy9vYmplY3RzL2VtYWlsLnBuZyk7IG1hcmdpbiA6IDBweDsgd2lkdGg6IDUwcHg7IGhlaWdodDogNTBweDsgIj48L2Rpdj4NCiAgICAJCTxwIHN0eWxlPSJtYXJnaW4gOiAwcHg7IHdpZHRoOiA1MHB4OyB0ZXh0LWFsaWduOmNlbnRlcjsgIj46OkxhbmcuRU1BSUxTX0xBQkVMOjo8L3A%DQogICAgCTwvbGk%DQogICAgCTxsaSBpZD0ibGlua3NCdG4iIHN0eWxlPSJtYXJnaW4gOiAyMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7ICI%DQogICAgCQk8ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzL29iamVjdHMvd2VibGluay5wbmcpOyBtYXJnaW4gOiAwcHg7IHdpZHRoOiA1MHB4OyBoZWlnaHQ6IDUwcHg7ICI%PC9kaXY%DQogICAgCQk8cCBzdHlsZT0ibWFyZ2luIDogMHB4OyB3aWR0aDogNTBweDsgdGV4dC1hbGlnbjpjZW50ZXI7ICI%OjpMYW5nLkxJTktTX0xBQkVMOjo8L3A%DQogICAgCTwvbGk%DQogICAgCTxsaSBpZD0iY2FsZW5kYXJCdG4iIHN0eWxlPSJtYXJnaW4gOiAyMHB4OyBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7ICI%DQogICAgCQk8ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzL29iamVjdHMvdmlld19jYWxlbmRhcl9kYXkucG5nKTsgbWFyZ2luIDogMHB4OyB3aWR0aDogNTBweDsgaGVpZ2h0OiA1MHB4OyAiPjwvZGl2Pg0KICAgIAkJPHAgc3R5bGU9Im1hcmdpbiA6IDBweDsgd2lkdGg6IDUwcHg7IHRleHQtYWxpZ246Y2VudGVyOyAiPjo6TGFuZy5DQUxFTkRBUl9MQUJFTDo6PC9wPg0KICAgIAk8L2xpPg0KICAgIAk8bGkgaWQ9ImNvbnRhY3RzQnRuIiBzdHlsZT0ibWFyZ2luIDogMjBweDsgZGlzcGxheTogaW5saW5lLWJsb2NrOyAiPg0KICAgIAkJPGRpdiBzdHlsZT0iYmFja2dyb3VuZC1pbWFnZTogdXJsKGFzc2V0cy9vYmplY3RzL2dyb3Vwcy5wbmcpOyBtYXJnaW4gOiAwcHg7IHdpZHRoOiA1MHB4OyBoZWlnaHQ6IDUwcHg7ICI%PC9kaXY%DQogICAgCQk8cCBzdHlsZT0ibWFyZ2luIDogMHB4OyB3aWR0aDogNTBweDsgdGV4dC1hbGlnbjpjZW50ZXI7ICI%OjpMYW5nLkNPTlRBQ1RTX0xBQkVMOjo8L3A%DQogICAgCTwvbGk%DQoJPC91bD4NCiAgPC9kaXY%DQo"},{ name : "contacts_detail", data : "s902:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAxMHB4OyAiPg0KICAgIDxkaXY%DQogICAgIAk8aDM%OjppdGVtLm5hbWU6OjwvaDM%DQogICAgCTxzbWFsbD4NCgkJICAgCTx1bD4NCgkJICAgIAk8bGk%Y3JlYXRlZCBvbjogOjppdGVtLmNyZWF0ZWRfb246OjwvbGk%DQoJCSAgICAJPGxpPmNyZWF0ZWQgYnk6IDo6aXRlbS5jcmVhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGl0ZW0uY3JlYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6aXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCSAgICAJPGxpPnVwZGF0ZWQgb246IDo6aXRlbS51cGRhdGVkX29uOjo8L2xpPg0KCQkgICAgCTxsaT51cGRhdGVkIGJ5OiA6Oml0ZW0udXBkYXRlZF9ieS51c2VybmFtZTo6OjppZiBpdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OjxpbWcgc3JjPSI6Oml0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6IiAvPjo6ZW5kOjo8L2xpPg0KCQkgICAgPC91bD4NCgkgICAgPC9zbWFsbD4NCiAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJPCEtLSAgIDo6aXRlbTo6ICAtLT4gICANCgk8YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48aHIgLz4NCglEZWJ1ZzoNCgk8c21hbGw%OjppdGVtOjo8L3NtYWxsPiAgDQogICAgPC9kaXY%DQogIDwvZGl2Pg"},{ name : "project_files", data : "s3234:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuSVRFTV9TRUxFQ1Q6OjwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImhlaWdodDozMHB4OyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwcHg7ICI%DQogICAgCTwhLS0gIDxoMj46OnRpdGxlOjo8L2gyPiAtLT4NCiAgICAJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDEwMHB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAzMHB4IDEwcHg7ICI%DQoJICAgIAk8ZGl2Pg0KCSAgICAJCTxpbWcgc3JjPSJhc3NldHMvb2JqZWN0cy9maWxlcy5wbmciIHN0eWxlPSJtYXJnaW46IDVweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgZmxvYXQ6bGVmdDsgIi8%DQoJICAgIAk8L2Rpdj4NCgkgICAgCTxkaXY%DQoJCQkgICAJOjppZiBoYXNQYXJlbnQ6Og0KCQkJCSAgIAk8dWwgc3R5bGU9Imxpc3Qtc3R5bGUtdHlwZTpub25lOyAiPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgb246IDo6Y3VySXRlbS5jcmVhdGVkX29uOjo8L2xpPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgYnk6IDo6Y3VySXRlbS5jcmVhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGN1ckl0ZW0uY3JlYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6Y3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjpjdXJJdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBieTogOjpjdXJJdGVtLnVwZGF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgPC91bD4NCgkJCSAgICA6OmVsc2U6Og0KCQkgICAgCQk6OkxhbmcuRklMRVNfVEVYVDo6DQoJCQkgICAgOjplbmQ6Og0KCQkJIDwvZGl2Pg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImJvcmRlci10b3A6IDFweCBkb3R0ZWQ7ICI%DQoJPHVsIHN0eWxlPSJsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IHRleHQtYWxpZ246cmlnaHQ7IG1hcmdpbjowO3BhZGRpbmc6MCI%Ojpmb3JlYWNoIGl0ZW1zOjoNCgkgIDxsaSBzdHlsZT0ibWFyZ2luLWJvdHRvbTogMHB4OyBwYWRkaW5nLWJvdHRvbTogNXB4OyBib3JkZXItYm90dG9tOiAxcHggZG90dGVkOyBoZWlnaHQ6IDM2cHggIj4NCgkJICA8ZGl2IHN0eWxlPSJtYXJnaW46IDA7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgd2hpdGUtc3BhY2U6bm93cmFwOyBmbG9hdDpsZWZ0OyAiPg0KCQkgIAkJPGltZyBpZD0iaXRlbUJ0bjo6aWQ6OiIgc3R5bGU9Im1hcmdpbjogMCAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZsb2F0OmxlZnQ7IHdpZHRoOjM2cHg7IDo6aWYgbnVtQ2hpbGRyZW46Ojo6ZWxzZTo6ZGlzcGxheTogbm9uZTsgOjplbmQ6OiIgDQoJCSAgCQkJc3JjPSI6OkNvbmZpZy5GT19VUkw6Oi9wdWJsaWMvYXNzZXRzL3RoZW1lcy9kZWZhdWx0L2V4dGpzL2ltYWdlcy9kZWZhdWx0L3RyZWUvZWxib3ctcGx1cy5naWYiIC8%DQoJCSAgCQk8aW1nIHN0eWxlPSJtYXJnaW46IDAgMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBmbG9hdDpsZWZ0OyB3aWR0aDozNnB4OyA6OmlmIG51bUNoaWxkcmVuOjpkaXNwbGF5OiBub25lOyA6OmVuZDo6IiANCgkJICAJCQlzcmM9Ijo6Q29uZmlnLkZPX1VSTDo6L3B1YmxpYy9hc3NldHMvdGhlbWVzL2RlZmF1bHQvZXh0anMvaW1hZ2VzL2RlZmF1bHQvdHJlZS9lbGJvdy5naWYiIC8%DQoJCQkJPGRpdiBpZD0ic2VsZWN0QnRuOjppZDo6IiBzdHlsZT0iIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbi10b3A6IDU7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgaGVpZ2h0OiAxMDAlOyAiPg0KCQkJCQk6Om5hbWU6OjxzbWFsbD4gOjp1cGRhdGVkX29uOjogYnkgOjp1cGRhdGVkX2J5LnVzZXJuYW1lOjo8L3NtYWxsPg0KCQkJCTwvZGl2Pg0KCQkgIDwvZGl2Pg0KCSAgPC9saT46OmVuZDo6DQoJPC91bD4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%DQo8IS0tICAgOjppdGVtczo6ICAtLT4gICANCjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxociAvPg0KRGVidWc6DQo8c21hbGw%OjppdGVtczo6PC9zbWFsbD4gIA"},{ name : "loading", data : "s171:ICA8ZGl2IGlkPSJ3aWRnZXRzIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyB3aWR0aDogNDBweDsgaGVpZ2h0OiA0MHB4OyI%DQogIAkJPGltZyBzcmM9ImFzc2V0cy9uYXZpZ2F0aW9uL2xvYWRpbmcuZ2lmIiAvPg0KICA8L2Rpdj4"},{ name : "contacts", data : "s3254:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuSVRFTV9TRUxFQ1Q6OjwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImhlaWdodDozMHB4OyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwcHg7ICI%DQogICAgCTwhLS0gIDxoMj46OnRpdGxlOjo8L2gyPiAtLT4NCiAgICAJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDEwMHB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAzMHB4IDEwcHg7ICI%DQoJICAgIAk8ZGl2Pg0KCSAgICAJCTxpbWcgc3JjPSJhc3NldHMvb2JqZWN0cy9jdXN0b21fcHJvcGVydGllcy5wbmciIHN0eWxlPSJtYXJnaW46IDVweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgZmxvYXQ6bGVmdDsgIi8%DQoJICAgIAk8L2Rpdj4NCgkgICAgCTxkaXY%DQoJCQkgICAJOjppZiBoYXNQYXJlbnQ6Og0KCQkJCSAgIAk8dWwgc3R5bGU9Imxpc3Qtc3R5bGUtdHlwZTpub25lOyAiPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgb246IDo6Y3VySXRlbS5jcmVhdGVkX29uOjo8L2xpPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgYnk6IDo6Y3VySXRlbS5jcmVhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGN1ckl0ZW0uY3JlYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6Y3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjpjdXJJdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBieTogOjpjdXJJdGVtLnVwZGF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgPC91bD4NCgkJCSAgICA6OmVsc2U6Og0KCQkgICAgCQk6OkxhbmcuQ09OVEFDVFNfVEVYVDo6DQoJCQkgICAgOjplbmQ6Og0KCQkJIDwvZGl2Pg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImJvcmRlci10b3A6IDFweCBkb3R0ZWQ7ICI%DQoJPHVsIHN0eWxlPSJsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IHRleHQtYWxpZ246cmlnaHQ7IG1hcmdpbjowO3BhZGRpbmc6MCI%Ojpmb3JlYWNoIGl0ZW1zOjoNCgkgIDxsaSBzdHlsZT0ibWFyZ2luLWJvdHRvbTogMHB4OyBwYWRkaW5nLWJvdHRvbTogNXB4OyBib3JkZXItYm90dG9tOiAxcHggZG90dGVkOyBoZWlnaHQ6IDM2cHggIj4NCgkJICA8ZGl2IHN0eWxlPSJtYXJnaW46IDA7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgd2hpdGUtc3BhY2U6bm93cmFwOyBmbG9hdDpsZWZ0OyAiPg0KCQkgIAkJPGltZyBpZD0iaXRlbUJ0bjo6aWQ6OiIgc3R5bGU9Im1hcmdpbjogMCAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZsb2F0OmxlZnQ7IHdpZHRoOjM2cHg7IDo6aWYgbnVtQ2hpbGRyZW46Ojo6ZWxzZTo6ZGlzcGxheTogbm9uZTsgOjplbmQ6OiIgDQoJCSAgCQkJc3JjPSI6OkNvbmZpZy5GT19VUkw6Oi9wdWJsaWMvYXNzZXRzL3RoZW1lcy9kZWZhdWx0L2V4dGpzL2ltYWdlcy9kZWZhdWx0L3RyZWUvZWxib3ctcGx1cy5naWYiIC8%DQoJCSAgCQk8aW1nIHN0eWxlPSJtYXJnaW46IDAgMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBmbG9hdDpsZWZ0OyB3aWR0aDozNnB4OyA6OmlmIG51bUNoaWxkcmVuOjpkaXNwbGF5OiBub25lOyA6OmVuZDo6IiANCgkJICAJCQlzcmM9Ijo6Q29uZmlnLkZPX1VSTDo6L3B1YmxpYy9hc3NldHMvdGhlbWVzL2RlZmF1bHQvZXh0anMvaW1hZ2VzL2RlZmF1bHQvdHJlZS9lbGJvdy5naWYiIC8%DQoJCQkJPGRpdiBpZD0ic2VsZWN0QnRuOjppZDo6IiBzdHlsZT0iIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbi10b3A6IDU7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgaGVpZ2h0OiAxMDAlOyAiPg0KCQkJCQk6Om5hbWU6OjxzbWFsbD4gOjp1cGRhdGVkX29uOjogYnkgOjp1cGRhdGVkX2J5LnVzZXJuYW1lOjo8L3NtYWxsPg0KCQkJCTwvZGl2Pg0KCQkgIDwvZGl2Pg0KCSAgPC9saT46OmVuZDo6DQoJPC91bD4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%DQo8IS0tICAgOjppdGVtczo6ICAtLT4gICANCjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxociAvPg0KRGVidWc6DQo8c21hbGw%OjppdGVtczo6PC9zbWFsbD4gIA"},{ name : "project_tasks", data : "s3234:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuSVRFTV9TRUxFQ1Q6OjwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImhlaWdodDozMHB4OyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwcHg7ICI%DQogICAgCTwhLS0gIDxoMj46OnRpdGxlOjo8L2gyPiAtLT4NCiAgICAJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDEwMHB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAzMHB4IDEwcHg7ICI%DQoJICAgIAk8ZGl2Pg0KCSAgICAJCTxpbWcgc3JjPSJhc3NldHMvb2JqZWN0cy90YXNrcy5wbmciIHN0eWxlPSJtYXJnaW46IDVweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgZmxvYXQ6bGVmdDsgIi8%DQoJICAgIAk8L2Rpdj4NCgkgICAgCTxkaXY%DQoJCQkgICAJOjppZiBoYXNQYXJlbnQ6Og0KCQkJCSAgIAk8dWwgc3R5bGU9Imxpc3Qtc3R5bGUtdHlwZTpub25lOyAiPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgb246IDo6Y3VySXRlbS5jcmVhdGVkX29uOjo8L2xpPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgYnk6IDo6Y3VySXRlbS5jcmVhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGN1ckl0ZW0uY3JlYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6Y3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjpjdXJJdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBieTogOjpjdXJJdGVtLnVwZGF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgPC91bD4NCgkJCSAgICA6OmVsc2U6Og0KCQkgICAgCQk6OkxhbmcuVEFTS1NfVEVYVDo6DQoJCQkgICAgOjplbmQ6Og0KCQkJIDwvZGl2Pg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImJvcmRlci10b3A6IDFweCBkb3R0ZWQ7ICI%DQoJPHVsIHN0eWxlPSJsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IHRleHQtYWxpZ246cmlnaHQ7IG1hcmdpbjowO3BhZGRpbmc6MCI%Ojpmb3JlYWNoIGl0ZW1zOjoNCgkgIDxsaSBzdHlsZT0ibWFyZ2luLWJvdHRvbTogMHB4OyBwYWRkaW5nLWJvdHRvbTogNXB4OyBib3JkZXItYm90dG9tOiAxcHggZG90dGVkOyBoZWlnaHQ6IDM2cHggIj4NCgkJICA8ZGl2IHN0eWxlPSJtYXJnaW46IDA7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgd2hpdGUtc3BhY2U6bm93cmFwOyBmbG9hdDpsZWZ0OyAiPg0KCQkgIAkJPGltZyBpZD0iaXRlbUJ0bjo6aWQ6OiIgc3R5bGU9Im1hcmdpbjogMCAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZsb2F0OmxlZnQ7IHdpZHRoOjM2cHg7IDo6aWYgbnVtQ2hpbGRyZW46Ojo6ZWxzZTo6ZGlzcGxheTogbm9uZTsgOjplbmQ6OiIgDQoJCSAgCQkJc3JjPSI6OkNvbmZpZy5GT19VUkw6Oi9wdWJsaWMvYXNzZXRzL3RoZW1lcy9kZWZhdWx0L2V4dGpzL2ltYWdlcy9kZWZhdWx0L3RyZWUvZWxib3ctcGx1cy5naWYiIC8%DQoJCSAgCQk8aW1nIHN0eWxlPSJtYXJnaW46IDAgMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBmbG9hdDpsZWZ0OyB3aWR0aDozNnB4OyA6OmlmIG51bUNoaWxkcmVuOjpkaXNwbGF5OiBub25lOyA6OmVuZDo6IiANCgkJICAJCQlzcmM9Ijo6Q29uZmlnLkZPX1VSTDo6L3B1YmxpYy9hc3NldHMvdGhlbWVzL2RlZmF1bHQvZXh0anMvaW1hZ2VzL2RlZmF1bHQvdHJlZS9lbGJvdy5naWYiIC8%DQoJCQkJPGRpdiBpZD0ic2VsZWN0QnRuOjppZDo6IiBzdHlsZT0iIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbi10b3A6IDU7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgaGVpZ2h0OiAxMDAlOyAiPg0KCQkJCQk6Om5hbWU6OjxzbWFsbD4gOjp1cGRhdGVkX29uOjogYnkgOjp1cGRhdGVkX2J5LnVzZXJuYW1lOjo8L3NtYWxsPg0KCQkJCTwvZGl2Pg0KCQkgIDwvZGl2Pg0KCSAgPC9saT46OmVuZDo6DQoJPC91bD4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%DQo8IS0tICAgOjppdGVtczo6ICAtLT4gICANCjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxociAvPg0KRGVidWc6DQo8c21hbGw%OjppdGVtczo6PC9zbWFsbD4gIA"},{ name : "project_webpages", data : "s3242:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuSVRFTV9TRUxFQ1Q6OjwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImhlaWdodDozMHB4OyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwcHg7ICI%DQogICAgCTwhLS0gIDxoMj46OnRpdGxlOjo8L2gyPiAtLT4NCiAgICAJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDEwMHB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAzMHB4IDEwcHg7ICI%DQoJICAgIAk8ZGl2Pg0KCSAgICAJCTxpbWcgc3JjPSJhc3NldHMvb2JqZWN0cy93ZWJsaW5rLnBuZyIgc3R5bGU9Im1hcmdpbjogNXB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBmbG9hdDpsZWZ0OyAiLz4NCgkgICAgCTwvZGl2Pg0KCSAgICAJPGRpdj4NCgkJCSAgIAk6OmlmIGhhc1BhcmVudDo6DQoJCQkJICAgCTx1bCBzdHlsZT0ibGlzdC1zdHlsZS10eXBlOm5vbmU7ICI%DQoJCQkJICAgIAk8bGk%Y3JlYXRlZCBvbjogOjpjdXJJdGVtLmNyZWF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjpjdXJJdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgCTxsaT51cGRhdGVkIG9uOiA6OmN1ckl0ZW0udXBkYXRlZF9vbjo6PC9saT4NCgkJCQkgICAgCTxsaT51cGRhdGVkIGJ5OiA6OmN1ckl0ZW0udXBkYXRlZF9ieS51c2VybmFtZTo6OjppZiBjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OjxpbWcgc3JjPSI6OmN1ckl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6IiAvPjo6ZW5kOjo8L2xpPg0KCQkJCSAgICA8L3VsPg0KCQkJICAgIDo6ZWxzZTo6DQoJCSAgICAJCTo6TGFuZy5XRUJfUEFHRVNfVEVYVDo6DQoJCQkgICAgOjplbmQ6Og0KCQkJIDwvZGl2Pg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImJvcmRlci10b3A6IDFweCBkb3R0ZWQ7ICI%DQoJPHVsIHN0eWxlPSJsaXN0LXN0eWxlLXR5cGU6IG5vbmU7IHRleHQtYWxpZ246cmlnaHQ7IG1hcmdpbjowO3BhZGRpbmc6MCI%Ojpmb3JlYWNoIGl0ZW1zOjoNCgkgIDxsaSBzdHlsZT0ibWFyZ2luLWJvdHRvbTogMHB4OyBwYWRkaW5nLWJvdHRvbTogNXB4OyBib3JkZXItYm90dG9tOiAxcHggZG90dGVkOyBoZWlnaHQ6IDM2cHggIj4NCgkJICA8ZGl2IHN0eWxlPSJtYXJnaW46IDA7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgd2hpdGUtc3BhY2U6bm93cmFwOyBmbG9hdDpsZWZ0OyAiPg0KCQkgIAkJPGltZyBpZD0iaXRlbUJ0bjo6aWQ6OiIgc3R5bGU9Im1hcmdpbjogMCAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZsb2F0OmxlZnQ7IHdpZHRoOjM2cHg7IDo6aWYgbnVtQ2hpbGRyZW46Ojo6ZWxzZTo6ZGlzcGxheTogbm9uZTsgOjplbmQ6OiIgDQoJCSAgCQkJc3JjPSI6OkNvbmZpZy5GT19VUkw6Oi9wdWJsaWMvYXNzZXRzL3RoZW1lcy9kZWZhdWx0L2V4dGpzL2ltYWdlcy9kZWZhdWx0L3RyZWUvZWxib3ctcGx1cy5naWYiIC8%DQoJCSAgCQk8aW1nIHN0eWxlPSJtYXJnaW46IDAgMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBmbG9hdDpsZWZ0OyB3aWR0aDozNnB4OyA6OmlmIG51bUNoaWxkcmVuOjpkaXNwbGF5OiBub25lOyA6OmVuZDo6IiANCgkJICAJCQlzcmM9Ijo6Q29uZmlnLkZPX1VSTDo6L3B1YmxpYy9hc3NldHMvdGhlbWVzL2RlZmF1bHQvZXh0anMvaW1hZ2VzL2RlZmF1bHQvdHJlZS9lbGJvdy5naWYiIC8%DQoJCQkJPGRpdiBpZD0ic2VsZWN0QnRuOjppZDo6IiBzdHlsZT0iIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IG1hcmdpbi10b3A6IDU7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgaGVpZ2h0OiAxMDAlOyAiPg0KCQkJCQk6Om5hbWU6OjxzbWFsbD4gOjp1cGRhdGVkX29uOjogYnkgOjp1cGRhdGVkX2J5LnVzZXJuYW1lOjo8L3NtYWxsPg0KCQkJCTwvZGl2Pg0KCQkgIDwvZGl2Pg0KCSAgPC9saT46OmVuZDo6DQoJPC91bD4NCiAgICA8L2Rpdj4NCiAgPC9kaXY%DQo8IS0tICAgOjppdGVtczo6ICAtLT4gICANCjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxociAvPg0KRGVidWc6DQo8c21hbGw%OjppdGVtczo6PC9zbWFsbD4gIA"},{ name : "project_messages_detail", data : "s982:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAxMHB4OyAiPg0KICAgIDxkaXY%DQogICAgCTxoMz46Oml0ZW0ubmFtZTo6PC9oMz4NCiAgICAJPHNtYWxsPg0KCQkgICAJPHVsPg0KCQkgICAgCTxsaT5jcmVhdGVkIG9uOiA6Oml0ZW0uY3JlYXRlZF9vbjo6PC9saT4NCgkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjppdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgaXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjppdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjppdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCSAgICAJPGxpPnVwZGF0ZWQgYnk6IDo6aXRlbS51cGRhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6aXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCSAgICA8L3VsPg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJICAJPHA%OjppdGVtLnByb3BlcnRpZXMudGV4dDo6PC9wPg0KICAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJPCEtLSAgIDo6aXRlbTo6ICAtLT4gICANCgk8YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48aHIgLz4NCglEZWJ1ZzoNCgk8c21hbGw%OjppdGVtOjo8L3NtYWxsPiAgDQogICAgPC9kaXY%DQogIDwvZGl2Pg"},{ name : "project_events", data : "s3251:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuSVRFTV9TRUxFQ1Q6OjwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImhlaWdodDozMHB4OyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwcHg7ICI%DQogICAgCTwhLS0gIDxoMj46OnRpdGxlOjo8L2gyPiAtLT4NCiAgICAJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDEwMHB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAzMHB4IDEwcHg7ICI%DQoJICAgIAk8ZGl2Pg0KCSAgICAJCTxpbWcgc3JjPSJhc3NldHMvb2JqZWN0cy92aWV3X2NhbGVuZGFyX2RheS5wbmciIHN0eWxlPSJtYXJnaW46IDVweDsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgZmxvYXQ6bGVmdDsgIi8%DQoJICAgIAk8L2Rpdj4NCgkgICAgCTxkaXY%DQoJCQkgICAJOjppZiBoYXNQYXJlbnQ6Og0KCQkJCSAgIAk8dWwgc3R5bGU9Imxpc3Qtc3R5bGUtdHlwZTpub25lOyAiPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgb246IDo6Y3VySXRlbS5jcmVhdGVkX29uOjo8L2xpPg0KCQkJCSAgICAJPGxpPmNyZWF0ZWQgYnk6IDo6Y3VySXRlbS5jcmVhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGN1ckl0ZW0uY3JlYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6Y3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjpjdXJJdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%dXBkYXRlZCBieTogOjpjdXJJdGVtLnVwZGF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgPC91bD4NCgkJCSAgICA6OmVsc2U6Og0KCQkgICAgCQk6OkxhbmcuRVZFTlRTX1RFWFQ6Og0KCQkJICAgIDo6ZW5kOjoNCgkJCSA8L2Rpdj4NCgkgICAgPC9zbWFsbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IHN0eWxlPSJib3JkZXItdG9wOiAxcHggZG90dGVkOyAiPg0KCTx1bCBzdHlsZT0ibGlzdC1zdHlsZS10eXBlOiBub25lOyB0ZXh0LWFsaWduOnJpZ2h0OyBtYXJnaW46MDtwYWRkaW5nOjAiPjo6Zm9yZWFjaCBpdGVtczo6DQoJICA8bGkgc3R5bGU9Im1hcmdpbi1ib3R0b206IDBweDsgcGFkZGluZy1ib3R0b206IDVweDsgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZDsgaGVpZ2h0OiAzNnB4ICI%DQoJCSAgPGRpdiBzdHlsZT0ibWFyZ2luOiAwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHdoaXRlLXNwYWNlOm5vd3JhcDsgZmxvYXQ6bGVmdDsgIj4NCgkJICAJCTxpbWcgaWQ9Iml0ZW1CdG46OmlkOjoiIHN0eWxlPSJtYXJnaW46IDAgMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBmbG9hdDpsZWZ0OyB3aWR0aDozNnB4OyA6OmlmIG51bUNoaWxkcmVuOjo6OmVsc2U6OmRpc3BsYXk6IG5vbmU7IDo6ZW5kOjoiIA0KCQkgIAkJCXNyYz0iOjpDb25maWcuRk9fVVJMOjovcHVibGljL2Fzc2V0cy90aGVtZXMvZGVmYXVsdC9leHRqcy9pbWFnZXMvZGVmYXVsdC90cmVlL2VsYm93LXBsdXMuZ2lmIiAvPg0KCQkgIAkJPGltZyBzdHlsZT0ibWFyZ2luOiAwIDEwcHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZmxvYXQ6bGVmdDsgd2lkdGg6MzZweDsgOjppZiBudW1DaGlsZHJlbjo6ZGlzcGxheTogbm9uZTsgOjplbmQ6OiIgDQoJCSAgCQkJc3JjPSI6OkNvbmZpZy5GT19VUkw6Oi9wdWJsaWMvYXNzZXRzL3RoZW1lcy9kZWZhdWx0L2V4dGpzL2ltYWdlcy9kZWZhdWx0L3RyZWUvZWxib3cuZ2lmIiAvPg0KCQkJCTxkaXYgaWQ9InNlbGVjdEJ0bjo6aWQ6OiIgc3R5bGU9IiB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBtYXJnaW4tdG9wOiA1OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGhlaWdodDogMTAwJTsgIj4NCgkJCQkJOjpuYW1lOjo8c21hbGw%IDo6dXBkYXRlZF9vbjo6IGJ5IDo6dXBkYXRlZF9ieS51c2VybmFtZTo6PC9zbWFsbD4NCgkJCQk8L2Rpdj4NCgkJICA8L2Rpdj4NCgkgIDwvbGk%OjplbmQ6Og0KCTwvdWw%DQogICAgPC9kaXY%DQogIDwvZGl2Pg0KPCEtLSAgIDo6aXRlbXM6OiAgLS0%ICAgDQo8YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48aHIgLz4NCkRlYnVnOg0KPHNtYWxsPjo6aXRlbXM6Ojwvc21hbGw%ICA"},{ name : "project_events_detail", data : "s903:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAxMHB4OyAiPg0KICAgIDxkaXY%DQogICAgIAk8aDM%OjppdGVtLm5hbWU6OjwvaDM%DQogICAgCTxzbWFsbD4NCgkJICAgCTx1bD4NCgkJICAgIAk8bGk%Y3JlYXRlZCBvbjogOjppdGVtLmNyZWF0ZWRfb246OjwvbGk%DQoJCSAgICAJPGxpPmNyZWF0ZWQgYnk6IDo6aXRlbS5jcmVhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGl0ZW0uY3JlYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6aXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCSAgICAJPGxpPnVwZGF0ZWQgb246IDo6aXRlbS51cGRhdGVkX29uOjo8L2xpPg0KCQkgICAgCTxsaT51cGRhdGVkIGJ5OiA6Oml0ZW0udXBkYXRlZF9ieS51c2VybmFtZTo6OjppZiBpdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OjxpbWcgc3JjPSI6Oml0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6IiAvPjo6ZW5kOjo8L2xpPg0KCQkgICAgPC91bD4NCgkgICAgPC9zbWFsbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2Pg0KCTwhLS0gICA6Oml0ZW06OiAgLS0%ICAgDQoJPGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGhyIC8%DQoJRGVidWc6DQoJPHNtYWxsPjo6aXRlbTo6PC9zbWFsbD4gIA0KICAgIDwvZGl2Pg0KICA8L2Rpdj4"},{ name : "workspaces", data : "s3187:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuV09SS1NQQUNFX1NFTEVDVDo6PC9idXR0b24%DQogICAgPC9kaXY%DQogICAgPGRpdiBzdHlsZT0iaGVpZ2h0OjMwcHg7IGRpc3BsYXk6YmxvY2s7IGhlaWdodDoxMDBweDsgIj4NCiAgICAJPCEtLSAgPGgyPjo6dGl0bGU6OjwvaDI%IC0tPg0KICAgIAk8c21hbGwgc3R5bGU9Im1hcmdpbjogMTAwcHg7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IDMwcHggMTBweDsgIj4NCgkgICAgCTxkaXY%DQoJICAgIAkJPGltZyBzcmM9ImFzc2V0cy9vYmplY3RzL2N1c3RvbV9wcm9wZXJ0aWVzLnBuZyIgc3R5bGU9Im1hcmdpbjogNXB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBmbG9hdDpsZWZ0OyAiLz4NCgkgICAgCTwvZGl2Pg0KCSAgICAJPGRpdj4NCgkJCSAgIAk6OmlmIGhhc1BhcmVudDo6DQoJCQkJICAgCTx1bCBzdHlsZT0ibGlzdC1zdHlsZS10eXBlOm5vbmU7ICI%DQoJCQkJICAgIAk8bGk%Y3JlYXRlZCBvbjogOjpjdXJJdGVtLmNyZWF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjpjdXJJdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgCTxsaT51cGRhdGVkIG9uOiA6OmN1ckl0ZW0udXBkYXRlZF9vbjo6PC9saT4NCgkJCQkgICAgCTxsaT51cGRhdGVkIGJ5OiA6OmN1ckl0ZW0udXBkYXRlZF9ieS51c2VybmFtZTo6OjppZiBjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OjxpbWcgc3JjPSI6OmN1ckl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6IiAvPjo6ZW5kOjo8L2xpPg0KCQkJCSAgICA8L3VsPg0KCQkJICAgIDo6ZWxzZTo6DQoJCSAgICAJCTo6TGFuZy5XT1JLU1BBQ0VTX1RFWFQ6Og0KCQkJICAgIDo6ZW5kOjoNCgkJCSA8L2Rpdj4NCgkgICAgPC9zbWFsbD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2IHN0eWxlPSJib3JkZXItdG9wOiAxcHggZG90dGVkOyAiPg0KCTx1bCBzdHlsZT0ibGlzdC1zdHlsZS10eXBlOiBub25lOyB0ZXh0LWFsaWduOnJpZ2h0OyBtYXJnaW46MDtwYWRkaW5nOjAiPjo6Zm9yZWFjaCBpdGVtczo6DQoJICA8bGkgc3R5bGU9Im1hcmdpbi1ib3R0b206IDBweDsgcGFkZGluZy1ib3R0b206IDVweDsgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZDsgaGVpZ2h0OiAzNnB4ICI%DQoJCSAgPGRpdiBzdHlsZT0ibWFyZ2luOiAwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IHdoaXRlLXNwYWNlOm5vd3JhcDsgZmxvYXQ6bGVmdDsgIj4NCgkJICAJCTxpbWcgaWQ9Iml0ZW1CdG46OmlkOjoiIHN0eWxlPSJtYXJnaW46IDAgMTBweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBmbG9hdDpsZWZ0OyB3aWR0aDozNnB4OyA6OmlmIG51bUNoaWxkcmVuOjo6OmVsc2U6OmRpc3BsYXk6IG5vbmU7IDo6ZW5kOjoiIA0KCQkgIAkJCXNyYz0iOjpDb25maWcuRk9fVVJMOjovcHVibGljL2Fzc2V0cy90aGVtZXMvZGVmYXVsdC9leHRqcy9pbWFnZXMvZGVmYXVsdC90cmVlL2VsYm93LXBsdXMuZ2lmIiAvPg0KCQkgIAkJPGltZyBzdHlsZT0ibWFyZ2luOiAwIDEwcHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZmxvYXQ6bGVmdDsgd2lkdGg6MzZweDsgOjppZiBudW1DaGlsZHJlbjo6ZGlzcGxheTogbm9uZTsgOjplbmQ6OiIgDQoJCSAgCQkJc3JjPSI6OkNvbmZpZy5GT19VUkw6Oi9wdWJsaWMvYXNzZXRzL3RoZW1lcy9kZWZhdWx0L2V4dGpzL2ltYWdlcy9kZWZhdWx0L3RyZWUvZWxib3cuZ2lmIiAvPg0KCQkJCTxkaXYgaWQ9InNlbGVjdEJ0bjo6aWQ6OiIgc3R5bGU9IiB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBtYXJnaW4tdG9wOiA1OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGhlaWdodDogMTAwJTsgIj4NCgkJCQkJOjpuYW1lOjoNCgkJCQk8L2Rpdj4NCgkJICA8L2Rpdj4NCgkgIDwvbGk%OjplbmQ6Og0KCTwvdWw%DQogICAgPC9kaXY%DQogIDwvZGl2Pg0KPCEtLSAgIDo6aXRlbXM6OiAgLS0%ICAgDQo8YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48aHIgLz4NCkRlYnVnOg0KPHNtYWxsPjo6aXRlbXM6Ojwvc21hbGw%ICA"},{ name : "mail_contents_detail", data : "s902:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAxMHB4OyAiPg0KICAgIDxkaXY%DQogICAgCTxoMz46Oml0ZW0ubmFtZTo6PC9oMz4NCiAgICAJPHNtYWxsPg0KCQkgICAJPHVsPg0KCQkgICAgCTxsaT5jcmVhdGVkIG9uOiA6Oml0ZW0uY3JlYXRlZF9vbjo6PC9saT4NCgkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjppdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgaXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjppdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjppdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCSAgICAJPGxpPnVwZGF0ZWQgYnk6IDo6aXRlbS51cGRhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6aXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCSAgICA8L3VsPg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJPCEtLSAgIDo6aXRlbTo6ICAtLT4gICANCgk8YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48aHIgLz4NCglEZWJ1ZzoNCgk8c21hbGw%OjppdGVtOjo8L3NtYWxsPiAgDQogICAgPC9kaXY%DQogIDwvZGl2Pg"},{ name : "project_webpages_detail", data : "s1182:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAxMHB4OyAiPg0KICAgIDxkaXY%DQogICAgCTxoMz46Oml0ZW0ubmFtZTo6PC9oMz4NCiAgICAJPHNtYWxsPg0KCQkgICAJPHVsPg0KCQkgICAgCTxsaT5jcmVhdGVkIG9uOiA6Oml0ZW0uY3JlYXRlZF9vbjo6PC9saT4NCgkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjppdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgaXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjppdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjppdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCSAgICAJPGxpPnVwZGF0ZWQgYnk6IDo6aXRlbS51cGRhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6aXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCSAgICA8L3VsPg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJICAJPHA%VVJMOiA8YSBocmVmPSI6Oml0ZW0udXJsOjoiPjo6aXRlbS5wcm9wZXJ0aWVzLnVybDo6PC9hPjwvcD4NCiAgICA8L2Rpdj4NCiAgICA8ZGl2Pg0KCSAgCTxpZnJhbWUgc3JjPSI6Oml0ZW0ucHJvcGVydGllcy51cmw6OiIgc3R5bGU9InBhZGRpbmc6IDBweDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTsgIiAvPg0KICAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJPCEtLSAgIDo6aXRlbTo6ICAtLT4gICANCgk8YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48YnIgLz48aHIgLz4NCglEZWJ1ZzoNCgk8c21hbGw%OjppdGVtOjo8L3NtYWxsPiAgDQogICAgPC9kaXY%DQogIDwvZGl2Pg"},{ name : "project_tasks_detail", data : "s1543:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAxMHB4OyAiPg0KICAgIDxkaXY%DQogICAgCTxoMz46Oml0ZW0ubmFtZTo6PC9oMz4NCiAgICAJPHNtYWxsPg0KCQkgICAJPHVsPg0KCQkgICAgCTxsaT5jcmVhdGVkIG9uOiA6Oml0ZW0uY3JlYXRlZF9vbjo6PC9saT4NCgkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjppdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgaXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjppdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjppdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCSAgICAJPGxpPnVwZGF0ZWQgYnk6IDo6aXRlbS51cGRhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6aXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCSAgICA8L3VsPg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJICAJPHA%U3RhcnQgZGF0ZTogOjppdGVtLnByb3BlcnRpZXMuc3RhcnRfZGF0ZTo6PC9wPg0KCSAgCTxwPkR1ZSBkYXRlOiA6Oml0ZW0ucHJvcGVydGllcy5zdGFydF9kYXRlOjo8L3A%DQoJICAJPHA%QXNzaWduZWQgdG86IDo6aXRlbS5wcm9wZXJ0aWVzLmFzc2lnbmVkX3RvX2NvbnRhY3RfaWQ6OjwvcD4NCgkgIAk8cD5Bc3NpZ25lZCBieTogOjppdGVtLnByb3BlcnRpZXMuYXNzaWduZWRfYnlfaWQ6OjwvcD4NCgkgIAk8cD5Fc3RpbWF0ZWQgdGltZTogOjppdGVtLnByb3BlcnRpZXMudGltZV9lc3RpbWF0ZTo6PC9wPg0KCSAgCTxwPkNvbXBsZXRlZDogOjppdGVtLnByb3BlcnRpZXMucGVyY2VudF9jb21wbGV0ZWQ6OiU8L3A%DQoJICAJPHA%Q29tcGxldGVkIG9uOiA6Oml0ZW0ucHJvcGVydGllcy5jb21wbGV0ZWRfb246OjwvcD4NCgkgIAk8cD5Db21wbGV0ZWQgYnk6IDo6aXRlbS5wcm9wZXJ0aWVzLmNvbXBsZXRlZF9ieV9pZDo6PC9wPg0KICAgIDwvZGl2Pg0KCTwhLS0gICA6Oml0ZW06OiAgLS0%ICAgDQoJPGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGhyIC8%DQoJRGVidWc6DQoJPHNtYWxsPjo6aXRlbTo6PC9zbWFsbD4gIA0KICA8L2Rpdj4"},{ name : "project_files_detail", data : "s966:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAxMHB4OyAiPg0KICAgIDxkaXY%DQogICAgCTxoMz46Oml0ZW0ubmFtZTo6PC9oMz4NCiAgICAJPHNtYWxsPg0KCQkgICAJPHVsPg0KCQkgICAgCTxsaT5jcmVhdGVkIG9uOiA6Oml0ZW0uY3JlYXRlZF9vbjo6PC9saT4NCgkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjppdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgaXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjppdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJICAgIAk8bGk%dXBkYXRlZCBvbjogOjppdGVtLnVwZGF0ZWRfb246OjwvbGk%DQoJCSAgICAJPGxpPnVwZGF0ZWQgYnk6IDo6aXRlbS51cGRhdGVkX2J5LnVzZXJuYW1lOjo6OmlmIGl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6PGltZyBzcmM9Ijo6aXRlbS51cGRhdGVkX2J5LmF2YXRhcl9maWxlOjoiIC8%OjplbmQ6OjwvbGk%DQoJCSAgICA8L3VsPg0KCSAgICA8L3NtYWxsPg0KICAgIDwvZGl2Pg0KICAgIDxkaXY%DQoJICAJPHA%OjppdGVtLnByb3BlcnRpZXMuaHRtbENvbnRlbnQ6OjwvcD4NCiAgICA8L2Rpdj4NCgk8IS0tICAgOjppdGVtOjogIC0tPiAgIA0KCTxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxiciAvPjxociAvPg0KCURlYnVnOg0KCTxzbWFsbD46Oml0ZW06Ojwvc21hbGw%ICANCiAgPC9kaXY%DQogIA"},{ name : "project_messages", data : "s3232:ICA8ZGl2IHN0eWxlPSJwYWRkaW5nOiAwcHg7ICI%DQogICAgPGRpdj4NCgkJPGJ1dHRvbiBpZD0idXBCdG4iIHR5cGU9ImJ1dHRvbiI%OjpMYW5nLlVQOjo8L2J1dHRvbj4NCgkJPGJ1dHRvbiBpZD0icmVmcmVzaEJ0biIgdHlwZT0iYnV0dG9uIj46OkxhbmcuUkVGUkVTSDo6PC9idXR0b24%DQoJCTxidXR0b24gaWQ9InNlbGVjdEJ0biIgc3R5bGU9Ijo6aWYgaGFzUGFyZW50Ojo6OmVsc2U6OmRpc3BsYXk6bm9uZTsgOjplbmQ6OiIgdHlwZT0iYnV0dG9uIj46OkxhbmcuSVRFTV9TRUxFQ1Q6OjwvYnV0dG9uPg0KICAgIDwvZGl2Pg0KICAgIDxkaXYgc3R5bGU9ImhlaWdodDozMHB4OyBkaXNwbGF5OmJsb2NrOyBoZWlnaHQ6MTAwcHg7ICI%DQogICAgCTwhLS0gIDxoMj46OnRpdGxlOjo8L2gyPiAtLT4NCiAgICAJPHNtYWxsIHN0eWxlPSJtYXJnaW46IDEwMHB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBkaXNwbGF5OiBibG9jazsgbWFyZ2luOiAzMHB4IDEwcHg7ICI%DQoJICAgIAk8ZGl2Pg0KCSAgICAJCTxpbWcgc3JjPSJhc3NldHMvb2JqZWN0cy9ub3RlLnBuZyIgc3R5bGU9Im1hcmdpbjogNXB4OyB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlOyBmbG9hdDpsZWZ0OyAiLz4NCgkgICAgCTwvZGl2Pg0KCSAgICAJPGRpdj4NCgkJCSAgIAk6OmlmIGhhc1BhcmVudDo6DQoJCQkJICAgCTx1bCBzdHlsZT0ibGlzdC1zdHlsZS10eXBlOm5vbmU7ICI%DQoJCQkJICAgIAk8bGk%Y3JlYXRlZCBvbjogOjpjdXJJdGVtLmNyZWF0ZWRfb246OjwvbGk%DQoJCQkJICAgIAk8bGk%Y3JlYXRlZCBieTogOjpjdXJJdGVtLmNyZWF0ZWRfYnkudXNlcm5hbWU6Ojo6aWYgY3VySXRlbS5jcmVhdGVkX2J5LmF2YXRhcl9maWxlOjo8aW1nIHNyYz0iOjpjdXJJdGVtLmNyZWF0ZWRfYnkuYXZhdGFyX2ZpbGU6OiIgLz46OmVuZDo6PC9saT4NCgkJCQkgICAgCTxsaT51cGRhdGVkIG9uOiA6OmN1ckl0ZW0udXBkYXRlZF9vbjo6PC9saT4NCgkJCQkgICAgCTxsaT51cGRhdGVkIGJ5OiA6OmN1ckl0ZW0udXBkYXRlZF9ieS51c2VybmFtZTo6OjppZiBjdXJJdGVtLnVwZGF0ZWRfYnkuYXZhdGFyX2ZpbGU6OjxpbWcgc3JjPSI6OmN1ckl0ZW0udXBkYXRlZF9ieS5hdmF0YXJfZmlsZTo6IiAvPjo6ZW5kOjo8L2xpPg0KCQkJCSAgICA8L3VsPg0KCQkJICAgIDo6ZWxzZTo6DQoJCSAgICAJCTo6TGFuZy5OT1RFU19URVhUOjoNCgkJCSAgICA6OmVuZDo6DQoJCQkgPC9kaXY%DQoJICAgIDwvc21hbGw%DQogICAgPC9kaXY%DQogICAgPGRpdiBzdHlsZT0iYm9yZGVyLXRvcDogMXB4IGRvdHRlZDsgIj4NCgk8dWwgc3R5bGU9Imxpc3Qtc3R5bGUtdHlwZTogbm9uZTsgdGV4dC1hbGlnbjpyaWdodDsgbWFyZ2luOjA7cGFkZGluZzowIj46OmZvcmVhY2ggaXRlbXM6Og0KCSAgPGxpIHN0eWxlPSJtYXJnaW4tYm90dG9tOiAwcHg7IHBhZGRpbmctYm90dG9tOiA1cHg7IGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQ7IGhlaWdodDogMzZweCAiPg0KCQkgIDxkaXYgc3R5bGU9Im1hcmdpbjogMDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB3aGl0ZS1zcGFjZTpub3dyYXA7IGZsb2F0OmxlZnQ7ICI%DQoJCSAgCQk8aW1nIGlkPSJpdGVtQnRuOjppZDo6IiBzdHlsZT0ibWFyZ2luOiAwIDEwcHg7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgZmxvYXQ6bGVmdDsgd2lkdGg6MzZweDsgOjppZiBudW1DaGlsZHJlbjo6OjplbHNlOjpkaXNwbGF5OiBub25lOyA6OmVuZDo6IiANCgkJICAJCQlzcmM9Ijo6Q29uZmlnLkZPX1VSTDo6L3B1YmxpYy9hc3NldHMvdGhlbWVzL2RlZmF1bHQvZXh0anMvaW1hZ2VzL2RlZmF1bHQvdHJlZS9lbGJvdy1wbHVzLmdpZiIgLz4NCgkJICAJCTxpbWcgc3R5bGU9Im1hcmdpbjogMCAxMHB4OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGZsb2F0OmxlZnQ7IHdpZHRoOjM2cHg7IDo6aWYgbnVtQ2hpbGRyZW46OmRpc3BsYXk6IG5vbmU7IDo6ZW5kOjoiIA0KCQkgIAkJCXNyYz0iOjpDb25maWcuRk9fVVJMOjovcHVibGljL2Fzc2V0cy90aGVtZXMvZGVmYXVsdC9leHRqcy9pbWFnZXMvZGVmYXVsdC90cmVlL2VsYm93LmdpZiIgLz4NCgkJCQk8ZGl2IGlkPSJzZWxlY3RCdG46OmlkOjoiIHN0eWxlPSIgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgbWFyZ2luLXRvcDogNTsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBoZWlnaHQ6IDEwMCU7ICI%DQoJCQkJCTo6bmFtZTo6PHNtYWxsPiA6OnVwZGF0ZWRfb246OiBieSA6OnVwZGF0ZWRfYnkudXNlcm5hbWU6Ojwvc21hbGw%DQoJCQkJPC9kaXY%DQoJCSAgPC9kaXY%DQoJICA8L2xpPjo6ZW5kOjoNCgk8L3VsPg0KICAgIDwvZGl2Pg0KICA8L2Rpdj4NCjwhLS0gICA6Oml0ZW1zOjogIC0tPiAgIA0KPGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGJyIC8%PGhyIC8%DQpEZWJ1ZzoNCjxzbWFsbD46Oml0ZW1zOjo8L3NtYWxsPiAg"},{ name : "login", data : "s1340:PGRpdiBpZD0ibG9naW4iIHN0eWxlPSJib3JkZXItcmFkaXVzOiAxMHB4OyBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgcGFkZGluZzogMjBweDsgbWFyZ2luOiBhdXRvOyANCgltYXgtd2lkdGg6IDIwMHB4OyBtYXgtaGVpZ2h0OiAyMDBweDsgbWFyZ2luLXRvcDogMjBweDsgDQoJIG1pbi1oZWlnaHQ6IDEwMHB4OyBtaW4td2lkdGg6IDEwMHB4OyI%DQo8IS0tIAk8Zm9ybSBhY3Rpb249IiMiPiAgLS0%DQoJCTxkaXYgaWQ9ImxvZ2luVXNlcm5hbWVEaXYiIHN0eWxlPSIiPg0KCQkJPGxhYmVsIGZvcj0idXNlck5hbWUiPjo6TGFuZy5VU0VSTkFNRV9MQUJFTDo6PC9sYWJlbD48YnIgLz4NCgkJCTxpbnB1dCBpZD0idXNlck5hbWUiIHZhbHVlPSIiIHR5cGU9InRleHQiIHN0eWxlPSJ3aWR0aDogMTAwJTsgIiAvPg0KCQk8L2Rpdj4NCgkJPGRpdiBpZD0ibG9naW5QYXNzd29yZERpdiIgc3R5bGU9IiIgPg0KCQkgICAgPGxhYmVsIGZvcj0idXNlclBhc3MiIHN0eWxlPSJ3aWR0aDogMTAwJTsgIj46OkxhbmcuUEFTU19MQUJFTDo6PC9sYWJlbD48YnIgLz4NCgkJICAgIDxpbnB1dCBpZD0idXNlclBhc3MiIGNsYXNzPSJtZWRpdW0iIHZhbHVlPSIiIHR5cGU9InBhc3N3b3JkIiBzdHlsZT0id2lkdGg6IDEwMCU7ICIgLz4NCgkJPC9kaXY%DQoJCTxkaXY%DQoJCQk8YnV0dG9uIGlkPSJzdWJtaXRCdG4iIHR5cGU9InN1Ym1pdCIgc3R5bGU9IndpZHRoOiAxMDAlOyAiPjo6TGFuZy5MT0dJTl9CVE46OjwvYnV0dG9uPg0KCQkJCTo6aWYgaXNFcnJvcjo6PHAgc3R5bGU9ImNvbG9yOiBvcmFuZ2U7Ij46OmVycm9yOjo8L3A%OjplbmQ6Og0KCQk8L2Rpdj4NCjwhLS0gCTwvZm9ybT4gLS0%DQo8L2Rpdj48ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoYXNzZXRzL25hdmlnYXRpb24vbG9nby5wbmcpOyBtYXJnaW4gOiAwcHg7IHdpZHRoOiAxMDBweDsgaGVpZ2h0OiA0NnB4OyBkaXNwbGF5OiBibG9jazsgcG9zaXRpb246YWJzb2x1dGU7IGJvdHRvbTowcHgiPjwvZGl2Pg0K"}];
js["XMLHttpRequest"] = window.XMLHttpRequest?XMLHttpRequest:window.ActiveXObject?function() {
	try {
		return new ActiveXObject("Msxml2.XMLHTTP");
	} catch( e ) {
		try {
			return new ActiveXObject("Microsoft.XMLHTTP");
		} catch( e1 ) {
			throw "Unable to create XMLHttpRequest object.";
		}
	}
}:(function($this) {
	var $r;
	throw "Unable to create XMLHttpRequest object.";
	return $r;
}(this));
intermedia.fengOffice.client.application.Config.PLUGIN_NAME = "MobileApp";
intermedia.fengOffice.client.application.Config.FO_URL = "../..";
intermedia.fengOffice.client.application.Config.SERVER_URL = ".";
intermedia.fengOffice.client.application.Config.GATEWAY_URL = "." + "/indexPhp.php";
haxe.Template.splitter = new EReg("(::[A-Za-z0-9_ ()&|!+=/><*.\"-]+::|\\$\\$([A-Za-z0-9_-]+)\\()","");
haxe.Template.expr_splitter = new EReg("(\\(|\\)|[ \r\n\t]*\"[^\"]*\"[ \r\n\t]*|[!+=/><*.&|-]+)","");
haxe.Template.expr_trim = new EReg("^[ ]*([^ ]+)[ ]*$","");
haxe.Template.expr_int = new EReg("^[0-9]+$","");
haxe.Template.expr_float = new EReg("^([+-]?)(?=\\d|,\\d)\\d*(,\\d*)?([Ee]([+-]?\\d+))?$","");
haxe.Template.globals = { };
haxe.Unserializer.DEFAULT_RESOLVER = Type;
haxe.Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe.Unserializer.CODES = null;
intermedia.fengOffice.cross.ServiceTypes.WORKSPACES = "workspaces";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_MESSAGES = "project_messages";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_WEBPAGES = "project_webpages";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_TASKS = "project_tasks";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_FILES = "project_files";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_FORMS = "project_forms";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_CHARTS = "project_charts";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_MILESTONES = "project_milestones";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_EVENTS = "project_events";
intermedia.fengOffice.cross.ServiceTypes.REPORTS = "reports";
intermedia.fengOffice.cross.ServiceTypes.CO_TEMPLATES = "templates";
intermedia.fengOffice.cross.ServiceTypes.COMMENTS = "comments";
intermedia.fengOffice.cross.ServiceTypes.BILLINGS = "billings";
intermedia.fengOffice.cross.ServiceTypes.CONTACTS = "contacts";
intermedia.fengOffice.cross.ServiceTypes.PROJECT_FILE_REVISIONS = "file_revisions";
intermedia.fengOffice.cross.ServiceTypes.TIMESLOTS = "timeslots";
intermedia.fengOffice.cross.ServiceTypes.MAIL_CONTENTS = "mail_contents";
haxe.Serializer.USE_CACHE = false;
haxe.Serializer.USE_ENUM_INDEX = false;
haxe.Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
intermedia.fengOffice.client.application.Lang.UP = "Up";
intermedia.fengOffice.client.application.Lang.REFRESH = "Refresh";
intermedia.fengOffice.client.application.Lang.ITEM_SELECT = "Open";
intermedia.fengOffice.client.application.Lang.WORKSPACE_SELECT = "Choose";
intermedia.fengOffice.client.application.Lang.ITEM_OPEN = "Info";
intermedia.fengOffice.client.application.Lang.WORKSPACES_TEXT = "Select a workspace bellow, or click on the " + " sign to see the content of a workspace.";
intermedia.fengOffice.client.application.Lang.TASKS_TEXT = "Select a task bellow to see its details, or click on the " + " sign to see the sub-tasks.";
intermedia.fengOffice.client.application.Lang.EMAILS_TEXT = "Select a task bellow to see its details, or click on the " + " sign to see the sub-tasks.";
intermedia.fengOffice.client.application.Lang.FILES_TEXT = "Select a task bellow to see its details, or click on the " + " sign to see the sub-tasks.";
intermedia.fengOffice.client.application.Lang.EVENTS_TEXT = "Select a task bellow to see its details, or click on the " + " sign to see the sub-tasks.";
intermedia.fengOffice.client.application.Lang.NOTES_TEXT = "Select a task bellow to see its details, or click on the " + " sign to see the sub-tasks.";
intermedia.fengOffice.client.application.Lang.CONTACTS_TEXT = "Select a task bellow to see its details, or click on the " + " sign to see the sub-tasks.";
intermedia.fengOffice.client.application.Lang.WEB_PAGES_TEXT = "Select a task bellow to see its details, or click on the " + " sign to see the sub-tasks.";
intermedia.fengOffice.client.application.Lang.LOGIN_BTN = "Login";
intermedia.fengOffice.client.application.Lang.PASS_LABEL = "Password:";
intermedia.fengOffice.client.application.Lang.USERNAME_LABEL = "Email or username:";
intermedia.fengOffice.client.application.Lang.CURRENT_WORKSPACE_LABEL = "Current workspace";
intermedia.fengOffice.client.application.Lang.CHANGE_WORKSPACE_LABEL = "change";
intermedia.fengOffice.client.application.Lang.FILES_LABEL = "Files";
intermedia.fengOffice.client.application.Lang.TASKS_LABEL = "Tasks";
intermedia.fengOffice.client.application.Lang.NOTES_LABEL = "Notes";
intermedia.fengOffice.client.application.Lang.EMAILS_LABEL = "Emails";
intermedia.fengOffice.client.application.Lang.LINKS_LABEL = "Links";
intermedia.fengOffice.client.application.Lang.CALENDAR_LABEL = "Calendar";
intermedia.fengOffice.client.application.Lang.CONTACTS_LABEL = "Contacts";
js.Lib.onerror = null;
MainJs.main()