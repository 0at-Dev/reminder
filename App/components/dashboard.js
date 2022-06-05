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
        


        let $title=document.createElement('h3')
            $title.textContent=Task
        let $description=document.createElement('p')
            $description.textContent=Description
        let $created=document.createElement('h4')
            $created.textContent=Created
        let $deadline=document.createElement('h4')
            $deadline.textContent=Deadline
        // let $state=document.createElement('h5')  
        let $delete= document.createElement('button')
            $delete.classList.add('delete-task')
            $delete.id=Id
            $delete.innerHTML=`&#128165;`


        $card.appendChild($title)
        $card.appendChild($description)
        $card.appendChild($created)
        $card.appendChild($deadline)
        $card.appendChild($delete)
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
const listen=(key)=>{

    // Delete

    let $cards= document.querySelectorAll('.dashboard .card .delete-task')
        $cards.forEach($card=>{

            $card.addEventListener('click',e=>{
                e.preventDefault()

                let _ref=e.currentTarget.id
                    storage.remove({key,ref:_ref})

                    console.log(storage.get(key))
              

            })
    })

}
export default {template,build,listen,card}