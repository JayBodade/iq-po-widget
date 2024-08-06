<template>
    <v-container class="justify-center align-center">
   
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="email"
            label="Email"
            
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
          
            type="password"
            required
          ></v-text-field>
        </v-form>
   
        <v-card-actions>
        <v-btn color="primary" @click="logIn" >
          Log In
        </v-btn>
      </v-card-actions>
  
  </v-container>

</template>
<script>
import { auth } from '@/firebase';
import { useCounterStore } from '@/store';
import { mapActions } from 'pinia';
export default{
    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
      ...mapActions(useCounterStore,['setUserId']),
      logIn(){
        auth.signInWithEmailAndPassword(this.email,this.password).then((user)=>{
          this.setUserId(user.uid);
        }).catch((e)=>{
          console.log("something went wrong",e);
        })
      }
    }
}
</script>
<style>
.v-container{
  padding: 10px 10px;
  background-color: white;
}
</style>

