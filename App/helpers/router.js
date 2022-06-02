import { dashboard } from "../components/dashboard.js"
import { home } from "../components/home.js"
dashboard


export const _routes={
    "Home":{
        hash:"",
        title:"Home",
        success:key=>home(key)
    },
    "Dashboard":{
        hash:"#/Dashboard",
        title:"Dashboard",
        success:key=>dashboard()
    },
    "Trash":{
        hash:"#/Trash",
        title:"Trash",
        success:key=>console.log('Hey, this is the Trash')
    },
    "New":{
        hash:"#/New",
        title:"New",
        success:key=>console.log('Hey, this is the New method')
    }
}

export const router=(key)=>{
let {hash}=location
        let _route= Object.values(_routes).find(route=> route.hash === hash)
            _route.success(key)
}