<template>
    <v-container class="py-4">
        <v-row no-gutters>
            <v-col cols="2">
                <ProgressComponent />
            </v-col>
            <v-col cols="10">
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
                            Preview
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
                                        <v-text-field v-model="customerMeta.form.formName" label="Enter form name"
                                            outlined dense></v-text-field>
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
                                        <v-text-field v-model="customerMeta.report.reportName" label="Enter form name"
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
                                        <v-select :items="fields" v-model="customerMeta.mappedFields[item]">

                                        </v-select>
                                    </v-col>

                                </v-row>

                            </v-card>
                            <v-stepper-actions @click:next="applyValidationAndStep">
                            </v-stepper-actions>
                        </v-stepper-window-item>

                        <v-stepper-window-item :value="4">
                       
                            <!-- <v-card class="mx-auto my-5 pa-4" max-width="600">
                                <pre>{{ customerMeta }}</pre>
                                <v-card-actions>
                                    <v-btn class="text-none text-subtitle-1" color="#5865f2" size="small" variant="flat"
                                        @click="changeOnboardingStep">
                                        Product Onboarding
                                    </v-btn>
                                </v-card-actions>
                            </v-card> -->
                            <v-card  class="pa-2 mx-auto" elevation="1" height="59" rounded="lg"
                                style="background-color: #E8F0FE;" width="350">
                                <v-row class="align-center" no-gutters>
                                    <v-col cols="2">
                                        <v-avatar size="32">
                                            <img src="https://randomuser.me/api/portraits/men/85.jpg"
                                                alt="Jayesh Sonawane">
                                        </v-avatar>
                                    </v-col>
                                    <v-col cols="7" class="d-flex justify-start px-4">
                                        <div class="d-flex flex-column align-start">
                                            <span class="font-weight-bold" style="font-size: 13px;">{{
                                                customerData[customerMeta.mappedFields.customerName]?.display_value }}</span>
                                            <span class="grey--text d-flex" style="font-size: 12px;">
                                                <v-icon size="sm" color="#2780E7" class="mr-2">mdi-phone</v-icon> {{
                                                customerData[customerMeta.mappedFields.customerPhone] || ' - ' }}
                                                <v-icon size="sm" color="#2780E7">mdi-email</v-icon> {{ customerData[customerMeta.mappedFields.customerEmail]
                                                || ' - ' }}
                                            </span>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card>
                            <div style="margin:auto;width: 50%;text-align: center;" class="my-3">
                            <v-btn class="text-none mx-auto text-subtitle-1"  color="#5865f2" size="small" variant="flat"
                                        @click="changeOnboardingStep">
                                        Product Onboarding
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
            customerMeta: {},
            mappedfields: null,
            fields: [],
            customerData:{},


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
            // let ele = (this.registeredApps || []).find((item) => item.appName == this.appSettings.appLinkName);
            // ele.settings.currentOnBoardingStep = "product";
            // console.log(this.registeredApps);

            db.collection('carts').doc(this.userData.id).update({
                [`${this.appSettings.appLinkName}.settings.currentOnBoardingStep`]: "product"
            }).then(() => {
                this.$router.push('/productonboardingnew');
            })
        },
        validateFormAndStoreFields() {
           
            const config = {
                appName: this.appSettings.appLinkName,
                formName: this.customerMeta.form.formName,
                data: {
                    "data": {
                        "Name": { "first_name": "Jay", "last_name": "Bodade" },
                        "Phone_Number": "8600570953",
                        "Email":'jaybodade243@gmail.com'
                    }
                }
            };


            ZOHO.CREATOR.API.addRecord(config).then((resp) => {
                if (resp.code == 3000) {
                    this.customerMeta.form.completed = true;
                    this.e1 = 2;
                    this.updateCart();
                }
            }).catch((e) => {
                console.log("somethign went wrong", e);
            })
        },

        updateCart() {
        
            db.collection('carts').doc(this.userData.id).update({
                [`${this.appSettings.appLinkName}.settings.customerSettings`]: this.customerMeta
            }).then(() => {
                console.log("form updated successfully");
            }).catch((e) => {
                console.log("something went wrong", e);
            })
        },
        setCompletedSteps() {

            console.log("this is customer Meta",this.customerMeta);

            if (this.customerMeta.form.completed) {
                if (this.customerMeta.report.completed) {
                    if (this.customerMeta.mappedFields.completed) {
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
                reportName: this.customerMeta.report.reportName,
                pageSize: 3,
            }

            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                if (resp.code == 3000) {
                    this.fields = Object.keys(resp.data[0]);
                    this.customerData = resp.data[0];
                }
            }).catch((e) => {
                console.log("something went wrong", e);
            })
        },
        validateReportAndStoreField() {
            const config = {
                appName: this.appSettings.appLinkName,
                reportName: this.customerMeta.report.reportName,
                pageSize: 3
            }

            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                if (resp.code == 3000) {
                    this.customerMeta.report.completed = true;
                    this.updateCart();
                    this.e1 = 3;
                    this.fields = Object.keys(resp.data[0]);
                    this.customerData = resp.data[0];
                    console.log("tis is fields", this.fields);
                }
            }).catch((e) => {
                console.log("Something went wrong", e);
            })
        },
        validateStatesAndStoreFields() {
            this.customerMeta.mappedFields.completed = true;
            this.updateCart();
            this.e1 = 4;
        }
    },

    created() {

        this.customerMeta = this.userData.settings.customerSettings;
        this.mappedfields = this.userData.settings.customerSettings.mappedFields;
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