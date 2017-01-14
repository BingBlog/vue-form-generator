<template lang="jade">
	.input-group.date
		input.form-control(type="text", v-model="value", :autocomplete="schema.autocomplete", :disabled="disabled", :placeholder="schema.placeholder", :readonly="schema.readonly", :name="schema.inputName")
		span.input-group-addon
			span.glyphicon.glyphicon-calendar
</template>

<script>
	/* global $ */
	import abstractField from "./abstractField";
	import moment from "moment";
	import { defaults } from "lodash";

	let inputFormat = "YYYY-MM-DD HH:mm:ss";

	export default {
		mixins: [ abstractField ],

		methods: {

			getDateFormat() {
				if (this.schema.dateTimePickerOptions && this.schema.dateTimePickerOptions.format) 
					return this.schema.dateTimePickerOptions.format;
				else
					return inputFormat;
			},

			formatValueToField(value) {
				if (value != null)
					return moment(value, this.schema.format).format(this.getDateFormat());

				return value;
			},

			formatValueToModel(value) {
				if (value != null) {
					let m = moment(value, this.getDateFormat());
					if (this.schema.format)
						value = m.format(this.schema.format);
					else
						value = m.toDate().valueOf();
				}

				return value;
			}

		},

		mounted() {
			let that = this;
			this.$nextTick(function () {
				if ($.fn.datetimepicker) {
					$(this.$el).datetimepicker(defaults(this.schema.dateTimePickerOptions || {}, {
						format: inputFormat
					}));
					//此处插件有问题，在选择时间后并没有更新数据，尝试使用 change 时间监听无效。
					//发现 blur 事件有效。事件选择框在关闭时会触发blur事件，监听 blur事件，同步数据。
					//能暂时解决事件选择的需求，但是每次blur都会触发，所以做了新旧 value 对比。
					$(this.$el).find("input").on("blur",function(event){
						let formatValue = that.formatValueToField(event.target.value);
						if(that.value !== formatValue){
							that.value = formatValue;
						}
					});
				} else {
					console.warn("Bootstrap datetimepicker library is missing. Please download from https://eonasdan.github.io/bootstrap-datetimepicker/ and load the script and CSS in the HTML head section!");
				}
			});
		},

		beforeDestroy() {
			if ($.fn.datetimepicker){
				$(this.$el).data("DateTimePicker").destroy();
			}
		}		
	};
</script>


<style lang="sass">
</style>
