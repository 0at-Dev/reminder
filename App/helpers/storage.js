// LS=> Local Storage
// SS=> Session Storage


const get=(key)=>{//Obtener info del LS
    let response= localStorage.getItem(key)
        response= response===null?null:JSON.parse(response)
    return response
}
const set=(setup)=>{// Guardar info en el LS
    let {key,data}= setup    
    

    let _validate= localStorage.getItem(key)
    let _response= _validate===null?null:JSON.parse(_validate)
    

        if( _response !==null){
            if(_response.tasks){
                let _update=_response.tasks
                    _update.push(data)
                    localStorage.setItem(key,JSON.stringify({tasks:_update}))
            }
            if(!_response.tasks){
                localStorage.setItem(key,JSON.stringify({tasks:[data]}))
            }
        }
        if( _response===null){

            localStorage.setItem(key,JSON.stringify({tasks:[data]}))

        }
}
const remove=(setup)=>{//Remover info del LS
    let {key,ref}=setup

    let _validate= localStorage.getItem(key)
    let _response= _validate===null?null:JSON.parse(_validate)

        if( _response !==null){
            if(_response.tasks){
                let _data=_response.tasks.filter(task=> task.Id !== ref)
                    localStorage.setItem(key,JSON.stringify({tasks:_data}))
            }
        }
}
const isSession=()=>{//validar sesion
    let _session=key()//sesion activa
    let _key=_session//llave del almacen
    let _store=get(_key)//almacen

    if(_session!==null){
        
            if(_store===null){
                return {isStoring:false,hasSession:true,session:{key:_key,store:null}}
            }
            if(_store!==null){
                return {isStoring:true,hasSession:true,session:{key:_key,store:_store}}
            }
    }
    if(_session===null){

        if(_store===null){
            return {isStoring:false,hasSession:false,session:{key:null,store:null}}
        }
        if(_store!==null){
            return {isStoring:true,hasSession:false,session:{key:null,store:null}}
        }
    }   
} 
const createSession=(key)=>{//crear sesion
    sessionStorage.setItem('active',key)
} 
const key=()=>{
    let _key=sessionStorage.getItem('active')

    return _key
}
export default {get,set,remove,isSession,createSession,key}