<template lang="jade">
.wrapper
    input.form-control(
        type="text",
        @keyup.enter="addLabel",
        :autocomplete="schema.autocomplete", 
        placeholder="输入后enter添加", 
        :disabled="disabled", 
        :maxlength="schema.max", 
        :pattern="schema.pattern", 
        :readonly="schema.readonly", 
        :name="schema.inputName",
        )
    .listbox.form-control(v-if="hasValues")
        .list-row(v-for="(item,index) in value")
            label.left-label {{ item }}
            span.delete-arraow(@click="onDelete($event, item, index)") 删除
            span.up-arrow(v-if="index" @click="orderUp($event, item, index)") 上移
            span.up-arrow(v-else) ＊＊
            span.up-arrow(v-if="index !== value.length-1" @click="orderDown($event, item, index)") 下移
            span.up-arrow(v-else) ＊＊
</template>

<script>
	import {isArray} from "lodash";
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ],
		data(){
			return {
				comboExpanded: true
			};
		},
		created(){
			console.log(this.value);
		},
		computed: {
			hasOptions(){
				return this.options.length > 0 ? true : false;
			},
			hasValues(){
				return this.value.length > 0 ? true : false;
			}
		},
		methods: {
			addLabel(event){
				let inputValue = event.target.value;
				if(!inputValue.trim()){
					this.options = [];
					return;
				}
				if(isArray(this.value) && this.value.indexOf(inputValue) === -1){
					this.value.push(inputValue);
				}
				event.target.value = "";
			},
			onDelete(event, item, index){
				if(isArray(this.value)){
					this.value.splice(index, 1);
				}
			},
			orderUp(event, item, index){
				if(index > 0){
					this.value.splice(index, 1);
					this.value.splice(index-1, 0, item);
				}
			},
			orderDown(event, item, index){
				if(isArray(this.value) && index < this.value.length){
					this.value.splice(index, 1);
					this.value.splice(index + 1, 0, item);
				}
			}
		}
	};
	
</script>

<style lang="sass">
.vue-form-generator .field-InputLabels {
	.listbox, .dropList {
		height: auto;
		max-height: 300px;
		overflow: auto;
		.list-row {
			height:32px;
			line-height:32px;
			width:100%;
			overflow:hidden;
			img{
				width: 32px;
				height: 32px;
				border-radius: 100%;
				margin-right: 0.4em;
				float:left;
			}
			label {
				font-weight: initial;
				cursor: pointer;
				display: inline-block;
				text-align: center;
				float:left;
			}
			span{
				margin-left:20px;
				cursor: pointer;
				display: inline-block;
				text-align: center;
				float:left;
			}
			.left-label{
				width:100px;
				text-align: left;
				display:inline-block;
				overflow:hidden;
			}
			.up-arrow{
				width: 50px;
			}
		}
		.list-row:hover{
			background: #e4e4e4;
			cursor: pointer;
		}
	}

	.combobox {
		height: initial;
		overflow: hidden;
		.dropList {
			transition: height 0.5s;
			//margin-top: 0.5em;
		}
	}
}
</style>
