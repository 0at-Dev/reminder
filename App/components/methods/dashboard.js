import storage from '../../helpers/storage.js'
import date from "../../helpers/date.js"
import { idGenerator } from "../../helpers/idGenerator.js"
import { validate } from "../../helpers/validate.js"
import strain  from "../../helpers/strain.js"
import transform from '../../helpers/transform.js'
import alert from './alert.js'


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

const remove=(ref)=>{
    let _key=storage.key()
    let _storage= storage.get(_key)

    if(_storage!==null){
        let {tasks}=_storage
        let _task=tasks.find(task=>task.Id===ref)

            if(_task!==undefined){
                let $card= document.getElementById(ref).parentElement

                    storage.remove({key:_key,ref})
                    $card.remove()
                    window.location.reload()
            }
    }
}
const check=()=>{
    let _key=storage.key()
    let _storage= storage.get(_key)
    let _today=date.today()
    let _day=_today.day<10? `0${_today.day}`:_today.day
    let _month=_today.month<10? `0${_today.month + 1}`:_today.month + 1
    let _year=_today.year

        let _MMDDYY=`${_month}-${_day}-${_year}`

            if(_storage!==null){
                let _validTasks=_storage.tasks.filter(task=>{
                    let {Deadline}=task
                        
                        Deadline=transform.toMMDDYY(Deadline)

                    return new Date(Deadline)>=new Date(_MMDDYY)
                })
                if(_storage.tasks.length !== _validTasks.length){
                    alert.typeTheMessage()
                    alert.set('Algunas de tus tareas expiraron, asi que fueron eliminadas')

                    //Actualizar el LS
                    localStorage.removeItem(_key)

                    if(_validTasks.length>0){
                        localStorage.setItem(_key,JSON.stringify({tasks:_validTasks}))
                        
                        return {tasks:_validTasks}
                    }
                    if(_validTasks.length===0){
                        window.location.reload()
                    }
                }
                if(_storage.tasks.length === _validTasks.length){
                    return _storage
                }
            }
            if(_storage===null)return null

}


export default {template,card,remove,check}