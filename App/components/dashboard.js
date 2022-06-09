import api from '../helpers/api.js'
import get  from '../helpers/query.js'
import storage from '../helpers/storage.js'
import date from "../helpers/date.js"
import { idGenerator } from "../helpers/idGenerator.js"
import { validate } from "../helpers/validate.js"
import strain  from "../helpers/strain.js"

const _closerEmoji='&#128561'
const _furtherEmoji='&#128564'

const template=()=>{
    let $main=document.createElement('section')
          $main.classList.add('dashboard')

        return $main
}


// Id (random)
// Task 
// Description 
// Creation date
// Deadline
// State

const filter=()=>{
    let $filter=document.createElement('span')
        $filter.classList.add('filter-container')
        let $switcher= document.createElement('input')
            $switcher.type='checkbox'
            $switcher.id='Proximity'
        let $label=document.createElement('label')
            $label.htmlFor='Proximity'
            $label.innerHTML=_closerEmoji

            $filter.appendChild($switcher)
            $filter.appendChild($label)

    return $filter
        
}
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

const build=(setup)=>{
    let {key,proximity}=setup
    let _response=storage.get(key)
        console.log(_response)
        let _sort=strain.proximity({further:proximity,tasks:_response.tasks})
        if(_sort!==null){
            return [..._sort.map(task=>card(task))]
        }
        return []
}
const listen=(key)=>{

    // Delete

    let $cards= document.querySelectorAll('.dashboard .card .delete-task')
    let $dashboard=$cards[0].parentElement.parentElement
    let $proximity=document.getElementById('Proximity')

        $cards.forEach($card=>{

            $card.addEventListener('click',e=>{
                e.preventDefault()

                let _ref=e.currentTarget.id
                    storage.remove({key,ref:_ref})
                    
                    let $cards=build({key,proximity:false})
                        $dashboard.innerHTML=''
                        $cards.map(card=>$dashboard.appendChild(card))
              

            })
        })
        $proximity.addEventListener('change',e=>{
            let $label=e.currentTarget.parentElement.querySelector('label')
            let _further=e.target.checked
            // let _tasks= storage.get(key).tasks
            if(_further){
                $label.innerHTML=_furtherEmoji
                // let _sort=strain.proximity({further:_further,tasks:_tasks})
                let $cards=build({key,proximity:true})
                    $dashboard.innerHTML=''
                    $cards.map(card=>$dashboard.appendChild(card))

            }
            if(!_further){
                $label.innerHTML=_closerEmoji
                // let _sort=strain.proximity({further:_further,tasks:_tasks})
                let $cards=build({key,proximity:false})
                    $dashboard.innerHTML=''
                    $cards.map(card=>$dashboard.appendChild(card))


            }
        })

}
export default {template,build,listen,card,filter}