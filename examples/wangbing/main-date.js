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
            pikaday:1484755200000,
			dobTime:825362307263,
		},
		schema: {
			fields: [
                //一下兼容性不好不推荐
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
                    type: "pikaday",
                    label: "提交日期",
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
				{
					type: "dateTimePicker",
					label: "DOB (dateTimePicker field)111111111111111",
					model: "dobTime",
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
				}
			]
		},

		formOptions: {
			validateAfterLoad: true,
			validateAfterChanged: true
		}
	}
});