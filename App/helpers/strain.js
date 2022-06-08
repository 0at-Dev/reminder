const importance=(tasks)=>{



}

const proximity=(setup)=>{
    let {further,tasks}=setup
    if(further){
        tasks.sort((a, b) => a.Deadline - b.Deadline);
        console.log(tasks)
    }
    if(!further){
        tasks.sort((a, b) => b.Deadline - a.Deadline);
        console.log(tasks)
    }
    // let _filtered= tasks.filter(task=>)
}

export default {proximity}