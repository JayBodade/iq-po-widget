<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
      
        
        
        permanent
      >
      <v-list density="compact" style="top:10%" nav>
          <v-list-item @click="changeFormData('customer')" prepend-icon="mdi-account" title="Customer" value="home"></v-list-item>
          <v-list-item @click="changeFormData('product')" prepend-icon="mdi-cart-outline" title="Products" value="account"></v-list-item>
          <v-list-item @click="changeFormData('order')" prepend-icon="mdi-text" title="Orders" value="users"></v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>
<script>

export default{

    methods:{
        changeFormData(type){
            this.$emit('changeFormData',type)
        }
    }

}
</script>

<style scoped>
.v-navigation-drawer {
  background-color: #f5f5f5;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.v-list-item-title {
  color: #424242;
}
</style>