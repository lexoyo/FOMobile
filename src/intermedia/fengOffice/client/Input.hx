package intermedia.fengOffice.client;

class Input {
	public static function initPhoneGap(){
		// capture back button in phone gap
		untyped
		{    
			//objectLists = new Hash();
			document.addEventListener('backKeyDown', function(e) {
			  window.history.back();
			}, false);
		}
		// 
	}
}
