<template>
  <div>
    <p v-if="errors.length">
			<b>Please correct the following error(s):</b>
			<ul>
				<li v-for="error in errors" :key="error">
					{{ error }}
				</li>
			</ul>
		</p>
    <div class="row ss-pp-container">
      <div class="ss-pp-block center-align col-md-6">
        <img src="../assets/sanghshakti_demo.jpg" alt="sanghshakti-demo" />
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="ss_subscription" v-model="ss_subscription"
          />
          <label class="form-check-label" for="ss_subscription"
            >Buy SanghShakti Subscription</label
          >
        </div>
        <div class="row">
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              name="ss_subscription_period"
              id="ss_subscription_period"
              value="one_year" v-model="ss_subscription_period"
            />
            <label class="form-check-label" for="ss_subscription_period">
              Rs 150/- (1 Year)
            </label>
          </div>
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              name="ss_subscription_period"
              id="ss_subscription_period"
              value="five_year" v-model="ss_subscription_period"
            />
            <label class="form-check-label" for="ss_subscription_period">
              Rs 700/- (5 Year)
            </label>
          </div>
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              name="ss_subscription_period"
              id="ss_subscription_period"
              value="ten_year" v-model="ss_subscription_period"
            />
            <label class="form-check-label" for="ss_subscription_period">
              Rs 1300/- (10 Year)
            </label>
          </div>
        </div>
      </div>
      <div class="ss-pp-block center-align col-md-6">
        <img src="../assets/pathprerak_demo.jpg" alt="pathprerak-demo" />
        <div class="form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="pp_subscription" v-model="pp_subscription"
          />
          <label class="form-check-label" for="pp_subscription"
            >Buy PathPrerak Subscription</label
          >
        </div>
        <div class="row">
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              name="pp_subscription_period"
              id="pp_subscription_period"
              value="one_year" v-model="pp_subscription_period"
            />
            <label class="form-check-label" for="pp_subscription_period">
              Rs 150/- (1 Year)
            </label>
          </div>
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              name="pp_subscription_period"
              id="pp_subscription_period"
              value="five_year" v-model="pp_subscription_period"
            />
            <label class="form-check-label" for="pp_subscription_period">
              Rs 700/- (5 Year)
            </label>
          </div>
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              name="pp_subscription_period"
              id="pp_subscription_period"
              value="ten_year"
              v-model="pp_subscription_period"
            />
            <label class="form-check-label" for="pp_subscription_period">
              Rs 1300/- (10 Year)
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="center-align">
      <button id="subscription_proceed" type="button" class="btn btn-success" v-on:click="checkForm()">
        Proceed
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuySubscription",
  data() {
    return {
      errors: [],
      ss_subscription: null,
      pp_subscription: null,
      ss_subscription_period: "ten_year",
      pp_subscription_period: "ten_year"
    }
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      let ss_subscription = this.ss_subscription;
      let pp_subscription = this.pp_subscription;
      if(!ss_subscription && !pp_subscription){
        this.errors.push("Please select either SanghShakti or PathPrerak");
      }
      else{
        e.preventDefault();
      }
    }
  }
};
</script>
<style>
.center-align {
  text-align: center;
}
.ss-pp-container {
  padding: 50px;
}
.ss-pp-block {
  border: 1px solid;
}
</style>