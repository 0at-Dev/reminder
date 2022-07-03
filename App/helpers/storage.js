// LS=> Local Storage
// SS=> Session Storage


const get=(key)=>{//Obtener info del LS
    let response= localStorage.getItem(key)
        response= JSON.parse(response)
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
    let _session=sessionStorage.getItem('active')

    if(_session!==null){
        let _key=_session
        let _storing=localStorage.getItem(_key)
        
            if(_storing===null){
                return {isStoring:false,hasSession:true,key:_key}
            }
            if(_storing!==null){
                return {isStoring:true,hasSession:true,key:_key}
            }
    }
    if(_session===null){
        return {isStoring:null,hasSession:false}
    }   
} 
const createSession=(key)=>{//crear sesion
    sessionStorage.setItem('active',key)
}
export default {get,set,remove,isSession,createSession}