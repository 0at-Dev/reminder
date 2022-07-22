
// Id (random)
// Task 
// Description 
// Creation date
// Deadline

import date from "../../helpers/date.js"
import { idGenerator } from "../../helpers/idGenerator.js"
import storage from "../../helpers/storage.js"
import { validate } from "../../helpers/validate.js"
import alert from "./alert.js"
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

const create=(form)=>{
            
            let _today=date.today()
            let _day=_today.day<10? `0${_today.day}`:_today.day
            let _month=_today.month<10? `0${_today.month + 1}`:_today.month + 1
            let _year=_today.year
            let _key= storage.key()
            let _validate=validate(form)

                    console.log(_validate)
                    console.log(_key)
                if(_validate.data !==null){
                    form.Created=`${_year}-${_month}-${_day}`
                    form.Id=idGenerator()
                    form.State=0

                    if(_key!==null)storage.set({key:_key,data:_validate.data}),window.location.reload()
                    if(_key===null)alert.typeTheMessage(),alert.set('Error en la sesion')
                }
}

export default {template,create}