<template>
    <v-col >
     <v-card
    class="mx-auto"
    max-width="250"
    height="245"
   
  >
     <!-- src="https://creatorapp.zoho.com/jayesh78/iq-pos/report/All_Products/3131318000003880073/Product_Image/download-file?filepath=/1686884260310_domino-164_6wVEHfI-unsplash.jpg&mediaType=1" -->
        <!-- <img src="#" :id="'image'+product.Id" alt="" width="500" height="600">> -->

        <!-- <img :src="imageSrc" border="0" class="zc-image-view" elname="zc-ShowPreviewImgEl"  width="100" height="100"> -->
       
        <!-- :src="`https://creatorexport.zoho.com/file/greatbarrierroof/gbr-crm/All_Photos/${img.ID}/Image/image-download?filepath=${img.display_value.substring(img.display_value.indexOf('=')+1)}`"

                :lazy-src="`https://creatorexport.zoho.com/file/greatbarrierroof/gbr-crm/All_Photos/${img.ID}/Image/image-download?filepath=${img.display_value.substring(img.display_value.indexOf('=')+1)}`" -->


      <!-- :src="`https://creatorexport.zoho.com/file/${appSettings.scope}/${appSettings.appLinkName}/All_Products/${product.ID}/Product_Image/image-download?filepath=${this.product.Product_Image.split('?')[1].split('=')[1]}`" -->

   

        <!-- <v-img 
         :src="`https://creatorapp.zohopublic.com/${appSettings.scope}/${appSettings.appLinkName}/eport-perma/All_Products/${product.ID}/Product_Image/image-download/HYM6ehxFHKggY6h5asqNE98waR83ShxrSy4YR3Ez2whuCgYeBeNaPDkusAx2P2rh5ADAKZtCggmBQJbEmsT8EmhnwPm0EAwZ7H6E?filepath=${this.product.Product_Image.split('?')[1].split('=')[1]}`"
        
     border="0" 
     class="grey lighten-2 br"
                width="150px"
                height="150px"
   
     elname="zc-ShowPreviewImgEl" 
     labelname="Product_Image"/> -->
     <!-- <img :src="`https://creatorapp.zohopublic.com/${appSettings.scope}/${appSettings.appLinkName}/report-perma/All_Products/${product.ID}/Product_Image/image-download/HYM6ehxFHKggY6h5asqNE98waR83ShxrSy4YR3Ez2whuCgYeBeNaPDkusAx2P2rh5ADAKZtCggmBQJbEmsT8EmhnwPm0EAwZ7H6E?filepath=${this.product.Product_Image.split('?')[1].split('=')[1]}`" alt="" width="200" -->
     <!-- height="150"> -->


     <!-- https://creatorapp.zoho.com/file/jayesh78/iq-pos/All_Products/3131318000003880079/Product_Image/image-download?filepath=1686884281006_c-d-x-PDX_a_82obo-unsplash.jpg -->


     <!-- https://creatorapp.zohopublic.com/file/jayesh78/iq-pos/All_Products/3131318000003880079/Product_Image/image-download/HYM6ehxFHKggY6h5asqNE98waR83ShxrSy4YR3Ez2whuCgYeBeNaPDkusAx2P2rh5ADAKZtCggmBQJbEmsT8EmhnwPm0EAwZ7H6E?filepath=1686884281006_c-d-x-PDX_a_82obo-unsplash.jpg -->

     <img :src="`https://creatorapp.zohopublic.com/file/${appSettings.scope}/${appSettings.appLinkName}/All_Products/${product.ID}/Product_Image/image-download/HYM6ehxFHKggY6h5asqNE98waR83ShxrSy4YR3Ez2whuCgYeBeNaPDkusAx2P2rh5ADAKZtCggmBQJbEmsT8EmhnwPm0EAwZ7H6E?filepath=${this.product.Product_Image.split('?')[1].split('=')[1]}`" width="200" height="150" lt="">

     <!-- <img src="#" :id="'image'+product.ID"  width="200"
     height="150" alt=""> -->
    <!-- <v-img
    `
    ref="imgRef"
      height="200px"
     

      src="https://creatorapp.zoho.com/jayesh78/iq-pos/report/All_Products/3131318000003880073/Product_Image/download-file?filepath=/1686884260310_domino-164_6wVEHfI-unsplash.jpg&mediaType=1"
      
      
      cover
    ></v-img> -->

    <v-card-title>
      {{ product.Product}}
    </v-card-title>

    <v-card-subtitle>
     {{ product.Rate }} RS
    </v-card-subtitle>
    <v-action></v-action>
    <v-spacer></v-spacer>
  </v-card>
</v-col>

</template>
<script>
import { mapState } from 'pinia';
import { useCounterStore } from '@/store';
import { ZOHO } from '@/lib/ZOHO-SDK';

export default {
    props:['product'],
    data(){
        return{
            show: false,
            str:"",
            
            // imageSrc :"https://creatorapp.zohopublic.com/jayesh78/iq-pos/report/All_Products/"+this.product.ID+"/Product_Image/download-file/HYM6ehxFHKggY6h5asqNE98waR83ShxrSy4YR3Ez2whuCgYeBeNaPDkusAx2P2rh5ADAKZtCggmBQJbEmsT8EmhnwPm0EAwZ7H6E?filepath=/"+this.product.Product_Image.split('?')[1].split('=')[1]+"&amp;mediaType=1&amp;digestValue=eyJkaWdlc3RWYWx1ZSI6MTcxODI5MjY2NDczNywibGFuZ3VhZ2UiOiJlbiJ9",
            imageSrc:"https://previewengine-accl.zoho.com/image/CREATOR/292954000000358002?cli-msg=eyJzY29wZW5hbWUiOiJqYXllc2g3OCIsImFwcGxpbmtuYW1lIjoiaXEtcG9zIiwidmlld2xpbmtuYW1lIjoiQWxsX1Byb2R1Y3RzIiwicmVjb3JkaWQiOiIzMTMxMzE4MDAwMDAzODgwMDg1IiwiZmllbGRsaW5rbmFtZSI6IlByb2R1Y3RfSW1hZ2UiLCJmaWxlcGF0aCI6IjE2ODY4ODQzNjE2MjZfZ2lvcmdpby10cm92YXRvLUs2MnUyNUprNnZvLXVuc3BsYXNoLmpwZyIsImRpZ2VzdFZhbHVlIjoiZXlKa2FXZGxjM1JXWVd4MVpTSTZNVGN4T0RNMU5qTTROVEEzT0N3aWJHRnVaM1ZoWjJVaU9pSmxiaUo5IiwiZG93bmxvYWR0eXBlIjoiaW1hZ2UiLCJhdXRob3JpemVkbW9kdWxlIjoicmVwb3J0IiwibG9naW5adWlkIjoiNzg5OTgzODQ5Iiwic2NvcGVJZCI6IjYzMzYzNTA0MiIsImFwcExpbmtOYW1lIjoiaXEtcG9zIiwieC1hdXRoLXBhdGgiOiJqYXllc2g3OC9pcS1wb3MifQ==",

            downqual:"https://creatorapp.zohopublic.com/jayesh78/iq-pos/report/All_Products/"+this.product.ID+"/Product_Image/download-file/HYM6ehxFHKggY6h5asqNE98waR83ShxrSy4YR3Ez2whuCgYeBeNaPDkusAx2P2rh5ADAKZtCggmBQJbEmsT8EmhnwPm0EAwZ7H6E?filepath=/"+this.product.Product_Image.split('?')[1].split('=')[1]+"&mediaType=1&digestValue=eyJkaWdlc3RWYWx1ZSI6MTcxODI5MDM1NTc4MCwibGFuZ3VhZ2UiOiJlbiJ9"
        
        }
    },

    computed:{
        ...mapState(useCounterStore,['appSettings']),
        
    },
    methods:{
        setImage(){
          console.log("runnnig the set image");
          
            let img = document.getElementById('image'+this.product.ID);
            var imageFromGetRecordsAPI = this.product.Product_Image;
          ZOHO.CREATOR.UTIL.setImageData(img,imageFromGetRecordsAPI,this.runFunction);
        },
        runFunction(data){
            
            console.log(data);
        }
       
    },
    mounted(){
        // this.setImage();
    },
    created(){
        // console.log(this.product.ID);
        
    
    }

   
}
</script>
<style>
</style>