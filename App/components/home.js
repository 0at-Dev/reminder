import api from '../helpers/api.js'
import get  from '../helpers/query.js'
import storage from '../helpers/storage.js'
import dashboard from './dashboard.js'

import editor from './editor.js'
import { navegator } from './navegator.js'

const $template=()=>{
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
            for (let index = limit - 1; index < $tasks.length; index++) {
                $tasks[index].remove()
            }
            
        }
}

    export const home=async(key)=>{
        let _session=storage.get(key)
        let $Root= document.getElementById('Root')
        let $html=$template()
            $Root.innerHTML=''
            
        // let $tasksLimiter=document.querySelector('.closest-task-filter>input[type="number"]')

            if(_session===null){
                let $editor=editor.template()
                    $Root.appendChild($editor)

                

                    // Events
                    editor.listen(key)
            }


            if(_session!==null){

                console.log(_session)

                let $editor=editor.template()
                let $dashboard=dashboard.template()
                let $cards=dashboard.build(key)
                    
                    $cards.map(card=>$dashboard.appendChild(card))

                $Root.appendChild($editor)
                $Root.appendChild($dashboard)

            
                // Events
                editor.listen(key)
                dashboard.listen()
                // alert(`Bienvenido,${_session}`)
                // $Root.appendChild($html)

            }
            


            // document.body.querySelector('header').appendChild(navegator())

            // Events
            //     $tasksLimiter.addEventListener('change',(event)=>{

            //         console.log(event.currentTarget.value)
            //         filter(event.target.value,_tasks.length)
            // }) 
    }
