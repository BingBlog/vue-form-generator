<template lang="jade">
.wrapper
    input.form-control(
        type="text",
        @input="inputHandle",
        :autocomplete="schema.autocomplete",
        :disabled="disabled",
        :maxlength="schema.max",
        :pattern="schema.pattern",
        :placeholder="schema.placeholder",
        :readonly="schema.readonly",
        :name="schema.inputName",
		:url="schema.url"
    )
    .listbox.form-control(v-if="hasOptions")
        .list-row(v-for="item in options" @click="onSelect($event, item)")
            label.left-label {{ item.name }}
    .listbox.form-control(v-if="hasValues")
        .list-row(v-for="(item,index) in value")
            img.avator(:src="item.img")
            label.left-label {{ item.name }}
            span.play 饰演
            span.play-role
                input.play-role-input(type=text @input="roleInput($event, item)", :value="item.role")
            span.delete-arraow(@click="onDelete($event, item)") 删除
            span.up-arrow(v-if="index", @click="orderUp($event, item)") 上移
            span.up-arrow(v-else) ＊＊
            span.up-arrow(v-if="index !== value.length-1", @click="orderDown($event, item)") 下移
            span.up-arrow(v-else) ＊＊
</template>

<script>
	import {isObject, isArray} from "lodash";
	import abstractField from "./abstractField";

	export default {
		mixins: [ abstractField ],
		data(){
			return {
				comboExpanded: true,
				options:[]
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
			inputHandle(event){
				let that = this;
				let inputValue = event.target.value;
				let url = $(event.target).attr("url");
				console.log(inputValue);
				console.log(url);
				if(!inputValue.trim()){
					this.options = [];
					return;
				}
				$.ajax({
					url:"http://api.message.le.com/v1/batch/messages?userId=&deviceType=pc&touchSpotIds=63%2C64%2C65%2C66%2C67%2C68&clientKey=pc_liveforyou_c2dd6065-5912-411f-a11f-922e6e67df75&deviceId=8E77D3AFF800C9863BE7EF83270597AB3D3DAB96&format=jsonp",
					dataType:"jsonp",
					type : "get",
					data:{
						inputValue:inputValue
					},
					success:function(res){
						console.log(res);
						if(!event.target.value){
							that.options = [];
							return;
						}
						that.options = [
							{
								name:"wutengteng",
								value:"4",
								img:"https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg",
								role: "观世音"
							},
							{
								name:"songmeng",
								value:"2",
								img:"https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg",
								role: "猪八戒"
							},
							{
								name: "liangshan",
								value: "3",
								img: "https://s3.amazonaws.com/uifaces/faces/twitter/al_li/128.jpg",
								role: "沙僧"
							}
						];
					}
				});
			},
			onSelect(event, item){
				if(item.value && item.name){
					if(!this.isAlreadySeleted(item)){
						if(isArray(this.value)){
							this.value.push(item);
						}
					}else{
						console.log("alreadyChoose");
					}
				}

			},
			onDelete(event, item){
				let that = this;
				let newValues = [];
				if(isArray(this.value)){
					newValues = this.value.filter(function(el){
						return that.getItemValue(item) !== that.getItemValue(el);
						// return true;
					});
				}
				this.value = newValues;
			},
			orderUp(event, item){
				//获取当前元素的下标，将前一个对象缓存，将所选对象插入到前一个位置，将缓存的对象插入到当前位置
				let curIndex = this.getSelectedValues().indexOf(this.getItemValue(item));
				if(curIndex > 0){
					this.value.splice(curIndex, 1);
					this.value.splice(curIndex-1, 0, item);
				}
			},
			orderDown(event, item){
				let curIndex = this.getSelectedValues().indexOf(this.getItemValue(item));
				if(isArray(this.value) && curIndex < this.value.length){
					this.value.splice(curIndex, 1);
					this.value.splice(curIndex + 1, 0, item);
				}
			},
			roleInput(event, item){
				let curIndex = this.getSelectedValues().indexOf(this.getItemValue(item));
				console.log(this.value[curIndex]);
				this.value[curIndex]["role"] = event.target.value;
			},
			getItemValue(item) {
				if (isObject(item) && item.value){
					return item.value;
				}
			},
			getSelectedValues() {
				// return (this.value && this.value.indexOf(this.getItemID(item)) != -1);
				let valueKeys = [];
				if(this.value && isArray(this.value) && this.value.length > 0){
					for(let item of this.value){
						valueKeys.push(this.getItemValue(item));
					}
				}
				return valueKeys;
			},
			isAlreadySeleted(item){
				if(this.getSelectedValues().indexOf(this.getItemValue(item)) === -1){
					return false;
				}else{
					return true;
				}
			}
		}
	};
</script>

<style lang="sass">
.vue-form-generator .field-SearchEditStars {
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
				.play-role-input{
					height: 30px;
					width:100px;
				}
			}
			.left-label{
				width:100px;
				text-align: left;
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