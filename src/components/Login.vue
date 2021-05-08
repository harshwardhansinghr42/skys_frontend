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
		<form class="form-inline justify-content-center login-form" @submit="checkForm">
			<div class="form-group">
				<label for="email_or_phone">Email OR Phone</label>
				<input type="text" v-model="email_or_phone" name="email_or_phone" class="form-control" id="email_or_phone" placeholder="Enter email OR phone">
			</div>
			<button type="submit" class="btn btn-primary">Proceed</button>
		</form>
	</div>
</template>

<script>
import api from "@/services/api";
// import { utilFunctionService } from "@/utils/utils.service";


export default {
  name: "Login",
  data() {
    return {
      errors: [],
      email_or_phone: null,
      url: process.env.VUE_APP_URL + process.env.V1_VERSION
    };
  },
  methods: {
    checkForm: function (e) {
      this.errors = [];

      if (!this.email_or_phone) {
        this.errors.push("Email OR Phone is required.");
      }

      if (!this.validEmail(this.email_or_phone)) {
        this.errors.push("Valid email required.");
      }

      if (this.errors.length > 0) {
        e.preventDefault();
      } else {
        let email_or_phone = this.email_or_phone;
        api
          .loginRegisterUser(email_or_phone)
          .then((res) => {
            if(res.status == 200){
              this.$router.replace({ name: "otp-verification" });
            }
            // const result = JSON.stringify(res["data"]);
            // console.log(result);
            // utilFunctionService.setLocalStorageService("user", result);
          })
          .catch();
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