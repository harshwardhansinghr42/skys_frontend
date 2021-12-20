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
		<form class="form justify-content-center login-form" @submit="checkForm">
			<div class="form-group">
				<label for="email_or_phone">Email</label>
				<input type="text" v-model="email_or_phone" name="email_or_phone" class="form-control text-center form-input-box" id="email_or_phone" placeholder="Enter email address">
			</div>
			<button type="submit" class="btn btn-primary d-block submit-button">Proceed</button>
      <img :class="loaderclass" alt="loader" src="../assets/loader.gif">
		</form>
	</div>
</template>

<script>
import api from "@/services/api";
import { utilFunctionService } from "@/utils/utils.service";


export default {
  name: "Login",
  data() {
    return {
      errors: [],
      email_or_phone: null,
      loaderclass: 'd-none',
      url: process.env.VUE_APP_URL + process.env.V1_VERSION
    };
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];
      this.loaderclass = 'd-none';
      if (!this.email_or_phone) {
        this.errors.push("Email OR Phone is required.");
      }

      if (!this.validEmail(this.email_or_phone)) {
        this.errors.push("Valid email required.");
      }

      if (this.errors.length > 0) {
        e.preventDefault();
      } else {
        this.loaderclass = '';
        let email_or_phone = this.email_or_phone;
        api
          .loginRegisterUser(email_or_phone)
          .then((res) => {
            if(res.status == 200){
              const result = JSON.stringify(res["data"]);
              utilFunctionService.setLocalStorageService("user", result);
              this.$router.replace({ name: "otp-verification" });
            }
          })
          .catch((error) => {
            this.loaderclass = 'd-none';
            this.errors.push((error.response && error.response.data["errors"]) || 'Something went wrong!');
          });
      }
      e.preventDefault();
    },
    validEmail: function (email) {
      var re = /\S+@\S+\.\S+/;
      return re.test(email);
    },
  },
};
</script>