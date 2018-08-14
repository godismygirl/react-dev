const store = {};

export const globalProxy = {
    set : (id, proxy) => {
        if(store[id]){
            throw 'duplicated proxy id'
        }
        store[id] = proxy;
    },
    get : id => {
        if(!store[id]){
            throw 'proxy id not exist'
        }
        return store[id]
    }
}