import { delay } from '../../helpers/delay.js'
import session from '../../helpers/session.js'
import storage from '../../helpers/storage.js'
import transform from '../../helpers/transform.js'
import alert from '../methods/alert.js'
import dashboard from '../methods/dashboard.js'

import editor from '../methods/editor.js'
import { navegator } from '../methods/navegator.js'



let $Root= document.getElementById('Root')
let $Modal= document.getElementById('Modal')
let _key=storage.key()
const listen=()=>{
    
    $Root.addEventListener('submit',(e)=>{
        let {target}=e
        if(target.id==='CreationForm'){
            e.preventDefault()
            let _form={
                Task:e.target.elements.Task.value,
                Description:e.target.elements.Description.value,
                Deadline:e.target.elements.Deadline.value,
                Importance:e.target.elements.Importance.value
            }

            editor.create(_form)
        }   
    })
    $Root.addEventListener('click',(e)=>{
        let {target}=e
        if(target.tagName==='BUTTON' && target.classList.contains('delete-task')){
            let _ref= target.id    

            dashboard.remove(_ref)
        }   
    })  
}
const set=()=>{
    // Alert Container
    const $alert=alert.template()
        $Modal.appendChild($alert)

    
    //Storage check 
    let _storage=dashboard.check()
    if(_storage!==null){
        let{tasks:data}=_storage

        if(data.length>0){

            let $editor=editor.template()
            let $dashboard=dashboard.template()

            // Data injection
                data.map(task=>{
                    let $card=dashboard.card(task)
                        $dashboard.appendChild($card)
                })

            //Main Injection
            $Root.appendChild($editor)
            $Root.appendChild($dashboard)

            listen()
        }
        if(data.length===0){
            let $editor=editor.template()
            
            //Main Injection
            $Root.appendChild($editor)

            listen()
        }
    }
    if(_storage===null){
            let $editor=editor.template()
            
            //Main Injection
            $Root.appendChild($editor)

            listen()
    }
    
}

export const home=async(props)=>{
        $Root.innerHTML=''
        $Modal.innerHTML=''

            set()     
}
