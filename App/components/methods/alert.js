
const typeTheMessage=()=>{
    const $message=document.querySelector('.alert>h1')
        $message.classList.remove('removeMessage')
        $message.classList.add('addMessage')

        setTimeout(()=>{
            eraseTheMessage()
        },2500)
}

const eraseTheMessage=()=>{
    const $message=document.querySelector('.alert>h1')
        $message.classList.remove('addMessage')
        $message.classList.add('removeMessage')

        setTimeout(()=>{
            $message.textContent=''
            $message.classList.remove('removeMessage')
        },3000)
        
}
const set=(message)=>{
    let $alert= document.querySelector('.alert>h1')
    let _length=message.length
        $alert.textContent=message
        $alert.style.setProperty("--alertCharacters", _length);
}

const template=()=>{
let $alert= document.createElement('div')
    $alert.classList.add('alert')
        let $message=document.createElement('h1')
            $message.textContent=''
            $alert.appendChild($message)

    return $alert
}

export default{
    template,set,typeTheMessage,eraseTheMessage
}