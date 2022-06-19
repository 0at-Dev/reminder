import alert from "../components/methods/alert.js";
import { delay } from "./delay.js";
import { router } from "./router.js";
import storage from "./storage.js";

const $login=()=>{
    let $form= document.createElement('form')
        $form.classList.add('login-form')
        $form.id='Session'
        let $title=document.createElement('h2')
            $title.textContent='📓Block de notas de: '
        let $key= document.createElement('input')
            $key.type='text'
            $key.id='Key'
            $key.name='Key'
            $key.autocomplete='off'
            $key.spellcheck=false
            $key.placeholder='Nombre'
        let $submit= document.createElement('button')
            $submit.type='submit'
            $submit.innerHTML=`&#128682;`

        $form.appendChild($title)
        $form.appendChild($key)
        $form.appendChild($submit)

    return $form
}
const validate=(form)=>{
    return form.Key.trim() !== '' ? {access:true,data:form}:{access:false,data:null}
}
const destroy=(key)=>{
    sessionStorage.removeItem(key)
    localStorage.removeItem(key)
}
const out=()=>{
    sessionStorage.removeItem('active')
}
const init=()=>{
    const $root= document.getElementById('Root')
    const $modal=document.getElementById('Modal')
    const $template= $login()
    const $alert=alert.template()
            $root.appendChild($template)
            $modal.appendChild($alert)

            // Event

            $template.addEventListener('submit',async e=>{
                e.preventDefault()
                
                let _form=Object.fromEntries(new FormData(e.target))
                let _validate=validate(_form)
                    if(_validate.access){
                        let _session=storage.session(_validate.data['Key'])

                        if(_session.session){
                            alert.typeTheMessage()
                            alert.set('Ya existe una sesión')
                            await delay(2000)
                            router(_session.key)
                            
                        }
                        if(_session.session===false){
                            alert.typeTheMessage()
                            alert.set('No existe una sesión. Se ha creado una')
                            await delay(2000)
                            router(_session.key)
                        }
                    }
            })
}

export default {init,destroy,out}