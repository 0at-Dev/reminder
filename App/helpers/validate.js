export const validate=(form)=>{
    return form.Task.trim() !== ''? {message:'ok',data:form}:{message:'Task empty',data:null}
}



