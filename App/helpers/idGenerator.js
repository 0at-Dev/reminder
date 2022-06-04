export const idGenerator= ()=>{
    let alpha= 'abcdefghijklmnopqrstuvwxyz'
    return alpha[Math.floor(Math.random() * alpha.length)] + Math.random().toString(36).slice(2);
}