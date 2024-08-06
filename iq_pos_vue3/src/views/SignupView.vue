<template>
     <v-container class="justify-center align-center">
   
   <v-form ref="form" v-model="valid">
     <v-text-field
       v-model="email"
       label="Email"
    
      
     ></v-text-field>
     <v-text-field
       v-model="password"
       label="Password"
    
       type="password"
      
     ></v-text-field>
   </v-form>

   <v-card-actions>
   <v-btn color="primary" @click="signUp" >
     Sign Up
   </v-btn>
 </v-card-actions>

</v-container>

</template>

<script>
import { auth, db } from '@/firebase';
import { mapActions,mapState } from 'pinia';
import { useCounterStore } from '@/store';

export default{

    data(){
        return{
            email:'',
            password:'',
        }
    },
    methods:{
        ...mapActions(useCounterStore,['setUserData']),
        signUp(){
          let setData = {
            email:this.email,
         
          }
            auth.createUserWithEmailAndPassword(this.email,this.password).then((userCredential)=>{
              let user = userCredential.user;
                this.setUserData({id:user.uid});
                  db.collection('carts').doc(user.uid).set(setData)
                  .then(() => {
                    console.log("User record created");
                  })
                  .catch((e) => {
                    console.log("Something went wrong", e);
                  });
            }).catch((e)=>{
                console.log("something went wrong",e);
            })
        }
    },
    computed:{
      ...mapState(useCounterStore,['appSettings']),
    }
}
</script>
<style>
.v-container{
  padding: 10px 10px;
  background-color: white;
}
</style>