<template>
  <div>
    <v-card
  class="mx-auto"
  max-width="400"
  height="80"
  border
  style="margin-bottom: 8px;"
>

<template v-slot:title>
    <div style="display: flex; flex-direction: row; justify-content: space-between;">
      <span>{{ orderItem.Product }}</span>
      <span>{{ orderItem.quantity * orderItem.Rate }} Rs</span>
    </div>
    </template>

  <template v-slot:subtitle>
    <div style="display: flex; justify-content: space-between; padding: 0 16px;width: 200px">
      <span>{{ orderItem.Rate }}</span> |
      <span>x{{ orderItem.quantity }}</span>|
      <span>{{ orderItem.SKU }}</span>
     
    </div>
  </template>

  <v-card-actions>
    <!-- Add any actions here if needed -->
  </v-card-actions>
</v-card>

  </div>
</template>

<script >

export default{
    props:['orderItem'],
}

</script>

<style>

</style>