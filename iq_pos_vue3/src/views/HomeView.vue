<template>
  <v-app>
  <v-row class="mt-2 px-3">
    <v-col cols="2"  style=" border: 0.5px solid #d3d3d3;" ><CategorySection/></v-col>
    <v-col cols="7"  style=" border: 0.5px solid #d3d3d3;">
      <ProductComponent/>
    </v-col>
    <v-col cols="3"  style=" border: 0.5px solid #d3d3d3;">
      <OrderCart/>
    </v-col>
  </v-row>
</v-app>
</template>

<script>
import { defineComponent } from 'vue';
import ProductComponent from '../components/ProductComponent.vue';
import OrderCart from '../components/OrderCart.vue';
import CategorySection from '../components/CategorySection.vue';
import { mapState } from 'pinia';
import { useCounterStore } from '@/store';
// Components
// import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',

  components: {
    ProductComponent,OrderCart,CategorySection
    
  },
  created(){
    let userId = this.userData?.id;
    if(!userId){
      this.$router.push('/login');
    }
    
  },
  computed:{
    ...mapState(useCounterStore,['userData']),
  }
});
</script>
