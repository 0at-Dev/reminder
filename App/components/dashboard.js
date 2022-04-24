import api from '../helpers/api.js'
import get  from '../helpers/query.js'

const wrapperTemplate=()=>{
    let $wrapper= document.createElement('div')
        $wrapper.classList.add('wrapper')
        $wrapper.classList.add('task')

        return $wrapper
}
const filterTemplate=()=>{
    let $filterContainer= document.createElement('div')
        $filterContainer.className='task-filter'

        return $filterContainer
}
const filterBlock=(setup)=>{
    let {id,title}=setup
    let $filter = document.createElement('span')
        $filter.className='filter-block'
        let $checkbox=document.createElement('input')
            $checkbox.type='checkbox'
            $checkbox.id=id
        let $label=document.createElement('label')
            $label.htmlFor=id
            $label.textContent=title

            $filter.appendChild($checkbox)
            $filter.appendChild($label)

        return $filter

}
export const card=(data)=>{
    let {Id,Task,Description,Created,Deadline,State}=data
    let _splittedDeadline=Deadline.split('-')
    let _reorderedDeadline=`${_splittedDeadline[2]}/${_splittedDeadline[1]}/${_splittedDeadline[0]}`
    let _splittedCreatedDate=Created.split('-')
    let _reorderedCreatedDate=`${_splittedCreatedDate[2]}/${_splittedCreatedDate[1]}/${_splittedCreatedDate[0]}`
    let $card= document.createElement('a')
        $card.className='task-card'
        $card.setAttribute('deadline',Deadline)
        let $task= document.createElement('h3')
            $task.textContent=Task
        let $description= document.createElement('p')
            $description.textContent=Description 
        let $deadlineContainer=document.createElement('span')  
            let $created= document.createElement('p')
                $created.textContent=_reorderedCreatedDate
            let $deadline= document.createElement('p')
                $deadline.textContent=_reorderedDeadline
            $deadlineContainer.appendChild($created)
            $deadlineContainer.appendChild($deadline)

            $card.appendChild($task)
            $card.appendChild($description)
            $card.appendChild($deadlineContainer)

    return $card
}

export const dashboard=async()=>{

    let $Root= document.getElementById('Root')
    let $wrapper= wrapperTemplate()
    let $filter= filterTemplate()
    let $filterBlock= filterBlock({id:'Recientes',title:'Màs Recientes'})
        
        $Root.innerHTML=''
        
        await get({
            url:api.task,
            success:response=>{
            let _tasks=response
                if(_tasks !==undefined){
                    _tasks.map(task=>{
                            $filter.appendChild($filterBlock)

                            $wrapper.appendChild(card(task))
                            $Root.appendChild($filter)
                            $Root.appendChild($wrapper)
                    })
                }
            }
        })
}