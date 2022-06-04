import api from '../helpers/api.js'
import get  from '../helpers/query.js'
import storage from '../helpers/storage.js'
import date from "../helpers/date.js"
import { idGenerator } from "../helpers/idGenerator.js"
import { validate } from "../helpers/validate.js"

const template=()=>{
    let $main=document.createElement('section')
          $main.classList.add('dashboard')

        return $main
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
// Id (random)
// Task 
// Description 
// Creation date
// Deadline
// State


const card=(data)=>{
    let {Id,Task,Description,Created,Deadline}=data

    let $card= document.createElement('div')
        $card.classList.add('card')
        $card.id=Id


        let $title=document.createElement('h3')
            $title.textContent=Task
        let $description=document.createElement('p')
            $description.textContent=Description
        let $created=document.createElement('h4')
            $created.textContent=Created
        let $deadline=document.createElement('h4')
            $deadline.textContent=Deadline
        // let $state=document.createElement('h5')  

        $card.appendChild($title)
        $card.appendChild($description)
        $card.appendChild($created)
        $card.appendChild($deadline)
        // $card.appendChild($state)

    return $card
}

const dashboard=async()=>{

    let $Root= document.getElementById('Root')
    let $wrapper= wrapperTemplate()
    let $filter= filterTemplate()
    let $filterBlock= filterBlock({id:'Recientes',title:'Màs Recientes'})
        
        $Root.innerHTML=''
        
}
const build=(key)=>{
    let _response=storage.get(key)
        if(_response!==null){
            return [..._response.tasks.map(task=>card(task))]
        }
        return []
}
const listen=()=>{

    // Delete

    let $cards= document.querySelectorAll('.dashboard .card')
        $cards.forEach($card=>{

            $card.addEventListener('click',e=>{
                e.preventDefault()
                console.log(e.currentTarget.id)
                
                // let _today=date.today()
                // let _day=_today.day<10? `0${_today.day}`:_today.day
                // let _month=_today.month<10? `0${_today.month + 1}`:_today.month + 1
                // let _year=_today.year


                // let _task= document.getElementById('Task')
                // let _description= document.getElementById('Description')
                // let _deadline=document.getElementById('Deadline')
                //     let _form={
                //         Id:idGenerator(),
                //         Task:_task.value,
                //         Description:_description.value,
                //         Created:`${_year}-${_month}-${_day}`,
                //         Deadline:_deadline.value,
                //     }
                //     let _validate=validate(_form)

                //     if(_validate.data !==null)storage.set({key,data:_validate.data})

            })
    })

}
export default {template,build,listen,card}