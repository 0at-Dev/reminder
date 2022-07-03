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
const init=async()=>{

            let _session=storage.isSession()
                
                if(_session.hasSession===true){
                    // Directo a dashboard(route)
                    if(_session.isStoring===true){
                        let {session:{store}}=_session
                        router({route:'Home',prop:store})
                     }
                     if(_session.isStoring===false){
                        router({route:'Home',prop:null})
                     }
                }
                if(_session.hasSession===false){
                    // Login
                    const $root= document.getElementById('Root')
                    const $modal=document.getElementById('Modal')

                    const $loginForm= $login()
                    const $alert=alert.template()
                    
                    // Injection
                    $root.appendChild($loginForm)
                    $modal.appendChild($alert)

                    // Events
                    $loginForm.addEventListener('submit',async e=>{
                        e.preventDefault()  
                        let _form=Object.fromEntries(new FormData(e.target))
                        let _validate=validate(_form)//If it's empty data
                            if(_validate.access===true){

                                storage.createSession(_form.Key)

                                if(_session.isStoring===true){
                                    let {session:{store}}=_session

                                   router({route:'Home',prop:store})
                                }
                                if(_session.isStoring===false){
                                   router({route:'Home',prop:null})
                                }
                            }
                            if(_validate.access===false){
                                alert.typeTheMessage()
                                alert.set('El campo esta vacio')
                            }
                    })

                }
}

export default {init,destroy,out}