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
			numberInput:'22',
			rankSlide:'40',
			colorPicker:'#000',
			oneCheckbox:true,
			multiCheckbox:['Javascript','AngularJS'],
			checklistKeyValue:['1','3'],
			radios:'James',
			dolphin:'3',
			lang:'2',
			web:'http://www.le.com',
			switchSex:'1',
			phone:'13146989718',
			bio:'11111',
			pikaday:1484755200000,
			dobDate: 1483315200000,
			dobDateTime: 1483315200000,
			dobTime: '03:18:30',
			stars: [
				{
					name:"wangbing",
					value:"1",
					img:'https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg'
				},
				{
					name:"songmeng",
					value:"2",
					img:'https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg'
				}
			],
			editStars: [
				{
					name:"wangbing",
					value:"1",
					img:'https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg',
					role:'孙悟空'
				},
				{
					name:"songmeng",
					value:"2",
					img:'https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg',
					role:'猪八戒'
				}
			],
			tags: [
					'wangbing',
					'songmeng',
					'liangshan'
					],
		},
		schema: {
			fields: [
				{
					type: "text",
					label: "ID(仅展示文本)",
					model: "id",
					readonly: true,
					featured: true,//加粗显示label
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
					featured: true,//加粗显示label
					model: "password",
					min: 6,
					required: true,
					hint: "Minimum 6 characters",
					validator: VueFormGenerator.validators.string
				},	
				{
					type: "email",
					label: "E-mail(邮件输入)",
					featured: true,//加粗显示label
					model: "email",
					placeholder: "User's e-mail address",
					validator: VueFormGenerator.validators.email
				},					
				{
					type: "checklist",
					label: "Skills(下拉选择)",
					featured: true,//加粗显示label
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
					featured: true,//加粗显示label
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
					featured: true,//加粗显示label
					model: "hiddenInput",
					styleClasses: "alert alert-info"
				},
				{
					type: "input",
					inputType: "url",
					label: "URL(url输入)",
					featured: true,//加粗显示label
					model: "website",
					placeholder: "Enter your website",
					inputName: "website",
					validator: VueFormGenerator.validators.url
				},
				{
					type: "input",
					inputType: "number",
					label: "Number(可输入数字类型包括1e+2)",
					featured: true,//加粗显示label
					model: "numberInput",
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "range",
					label: "Range(选择数值输入范围,可配置最大值最小值)",
					featured: true,//加粗显示label
					model: "rankSlide",
					min: 0,
					max: 1000,
					styleClasses: "half-width"
				},
				{
					type: "input",
					inputType: "color",
					label: "Color(选择颜色,返回16进制颜色码)",
					featured: true,//加粗显示label
					model: "colorPicker",
					styleClasses: "half-width"
				},
				{
					type: "checkbox",
					label: "Status(单个选择框)",
					featured: true,//加粗显示label
					model: "oneCheckbox",
					default: true
				},
				{
					type: "checklist",
					label: "Skills(多个复选框,仅有选择值－不推荐)",
					featured: true,//加粗显示label
					model: "multiCheckbox",
					listBox: true,
					values: [
						"HTML5",
						"Javascript",
						"CSS3",
						"CoffeeScript",
						"AngularJS",
						"ReactJS",
						"VueJS"
					]    
				},
				{
					type: "checklist",
					label: "Roles(多个复选框,展示名称,提交key－推荐)",
					featured: true,//加粗显示label
					model: "checklistKeyValue",
					listBox: true,
					values: [
						{ id: "1", name: "Administrator"},
						{ id: "2", name: "Moderator"},
						{ id: "3", name: "Registered User"},
						{ id: "4", name: "Visitor"}
					]
				},
				{
					type: "radios",
					label: "单选按钮选择，仅有值，不推荐",
					featured: true,//加粗显示label
					model: "radios",
					values: [
						"James",
						"Nadia",
						"Paul",
						"Christelle",
						"Marc",
						"Marie"
					]
				},
				{
					type: "radios",
					label: "单选按钮选择,key-value形式，推荐",
					featured: true,//加粗显示label
					model: "dolphin",
					values: [
						{value: "1", name:"Lagenorhynchus albirostris"},
						{value: "2", name:"Lagenorhynchus australis"},
						{value: "3", name:"Lissodelphis borealis"},
						{value: "4", name:"Tursiops truncatus"},
						{value: "5", name:"Delphinus capensis"},
						{value: "6", name:"Lagenorhynchus obliquidens"},
						{value: "7", name:"Stenella attenuata"},
						{value: "8", name:"Cephalorhynchus eutropia"}
					],
					radiosOptions: {
						value:"value",
						name:"name"
					}
				},
				{
					type: "select",
					label: "Language",
					featured: true,//加粗显示label
					model: "lang",
					required: true,
					values: function() {
						return [
							{ id: "1", name: "English (GB)" },
							{ id: "2", name: "English (US)" },
							{ id: "3", name: "German" },
							{ id: "4", name: "Italic" },
							{ id: "5", name: "French" }
						]
					},
					default: "2",
					validator: VueFormGenerator.validators.required
				},
				{
					type: "text",
					label: "Website(输入最小长度为3，最大长度为255字符串且格式为URL)",
					featured: true,//加粗显示label
					model: "web",
					min: 3,
					max: 255,
					required: true,
					validator: VueFormGenerator.validators.string && VueFormGenerator.validators.url
				},
				{
					type: "text",
					label: "Phone(带有正则验证的输入框)",
					featured: true,//加粗显示label
					model: "phone",
					pattern: "^1[3|4|5|7|8][0-9]{9}$",
					placeholder: "输入手机号码",
					hint: "Format: 13146989727",
					help: "请输入电话号码",
					validator: VueFormGenerator.validators.regexp
				},
				{
					type: "textArea",
					label: "多行文本输入框",
					featured: true,//加粗显示label
					model: "bio",
					hint: "Max 500 characters",
					max: 50,
					placeholder: "User's biography",
					rows: 4,
					validator: VueFormGenerator.validators.string
				},
				{
					type: "switch",
					label: "Sex",
					featured: true,//加粗显示label
					model: "switchSex",
					textOn: "男",
					textOff: "女",
					valueOn: "1",
					valueOff: "2"
				},
				{
					type: "pikaday",
					label: "提交日期(显示时间选择框，保存值可自己设置)",
					featured: true,//加粗显示label
					model: "pikaday",
					placeholder: "User's birth of date",
					validator: VueFormGenerator.validators.date,
					pikadayOptions: {
							// bound: true,
							// position: 'bottom left',
							// reposition: true,
							// container: ,
							format: 'YYYY-MM-DD',
							// formatStrict: ,
							// defaultDate: ,
							// setDefaultDate: ,
							firstDay: 1,
							// minDate: ,
							// maxDate: ,
							// disableWeekends: false,
							// disableDayFn: ,
							// yearRange: ,
							// showWeekNumber: false,
							// isRTL: false,
							// i18n: {
							//     previousMonth : 'Previous Month',
							//     nextMonth     : 'Next Month',
							//     months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
							//     weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
							//     weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
							// },
							i18n: {
									previousMonth : '上月',
									nextMonth     : '下月',
									months        : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
									weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
									weekdaysShort : ['周一','周二','周三','周四','周五','周六','周天']
							},
							// yearSuffix: ,
							// showMonthAfterYear: false,
							// showDaysInNextAndPreviousMonths: false,
							// numberOfMonths: ,
							// mainCalendar: ,
							// theme: null,
							onSelect: function(param){
									vm.model.pikaday = param.getTime();
							}
					},
					onChanged(model, newVal, oldVal, field) {
							// model.age = moment().year() - moment(newVal).year();
					}
				},
				//jQuery dateTimePicker-日期
				{
					type: "dateTimePicker",
					label: "dobDate (dateTimePicker field)日期格式",
					model: "dobDate",
					required: true,
					placeholder: "User's birth of date",
					min: moment("1900-01-01").toDate(),
					max: moment("2018-01-01").toDate(),
					validator: [
						VueFormGenerator.validators.date
					],
					dateTimePickerOptions: {
						format: "YYYY-MM-DD"
					},
					onChanged(model, newVal, oldVal, field) {
						//model.age = moment().year() - moment(newVal).year();
					}
				},
				//jQuery dateTimePicker-日期－时间
				{
					type: "dateTimePicker",
					label: "dobDateTime (dateTimePicker field)日期格式",
					model: "dobDateTime",
					required: true,
					placeholder: "User's birth of date",
					min: moment("1900-01-01").toDate(),
					max: moment("2018-01-01").toDate(),
					validator: [
						VueFormGenerator.validators.date
					],
					dateTimePickerOptions: {
						format: "YYYY-MM-DD HH:mm:ss"
					},
					onChanged(model, newVal, oldVal, field) {
						//model.age = moment().year() - moment(newVal).year();
					}
				},
				//jQuery dateTimePicker 时间
				{
					type: "dateTimePicker",
					label: "dobTime",
					model: "dobTime",
					multi: true,
					format: "HH:mm:ss",
					/*validator: [
						validators.time
					],*/
					dateTimePickerOptions: {
						format: "HH:mm:ss"
					}
				},
				//自定义输入搜索
				{
					type: "SearchStars",
					label: "异步搜索演员名称并选择",
					model: "stars",
					url:'1111111111111',//接口传入url值
					featured: true,
					placeholder: "输入演员姓名",
					validator: VueFormGenerator.validators.array
				},
				//自定义输入搜索演员并可编辑饰演信息
				{
					type: "SearchEditStars",
					label: "异步搜索演员名称并选择",
					model: "editStars",
					url:'1111111111111',//接口传入url值
					featured: true,
					placeholder: "输入演员姓名",
					validator: VueFormGenerator.validators.array
				},
				//自定义输入搜索演员并可编辑饰演信息
				{
					type: "InputLabels",
					label: "标签输入Enter增加",
					model: "tags",
					featured: true,
					placeholder: "",
					validator: VueFormGenerator.validators.array
				},
				{
					type: "submit",
					label: "Submit",
					onSubmit:function(){
						console.log(JSON.stringify(vm.model, null, 4));
					},
					model: "submit",
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