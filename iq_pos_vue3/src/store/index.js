import { defineStore } from 'pinia'
import {db} from '@/firebase/index';
import { ZOHO } from '@/lib/ZOHO-SDK';
// import { doc,collection, onSnapshot } from 'firebase/firestore';
const synth = window.speechSynthesis;
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0,
    appSettings:null,
    orderList:[],
    flag:{},
    products:[],
    loading:false,
    productLoading:false,
    categoryLoading:false,
    categories:[],
    selectedCustomer:'',
    userData:null,
    registeredApps:{},
    


    
  }),
  getters: {
    double: state => state.count * 2,
    voices: () => synth.getVoices(),
  },
  actions: {
    increment() {
      this.count++
    },
    setAppSettings(val){
      this.appSettings = val;
    },
    setOrderList(list){
      this.orderList = list;
    },
    setUserId(uid){
      this.userId = uid;
    },
    setRegisteredApps(regApps){
      this.registeredApps = regApps;
    },
    setUserData(data){
      this.userData = data;
    },
    findUniqueSku(items){
      let uniqueArray = [];
      items.forEach(element => {
          if(!uniqueArray.includes(element.sku)){
            uniqueArray.push(element);
            this.flag[element.sku]=false;
          }
      });

      return uniqueArray;

    },
    getDataFromCreator(sku,data){
      this.loading = true;
      if(sku == ''){this.loading = false; return;}
      let config = {
        reportName:"All_Products",
        criteria:`(SKU=="${sku}")`
      }

      console.log(config);

      

      ZOHO.CREATOR.API.getAllRecords(config).then((resp)=>{
        console.log("this is resp",resp);
        
        if(resp.code == 3000){
          let item = this.orderList?.find((ele)=>ele.SKU == sku);
        if(item){
          this.orderList.find((ele)=>ele.SKU == sku).quantity +=1;
          data.lastScanned.item = this.orderList.find((ele)=>ele.SKU == sku);
        }else{
          resp.data[0].quantity = 1;
          data.lastScanned.item = resp.data[0];
           this.orderList.push(resp.data[0]);
          
        }
         data.lastScanned.sku = '';
         data.lastScanned.status = 'OK';
         data.items = this.orderList;
         console.log(data);
        this.updateDB(data);
        }
        return resp.data;
      }).catch((err)=>{
        console.log(err);
        let parsedData = JSON.parse(err?.responseText);
        console.log(parsedData);
        if(parsedData.code == 3100){
          
          data.lastScanned.status = `No Record Found`;
          data.lastScanned.sku = '';

          console.log("this is updated data",data);
        }
        this.updateDB(data);
      }).finally(()=>{
        this.loading = false;
      })


    },
    getAllCategories() {
      this.categoryLoading = true;
      let config = {
          reportName: 'All_Categories',

      }
      ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
          console.log(resp);
          if (resp.code == 3000) {
              this.categories = resp.data;
          }
      }).catch((e) => {
          console.log(e);
      }).finally(()=>{
        this.categoryLoading = false;
      })

  },

    getCartData(uid){
      this.loading = true;
      console.log("this is user id",uid);
      db.collection("carts").doc(uid).onSnapshot((doc) => {
        let cartObj = doc.data()[this.appSettings.appLinkName].cartData;
        console.log("this is cartobj",cartObj);
        let lastScanned = cartObj.lastScanned;
        this.orderList = cartObj.items;
        this.selectedCustomer = cartObj.customer;
        this.getDataFromCreator(lastScanned.sku,cartObj);
      });

    },
    updateDB(data){
    
      db.collection('carts').doc(this.userData.id).update({
       [`${this.appSettings.appLinkName}.cartData`] : data
      }).then(()=>{
        console.log("is updated");
      })
    },
    setProducts(newList){
      this.products = [];
      this.products = newList;
    },
    getProducts(){
      this.productLoading = true;
      console.log("this is user data",this.userData);
      let reportName = this.userData?.settings?.productSettings?.report.reportName;
      let config = {
          reportName:reportName,
      }
      console.log("this is config",config);
      ZOHO.CREATOR.API.getAllRecords(config).then((resp)=>{
          console.log(resp);
          if(resp.code == 3000){
              resp.data?.forEach(element => {
                  element.quantity = 0;
              });
              this.products = resp.data;
            
          }
      }).catch((e)=>{
          console.log(e);
      }).finally(()=>{
        this.productLoading = false;
      })
  },
  paymentSuccessConfirmation(text){
     const speech = new SpeechSynthesisUtterance(text);
     let voiceObj = this.voices[1];
    speech.voice = voiceObj;
      synth.speak(speech);
  },  

  },
})
