<template>
    <div>
        <div v-if="orders.length" class="margin-top-30 table-responsive">
            <table class="table table-striped">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Order</th>
                <th scope="col">Address</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(order, index) in orders" :key="order" :index="index">
                <th scope="row">{{ index+1 }}</th>
                <td>{{ order.order_name }}</td>
                <td>{{ order.address }}</td>
                <td>{{ order.amount }}</td>
                <td>{{ order.created_at }}</td>
                </tr>
            </tbody>
            </table>
        </div>
        <div class="margin-top-30" v-else>
            No Subscriptions found! Create your first subscription now.
        </div>
        <button type="button" class="btn btn-primary margin-top-30 d-block submit-button" v-on:click="createSubscription">Create Subscription</button>
    </div>
</template>
<style>
    .margin-top-30 {
        margin-top: 30px;
    }
</style>
<script>
import api from "@/services/api";
export default {
  name: "OrderList",
    data() {
    return {
      orders: []
    }
  },
  created() {
    api
    .fetchOrders()
    .then((res) => {
      if(res.status == 200){
        this.orders = res.data["orders"];
      }
    });
  },
  methods: {
    createSubscription: function(){
      this.$router.replace({ name: "buy-subscription" });
    }
  }
}
</script>