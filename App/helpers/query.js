const get = async(props)=>{
    let {url,success}= props
    await fetch(url)
        .then(res=> res.ok? res.json():Promise.reject(res))
        .then(json=> success(json))
        .catch(err=>{
        console.log(err)
        })
}
export default get
