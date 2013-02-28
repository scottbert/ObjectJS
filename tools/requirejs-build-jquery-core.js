({
	baseUrl: "../src",
	name: "combining",
	skipModuleInsertion: true,
	include: [
		"ObjectJS",
		"core/utils/Core",
		"core/utils/ArrayUtils",
		"core/controllers/BaseController",
		"core/views/BaseView",
		"core/uis/BaseUI",
		"core/templates/Templates",
		"mixins/jQuery",
		"core/Events",
		"jqzconfig"
	],
	out: '../compiled/objectjs-jquery.min.js'
})
