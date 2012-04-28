<?php

class intermedia_fengOffice_cross_ServiceTypes {
	public function __construct(){}
	static $WORKSPACES = "workspaces";
	static $PROJECT_MESSAGES = "project_messages";
	static $PROJECT_WEBPAGES = "project_webpages";
	static $PROJECT_TASKS = "project_tasks";
	static $PROJECT_FILES = "project_files";
	static $PROJECT_FORMS = "project_forms";
	static $PROJECT_CHARTS = "project_charts";
	static $PROJECT_MILESTONES = "project_milestones";
	static $PROJECT_EVENTS = "project_events";
	static $REPORTS = "reports";
	static $CO_TEMPLATES = "templates";
	static $COMMENTS = "comments";
	static $BILLINGS = "billings";
	static $CONTACTS = "contacts";
	static $PROJECT_FILE_REVISIONS = "file_revisions";
	static $TIMESLOTS = "timeslots";
	static $MAIL_CONTENTS = "mail_contents";
	function __toString() { return 'intermedia.fengOffice.cross.ServiceTypes'; }
}
