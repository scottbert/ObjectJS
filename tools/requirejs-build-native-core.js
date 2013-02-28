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
		"core/Events",
		"mixins/Native",
		"config"
	],
	out: '../compiled/objectjs.min.js'
})
