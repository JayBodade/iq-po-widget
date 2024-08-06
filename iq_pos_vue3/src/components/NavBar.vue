<template>   
  <v-card class="mx-auto" color="indigo darken-2" max-width="448" style="z-index: 5;">
  <v-layout>
    <v-app-bar color="indigo darken-2">
      <v-row align="center" class="d-flex justify-space-between" no-gutters>
        <v-tabs v-model="tab" align-tabs="center">
          <v-tab v-if="!userData?.id" >Home</v-tab>
          <v-tab v-else @click="$router.push('/dashboard')" value='/dashboard'>Home</v-tab>
         
        </v-tabs>
        <v-spacer></v-spacer>
        <v-tabs v-model="tab" align-tabs="center">
          <v-tab v-if="!userData?.id" @click="$router.push('/login')" value='/login'>Log In</v-tab>
          <v-tab v-else @click="logOut()" value='/extractdata'>Log Out</v-tab>
          <v-tab v-if="!userData?.id" @click="$router.push('/signup')" value='/extractdata'>Sign Up</v-tab>
          <v-tab v-else @click="$router.push('/settings')" value='/settings'>Settings</v-tab>
          <v-tab v-if="userData?.id" @click="$router.push('/allorders')" >All Orders</v-tab>
        </v-tabs>
      </v-row>
    </v-app-bar>
  </v-layout>
</v-card>

</template>

<script>
import { mapState,mapActions } from 'pinia';
import { auth } from '@/firebase';
import { useCounterStore } from '@/store';
export default{
  data(){
    return {
      tab:null,
    }
  },
  computed:{
    ...mapState(useCounterStore,['userId','userData']),
  },
  methods:{

    ...mapActions(useCounterStore,['setUserId','setUserData']),
    logOut(){
      auth.signOut().then(()=>{
        console.log("user logged out");
        this.setUserId(null);
        this.setUserData(null);
        this.tab = '/login';
      }).catch((e)=>{
        console.log("something went wrong",e);
      })
    }
  }
}
</script>
<style>
.v-container{
  padding: 0px;
  width: 100%;
}
</style>