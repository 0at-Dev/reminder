const validate=(form)=>{
    return form.User.trim() !== '' && form.Password.trim() !== ''? {message:'ok',data:form}:{message:'empty',data:null}
}