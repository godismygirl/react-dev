const store = {};

export const globalProxy = {
    set : (id, proxy) => {
        if(store[id]){
            console.error('duplicated proxy id') 
        }
        store[id] = proxy;
    },
    get : id => {
        if(!store[id]){
            console.error('proxy id not exist')
        }
        return store[id]
    },
    remove : (id) => {
        if(!store[id]){
            delete store[id]
        }
    }
}