<template>
  <div>
    <p v-if="errors.length">
			<b>Please correct the following error(s):</b>
			<ul class="error-list">
				<li v-for="error in errors" :key="error">
					{{ error }}
				</li>
			</ul>
		</p>
    <div class="row ss-pp-container">
      <PackageContainer package_name="SanghShakti" :package_image=ss_image :package_subscription.sync="ss_subscription" :package_subscription_period.sync="ss_subscription_period" />
      <PackageContainer package_name="PathPrerak" :package_image=pp_image :package_subscription.sync="pp_subscription" :package_subscription_period.sync="pp_subscription_period"/>
    </div>
    <div>
      <marquee behavior="scroll"><strong>NOTE: </strong> 3% of the total amount will be added to the final checkout amount as service charge</marquee>
    </div> 
    <div class="user-address-info">
      <form class="form justify-content-center login-form">
        <div class="form-group">
          <label for="user_name">Full Name</label>
          <input type="text" v-model="user_name" name="user_name" class="form-input-box form-control" id="user_name" placeholder="Enter your full name">
        </div>
        <div class="form-group">
          <label for="user_address">State</label>
          <select class="form-control form-input-box" v-model="user_state" v-on:change="changeState($event)">
            <option v-for="(value, key) in states" :value="key" :key="key">
              {{ value }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="user_city">City</label>
          <select class="form-control form-input-box" v-model="user_city">
            <option v-for="city in cities" :value="city" :key="city">
              {{ city }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="user_address">Address</label>
          <input type="text" v-model="user_address" name="user_address" class="form-control form-input-box" id="user_address" placeholder="Enter your lane/street">
        </div>
        <div class="form-group">
          <label for="user_pincode">Pin Code</label>
          <input type="text" v-model="user_pincode" name="user_pincode" class="form-control form-input-box" id="user_pincode" placeholder="Enter your Pin code">
        </div>
        <div class="form-group">
          <label for="user_phone">Phone Number</label>
          <input type="text" v-model="user_phone" name="user_phone" class="form-control form-input-box" id="user_phone" placeholder="Enter your phone number">
        </div>
      </form>
    </div>
    <div>
      <button id="subscription_proceed" type="button" class="btn btn-primary d-block submit-button" v-on:click="submitForm">
        Proceed
      </button>
      <img :class="loaderclass" alt="loader" src="../assets/loader.gif">
    </div>
  </div>
</template>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
import api from "@/services/api";
import PackageContainer from './PackageContainer.vue'
import ss_image from '../assets/sanghshakti_demo.jpg'
import pp_image from '../assets/pathprerak_demo.jpg'
export default {
  name: "BuySubscription",
  components: {
    PackageContainer
  },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    document.head.appendChild(recaptchaScript);
  },
  data() {
    return {
      errors: [],
      ss_subscription: null,
      pp_subscription: null,
      ss_subscription_period: null,
      pp_subscription_period: null,
      user_name: null,
      user_state: null,
      user_city: null,
      user_address: null,
      user_pincode: null,
      user_phone: null,
      states: {},
      cities: [],
      ss_image: ss_image,
      pp_image: pp_image,
      database_order_id: null,
      loaderclass: 'd-none',
      subscription_amount: {}
    }
  },
  created() {
    api
      .fetchStates()
      .then((res) => {
        if(res.status == 200){
          this.states = res.data;
        }
      });
    api
      .fetchSubscriptionAmount()
      .then((res) => {
        if(res.status == 200){
          this.subscription_amount = res.data;
        }
      });
  },
  methods: {
    submitForm: function (e) {
      this.validateForm()
      if(this.errors.length === 0){
        let form_params = this.createFormParams();
        api
          .buySubscription(form_params)
          .then((res) => {
            if(res.status == 200){
              let result = res.data;
              this.openPaymentPop(e, result)
            }
          })
          .catch((error) => {
            this.errors.push(error.response.data["errors"]);
          });
      }
      else{
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    },
    openPaymentPop: function(e, result){
      const vue_obj = this
      var order = result["razorpay_order"]
      vue_obj.database_order_id = order["id"]
      var options = {
        key: order["api_key"], // Enter the Key ID generated from the Dashboard
        amount: order["amount"], // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Sanghshakti Pathprerak",
        description: "Buy online subscriptions",
        order_id: order["order_id"], //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          vue_obj.savePaymentSuccessResponse(response);
        },
        prefill: {
          name: order["user_name"],
          email: order["user"]["email"],
          contact: "91"+order["user_phone"],
        },
        notes: {
          address: "Sangh Shakti Bhawan, A-8, Khirni Phatak Rd, Vrindavan Colony, D.K. Nagar, Jhotwara, Jaipur, Rajasthan 302012",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });
      rzp1.open();
      e.preventDefault();
    },
    savePaymentSuccessResponse: function(payment_response){
      this.loaderclass = '';
      window.scrollTo({bottom: 0, behavior: 'smooth'});
      let params = {
        razorpay_payment_id: payment_response.razorpay_payment_id,
        razorpay_signature: payment_response.razorpay_signature
      }
      api
      .savePaymentSuccessResponse(this.database_order_id, params)
      .then((res) => {
        if(res.status == 200){
          this.loaderclass = 'd-none';
          this.$router.replace({ name: "order-list" });
        }
      })
      .catch((error) => {
        this.loaderclass = 'd-none';
        this.errors.push(error.response.data["errors"]);
      });
    },
    validateForm: function(){
      this.errors = []
      if(!this.ss_subscription && !this.pp_subscription){
        this.errors.push("Please select either SanghShakti or PathPrerak");
      }

      if(this.ss_subscription && !this.ss_subscription_period){
        this.errors.push("Please select SanghShakti subscription period");
      }

      if(this.pp_subscription && !this.pp_subscription_period){
        this.errors.push("Please select PathPrerak subscription period");
      }

      if(!this.user_name){
        this.errors.push("Full name is required");
      }

      if(!this.user_state){
        this.errors.push("State is required");
      }

      if(!this.user_city){
        this.errors.push("City is required");
      }

      if(!this.user_address){
        this.errors.push("Address is required");
      }

      if(!this.user_pincode){
        this.errors.push("Pin Code is required");
      }
      if(!this.user_phone){
        this.errors.push("Phone is required");
      }
    },
    changeState: function(event){
      api
        .fetchCities(event.target.value)
        .then((res) => {
          if(res.status == 200){
            this.cities = res.data
          }
        });
    },
    createFormParams: function () {
      let form_params = {
        user_name: this.user_name,
        user_address: this.user_address,
        user_state: this.user_state,
        user_city: this.user_city,
        user_pincode: this.user_pincode,
        user_phone: this.user_phone
      }
      if(this.ss_subscription){
        form_params["ss_subscription_period"] = this.ss_subscription_period
      }
      if(this.pp_subscription){
        form_params["pp_subscription_period"] = this.pp_subscription_period
      }
      return form_params;
    }
  }
};
</script>
<style>
.ss-pp-container {
  padding: 50px;
}
.ss-pp-block {
  border: 1px solid;
}
</style>