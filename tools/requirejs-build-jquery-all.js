({
	baseUrl: "../src",
	name: "ObjectJS",
	skipModuleInsertion: true,
	include: [
		"core/utils/Core",
		"core/utils/ArrayUtils",
		"core/controllers/BaseController",
		"core/views/BaseView",
		"core/uis/BaseUI",
		"core/templates/Templates",
		"core/Events",
		"mixins/jQuery",
		"extras/utils/HashMap",
		"extras/utils/Console",
		"extras",
		"jqzconfig"
	],
	out: '../compiled/objectjs-jquery-all.min.js'
})