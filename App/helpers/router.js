// import { dashboard } from "../components/dashboard.js"
import { home } from "../components/routes/home.js"

export const _routes={
    "Home":{
        hash:"",
        title:"Home",
        success:prop=>home(prop)
    }
}

export const router=(set)=>{
    let _route= _routes[set.route]
    if(set.route==='Home'){
        _route.success(set.prop)
    }
        
}