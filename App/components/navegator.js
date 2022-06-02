import { _routes } from "../helpers/router.js"



export const navegator=()=>{
    let $navegator=document.createElement('nav')
    
        Object.values(_routes).map(route=>{
            let $anchor= document.createElement('a')
                $anchor.href=route.hash
                $anchor.textContent=route.title

            $navegator.appendChild($anchor)
        })

    return $navegator

}