<template>
    <v-container>
        <v-data-table width="100%" :headers="headers" :items="orders">
            <template v-slot:[`item.order`]="{ item }">
                <a :href="`/order/${item.order}`" class="order-link">
                    #{{ item.order }}
                </a>
            </template>
            <template v-slot:[`item.Customer`]="{ item }">
            
               <span>{{ item.Customer.display_value }}</span>
            </template>
            <template v-slot:[`item.view`]="{ item }">
            <v-btn @click="openOrderModal(item)">view</v-btn>
         </template>

        </v-data-table>
        <v-dialog v-model="dialog" width="100%" class="py-2">
            <v-card height="670">
                <v-row> <v-col class="text-right"><v-btn flat @click="dialog=false;"><v-icon>mdi-close</v-icon></v-btn></v-col> </v-row>
                <v-row no-gutters>

                    <v-col cols="8"  >
                        <span class="px-2 text-h6" > Invoice Details</span>
                        <div>
                            <v-row class="px-2 text-center">
                                <v-col>
                                    No
                                </v-col>
                                <v-col cols="4" class="text-left">
                                    Name
                                </v-col>
                               
                                <v-col>
                                    Price
                                </v-col>
                                <v-col>
                                    Qty
                                </v-col>
                                <v-col>
                                    Disc
                                </v-col>
                                <v-col>
                                    Amount
                                </v-col>
                            </v-row>
                            <div style="height: 380px;overflow-y: auto;" class="px-2">

                                <v-row class="px-2 text-center" no-gutters
                                    v-for="(item, index) in JSON.parse(selectedOrder[orderMeta.item_json] || [])"
                                    :key="index">
                                    <v-col>
                                        {{ index + 1 }}
                                    </v-col>
                                    <v-col  cols="4" class="text-left">
                                        <div style="color:#6ab8f2;font-size:16px">{{ item[productMeta.ProductName] }}</div>
                                        <div class="text-body-2">{{ item.SKU }} | {{ item.quantity }} | GST | IGST</div>
                                        <div class="text-caption" v-if="item?.offer">{{ item.offer }}</div>
                                    </v-col>
                                    
                                    <v-col >

                                        {{ item[productMeta?.ProductPrice] }}
                                    </v-col>
                                    <v-col>
                                        {{ item.quantity }}
                                    </v-col>
                                    <v-col>
                                        00
                                    </v-col>
                                    <v-col>
                                        {{ item[productMeta?.ProductPrice] * item.quantity }}
                                    </v-col>
                                </v-row>

                            </div>
                            <div style="background-color: #fcf9f9;height:100%;">
                                <v-row class="px-2">
                                    <v-col cols="12">
                                        <v-row>
                                            <v-col>
                                                Sub Total:
                                            </v-col>
                                            <v-col class="text-right">
                                                ₹1,192.00
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                Tax:
                                            </v-col>
                                            <v-col class="text-right">
                                                ₹214.56
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                Round Off:
                                            </v-col>
                                            <v-col class="text-right">
                                                ₹0.44
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col>
                                                Total:
                                            </v-col>
                                            <v-col class="text-right">
                                                ₹1,407.00
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>
                            </div>
                        </div>
                    </v-col>
                    <v-col cols="4" class="px-2">
                      
    <v-row justify="center" align="center">
      <v-col cols="12">
        
        <v-card flat>
          <v-card-title class="text-center text-h6 py-2" style="color: green;">
            <v-row>
                <span style="color: black;">Billing Information</span>
            </v-row>
            <v-row class="justify-center">
                <v-icon size="80">mdi-check-circle</v-icon>
            </v-row>
            
            Billed Successfully
          </v-card-title>
          <v-spacer></v-spacer>
          <v-card-subtitle class="text-center mt-4" style="font-size: 15px;">
            <v-row no-gutters class="mb-4">
                <v-col class="text-left">
                    Order Number 
                </v-col>
                <v-col class="text-right">
                    CTR362
                </v-col>
            </v-row>
            <v-row no-gutters class="mb-4">
                <v-col class="text-left">
                    Bill Number 
                </v-col>
                <v-col class="text-right">
                    CTR362
                </v-col>
            </v-row>
           
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text style="font-size:16.5px;">
            <div class="font-weight-bold mb-1">Payment Summary</div>

            <v-row no-gutters class="mb-2">
                <v-col>
                    Cash
                </v-col>
                <v-col class="text-right">
                    ₹1,407.00
                </v-col>
            </v-row>
           <v-row no-gutters class="mb-2">
            <v-col>
                Total amount paid
            </v-col>
            <v-col class="text-right">
                ₹1,407.00
            </v-col>
           </v-row>
           <v-row no-gutters class="mb-2">
            <v-col>
                Remaining amount to be paid
            </v-col>
            <v-col class="text-right">
                ₹0.00
            </v-col>
           </v-row>
           
            <v-divider></v-divider>
           <div class="py-4">
            <div class="font-weight-bold mb-1">Customer Info</div>
            <div>
              <span class="mb-1" style="color: blue;">Mr. Deepak Rajkumar</span> |
              99XXXXXXXX
            </div>
            <div>No. 30/21, Winston Apartments, Chennai - 600038</div>
        </div>
          </v-card-text>
          <v-divider></v-divider>
          <div class="font-weight-bold mt-4">Payment Summary</div>
          <v-card-actions class="justify-center px-4 mt-4 ">
          <v-row >
            <v-col >
                <v-btn variant="tonal"  block text color="primary" >PDF</v-btn>
            </v-col>
            <v-col>
                <v-btn variant="tonal"   block text color="primary" >XPS</v-btn>
            </v-col>
            <v-col>
                <v-btn variant="tonal"   block text color="primary" >Print</v-btn>
            </v-col>
          </v-row>
           
            
          
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
 </v-col>
                </v-row>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { ZOHO } from '@/lib/ZOHO-SDK';
import { useCounterStore } from '@/store';
import { mapState } from 'pinia';
export default {

    data() {
        return {
            dialog: false,
            headers: [],
            orders: [],
            selectedOrder: null,
            orderMeta: null,
            productMeta: null,
        };
    },
    methods: {
        openOrderModal(item) {
            console.log("this is item", item)
            this.selectedOrder = item;
            this.dialog = true;
        },
        setHeaders(invoiceObject) {
            this.headers = Object.keys(invoiceObject).map((item) => {
                return { title: item, key: item };
                
            });
            console.log("this is headers",this.headers);
            this.headers = this.headers.filter((item)=>item.title != 'item_json');
            this.headers = this.headers.filter((item)=>item.title != 'Items');
            this.headers.push({ title: 'View', value: 'view', sortable: false });
        },
        getAllOrders() {
            let reportName = this.userData.settings.orderSettings.report.reportName;
            const config = {
                reportName: reportName,
                appName: this.appSettings.appLinkName,
            }
            console.log("this is config", config);
            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                if (resp.code == 3000) {
                    console.log(resp);
                    if (resp.data.length > 0) {
                        this.setHeaders(resp.data[0]);
                        this.orders = resp.data;
                    }
                }

            }).catch((e) => {
                console.log("something went wrong", e);
            })
        }
    },
    computed: {
        ...mapState(useCounterStore, ['userData', 'appSettings']),
    },
    created() {
        this.getAllOrders();
        this.orderMeta = this.userData.settings.orderSettings.mappedFields;
        this.productMeta = this.userData.settings.productSettings.mappedFields;
        // this.setHeaders();
    }


}
</script>


<style scoped>
.order-link {
    color: purple;
    text-decoration: none;
}

.view-button {
    text-transform: none;
}

.v-container {
    padding: 0px
}
</style>