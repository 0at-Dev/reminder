const _routes={
    Home:{
        path:"/Home",
        title:"Home",
        state:1
    },
    Dashboard:{
        path:"/Dashboard",
        title:"Dashboard",
        state:2
    },
    Trash:{
        path:"/Trash",
        title:"Trash",
        state:4
    },
    New:{
        path:"/New",
        title:"New",
        state:3
    }
}

export const router=(hash)=>{
    let path= hash.split('#/')[1]
        console.log(path)
    let _route=_routes[path]
        window.history.pushState(_route.state,_route.title,_route.path)
}