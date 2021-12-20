<template>
    <div class="ss-pp-block col-md-6">
        <img class="package-img" :src=package_image alt="pathprerak-demo" />
        <div class="form-check">
            <input
            type="checkbox"
            class="form-check-input"
            id="subscription" v-model="package_subscription_data"
            @change="$emit('update:package_subscription', package_subscription_data);"
            />
            <label class="form-check-label" for="subscription"
            >Buy {{ package_name }} Subscription</label
            >
        </div>
        <div class="row">
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              id="subscription_period"
              value="one_year" v-model="package_subscription_period_data"
              @change="$emit('update:package_subscription_period', package_subscription_period_data);"
            />
            <label class="form-check-label" for="subscription_period">
              Rs 150/- (1 Year)
            </label>
          </div>
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              id="subscription_period"
              value="five_year" v-model="package_subscription_period_data"
              @change="$emit('update:package_subscription_period', package_subscription_period_data);"
            />
            <label class="form-check-label" for="subscription_period">
              Rs 700/- (5 Year)
            </label>
          </div>
          <div class="col-md-4 form-check">
            <input
              class="form-check-input"
              type="radio"
              id="subscription_period"
              value="ten_year"
              v-model="package_subscription_period_data"
              @change="$emit('update:package_subscription_period', package_subscription_period_data);"
            />
            <label class="form-check-label" for="subscription_period">
              Rs 1300/- (10 Year)
            </label>
          </div>
        </div>
    </div>    
</template>
<style>
.package-img {
  padding: 30px;
}
</style>

<script>

export default {
    name: "PackageContainer",
    props: {
        package_image: String,
        package_name: String,
        package_subscription: Boolean,
        package_subscription_period: String
    },
    data() {
        return {
            package_subscription_data: false,
            package_subscription_period_data: null
        }
    }
}
</script>
