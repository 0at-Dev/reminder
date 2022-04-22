export const card=(data)=>{
    
    let {Id,Task,Description,Created,Deadline,State}=data
    let $card= document.createElement('a')
        $card.className='task-card'
        let $task= document.createElement('h3')
            $task.textContent=Task
        let $description= document.createElement('p')
            $description.textContent=Description 
        let $deadlineContainer=document.createElement('span')  
            let $created= document.createElement('p')
                $created.textContent=Created
            let $deadline= document.createElement('p')
                $deadline.textContent=Deadline
            $deadlineContainer.appendChild($created)
            $deadlineContainer.appendChild($deadline)

            $card.appendChild($task)
            $card.appendChild($description)
            $card.appendChild($deadlineContainer)

    return $card
}