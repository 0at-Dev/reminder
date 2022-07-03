
// Id (random)
// Task 
// Description 
// Creation date
// Deadline

import date from "../../helpers/date.js"
import { idGenerator } from "../../helpers/idGenerator.js"
import storage from "../../helpers/storage.js"
import { validate } from "../../helpers/validate.js"
import dashboard from "./dashboard.js"



// State
const input=(setup)=>{
    let {type,id,placeholder}=setup

    let $input=document.createElement('input')
        $input.type=type
        $input.id=id
        $input.placeholder=placeholder
        $input.spellcheck=false
        $input.autocomplete='off'

    return $input
}
const label=(setup)=>{
    let {htmlFor,content}=setup

    let $label=document.createElement('label')
        $label.htmlFor=htmlFor
        $label.textContent=content

    return $label
}

const form=()=>{
    let $form=document.createElement('form')
        $form.id='CreationForm'
        $form.classList.add('creation-form')
    let _today=date.today()
    let _day=_today.day<10? `0${_today.day}`:_today.day
    let _month=_today.month<10? `0${_today.month + 1}`:_today.month + 1
    let _year=_today.year
        let $taskInput= input({type:'text',id:'Task',placeholder:'Tarea'})
        let $descriptionInput= input({type:'text',id:'Description',placeholder:'Describe la tarea'})
        let $deadlineInput= input({type:'date',id:'Deadline',placeholder:'Limite para hacer la tarea'})
            $deadlineInput.value=`${_year}-${_month}-${_day}`
            $deadlineInput.min=`${_year}-${_month}-${_day}`
        let $importanceContainer= document.createElement('span')
            $importanceContainer.classList.add('importance-check-container')
            let $importanceLabel= label({htmlFor:'Importance',content:'Nivel de importancia: '})
            let $importanceInput=input({type:'checkbox',id:'Importance',placeholder:''})
                $importanceContainer.appendChild($importanceInput)
                $importanceContainer.appendChild($importanceLabel)

        let $submit=document.createElement('button')
            $submit.type='submit'
            $submit.id='SaveTask'
            $submit.textContent='Guardar tarea ✍'

            $form.appendChild($taskInput)
            $form.appendChild($descriptionInput)
            $form.appendChild($deadlineInput)
            $form.appendChild($importanceContainer)
            $form.appendChild($submit)

    return $form
}

const template=()=>{
    const $main=document.createElement('section')
        $main.classList.add('editor')
        
        let $form= form()

        $main.appendChild($form)

    return $main
}

const listen=(key)=>{
    let $save= document.getElementById('SaveTask')
    let $dashboard= document.querySelector('.dashboard')
        $save.addEventListener('click',e=>{
            e.preventDefault()
            
            let _today=date.today()
            let _day=_today.day<10? `0${_today.day}`:_today.day
            let _month=_today.month<10? `0${_today.month + 1}`:_today.month + 1
            let _year=_today.year


            let _task= document.getElementById('Task')
            let _description= document.getElementById('Description')
            let _deadline=document.getElementById('Deadline')
            let _importance=document.getElementById('Importance')
                let _form={
                    Id:idGenerator(),
                    Task:_task.value,
                    Description:_description.value,
                    Created:`${_year}-${_month}-${_day}`,
                    Deadline:_deadline.value,
                    Importance:_importance.value,
                    State:0
                }
                let _validate=validate(_form)

                if(_validate.data !==null){
                    storage.set({key,data:_validate.data})
                    let $cards=dashboard.build(key)
                        $dashboard.innerHTML=''
                        $cards.map(card=>$dashboard.appendChild(card))
                
                }
        })

}

export default {template,listen}