<template>
    <div>
        <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        style="margin-bottom: 10px"
      ></v-text-field>
      <v-row v-if="productLoading">
    <v-col 
      v-for="(item, index) in 9"
      :key="index"
      cols="12" sm="3" md="3" lg="4"
       >
      <v-skeleton-loader max-width="200" type="card, text" class="mx-auto border my-2 card"></v-skeleton-loader>
    </v-col>
  </v-row>


  <v-row v-else style="height: 100vh;overflow-y: auto;">
  <v-col
      v-for="(item) in products"
      :key="item.ID"
      cols="12" sm="6" md="4" lg="3"
      @click="addProductTooCart(item)" >
    <ProductCard  :key="item.ID" :product="item"  />
</v-col></v-row>
</div>

</template>

<script >
import ProductCard from '../components/ProductCard.vue';
// import { ZOHO } from '@/lib/ZOHO-SDK';
import { db } from '@/firebase';
import {mapActions,mapState} from 'pinia';
import { useCounterStore } from '@/store';
export default{
    data(){
        return{
            search:'',
        }
    },
    components:{
        ProductCard
    },
    methods:{
        ...mapActions(useCounterStore,['setOrderList','getProducts']),
       
        addProductTooCart(item){
            let previousList = this.orderList;
            let ele = previousList.find((ele)=>ele.ID == item.ID);
            if(ele){
                ele.quantity += 1;
                previousList.find((ele)=>ele.ID == item.ID).quantity = ele.quantity;
            }else{
                item.quantity += 1;
                previousList.push(item);

            }

            this.setOrderList(previousList);

            console.log(this.orderList);
            this.orderList.forEach((item)=>{
                console.log("this is item",item);
            })
            
            this.updateDB();
        },
        updateDB(){
            db.collection('carts').doc(this.userData.id).update({
                [`${this.appSettings.appLinkName}.cartData.items`] : this.orderList
            }).then(()=>{
                console.log('upated succes fully');
            }).catch((e)=>{
                console.log("error -->",e);
            })
        }
        
    },
    created(){
        
  this.getProducts();

    },
    computed:{
        ...mapState(useCounterStore,['orderList','products','productLoading','userData','registeredApps','appSettings']),
    }
    
    
}
</script>

<style>

.card{
    height: 250px !important;
    width:200px !important;
}

</style>