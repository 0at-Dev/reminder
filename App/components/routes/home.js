import api from '../../helpers/api.js'
import { delay } from '../../helpers/delay.js'
import get  from '../../helpers/query.js'
import session from '../../helpers/session.js'
import storage from '../../helpers/storage.js'
import alert from '../methods/alert.js'
import dashboard from '../methods/dashboard.js'

import editor from '../methods/editor.js'
import { navegator } from '../methods/navegator.js'


let $Root= document.getElementById('Root')
let $Modal= document.getElementById('Modal')

const listen=()=>{
    $Root.addEventListener('submit',(e)=>{
        if(e.target.id==='CreationForm'){
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
            
    })

}
const set=(data=[])=>{

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
        
        // Injection
        $Root.appendChild($editor)

        listen()
    }

}

export const home=async(props)=>{
        $Root.innerHTML=''
        $Modal.innerHTML=''

            console.log(props)
        props===null?set():set(props.tasks)
        // if(_session===null){
        //     let $editor=editor.template()
        //     let $dashboard=dashboard.template()
        //     let $proximity=dashboard.filter()
        //         $Root.appendChild($editor)
        //         $Root.appendChild($dashboard)
        //         $Root.appendChild($proximity)

                
        //         // Events
        //         editor.listen(key)

        //         await delay(2000)
        //         alert.eraseTheMessage()
        //         // alert.set(`Bienvenido ${key}, Comienza a crear tus notas`)
        // }


        // if(_session!==null){

        //     let $editor=editor.template()
        //     let $dashboard=dashboard.template()
        //     let $proximity=dashboard.filter()
        //     let $cards=dashboard.build({key,proximity:false})
                
        //         $cards.map(card=>$dashboard.appendChild(card))

        //     $Root.appendChild($editor)
        //     $Root.appendChild($dashboard)
        //     $Root.appendChild($proximity)

            
        //     // Events
        //     editor.listen(key)
        //     dashboard.listen(key)

        //     await delay(2000)
        //     alert.eraseTheMessage()
        //     // alert.set(`Bienvenido ${key}`)
        // }
      
        
}
