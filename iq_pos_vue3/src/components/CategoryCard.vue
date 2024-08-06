<template>
   <v-card class="small-card mt-2"  @click="getCategory(category.ID)">
    <v-row align="center" no-gutters>
      <v-col class="d-flex justify-center" cols="auto">
        <img src="#" :id="'image' + category.ID" alt="" width="35" height="35" class="rounded-circle">
      </v-col>
      <v-col>
        <v-card-title class="ml-2">
          {{ category.Category_Name }}
        </v-card-title>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
import { ZOHO } from '@/lib/ZOHO-SDK';
import {mapActions} from 'pinia';
import { useCounterStore } from '@/store';
export default{
  props:['category'],

  methods:{

    ...mapActions(useCounterStore,['setProducts']),
    setImage(){
        let img = document.getElementById('image'+this.category.ID);
            var imageFromGetRecordsAPI = this.category.Category_Image;
          ZOHO.CREATOR.UTIL.setImageData(img,imageFromGetRecordsAPI,this.runFunction);
    },
    runFunction(data){
        console.log(data)
    },
    getCategory(id){
        let config = {
            reportName:'All_Products',
            criteria:`Categories==${id}`
        }
   
        ZOHO.CREATOR.API.getAllRecords(config).then((resp)=>{
            console.log(resp);
            if(resp.code == 3000){
                this.setProducts(resp.data);
            }
        }).catch((e)=>{
            console.log(e);
        })
    }
  },
  mounted(){
    this.setImage();
  }
}
</script>

<style>
.small-card {
  padding: 4px !important;
  min-height: auto !important;
  height: auto !important;
  border: none !important; /* Remove border */
  box-shadow: none !important; /* Remove box shadow */
}

.rounded-circle {
  border-radius: 50%;
}

.ml-2 {
  margin-left: 8px;
}

.v-card-title {
  font-size: 14px; /* Smaller font size */
  line-height: 1; /* Reduce line height */
  margin: 0; /* Remove default margin */
}
</style>