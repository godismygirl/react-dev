import {observable, computed, action} from 'mobx';
import { urlToList } from '../utils/utils';
import pathToRegexp from 'path-to-regexp';

export const getMenuMatchKeys = (flatMenuKeys, paths) =>
  paths.reduce(
    (matchKeys, path) =>
      matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
    []
  );

export const getFlatMenuKeys = menu =>
  menu.reduce((keys, item) => {
    keys.push(item.path);
    if (item.children) {
      return keys.concat(getFlatMenuKeys(item.children));
    }
    return keys;
  }, []);

export default class NavStore {

    constructor(url){
        this.setUrl(url)
    }

    @observable isLoading = false;
    @observable isCollapsed = false;
    @observable menuData = [];
    @observable currentPath = "";
    @observable openKeys = [];


    @computed get flatMenuKeys(){
        return getFlatMenuKeys(this.menuData)
    }

    @computed get menuMatchKeys(){
        //const {pathname} = this.location;
        return getMenuMatchKeys(this.flatMenuKeys, urlToList(this.currentPath));
    }

    @computed get selectedKeys(){
        const menuMatchKeysExist = this.menuMatchKeys && this.menuMatchKeys.length > 0;
        return menuMatchKeysExist? this.menuMatchKeys : [this.openKeys[this.openKeys.length - 1]];      
    }

    @action
    async load(url){
        this.setUrl(url);
        if(this.requestUrl.length > 0){
            this.isLoading = true;

            let result = await fetch(this.requestUrl);
            result = await result.json();
            if(result instanceof Array){
                this.menuData = result;
                this.setOpenKeys(this.menuMatchKeys);
            }

            this.isLoading = false;
        }
    }

    @action
    setOpenKeys(newKeys){
        this.openKeys = newKeys;
    }

    @action
    goTo(pathname){
        console.log(pathname)
        if(pathname && pathname.indexOf('/') !== -1){
            this.currentPath = pathname
        }
    }

    setUrl(url){
        if(url && url.indexOf('/')!== -1){
            this.requestUrl = url;
        }
    }
}