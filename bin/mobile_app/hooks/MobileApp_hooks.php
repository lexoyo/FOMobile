<?php

Hook::register("mobile_app");

function mobile_app_autoload_javascripts(){
	?>
	<script type="text/javascript">
	<!--
		//alert("window.screen = "+window.screen.width +" - "+window.screen.height);
		if(/iPhone|iPod|Android|opera mini|blackberry|palm os|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce;iemobile/i.test(navigator.userAgent))
			if (confirm("Welcome, <?php echo logged_user()->getUsername(); ?>, choose \"ok\" to use the mobile version of Feng Office.","Mobile App plugin by Intermedia"))
				window.location = "plugins/mobile_app/?autoAuth=1"
	//-->
	</script>
	<?php
//	echo "xxxxxxxxxxxxxxxxxxxx ".print_r(logged_user(),true)." xxxxxxxxxxxxxxxxxxxxxxxx";

	// remember the id on the server side session, in order to authenticate automatically
	$_SESSION['mobile_app_user_id'] = logged_user()->getId();
}
