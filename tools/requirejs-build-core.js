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
		"core/mixins/Native",
		"core/Events",
		"config"
	],
	out: '../compiled/objectjs.core.min.js'
})
