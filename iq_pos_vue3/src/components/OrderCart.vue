<template>
  <div>
    <v-dialog v-model="dialog" width="auto">
      <v-card v-if="!loading" max-width="600" width="450">
    <v-card-item>
      <v-card-title>
        <v-row align="center" justify="space-between">
          <v-col cols="6">
            Order Summary
          </v-col>
          <v-col cols="6" class="d-flex justify-end align-center">
            <span class="mr-2">Sandbox</span>
            <v-switch v-model="mode" class="mt-6" density="compact" flat color="primary"></v-switch>
            <span class="ml-2">Live</span>
          </v-col>
        </v-row>
      </v-card-title>
    </v-card-item>
    <v-card-text>
      <v-row>
        <v-col cols="5">
          <div>Payment Mode:</div>
        </v-col>
        <v-col cols="7" class="text-end">
          <v-select
            v-model="paymentMode"
            label="Select Mode"
            :items="['Cash', 'UPI', 'Card']"
            dense
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5">
          <div>Order Total:</div>
        </v-col>
        <v-col cols="7" class="text-end">
          <div>{{ calculateTotal }} Rs</div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="success" dark @click="createOrder">
        <v-icon left>mdi-check</v-icon>
        Confirm
      </v-btn>
      <v-btn color="error" dark @click="dialog = false">
        <v-icon left>mdi-close</v-icon>
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
      
        <v-progress-circular v-else
       size="200"
      color="primary mx-auto "
      indeterminate
    ></v-progress-circular>
     

    </v-dialog>

    <v-dialog v-model="pdfDialog" width="auto">
      <v-card max-width="600" width="450">
        <v-card-item>

          <template v-slot:title>
            <div style="text-align:center">
              <span style="color:green;font-size:22px">Order Created Successfully</span>
            </div>
          </template>
        </v-card-item>

        <v-card-text style="text-align:center">

          Order Id : {{ generatedOrderId }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark outlined @click="generatePdf">
            PDF
          </v-btn>
          <v-btn color="error" outlined dark @click="dialog = false">

            PRINT
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <h2>Cart</h2>
    <div class="customer">
      <!-- <v-btn @click="$router.push('/about')">about</v-btn>
      <v-btn @click="$router.push('/contact')">contact</v-btn> -->
      <CustomerComponent />
    </div>
    <div v-if="loading" style="min-height: 65vh;  max-height: 65vh;overflow-y: auto;">

      <v-skeleton-loader v-for="i in orderList.length || 3" :key="i" class="mx-auto border my-2" max-width="400"
        height="80" type="text,text"></v-skeleton-loader>

    </div>
    <div v-else style="min-height: 65vh;  max-height: 65vh;overflow-y: auto;">
      <OrderLineItem v-for="(orderItem) in orderList" :key="orderItem.ID" :orderItem="orderItem" />
    </div>
    <div class="summary">
      <v-card flat class="mx-auto" max-width="354">
        <template v-slot:title>
          <div style="display: flex; flex-direction: row; justify-content: space-between;">
            <span>Total</span>
            <span>{{ calculateTotal }} Rs</span>
          </div>
        </template>
        <template v-slot:subtitle>
          <div style="display: flex; flex-direction: row;width: 150px;justify-content: space-between ">
            <span>items : {{ orderList.length }}</span>
            <span>Quantity : {{ calculateQuantity }} </span>
          </div>
        </template>



        <v-card-actions>
          <v-btn width="100%" color="deep-purple-accent-4" :text="`Pay ${calculateTotal} Rs`" variant="outlined"
            @click="dialog = true"></v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import CustomerComponent from '../components/CustomerComponent.vue';
import OrderLineItem from '../components/OrderLineItem.vue';
import { mapState, mapActions } from 'pinia';
import { useCounterStore } from '@/store';
import { ZOHO } from '@/lib/ZOHO-SDK';
import { db } from '@/firebase';


export default {

  data() {
    return {
      dialog: false,
      paymentMode: null,
      pdfDialog: false,
      generatedOrderId: null,
      loading:false,
      mode:false,
    }
  },
  components: {
    OrderLineItem,
    CustomerComponent
  },
  computed: {
    ...mapState(useCounterStore, ['orderList', 'loading', 'selectedCustomer', 'appSettings', 'userData']),
    calculateTotal() {
      let total = 0;
      this.orderList.forEach((item) => {
        total += parseInt(item.quantity) * parseInt(item.Rate);
      })

      return total
    },
    calculateQuantity() {
      let totalQuantity = 0;
      this.orderList.forEach((item) => {
        totalQuantity += item.quantity;
      })

      return totalQuantity;
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['getCartData','paymentSuccessConfirmation']),
    createOrderInCreator() {

      let lineItems = this.orderList.map((ele)=>{
        return {Product:ele.ID,Rate:ele.Rate,Quantity:ele.quantity,SKU:ele.SKU,Amount:ele.quantity*ele.Rate}
      })
      let formData = {

         
        "data": {
          "Customer": this.selectedCustomer.ID,
          "Payment_Mode": this.paymentMode,
          "Items": lineItems,
          "Sub_Total": this.calculateTotal,
          "Discount": 0,
          "Grand_Total": this.calculateTotal,
          "Discounted_Amount": 0,
          "Tax": '',
          "Tax1": '',

        }

      }


      let config1 = {};
      config1.formName = this.userData.settings.orderSettings.form.formName;
      config1.appName = this.appSettings.appLinkName;
      config1.data = formData;



      ZOHO.CREATOR.API.addRecord({ ...config1 }).then((resp) => {
        if (resp.code == 3000) {
          this.pdfDialog = true;
          this.generatedOrderId = resp.data.ID;
          this.emptyDataDB();
        }
        console.log(resp);

      }).catch((e) => {
        console.log("this is error", e);
      }).finally(() => {
        this.loading=false;
        this.dialog = false;
        
      })

    },
    createOrder() {
      this.loading = true;
      if (this.paymentMode == 'Cash' || this.paymentMode == 'Card') {
        this.createOrderInCreator();
      }else{
         this.createRazorOrder();
      }



    },
    async createRazorOrder(){

      try{

        console.log("this is razorpay",window.Razorpay);
        let apikey = '';
        if(this.mode){
          apikey = 'rzp_live_FLpwkUrnH9VPak';  
        }else{
          apikey = 'rzp_test_mJx5jJWVKQHKlo';
        }
        const response = await fetch('http://localhost:80/createorder',{
          method:'POST',
          headers:{
            'content-type':'application/json',
          },
          body:JSON.stringify({amount:100,mode:this.mode})
        })
        const result = await response.json();
        console.log("this is response",result);
        let order = result.order;

        //live rzp_live_FLpwkUrnH9VPak
        //test rzp_test_mJx5jJWVKQHKlo
        console.log("this is order",order);
       
        const options = {
          key: apikey, 
          amount: order.amount, 
          currency: 'INR',
          name: this.appSettings.appLinkName,
          description: 'Test Transaction',
          order_id: order.id,
          redirect:false, 
          modal:{
          
            ondismiss:()=>{
                this.handlePaymentCancle();
            }

          },
          handler: (response) => {
            try{
              let text = `payment received of ${order.amount / 100} rupeess`;
              this.paymentSuccessConfirmation(text);
              this.paymentHandler(response);
            }catch(e){
              console.log("something went wrong",e);
            }
          },
          prefill: {
            name: "Jay Bodade",
            email: this.selectedCustomer.Email,
            contact: this.selectedCustomer.Phone_Number,
          },
          notes: {
            address: 'Razorpay Corporate Office'
          },
          theme: {
            color: '#3f51b5'
          }
        };


        const razorpay = new window.Razorpay(options);
        razorpay.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});
65
        razorpay.open();

      }catch(e){
        console.log("Something went wrong",e);
      }



    },
    paymentHandler(paymentResponse){
      console.log("this is response",paymentResponse);
      this.createOrderInCreator();

    },
    handlePaymentCancle(){
      this.loading = false;
    },
    emptyDataDB() {

      const cartData = this.userData.cartData;
      cartData.customer = null;
      cartData.items=[];
    

      db.collection('carts').doc(this.userData.id).update({
        [`${this.appSettings.appLinkName}.cartData`] : cartData
      }).then(() => {
      
      }).catch((e) => {
        console.log("error -->", e);
      })

    },
    generatePdf() {
      let config = {}

      config.appName = 'iq-pos';
      config.reportName = 'All_Orders';
      config.id = this.generatedOrderId

      console.log("config", { ...config });

      ZOHO.CREATOR.API.getRecordById({ ...config }).then((resp) => {
        console.log("this is response", resp);
        if (resp.code == 3000) {
          // const pdf = new js
          const doc = new jsPDF();

          // Add a title
          doc.setFontSize(22);
          doc.setTextColor(40);
          doc.text("Order Details", 105, 10, null, null, "center");

          // Add some space
          let y = 20;

          const data = resp.data; // Access the data correctly
          console.log(data);

          // Define table header styles
          doc.setFontSize(12);
          doc.setTextColor(0);


          // Add a table header
          doc.text("Field", 10, y);
          doc.text("Value", 60, y);
          y += 10;

          // Set table body styles
          // doc.setFontStyle('normal');

          Object.keys(data).forEach(key => {
            if (typeof data[key] == 'object') {
              doc.text(key, 10, y);
              doc.text(String(data[key]), 60, y);
              y += 10;
            } else {
              doc.text(key, 10, y);
              doc.text(String(data[key]), 60, y); // Ensure the value is a string
              y += 10;

            }

          });

          // Add a footer
          doc.setFontSize(10);
          doc.setTextColor(150);
          doc.text("Generated by IQ POS", 105, 290, null, null, "center");

          doc.save('order_details.pdf');
          this.pdfDialog = false;
        }
      }).catch((e) => {
        console.log("This is error", e);
      })
    }
   




  },
  watch:{
    mode(newVal){
      console.log("this is newvalue",newVal)
    }

  },
  created() {
    // this.getCart();
    // this.getOrders();
    let userID = this.userData?.id;
    if (!userID) this.$router.push('/login');
    else this.getCartData(this.userData?.id);
  }



}
</script>

<style>
.summary {

  width: 100%;
}

.body-cell {
  margin-right: 10px;
  /* padding: 8px 6px; */
  /* text-align: left; */
}

.table-container {
  max-height: 300px;
  /* Adjust this value as needed */
  overflow-y: auto;
}

tr {
  justify-content: space-evenly;
}
</style>