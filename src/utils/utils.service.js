import Vue from 'vue'
import Toasted from 'vue-toasted'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

Vue.use(Loading);
Vue.use(Toasted)
var loader = ''

export const utilFunctionService = {
    setLocalStorageService(keyname, value) {
        localStorage.setItem(keyname, value);
    },

    getLocalStorageService(keyname) {
        if (localStorage.getItem(keyname) != 'undefined') {
            return JSON.parse(localStorage.getItem(keyname));
        } else {
            return false;
        }
    },

    getAuthToken() {
        if (this.getLocalStorageService('user')) {
            return this.getLocalStorageService('user').authorization_token;
        } else {
            return false;
        }
    },

    getUserRoles() {
      if (this.getLocalStorageService('user')) {
          return this.getLocalStorageService('user').users.attributes.user_roles;
      } else {
          return false;
      }
    },

    removeLocalStorageService(keyname) {
        localStorage.removeItem(keyname);
    },

    removeSessionStorageService(keyname) {
        sessionStorage.removeItem(keyname);
    },

    showLoader() {
        loader = Vue.$loading.show({
            canCancel: true,
            container: this.fullPage,
            onCancel: this.onCancel,
            color: '#3dbc9e',
            loader: 'spinner',
            width: 40,
            height: 40
        })
    },

    hideLoader() {
        loader.hide()
    },

    showSuccess(message) {
        Vue.toasted.show(`
            <div class="toaster-msg toaster-msg-success">
            <div class="d-flex flex-wrap">
                <em class="icon-check"></em>
                <span class="toaster-msg-success"></span>${message}.
            </div>
            </div>`, {
            type: 'success',
            theme: "outline",
            duration: 5000,
            position: 'top-center',
            singleton: false,
            containerClass: [
                'toaster-msg',
                'toaster-msg-success'
            ],
            action: [
                {
                    text: ``,
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                }]
        })
    },

    showErr(message) {
        Vue.toasted.show(`
        <div class="toaster-msg toaster-msg-error">
        <div class="d-flex flex-wrap">
            <em class="icon-danger"></em>
            <span class="toaster-msg-error"></span>${message}.
        </div>
        </div>`, {
            type: 'error',
            theme: "outline",
            duration: 5000,
            position: 'top-center',
            singleton: false,
            containerClass: [
                'toaster-msg',
                'toaster-msg-error'
            ],
            action: [
                {
                    text: ``,
                    onClick: (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                }]
        })
    },

    getImageUrl() {
        let url = process.env.VUE_APP_URL
        return url.replace('api/', '')
    },

    bytesToSize(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return 'n/a'
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
      if (i === 0) return `${bytes} ${sizes[i]}`
      return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
    },

    sessionExpire(message) {
      this.removeLoalStorageService("user");
      this.showerr(message);
    }
}
