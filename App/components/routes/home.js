import api from '../../helpers/api.js'
import { delay } from '../../helpers/delay.js'
import get  from '../../helpers/query.js'
import session from '../../helpers/session.js'
import storage from '../../helpers/storage.js'
import alert from '../methods/alert.js'
import dashboard from '../methods/dashboard.js'

import editor from '../methods/editor.js'
import { navegator } from '../methods/navegator.js'


export const home=async(key)=>{
    let _session=storage.get(key)
    let $Root= document.getElementById('Root')
        $Root.innerHTML=''

        
        if(_session===null){
            let $editor=editor.template()
            let $dashboard=dashboard.template()
            let $proximity=dashboard.filter()
                $Root.appendChild($editor)
                $Root.appendChild($dashboard)
                $Root.appendChild($proximity)

                
                // Events
                editor.listen(key)

                await delay(2000)
                alert.eraseTheMessage()
                // alert.set(`Bienvenido ${key}, Comienza a crear tus notas`)
        }


        if(_session!==null){

            let $editor=editor.template()
            let $dashboard=dashboard.template()
            let $proximity=dashboard.filter()
            let $cards=dashboard.build({key,proximity:false})
                
                $cards.map(card=>$dashboard.appendChild(card))

            $Root.appendChild($editor)
            $Root.appendChild($dashboard)
            $Root.appendChild($proximity)

            
            // Events
            editor.listen(key)
            dashboard.listen(key)

            await delay(2000)
            alert.eraseTheMessage()
            // alert.set(`Bienvenido ${key}`)
        }
        // Events
        // window.addEventListener("beforeunload",(e) =>{
        //     e.preventDefault()
        //     session.out()
        // });
        
}
