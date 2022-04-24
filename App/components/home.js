import api from '../helpers/api.js'
import get  from '../helpers/query.js'
import { card } from './dashboard.js'

const template=()=>{
    let $main=document.createElement('div')
        $main.className='page-wrapper'
        let $filterContainer= document.createElement('div')
            $filterContainer.className='closest-task-filter'
                let $filterInput=document.createElement('input')
                    $filterInput.type='number'
                
                $filterContainer.appendChild($filterInput)            
        let $nextTaskContainer= document.createElement('section')
            $nextTaskContainer.className='next-task'
            let $wrapper= document.createElement('div')
                $wrapper.classList.add('wrapper')
                $wrapper.classList.add('task')

                $nextTaskContainer.appendChild($wrapper)


        $main.appendChild($filterContainer)
        $main.appendChild($nextTaskContainer)
        return $main
}
const filter=(limit,length)=>{
    let $tasks= document.querySelectorAll('a.task-card')
        if($tasks.length>0){
            console.log($tasks)
            console.log(limit)
            console.log(length)
        }
}
export const home=async()=>{

    let $Root= document.getElementById('Root')
    let $html=template()
        $Root.innerHTML=''
        $Root.appendChild($html)

        await get({
            url:api.task,
            success:response=>{
            let _tasks=response
            let $wrapper=document.querySelector('.wrapper.task')
                if(_tasks !==undefined){
                    let $tasksLimiter=document.querySelector('.closest-task-filter>input[type="number"]')
                    let _sortByDeadline=_tasks.sort((a,b)=>{
                            return new Date(b.Deadline) - new Date(a.Deadline)
                    })

                    _sortByDeadline.map(task=>{
                        $wrapper.appendChild(card(task))
                    })

                    $tasksLimiter.value=1
                    $tasksLimiter.min=1
                    $tasksLimiter.max=_tasks.length

                    $tasksLimiter.addEventListener('change',(event)=>{
                        // console.log(event.currentTarget.value)
                        filter(event.target.value,_tasks.length)
                   }) 
                }
            }
        })

    


}
