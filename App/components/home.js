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
const filter=()=>{
    let _date= new Date
        let _day= _date.getDay()
        let _month= _date.getMonth()
        let _year= _date.getFullYear()
        let _fullDate= `${_day}/${_month}/${_year}`
            console.log(_fullDate)

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
                    _tasks.map(task=>{
                        $wrapper.appendChild(card(task))
                    })
                    filter()
                }
            }
        })

    


}
