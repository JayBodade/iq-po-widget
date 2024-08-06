<template> 
<v-container style="height: 90vh;">
    <v-timeline align="start" side="end">
    <v-timeline-item 
    
    :dot-color= "currentStep == 'customer'?'grey-darken-2':'blue'"
    :size="currentStep == 'customer'?'40':'25'"
      :elevation="currentStep == 'customer'?'5':'0'"
    >
      <div class="d-flex">
        <div>
          <span>Step 1</span>
          <div class="text-caption">
            Customer On - Boarding
          </div>
        </div>
      </div>
    </v-timeline-item>



    <v-timeline-item
    :dot-color= "currentStep == 'product'?'grey-darken-2':'blue'"
    :size="currentStep == 'product'?'40':'25'"
      :elevation="currentStep == 'product'?'5':'0'"
    >
      <div class="d-flex">
        <div>
          <span>Step 2</span>
          <div class="text-caption">
            Product On - Boarding
          </div>
        </div>
      </div>
    </v-timeline-item>

    <v-timeline-item
    :dot-color= "currentStep == 'order'?'grey-darken-2':'blue'"
    :size="currentStep == 'order'?'40':'25'"
      :elevation="currentStep == 'order'?'5':'0'"
    >
    <div>
          <span>Step 3</span>
          <div class="text-caption">
            Order On - Boarding
          </div>
        </div>
    </v-timeline-item>

  </v-timeline>
</v-container>    
</template>
<script>
import { useCounterStore } from '@/store';
import { mapState } from 'pinia';

export default{
    data(){
        return {
            items:[1,2,3,4],
            currentStep:null,
        }
    },
    computed:{
        ...mapState(useCounterStore,['userData']),
    },
    created(){
      console.log("this is userdata",this.userData);
      this.currentStep = this.userData.settings.currentOnBoardingStep;
    }
}
</script>