<template>

  <NavBar />
  <router-view />

</template>

<script>
import { ZOHO } from './lib/ZOHO-SDK';
import { mapActions, mapState } from 'pinia';
import { useCounterStore } from './store';
import { auth, db } from './firebase';
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    NavBar
  },
  methods: {
    ...mapActions(useCounterStore, ['setAppSettings', 'setUserData', 'setRegisteredApps']),
    checkForApp2(registeredApps){
      let ele = registeredApps.find((item) => item == this.appSettings.appLinkName);
      if(ele){
        return true;
      }else{
        return false;
      }
    },
    checkForApp(registeredApps) {
      let ele = registeredApps.find((item) => item.appName == this.appSettings.appLinkName);
      if (ele) {
        return true;
      } else {
        return false;
      }

    },
    getCartData(uid) {
      this.loading = true;
      console.log(uid);
      db.collection("carts").doc(uid).get().then((doc) => {

        let registeredApps = doc.data();
        this.setRegisteredApps(registeredApps);
          if(this.checkForApp2(Object.keys(registeredApps))){
         let userData = doc.data()[this.appSettings.appLinkName];
         this.setUserData({ id: this.userData.id, ...userData });
         console.log("this is use data",this.userData);
         if (userData.settings.currentOnBoardingStep == 'customer') {
            this.$router.push('/customeronboardingnew')
          } else if (userData.settings.currentOnBoardingStep == 'product') {
            this.$router.push('/productonboardingnew');
          } else if (userData.settings.currentOnBoardingStep == 'order') {
            this.$router.push('/orderonboardingnew')
          } else {
            this.$router.push('/dashboard');
          }
        }else{
          this.$router.push('/appregistration');
        }
      

        // console.log("this is doc data",doc.data());
        // let registeredApps = doc.data().registeredApps;
        // this.setRegisteredApps(registeredApps);
        // if (this.checkForApp(registeredApps)) {
        //   let userData = registeredApps.find((item) => item.appName == this.appSettings.appLinkName);
        //   this.setUserData({ id: this.userData.id, ...userData });
        //   if (userData.settings.currentOnBoardingStep == 'customer') {
        //     this.$router.push('/customeronboarding')
        //   } else if (userData.settings.currentOnBoardingStep == 'product') {
        //     this.$router.push('/productonboarding');
        //   } else if (userData.settings.currentOnBoardingStep == 'order') {
        //     this.$router.push('/orderonboarding')
        //   } else {
        //     this.$router.push('/dashboard');
        //   }
        // } else {
        //   this.$router.push('/appregistration');
        // }

      }).catch((e)=>{
        console.log("something went wrong",e);
      })

    },
    
  },
  computed: {
    ...mapState(useCounterStore, ['appSettings', 'userData']),
  },
  created() {
    console.log("this is zoho",ZOHO);
  
    let initParams = ZOHO.CREATOR.UTIL.getInitParams();
    this.setAppSettings(initParams);
    auth.onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        this.setUserData({ id: uid });
        this.getCartData(uid);
      } else {
        this.$router.push('/login');
      }
    });
  }
}
</script>
<style>
#app {
  width: 100%;
  height: 100%;
  margin-top: 5%;

}

body {
  background-color: white !important;
  height: 100% !important;
}
</style>
