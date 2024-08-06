<template>
    <div class="about">
      <h1>This is an contact page</h1>
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
          console.log("this is data in contact product",data);
        }).catch((err)=>{
          console.log(err)
        })
      },
      getCategories(){
        
      let config = {
          reportName: 'All_Categories',

      }
      ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
          console.log("this is data in about contact product",resp);
         
      }).catch((e) => {
          console.log(e);
      })
      }
    },
  
    created(){
     
  
      this.getData();
      this.getCategories();
    }
  }
  </script>
  