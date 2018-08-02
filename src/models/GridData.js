import {observable} from 'mobx';

class GridData {
    requestUrl = "";
    @observable loading = false;
    @observable data = [];

    constructor(url){
        if(url) this.requestUrl = url;
    }

    async load(url){
        if(url) this.requestUrl = url;
        if(this.requestUrl.length > 0){
            this.loading = true;
            try{
                const result = await fetch(this.requestUrl);
                this.data = await result.json();
            }catch (error){
                throw error
            }
            this.loading = false;
        }
    }

    autoReload(interval){
        interval = parseInt(interval);
        if(interval > 0) this.reloadTimer = setInterval(this.load.bind(this), interval);
    }

    dispose(){
        if(this.reloadTimer){
            clearInterval(this.reloadTimer)
        }
    }

}

export default GridData;