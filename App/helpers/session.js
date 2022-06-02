import { router } from "./router.js";
import storage from "./storage.js";

const $login=()=>{
    let $form= document.createElement('form')
        $form.id='Session'
        let $key= document.createElement('input')
            $key.type='text'
            $key.id='Key'
            $key.name='Key'
        let $submit= document.createElement('button')
            $submit.type='submit'
            $submit.innerHTML=':chicken'

        $form.appendChild($key)
        $form.appendChild($submit)

    return $form
}
const validate=(form)=>{
    return form.Key.trim() !== '' ? {access:true,data:form}:{access:false,data:null}
}
export const session=()=>{
    const $root= document.getElementById('Root')
    const $template= $login()
        
            $root.appendChild($template)

            // Event

            $template.addEventListener('submit',e=>{
                e.preventDefault()
                
                let _form=Object.fromEntries(new FormData(e.target))
                let _validate=validate(_form)
                    if(_validate.access){
                        let _session=storage.session(_validate.data['Key'])
                        if(_session.session){
                            alert('Hay sesion')
                            router(_session.key)
                            
                        }
                        if(_session.session===false){
                            alert('No hay sesion. Se ha creado una')
                            router(_session.key)
                        }
                    }
            })
}