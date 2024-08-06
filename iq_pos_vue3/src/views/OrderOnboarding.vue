<template>
    <v-container class="py-4">
        <v-row>
            <v-col col="2">
                <ProgressComponent />
            </v-col>
            <v-col col="10">
                <v-stepper v-model="e1">
                    <v-stepper-header>
                        <v-stepper-item :complete="e1 > 1" :step="1" :value="1" editable>
                            Form
                        </v-stepper-item>

                        <v-divider></v-divider>
                        <v-stepper-item :complete="e1 > 2" :step="2" :value="2" editable>
                            Report
                        </v-stepper-item>
                        <v-divider></v-divider>
                        <v-stepper-item :complete="e1 > 3" :step="3" :value="3" editable>
                            Mapped Fields
                        </v-stepper-item>
                        <v-divider></v-divider>
                        <v-stepper-item :complete="e1 > 4" :step="4" :value="4" editable>
                            Your Data
                        </v-stepper-item>

                    </v-stepper-header>


                    <v-stepper-window>

                        <v-stepper-window-item :value="1">
                            <v-card class="mx-auto my-5 pa-4" max-width="600">
                                <v-row align="center" no-gutters>
                                    <v-col cols="3">
                                        <v-text class="font-weight-bold">Form Name</v-text>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-text-field v-model="orderMeta.form.formName" label="Enter form name" outlined
                                            dense></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-stepper-actions @click:next="applyValidationAndStep">
                            </v-stepper-actions>
                        </v-stepper-window-item>


                        <v-stepper-window-item :value="2">
                            <v-card class="mx-auto my-5 pa-4" max-width="600">
                                <v-row align="center" no-gutters>
                                    <v-col cols="3">
                                        <v-text class="font-weight-bold">Report Name</v-text>
                                    </v-col>
                                    <v-col cols="9">
                                        <v-text-field v-model="orderMeta.report.reportName" label="Enter form name"
                                            outlined dense></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <v-stepper-actions @click:next="applyValidationAndStep">

                            </v-stepper-actions>
                        </v-stepper-window-item>


                        <v-stepper-window-item :value="3">
                            <v-card class="mx-auto my-5 pa-4" max-width="600">
                                <v-row v-for="(item, i) in mappedfields" :key="i">
                                    <v-col cols="3">
                                        {{ item }}
                                    </v-col>
                                    <v-col cols="9">
                                        <v-select :items="fields" v-model="orderMeta.mappedFields[item]">

                                        </v-select>
                                    </v-col>

                                </v-row>

                            </v-card>
                            <v-stepper-actions @click:next="applyValidationAndStep">
                            </v-stepper-actions>
                        </v-stepper-window-item>

                        <v-stepper-window-item :value="4">
                            <!-- data
                            <v-card class="mx-auto my-5 pa-4" max-width="600">
                                <pre>{{ orderMeta }}</pre>
                                <v-card-actions>
                                    <v-btn class="text-none text-subtitle-1" color="#5865f2" size="small" variant="flat"
                                        @click="changeOnboardingStep">
                                         Dashboard
                                    </v-btn>
                                </v-card-actions>
                            </v-card> -->
                            <v-card flat rounded="lg" class="mx-auto" height="200" width="400">
                                <v-card-text>
                                   
                                    <div class="d-flex flex-wrap justify-space-between mb-2" style="font-size:12px;">
                                        <div class="font-weight-bold">Sub Total</div>
                                        <div class="ml-2">{{ orderData[orderMeta.mappedFields.Sub_Total] }}</div>
                                    </div>

                                    <div class="d-flex flex-wrap justify-space-between mb-2" style="font-size:12px;">
                                        <div>GST Amount</div>
                                        <div class="ml-2">€30.00</div>
                                    </div>
                                    <div class="d-flex flex-wrap justify-space-between mb-2" style="font-size:12px;">
                                        <div>CGST Amount</div>
                                        <div class="ml-2">€0.00</div>
                                    </div>

                                    <div class="d-flex flex-wrap justify-space-between mb-2" style="font-size:12px;">
                                        <div>Discount</div>
                                        <div class="ml-2">10%</div>
                                    </div>
                                    <v-divider></v-divider>
                                    <div class="d-flex flex-wrap justify-space-between font-weight-bold">
                                        <div>Grand Total</div>
                                        <div class="ml-2">₹ {{orderData[orderMeta.mappedFields.Grand_Total] }}</div>
                                    </div>
                                </v-card-text>
                                <!-- <v-card-actions>
                                    <v-btn class="mx-auto px-2" color="#2780E7" variant="flat" width="319"
                                        rounded>Proceed to Pay</v-btn>
                                </v-card-actions> -->
                            </v-card>
                            <div style="margin:auto;width: 50%;text-align: center;" class="my-3">
                            <v-btn class="text-none mx-auto text-subtitle-1"  color="#5865f2" size="small" variant="flat"
                                        @click="changeOnboardingStep">
                                        Dashboard
                                    </v-btn>
                                </div>
                            <v-stepper-actions @click:next="applyValidationAndStep">
                            </v-stepper-actions>
                        </v-stepper-window-item>



                    </v-stepper-window>
                </v-stepper>

            </v-col>

        </v-row>

    </v-container>
</template>
<script>
import { useCounterStore } from '@/store';
import ProgressComponent from '@/components/ProgressComponent.vue';
import { mapState } from 'pinia';
import { ZOHO } from '@/lib/ZOHO-SDK';
import { db } from '@/firebase';
export default {
    data() {
        return {
            e1: null,
            orderMeta: {},
            mappedfields: null,
            fields: [],
            orderData:{},

        }
    },
    components: {
        ProgressComponent
    },
    computed: {
        ...mapState(useCounterStore, ['userData', 'appSettings', 'registeredApps']),
    },
    methods: {
        applyValidationAndStep() {
            if (this.e1 == 1) {
                this.validateFormAndStoreFields()
            } else if (this.e1 == 2) {
                this.validateReportAndStoreField();
            } else if (this.e1 == 3) {
                this.validateStatesAndStoreFields();
            } else {
                this.changeOnboardingStep();
            }
        },
        changeOnboardingStep() {
            let ele = (this.registeredApps || []).find((item) => item.appName == this.appSettings.appLinkName);
            ele.settings.currentOnBoardingStep = "completed";
            console.log(this.registeredApps);
            db.collection('carts').doc(this.userData.id).update({
                registeredApps: this.registeredApps,
            }).then(() => {
                this.$router.push('/dashboard');
            })
        },
        validateFormAndStoreFields() {
            
            const config = {
                appName: this.appSettings.appLinkName,
                formName: this.orderMeta.form.formName,
                data: {
                    "data": {
                        "Name": { "first_name": "Jay", "last_name": "Bodade" },
                        "Phone_Number": "8600570953"
                    }
                }
            };


            ZOHO.CREATOR.API.addRecord(config).then((resp) => {
                if (resp.code == 3000) {
                    this.orderMeta.form.completed = true;
                    this.e1 = 2;
                    this.updateCart();
                }
            }).catch((e) => {
                console.log("somethign went wrong", e);
            })
        },

        updateCart() {
            let ele = (this.registeredApps || []).find((item) => item.appName == this.appSettings.appLinkName);
            ele.settings.orderSettings = this.orderMeta
            db.collection('carts').doc(this.userData.id).update({
                registeredApps: this.registeredApps,
            }).then(() => {
                console.log("form updated successfully");
            }).catch((e) => {
                console.log("something went wrong", e);
            })
        },
        setCompletedSteps() {

            if (this.orderMeta.form.completed) {
                if (this.orderMeta.report.completed) {
                    if (this.orderMeta.mappedFields.completed) {
                        this.e1 = 4;
                        this.getReportData();
                    } else {
                        if (!this.fields.length) {
                            this.getReportData();
                        }
                        this.e1 = 3;
                    }

                } else {
                    this.e1 = 2;
                }
            } else {
                this.e1 = 1;
            }

        },
        getReportData() {
            const config = {
                appName: this.appSettings.appLinkName,
                reportName: this.orderMeta.report.reportName,
                pageSize: 3,
            }

            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                if (resp.code == 3000) {
                    this.fields = Object.keys(resp.data[0]);
                    this.orderData = resp.data[2];
                }
            }).catch((e) => {
                console.log("something went wrong", e);
            })
        },
        validateReportAndStoreField() {
            const config = {
                appName: this.appSettings.appLinkName,
                reportName: this.orderMeta.report.reportName,
                pageSize: 3
            }

            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                if (resp.code == 3000) {
                    this.orderMeta.report.completed = true;
                    this.updateCart();
                    this.e1 = 3;
                    this.fields = Object.keys(resp.data[2]);
                    this.orderData=resp.data[2];
                    console.log("tis is fields", this.fields);
                }
            }).catch((e) => {
                console.log("Something went wrong", e);
            })
        },
        validateStatesAndStoreFields() {
            this.orderMeta.mappedFields.completed = true;
            this.updateCart();
            this.e1 = 4;
        }
    },

    created() {

        this.orderMeta = this.userData.settings.orderSettings;
        this.mappedfields = this.userData.settings.orderSettings.mappedFields;
        this.mappedfields = Object.keys(this.mappedfields);
        this.mappedfields = this.mappedfields.filter((item) => item != 'completed');
        this.setCompletedSteps();
    }
}
</script>


<style scoped>
.v-card {
    background-color: #f5f5f5;
    /* Light gray background */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    /* Subtle shadow for depth */
}
</style>