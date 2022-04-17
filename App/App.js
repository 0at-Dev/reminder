import { router } from "./helpers/router.js";

document.addEventListener('DOMContentLoaded',()=>{
    let {hash}=location
    router(hash);
    // const selectors=document.querySelectorAll('header>nav>a')

    // selectors.forEach(selector=>{
    //     selector.addEventListener('click',(event)=>{
    //         event.preventDefault();
    //         // let ref= event.currentTarget.href.split('/')[3]
    //             // router(ref);
    //     })
    // })

})
window.addEventListener('hashchange',(event)=>{
    let {hash}=location
    router(hash);
    // console.log(document.location.pathname)
})

