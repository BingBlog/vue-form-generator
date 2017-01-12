var VueFormGenerator = window.VueFormGenerator;

var vm = new Vue({
	el: "#app",
	components: {
		"vue-form-generator": VueFormGenerator.component
	},

	methods: {
		prettyJSON: function(json) {
			if (json) {
				json = JSON.stringify(json, undefined, 4);
				json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
					var cls = "number";
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = "key";
						} else {
							cls = "string";
						}
					} else if (/true|false/.test(match)) {
						cls = "boolean";
					} else if (/null/.test(match)) {
						cls = "null";
					}
					return "<span class=\"" + cls + "\">" + match + "</span>";
				});
			}
		}
	},

	data: {
		model: {
			id: 1,
			name: "John Doe",
			password: "J0hnD03!x4",
			skills: [
				"Javascript",
				"VueJS"
			],
			email: "john.doe@gmail.com",
			status: true,
			hiddenInput:'hiddenInput',
			website:'http://www.le.com',
			dobDate: 1483315200000,
			dobtime: '23:00:05',
			dobDatetime: '2017-01-20T01:58',
			dobmonth: '2017-03',
			dobweek:'2017-W24',
			numberInput:'22',
			rankSlide:'40',
			colorPicker:'#000',
			oneCheckbox:''
		},
		schema: {
			fields: [
				{
					type: "text",
					label: "ID(仅展示文本)",
					model: "id",
					readonly: true,
					featured: false,
					disabled: true
				},
				{
					type: "text",
					label: "Name(文本输入)",
					model: "name",
					readonly: false,
					featured: true,//加粗显示label
					required: true,
					disabled: false,
					placeholder: "User's name",
					validator: VueFormGenerator.validators.string
				},
				{
					type: "password",
					label: "Password(密码输入)",
					model: "password",
					min: 6,
					required: true,
					hint: "Minimum 6 characters",
					validator: VueFormGenerator.validators.string
				},	
				{
					type: "email",
					label: "E-mail(邮件输入)",
					model: "email",
					placeholder: "User's e-mail address",
					validator: VueFormGenerator.validators.email
				},					
				{
					type: "checklist",
					label: "Skills(下拉选择)",
					model: "skills",
					required: true,
					values: [
						"HTML5",
						"Javascript",
						"CSS3",
						"CoffeeScript",
						"AngularJS",
						"ReactJS",
						"VueJS"
					],
					validator: VueFormGenerator.validators.array
				},
				{
					type: "checkbox",
					label: "Status(复选框)",
					model: "status",
					multi: true,
					readonly: false,
					featured: false,
					disabled: false,
					default: true
				},
				{
					type: "input",
					inputType: "hidden",
					label: "--- INPUT ---(隐藏表单)",
					model: "hiddenInput",
					styleClasses: "alert alert-info"
				},
				{
					type: "input",
					inputType: "url",
					label: "URL(url输入)",
					model: "website",
					placeholder: "Enter your website",
					inputName: "website",
					validator: VueFormGenerator.validators.url
				},
				{
					type: "input",
					inputType: "date",
					label: "Date(日期输入,提交的是时间戳)",
					model: "dobDate",
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "time",
					label: "Time(时间输入框,可以上下选时间,支持键盘操作,时间没有弹框,提交格式为: 23:00:05)",
					model: "dobtime",
					step: 1,
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "datetime-local",
					label: "Datetime local(时间日期选择，日期弹框，时间不弹框,提交格式为: 2017-01-20T01:58)",
					model: "dobDatetime",
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "month",
					label: "Month(选择月份,提交格式形如: 2017-03)",
					model: "dobmonth",
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "week",
					label: "Week(选择某年第几周，提交格式形如:2017-W24)",
					model: "dobweek",
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "number",
					label: "Number(可输入数字类型包括1e+2)",
					model: "numberInput",
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "range",
					label: "Range(选择数值输入范围,可配置最大值最小值)",
					model: "rankSlide",
					min: 0,
					max: 1000,
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "color",
					label: "Color(选择颜色,返回16进制颜色码)",
					model: "colorPicker",
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "checkbox",
					label: "Checkbox (单个选择框)",
					model: "oneCheckbox",
					styleClasses: "half-width"
				}	
			]
		},

		formOptions: {
			validateAfterLoad: true,
			validateAfterChanged: true
		}
	}
});