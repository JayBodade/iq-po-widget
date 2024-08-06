<template>
    <v-row>
        <v-col cols="3">
            <ProgressComponent />
        </v-col>
        <v-col cols="9">
            <v-stepper v-model="e1">
                <v-stepper-header>
                    <v-stepper-item :complete="e1 > 1" :step="1" :value="1" editable>
                        Report
                    </v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item :complete="e1 > 2" :step="2" :value="2" editable>
                        Mapped Fields
                    </v-stepper-item>
                    <v-divider></v-divider>
                    <v-stepper-item :complete="e1 > 3" :step="3" :value="3" editable>
                        Preview
                    </v-stepper-item>

                </v-stepper-header>


                <v-stepper-window>
                    <v-stepper-window-item :value="1">
                        <v-card class="mx-auto my-5 pa-4" max-width="600">
                            <v-row align="center" no-gutters>
                                <v-col cols="3">
                                    <v-text class="font-weight-bold">Report Name</v-text>
                                </v-col>
                                <v-col cols="9">
                                    <v-text-field v-model="productMeta.report.reportName" label="Enter form name"
                                        outlined dense></v-text-field>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-stepper-actions @click:next="applyValidationAndStep">
                        </v-stepper-actions>
                    </v-stepper-window-item>


                    <v-stepper-window-item :value="2">
                        <v-card class="mx-auto my-5 pa-4" max-width="600">
                            <v-row v-for="(item, i) in mappedfields" :key="i">
                                <v-col cols="3">
                                    {{ item }}
                                </v-col>
                                <v-col cols="9">
                                    <v-select :items="fields" v-model="productMeta.mappedFields[item]">
                                    </v-select>
                                </v-col>
                            </v-row>
                        </v-card>
                        <v-stepper-actions @click:next="applyValidationAndStep">
                        </v-stepper-actions>
                    </v-stepper-window-item>


                    <v-stepper-window-item :value="3">
                        <!-- data
                            <v-card class="mx-auto my-5 pa-4" max-width="600">
                                <pre>{{ productMeta }}</pre>
                                <v-card-actions>
                                    <v-btn class="text-none text-subtitle-1" color="#5865f2" size="small" variant="flat"
                                       @click="changeOnboardingStep()"  >
                                        Order Onboarding
                                    </v-btn>
                                </v-card-actions>
                            </v-card> -->
                          
                        <v-card class="mb-2 mx-auto" width="140" height="156" >
                            <v-badge v-if="count > 0" class="elevated-badge" color="success" >
                            </v-badge>
                            <v-img class="mx-auto mt-2" height="80px" width="130px"
                                :src="`https://creatorapp.zohopublic.com/file/${appSettings.scope}/${appSettings.appLinkName}/All_Products/${productData[productMeta.mappedFields.ID]}/Product_Image/image-download/HYM6ehxFHKggY6h5asqNE98waR83ShxrSy4YR3Ez2whuCgYeBeNaPDkusAx2P2rh5ADAKZtCggmBQJbEmsT8EmhnwPm0EAwZ7H6E?filepath=${productData[productMeta.mappedFields.ProductImage]?.split('?')[1].split('=')[1]}`"
                                cover></v-img>

                            <v-card-title style="font-size:16px;text-align: start;">
                                {{ productData[productMeta.mappedFields.ProductName] }}
                            </v-card-title>

                            <div class="d-flex justify-space-between text-left px-2" style="width: 100%;">
                                <span style="flex: 1; font-size:14px">
                                    250g
                                </span>
                                <span style="flex-shrink: 0;font-size:12px">
                                    {{ productData[productMeta.mappedFields.ProductPrice] }}
                                </span>
                            </div>
                        </v-card>
                        <div style="margin:auto;width: 50%;text-align: center;" class="my-3">
                            <v-btn class="text-none mx-auto text-subtitle-1"  color="#5865f2" size="small" variant="flat"
                                        @click="changeOnboardingStep">
                                        Order Onboarding
                                    </v-btn>
                                </div>
                        <v-stepper-actions @click:next="applyValidationAndStep">
                        </v-stepper-actions>
                    </v-stepper-window-item>



                </v-stepper-window>
            </v-stepper>


        </v-col>
    </v-row>
</template>
<script>
import ProgressComponent from '@/components/ProgressComponent.vue';
import { useCounterStore } from '@/store';
import { mapState } from 'pinia';
import { ZOHO } from '@/lib/ZOHO-SDK';
import { db } from '@/firebase';
export default {
    data() {
        return {
            productMeta: null,
            e1: 1,
            mappedfields: null,
            fields: [],
            productData:{},
        }
    },
    components: {
        ProgressComponent
    },
    methods: {
        applyValidationAndStep() {
            if (this.e1 == 1) {
                this.validateReportAndStoreField();
            } else if (this.e1 == 2) {
                this.validateStateAndStoreFields();
            }

        },
        validateReportAndStoreField() {
            const config = {
                appName: this.appSettings.appLinkName,
                reportName: this.productMeta.report.reportName,

            }

            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                if (resp.code == 3000) {
                    this.fields = Object.keys(resp.data[0]);
                    this.productData = resp.data[0];
                    this.e1 = 2;
                    this.productMeta.report.completed = true;
                    this.updateCart()
                }
            }).catch((e) => {
                console.log("somthing went wrong", e)
            })

        },
        validateStateAndStoreFields() {
            this.productMeta.mappedFields.completed = true;
            this.updateCart();
            this.e1 = 3;

        },
        updateCart() {
            let ele = (this.registeredApps || []).find((item) => item.appName == this.appSettings.appLinkName);
            ele.settings.productSettings = this.productMeta
            db.collection('carts').doc(this.userData.id).update({
                registeredApps: this.registeredApps,
            }).then(() => {
                console.log("form updated successfully");
            }).catch((e) => {
                console.log("something went wrong", e);
            })
        },
        setCompletedSteps() {

            if (this.productMeta.report.completed) {
                if (this.productMeta.mappedFields.completed) {
                    this.e1 = 3;
                    this.getReportData();
                } else {
                    if (!this.fields.length) {
                        this.getReportData();
                    }
                    this.e1 = 2;
                }

            } else {
                this.e1 = 1;
            }
        },

        changeOnboardingStep() {
            let ele = (this.registeredApps || []).find((item) => item.appName == this.appSettings.appLinkName);
            ele.settings.currentOnBoardingStep = "order";
            console.log(this.registeredApps);
            db.collection('carts').doc(this.userData.id).update({
                registeredApps: this.registeredApps,
            }).then(() => {
                this.$router.push('/orderonboarding');
            })
        },
        getReportData() {

            const config = {
                appName: this.appSettings.appLinkName,
                reportName: this.productMeta.report.reportName,

            }

            ZOHO.CREATOR.API.getAllRecords(config).then((resp) => {
                if (resp.code == 3000) {
                    this.fields = Object.keys(resp.data[0]);
                    this.productData = resp.data[0];
                }
            }).catch((e) => {
                console.log("somthing went wrong", e)
            })

        }
    },
    computed: {
        ...mapState(useCounterStore, ['userData', 'appSettings', 'registeredApps']),
    },
    created() {
        console.log(this.userData);
        this.productMeta = this.userData.settings.productSettings
        this.mappedfields = this.userData.settings.productSettings.mappedFields;
        this.mappedfields = Object.keys(this.mappedfields);
        this.mappedfields = this.mappedfields.filter((item) => item != 'completed');
        this.setCompletedSteps();
    }

}
</script>