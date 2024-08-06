<template>
 <v-container class="text-center py-10 mx-auto">
   <v-row>
    <v-col cols="4">
      <SideBar @changeFormData="changeFormData"/>
    </v-col>
    <v-col cols="8">
      <v-container class="pa-2">
      <v-row class="d-flex justify-center">
        <v-col cols="12" md="8">
          <v-card class="pa-4">
            <v-card-title class="text-h5 font-weight-bold text-center">
              Customer Form
            </v-card-title>
            <v-card-text>
              <v-form ref="form" lazy-validation>
                <v-row>
                  <v-col v-if="settingsMeta?.form?.formName" cols="9" class="mb-1">
                    <span class="form-label">Form Name</span>
                    <v-text-field
                      v-model="settingsMeta.form.formName"
                      label="Name"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col v-if="settingsMeta?.form?.formName" cols="3" class="d-flex align-center mb-1">
                    <v-btn color="secondary">
                      Verify
                    </v-btn>
                  </v-col>

                  <v-col cols="9" class="mb-3">
                    <span class="form-label">Report Name</span>
                    <v-text-field
                      v-model="settingsMeta.report.reportName"
                      label="Report Name"
                      dense
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="3" class="d-flex align-center mb-3">
                    <v-btn color="secondary">
                      Verify
                    </v-btn>
                  </v-col>

                  <v-col cols="12" class="mb-3">
                    <span class="form-label mb-2">Mapped Fields</span>
                    <v-row v-for="(item, index) in mappedField" :key="index" class="mb-2 align-start">
                      <v-col cols="4" class="text-right pr-3">
                        {{ item }}
                      </v-col>
                      <v-col cols="8">
                        <v-select
                          v-model="settingsMeta.mappedFields[item]"
                          :items="['Male', 'Female', 'Other']"
                          label="Gender"
                          dense
                          required
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-btn class="mr-1"  style="margin-right: auto !important" color="secondary" @click="submit" >
                      Verify
                    </v-btn>
                 
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    </v-col>
   </v-row>
   

    
  </v-container>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import { useCounterStore } from '@/store';
import { mapState } from 'pinia';
export default {

    data(){
        return{
           formName:'',
           reportName:'',
           mappedField:'',
           settingType:'customer',
           settingsMeta:{},
           mappedFields:null,
        }
    },
    components:{
      SideBar
    },
    computed:{
      ...mapState(useCounterStore,['userData']),
    },
    created(){
      this.settingsMeta = this.userData.settings.customerSettings;
      this.mappedField = Object.keys(this.userData.settings.customerSettings.mappedFields);
      this.mappedField = this.mappedField.filter((item)=>item != 'completed');

    },
    methods:{
    changeFormData(text){
      this.settingsMeta = this.userData.settings[`${text}Settings`];
      this.mappedField = Object.keys(this.userData.settings[`${text}Settings`].mappedFields);
      this.mappedField = this.mappedField.filter((item)=>item != 'completed');

    },
   
  }
}
</script>

<style scoped>
.v-card {
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.v-card-title {
  color: #424242;
}
.form-label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
.v-text-field,
.v-select {
  margin-bottom: 16px;
}
.v-btn {
  font-size: 16px;
  font-weight: bold;
  text-transform: none;
}
.v-row.no-gutters {
  margin: 0;
}
.v-col {
  padding: 0 8px;
}
</style>