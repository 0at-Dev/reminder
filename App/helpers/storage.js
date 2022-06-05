
const get=(key)=>{
    let response= localStorage.getItem(key)
        response= JSON.parse(response)
    return response
}
const set=(setup)=>{
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
const remove=(setup)=>{
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
const session=(key)=>{
    let _validate= sessionStorage.getItem(key)
        
    if(_validate !==null){
        return {session:true,created:false,key}
    }
        sessionStorage.setItem(key,true)
    return {session:false,created:true,key}

} 
export default {get,set,remove,session}