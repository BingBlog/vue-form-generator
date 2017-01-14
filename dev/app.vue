<template>
<div>
  <div class="row">
    <div class="col-md-10 col-md-offset-1">
      <data-table :rows="rows" :selected="selected" :select="selectRow"></data-table>
    </div>
  </div>
  <div v-show="model" class="row">
    <div class="col-md-5 col-md-offset-1">
      <div class="control-buttons text-center">
        <button @click="newModel" class="btn btn-default new"> <i class="fa fa-plus"></i>New</button>
        <button @click="saveModel" class="btn btn-primary save"> <i class="fa fa-floppy-o"></i>Save<i v-if="showWarning()" class="fa fa-warning"></i></button>
        <button @click="deleteModel" class="btn btn-danger delete"> <i class="fa fa-trash"></i>Delete</button>
      </div>
      <div class="errors text-center">
        <div v-for="(item, index) in validationErrors" track-by="index" class="alert alert-danger">{{ item.field.label}}: <strong>{{ item.error }}</strong></div>
      </div>
      <vue-form-generator :schema="schema" :model="model" :options="formOptions" :multiple="selected.length > 1" ref="form" :is-new-model="isNewModel" @model-updated="modelUpdated"></vue-form-generator>
    </div>
    <div class="col-md-6">
      <pre v-if="model" v-html="prettyModel"></pre>
    </div>
  </div>
</div>

</template>

<script>
	import Vue from "vue";
	import VueFormGenerator from "../src";
	import DataTable from "./dataTable.vue";
	import Fakerator from "fakerator";

	import Schema from "./schema";
	import { users } from "./data";
	import { filters } from "./utils";

	// Test custom field
	import FieldAwesome from "./fieldAwesome.vue";
	Vue.component("fieldAwesome", FieldAwesome);

	import {each, isFunction, cloneDeep, merge} from 'lodash';	

	Vue.use(VueFormGenerator);

	let fakerator = new Fakerator();

	export default {
		components: {
			DataTable
		},

		filters: filters,

		data() {
			return {
				isNewModel: false, 

				selected: [],

				model: {
						"firstName": "Everett",
						"lastName": "Jerde",
						"userName": "everett31",
						"password": "xunepitiza",
						"email": "everett.jerde38@hotmail.com",
						"phone": "(705) 578-4488 x97201",
						"dob": 825362307263,
						dobTime:825362307263,
						"website": "https://kim.net",
						"ip": "237.175.102.82",
						"avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/cybind/128.jpg",
						"gravatar": "https://www.gravatar.com/avatar/637633cb8066e92da682eb477cab009f",
						"address": {
							"country": "Australia",
							"countryCode": "AU",
							"state": "Maine",
							"city": "O'Keefemouth",
							"street": "2967 Angelo Skyway Apt. 911",
							"zip": "90678-4449",
							"geo": {
								"latitude": -57.6959,
								"longitude": 102.69299999999998
							}
						},
						"status": true,
						"id": 5,
						"type": "business",
						"bio": "Aut non et sequi repudiandae. Quae ex et. Consectetur quia voluptatibus.",
						"time": "11:56:12",
						"age": 21,
						"rank": 10,
						"role": "visitor",
						"sex": "female",
						"skills": [
							"CSS3",
							"CoffeeScript"
						],
						"language": "en-US",
						"created": 1483104494121,
						"dt": 1482553478870,
						"favoriteColor": "#322180",
						"color": "#7d6457",
						"stars": [
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
                        "editStars": [
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
						"tags": [
							'wangbing',
							'songmeng',
							'liangshan'
						],
						"company": {
							"name": "Beatty-Heller Corp.",
							"email": "beatty-heller-corp.jakubowski72@gmail.com",
							"phone": "(391) 384-3232 x2148",
							"website": "http://allanlockman.eu",
							"ip": "39.110.207.21",
							"address": {
								"country": "Samoa",
								"countryCode": "WS",
								"state": "Idaho",
								"city": "Laurenmouth",
								"street": "69495 Marion Route",
								"zip": "48204",
								"geo": {
									"latitude": -15.876900000000006,
									"longitude": -7.9238
								}
							}
						},
						"income": [
							1323,
							87145
						]
					},

				rows: users,

				schema: Schema,

				formOptions: {
					validateAfterLoad: true,
					validateAfterChanged: false,
					validateBeforeSave: true
				}
			}
		},

		computed: {
			validationErrors() {
				if (this.$refs.form && this.$refs.form.errors) 
					return this.$refs.form.errors;

				return [];
			},
			prettyModel(){
				return filters.prettyJSON(this.model);
			}
		},

		methods: {
			showWarning() { 
				if (this.$refs.form && this.$refs.form.errors) {
					return this.$refs.form.errors.length > 0 
				}
			},

			selectRow(event, row, add) {
				this.isNewModel = false;
				if ( (add || (event && event.ctrlKey))) {
					if (this.selected.indexOf(row) != -1){
						var index = this.selected.indexOf(row);
						this.selected.splice(index, 1);
					} else {
						this.selected.push(row);
					}
				} else {
					this.clearSelection();
					this.selected.push(row);
				}
				this.generateModel();
			},

			clearSelection() {
				this.selected.splice(0);
				this.generateModel();
			},			

			generateModel() {
				if (this.selected.length == 1) {
					this.model = cloneDeep(this.selected[0]);
				} else if (this.selected.length > 1) {
					this.model = VueFormGenerator.schema.mergeMultiObjectFields(Schema, this.selected);
				} else {
					this.model = null;				
				}
			},

			newModel() {
				console.log("Create new model...");
				this.selected.splice(0);
				let newRow = VueFormGenerator.schema.createDefaultObject(Schema, { id: this.getNextID() })
				this.isNewModel = true;
				this.model = newRow;

				let el = document.querySelector("div.form input:nth-child(1):not([readonly]):not(:disabled)");
				if (el)
					el.focus()

			},			

			saveModel() {
				console.log("Save model...");
				if (this.formOptions.validateBeforeSave === false ||  this.validate()) {
					this.mergeModelValues();

					if (this.isNewModel) {
						this.rows.push(this.model);
						this.selectRow(null, this.model, false);
					}

				} else {
					console.warn("Error saving model...");
					// Validation error
				}
			},

			mergeModelValues() {
				let model = this.model;
				if (model && this.selected.length > 0) {
					each(this.selected, (row) => {
						merge(row, model);
					});
				}
			},

			deleteModel() {
				if (this.selected.length > 0) {
					each(this.selected, (row) => {
						let index = this.rows.indexOf(row);
						this.rows.splice(index, 1)
					})
					this.clearSelection();
				}
			},

			getNextID() {
				let id = 0;

				each(this.rows, (row) => {
					if (row.id > id)
						id = row.id;
				});

				return ++id;
			},

			validate()	{
				console.log("validate", this.$refs.form, this.$refs.form.validate());
				return this.$refs.form.validate();
			},

			modelUpdated(newVal, schema) {
				console.log("main model has updated", newVal, schema);
				// this.model[schema] = newVal;
			}

			 
		},
		
		mounted() {
			// this.$nextTick(function () {
			// 	window.app = this;

			// 	if (users.length > 0) {
			// 		this.selectRow(null, fakerator.random.arrayElement(users));
			// 	}

			// 	// Localize validate errors
			// 	// VueFormGenerator.validators.resources.fieldIsRequired = "Ezt a mezőt kötelező kitölteni!";
			// 	// VueFormGenerator.validators.resources.textTooSmall = "A szöveg túl rövid! Jelenleg: {0}, minimum: {1}";
			// })
		}
	}

	window.Vue = require('vue');
</script>

<style lang="sass">
	@import url(http://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700|Open+Sans+Condensed:300&subset=latin,latin-ext);

	html {
		font-family: "Open Sans";
				font-size: 14px;
	}

	* {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	pre {
		overflow: auto;
		
		.string { color: #885800; }
		.number { color: blue; }
		.boolean { color: magenta; }
		.null { color: red; }
		.key { color: green; }    	
	} 

	.control-buttons {
		button {
			margin: 0.2em 0.3em;
			padding: 6px 20px;
			position: relative;

			i {
				margin-right: 0.3em;
			}
		}

		i.fa.fa-warning {
			position: absolute;
			top: 0px;
			right: 0px;
			color: Orange;			
		}
	}

	.errors {
		.alert {
			padding: 4px;
			width: 80%;
			margin: 5px auto;
		}
	}

	fieldset.vue-form-generator {

		.form-group.half-width {
			width: 50%;
		}

		.half-width + .half-width {
			&:not(.first) {
				padding-left: 0.5rem;
			}
		}

	}


</style>