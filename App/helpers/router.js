import { dashboard } from "../components/dashboard.js"
import { home } from "../components/home.js"
dashboard


const _routes={
    "Home":{
        hash:"",
        title:"Home",
        success:()=>home()
    },
    "Dashboard":{
        hash:"#/Dashboard",
        title:"Dashboard",
        success:()=>dashboard()
    },
    "Trash":{
        hash:"#/Trash",
        title:"Trash",
        success:()=>console.log('Hey, this is the Trash')
    },
    "New":{
        hash:"#/New",
        title:"New",
        success:()=>console.log('Hey, this is the New method')
    }
}

export const router=()=>{
let {hash}=location
        let _route= Object.values(_routes).find(route=> route.hash === hash)
            _route.success(hash)
}