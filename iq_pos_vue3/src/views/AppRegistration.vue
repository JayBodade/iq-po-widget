<template>
 <v-container class="appContainer ">
    <v-card class="mx-auto" max-width="100%" width="300" max-height="fit-content" outlined style="appCard">
      <v-list-item five-line class="custom-list-item" >
        <v-list-item-content>
          <div class="text-overline mb-2">
            Register Your App
          </div>
          <v-list-item-title class="text-h5 title -mb-1" >
            {{ appSettings.appLinkName }}
          </v-list-item-title>
          <v-list-item-subtitle>Register Your App Now</v-list-item-subtitle>
        </v-list-item-content>


      </v-list-item>

      <v-card-actions class="my-1" >
        <v-btn rounded color="black lighten-2 white--text" @click="registerApp()"
          class="float-right btn px-6 rounded-btn mt-3">
          Register <v-icon> mdi-arrow-right </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>



    <v-card v-if="items.length > 0" width="300" class="mx-auto" max-width="100%" max-height="fit-content" outlined>
      <v-list-item three-line  class="custom-list-item">
        <v-list-item-content>
          <div class="text-overline mb-4">
            Replace Your App
          </div>
          <v-list-item-title class="text-h5 mt-1">
            <v-col
        
        class="select-item"
        sm="8"
      >
        <v-select
          :items="items"
          label="Select Another App"
          solo
          v-model="selectedApp"
        ></v-select>
      </v-col>
          </v-list-item-title>
          <v-list-item-subtitle>Replace Your App Now</v-list-item-subtitle>
        </v-list-item-content>


      </v-list-item>

      <v-card-actions class="my-1">
        <v-btn rounded color="black lighten-2 white--text" @click="replaceApp()"
          class="float-right btn  px-6 rounded-btn mt-3">
          Replace <v-icon> mdi-arrow-right </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { db } from    '@/firebase';
import { useCounterStore } from '@/store';
import { mapState, mapActions } from 'pinia';

export default{
  data(){
    return {
      items:[],
      selectedApp:null,
    }
  },
    computed:{
        ...mapState(useCounterStore,['appSettings','userData','registeredApps'])
    },
    methods:{
        ...mapActions(useCounterStore,['setUserData','setRegisteredApps']),
        navigateToPage(){
          let step = this.userData.settings.currentOnBoardingStep;
          if(step == 'customer'){
            this.$router.push('/customeronboardingnew')
          }else if(step == 'product'){
            this.$router.push('/productonboardingnew')
          }else if(step == 'order'){
            this.$router.push('/orderonboardingnew');
          }else{
            this.$router.push('/dashboard');
          }
        },
        replaceApp(){
          let registeredApps = this.registeredApps;
          registeredApps[this.appSettings.appLinkName] = registeredApps[this.selectedApp];
          delete registeredApps[this.selectedApp];
          db.collection('carts').doc(this.userData.id).set(registeredApps).then(()=>{
            console.log("data updated successfully");
            this.setRegisteredApps(registeredApps);
            let data = registeredApps[this.appSettings.appLinkName];
            this.setUserData({id:this.userData.id,...data});
            this.navigateToPage()
          }).catch((e)=>{
            console.log("something went wrong",e);
          })
        },
        registerApp(){
            // let appData =  {
            //     appName:this.appSettings.appLinkName,
            //     settings:{
            //       customerSettings:{
            //         form:{
            //           formName:'',
            //           completed:false,
            //         },
            //         report:{
            //           reportName:'',
            //           completed:false
            //         },
            //         mappedFields:{
            //           customerName:'',
            //           customerEmail:'',
            //           customerPhone:'',
            //           ID:'',
            //           completed:false
            //         }

            //       },
            //       productSettings:{
            //         report:{
            //           reportName:'',
            //           completed:false,
            //         },
            //         mappedFields:{
            //           ProductName:'',
            //           ProductImage:'',
            //           ProductPrice:'',
            //           ID:'',
            //           completed:false
            //         }
            //       },
            //       orderSettings:{
            //         form:{
            //           formName:'',
            //           completed:false,
            //         },
            //         report:{
            //           reportName:'',
            //           completed:false
            //         },
            //         mappedFields:{
            //           Customer:'',
            //           Payment_Mode:'',
            //           item_json:'',
            //           Sub_Total:false,
            //           Discount:'',
            //           Grand_Total:'',
            //           Discounted_Amount:0,
            //           Tax:'',
            //           Tax1:'',
            //           ID:'',
            //         }
            //       },
            //       cartData:{
            //         customer:null,
            //         items:[],
            //         lastScanned:{
            //           item:{},
            //           recentSku:'',
            //           sku:'',
            //           status:'',
            //         }
            //       },
            //       currentOnBoardingStep:'customer',
            //     }
            //   };


            // let registeredApps = this.registeredApps;
            // registeredApps.push(appData);
            // this.setRegisteredApps(registeredApps);
            // this.setUserData({id:this.userData.id,...appData});
            // db.collection('carts').doc(this.userData.id).update({registeredApps:registeredApps}).then(()=>{
            //     console.log("data is updated"); 
            //     this.$router.push('/customeronboarding');
            // }).catch((e)=>{
            //     console.log("something went wrong",e);
            // })
           //suppose in case of new app;

           let appData = { 
              settings:{
                  customerSettings:{
                    form:{
                      formName:'',
                      completed:false,
                    },
                    report:{
                      reportName:'',
                      completed:false
                    },
                    mappedFields:{
                      customerName:'',
                      customerEmail:'',
                      customerPhone:'',
                      ID:'',
                      completed:false
                    }

                  },
                  productSettings:{
                    report:{
                      reportName:'',
                      completed:false,
                    },
                    mappedFields:{
                      ProductName:'',
                      ProductImage:'',
                      ProductPrice:'',
                      ID:'',
                      completed:false
                    }
                  },
                  orderSettings:{
                    form:{
                      formName:'',
                      completed:false,
                    },
                    report:{
                      reportName:'',
                      completed:false
                    },
                    mappedFields:{
                      Customer:'',
                      Payment_Mode:'',
                      item_json:'',
                      Sub_Total:false,
                      Discount:'',
                      Grand_Total:'',
                      Discounted_Amount:0,
                      Tax:'',
                      Tax1:'',
                      ID:'',
                    }
                  },
                  
                  currentOnBoardingStep:'customer',
                },
                cartData:{
                    customer:null,
                    items:[],
                    lastScanned:{
                      item:{},
                      recentSku:'',
                      sku:'',
                      status:'',
                    }
                  },
              
           }

           db.collection('carts').doc(this.userData.id).update({[this.appSettings.appLinkName]:appData}).then(()=>{
            this.setUserData({id:this.userData.id,...appData})
            console.log("this is userdata",this.userData);
            console.log("updates successfully");
            // this.$router.push('/customeronboarding');
            this.$router.push('/customeronboardingnew');
           }).catch((e)=>{
            console.log("something went wrong",e);
            
           }) 
        }
    },
    created(){
      this.items = ( Object.keys(this.registeredApps) || []).filter((item)=>item != this.appSettings.appLinkName);
      this.items = ( Object.keys(this.registeredApps) || []).filter((item)=>item != 'email');
    }
}
</script>

<style>
.appContainer{
  display: flex;
  flex-direction: row;
}
</style>