const importance=(tasks)=>{



}

const proximity=(setup)=>{
    let {further,tasks}=setup
    if(further){
        tasks.sort((a, b) => new Date(b.Deadline) - new Date(a.Deadline));

        return tasks
    }
    if(!further){
        
        tasks.sort((a, b) => new Date(a.Deadline) - new Date(b.Deadline));

        return tasks
    }
    // let _filtered= tasks.filter(task=>)
}

export default {proximity}