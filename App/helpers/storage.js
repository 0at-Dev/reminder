
export const get=(key)=>{
    let response= localStorage.getItem(key)
        response= JSON.parse(response)
    return response
}
export const set=(setup)=>{
    let {session}= setup    
    let _validate= localStorage.getItem(session)
        console.log(_validate)
        // if(_validate !==undefined){
        //     localStorage.setItem(id,JSON.stringify(data))
        // }
        // if(_validate ===undefined){
        //     console.log(`${id} data already exist`)
        // }
}
export const session=(key)=>{
    let _validate= sessionStorage.getItem(key)
        
    if(_validate !==null){
        return {session:true,created:false,key}
    }
        sessionStorage.setItem(key,true)
    return {session:false,created:true,key}

} 
export default {get,set,session}