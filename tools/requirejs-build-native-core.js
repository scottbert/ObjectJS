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
		"mixins/Native",
		"config"
	],
	out: '../compiled/objectjs.min.js'
})
