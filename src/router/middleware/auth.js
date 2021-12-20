import { utilFunctionService } from "@/utils/utils.service"
export default function auth ({ next }) {
 if (!utilFunctionService.getLocalStorageService("AuthenticationToken")) {
    return next('login')
  }
 return next()
}
