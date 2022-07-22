const toDDMMYY=(yymmdd)=>{

}
const toMMDDYY=(yymmdd)=>{
    let [yy,mm,dd]=yymmdd.split('-')
    let result=`${mm}-${dd}-${yy}`

    return result
}

export default {toMMDDYY}