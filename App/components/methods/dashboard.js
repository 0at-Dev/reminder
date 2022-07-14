import api from '../../helpers/api.js'
import get  from '../../helpers/query.js'
import storage from '../../helpers/storage.js'
import date from "../../helpers/date.js"
import { idGenerator } from "../../helpers/idGenerator.js"
import { validate } from "../../helpers/validate.js"
import strain  from "../../helpers/strain.js"

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



export default {template,card}