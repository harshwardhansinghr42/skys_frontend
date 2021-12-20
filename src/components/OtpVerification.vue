<template>
  <div>
    <p v-if="errors.length">
			<b>Please correct the following error(s):</b>
			<ul class='error-list'>
				<li v-for="error in errors" :key="error">
					{{ error }}
				</li>
			</ul>
		</p>
    <div class="otp-container" style="display: flex; flex-direction: row">
      <v-otp-input
        ref="otpInput"
        input-classes="otp-input"
        separator="-"
        :num-inputs="6"
        :should-auto-focus="true"
        :is-input-num="true"
        @on-change="handleOnChange"
        @on-complete="handleOnComplete"
      />
    </div>
  </div>
</template>

<script>
import api from "@/services/api";
import { utilFunctionService } from "@/utils/utils.service";

export default {
  name: "OtpVerification",
  data() {
    return {
      errors: []
    };
  },
  methods: {
    handleOnComplete(value) {
      api
        .verifyOtp(value)
        .then((res) => {
          if(res.status == 200){
            const result = JSON.stringify(res["data"]);
            utilFunctionService.setLocalStorageService("AuthenticationToken", result);
            this.$router.replace({ name: "order-list" });
          }
        })
        .catch((error) => {
          this.errors.push(error.response.data["errors"]);
        });
    },
    handleOnChange(value) {
      console.log("OTP changed: ", value);
    },
  },
};
</script>

<style>
@media screen and (min-width: 800px) {
  .otp-container{
    padding-left: 730px;
    padding-top: 100px;
  }
}
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>