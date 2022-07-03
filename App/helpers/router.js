// import { dashboard } from "../components/dashboard.js"
import { home } from "../components/routes/home.js"


export const _routes={
    "Home":{
        hash:"",
        title:"Home",
        success:key=>home(key)
    }
}

export const router=(key)=>{
let {hash}=location
        let _route= Object.values(_routes).find(route=> route.hash === hash)
            _route.success(key)
}