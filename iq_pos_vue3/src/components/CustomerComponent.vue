<template>
    <v-row>
        <v-col cols="9">

            <v-autocomplete flat label="Select Customer" :items="customer" item-title="Name.display_value" return-object
                v-model="select" v-model:search="search" @update:model-value="addCustomerToCart">
            </v-autocomplete>

            <!-- <v-select
    :items="customer"
    v-model="search"
    item-title="Name.display_value"
    item-value="item"
    @update:modelValue="addCustomerToCart"
  >
    <template v-slot:selection="data">
        {{ data.item.props.value }}
   
    </template>

</v-select> -->
        </v-col>
        <v-col cols="3" style="display: flex !important;align-items: center !important;height: 80px">
            <v-btn @click="dialog = true"><v-icon>mdi mdi-account-plus</v-icon></v-btn>
        </v-col>

    </v-row>
    <div class="text-center ">
    

    <v-dialog
      v-model="dialog"
      width="50%"
    >
    <v-card max-width="600" width="500" class="mx-auto my-4 pa-4 elevation-4">
    <v-card-title class="text-h5">Customer Information</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              label="First Name"
              v-model="firtName"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              label="Last Name"
              v-model="lastName"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Mobile Number"
              outlined
              v-model="phoneNumber"
              dense
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Email"
              outlined
              v-model="email"
              dense
              hide-details
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn  color="primary" @click="saveCustomerInCreator">Save</v-btn>
      <v-btn  color="red" @click="saveCustomerInCreator">Cancel</v-btn>
    </v-card-actions>
  </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { ZOHO } from '@/lib/ZOHO-SDK';
import { db } from '../firebase/index';
import { useCounterStore } from '@/store';
import { mapState } from 'pinia';
export default {
    data() {
        return {
            customer: [],
            search: this.selectedCustomer,
            select: "",
            dialog:false,
            firtName:'',
            lastName:'',
            phoneNumber:'',
            email:'',

        }
    },
    methods: {
        getCustomers() {
            let config = {
                reportName: this.userData?.settings.customerSettings.report.reportName,
                pageSize: 2

            }
            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                console.log(resp);
                if (resp.code == 3000) {
                    this.customer = resp.data;
                    console.log("these are customers", this.customer);
                }
            }).catch((e) => {
                console.log("error -->", e);
            })
        },
        addCustomerToCart() {
            db.collection('carts').doc(this.userData.id).update({ 
                [`${this.appSettings.appLinkName}.cartData.customer`]: this.select
             }).then(() => {
                console.log("data has been updated success fully");
            }).catch((e) => {
                console.log(e);
            })

        },
        runFunction() {
            console.log("running this function");
        },
        fetchCustomer(val) {
            console.log(val);
            let config = {
                reportName: this.userData.settings.customerSettings.report.reportName,
                criteria: `(Name.contains("${val}"))`,
            }
            console.log("this is config", config);
            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                console.log(resp);
                if (resp.code == 3000) {
                    this.customer = resp.data;
                }
            }).catch((e) => {
                console.log(e);
            })
        },
        saveCustomerInCreator(){
            let formName = this.userData.settings.customerSettings.form.formName;
            let mappedFields = this.userData.settings.customerSettings.mappedFields;
            let formData = {
                     
                     [mappedFields.customerName]:{ "first_name": this.firtName, "last_name": this.lastName},
                     [mappedFields.customerEmail] : this.email,
                     [mappedFields.customerPhone] : this.phoneNumber,
                 }
            const config = {
                formName:formName,
                appName:this.appSettings.appLinkName,
                data:{
                    "data":formData,
                }

            }

            ZOHO.CREATOR.API.addRecord(config).then((resp)=>{
              console.log("this is response",resp);
              if(resp.code == 3000){
                this.customer.push({ID:resp.data.ID,...formData});
              }
            }).catch((e)=>{
              console.log("this is error",e);
            }).finally(()=>{
              this.dialog = false;
            })

            
           
            
        }
    },
    computed: {
        ...mapState(useCounterStore, ['selectedCustomer','userData','appSettings']),
    },
    watch: {

        search(newVal) {
            if (newVal) {
                this.fetchCustomer(newVal);
            }
        },
        selectedCustomer(newVal) {
            this.select = newVal
        }
    },
    created() {
        this.getCustomers();
        this.select = this.selectedCustomer;
        console.log("this is selected customer", this.select);
        console.log("this is selected customer", this.selectedCustomer);
    },

}
</script>

<style scoped>
.v-card {
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.v-card-title {
  font-weight: bold;
}

.v-text-field {
  margin-bottom: 16px;
}
</style>