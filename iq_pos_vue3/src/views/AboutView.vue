<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { ZOHO } from '@/lib/ZOHO-SDK';
export default{

  methods:{
    getData(){
      let config = {
        reportName:"All_Products"
      }
      ZOHO.CREATOR.API.getAllRecords(config).then((data)=>{
        console.log("this is data in about",data);
      }).catch((err)=>{
        console.log(err)
      })
    }
  },

  created(){
    console.log("this is window",window.location)
    console.log(ZOHO);
    this.getData();
  }
}
</script>
