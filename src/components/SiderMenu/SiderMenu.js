import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import {observer} from 'mobx-react';
import SiderMenuProxy from './SiderMenuProxy';
import {globalProxy} from '../../common/globalProxy';
import './index.less';

const { SubMenu } = Menu;

@observer
export default class SiderMenu extends React.Component {

    constructor(props){
        super(props);
        this.proxy = new SiderMenuProxy();
        this.proxy.setUrl(props.url);
        globalProxy.set(props.id, this.proxy);
    }

    componentWillMount(){
        this.proxy.currentPath = this.props.currentPath;
        this.proxy.load();
    }
    
    componentWillUnmount(){
        this.proxy = null;
        globalProxy.remove(this.props.id);
    }
    /**
     * 判断是否是http链接.返回 Link 或 a
     * Judge whether it is http link.return a or Link
     * @memberof SiderMenu
     */
    getMenuItemPath = item => {
        const itemPath = this.conversionPath(item.path);
        const icon = this.getIcon(item.icon);
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
        return (
            <a href={itemPath} target={target}>
            {icon}
            <span>{name}</span>
            </a>
        );
        }
        const { currentPath, onCollapse } = this.props;
        return (
        <Link
            to={itemPath}
            target={target}
            replace={itemPath === currentPath}
            onClick={() => this.proxy.goTo(itemPath)}
        >
            {icon}
            <span>{name}</span>
        </Link>
        );
    };

    // Allow menu.js config icon as string or ReactNode
    //   icon: 'setting',
    //   icon: 'http://demo.com/icon.png',
    //   icon: <Icon type="setting" />,
    getIcon = icon => {
        if (typeof icon === 'string') {
        if (icon.indexOf('http') === 0) {
            return <img src={icon} alt="icon" className={`sider-menu-item-img`} />;
        }
        return <Icon type={icon} />;
        }

        return icon;
    };
    /**
     * get SubMenu or Item
     */
    getSubMenuOrItem = item => {
        if (item.children && item.children.some(child => child.name)) {
        const childrenItems = this.getNavMenuItems(item.children);
        // 当无子菜单时就不展示菜单
        if (childrenItems && childrenItems.length > 0) {
            return (
            <SubMenu
                title={
                item.icon ? (
                    <span>
                    {this.getIcon(item.icon)}
                    <span>{item.name}</span>
                    </span>
                ) : (
                    item.name
                )
                }
                key={item.path}
            >
                {childrenItems}
            </SubMenu>
            );
        }
        return null;
        } else {
        return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    };

    /**
     * 获得菜单子节点
     * @memberof SiderMenu
     */
    getNavMenuItems = menusData => {
        if (!menusData) {
        return [];
        }
        return menusData
        .filter(item => item.name && !item.hideInMenu)
        .map(item => {
            // make dom
            const ItemDom = this.getSubMenuOrItem(item);
            return this.checkPermissionItem(item.authority, ItemDom);
        })
        .filter(item => item);
    };

    // conversion Path
    // 转化路径
    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
        return path;
        } else {
        return `/${path || ''}`.replace(/\/+/g, '/');
        }
    };

    // permission to check
    checkPermissionItem = (authority, ItemDom) => {
        const { Authorized } = this.props;
        if (Authorized && Authorized.check) {
        const { check } = Authorized;
        return check(authority, ItemDom);
        }
        return ItemDom;
    };

    isMainMenu = key => {
        const { menuData } = this.proxy;
        return menuData.some(item => key && (item.key === key || item.path === key));
    };

    handleOpenChange = openKeys => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.proxy.setOpenKeys( moreThanOne? [lastOpenKey] : [...openKeys])
    };

    toggleSiderMenu = () => {
        this.proxy.toggleCollapsed()
    }

    render() {
        const {menuData, isCollapsed, openKeys, selectedKeys} = this.proxy;
        // Don't show popup menu when it is collapsed
        const menuProps = isCollapsed? {} : { openKeys };
        const siderWidth = isCollapsed? '80px':'250px';

        return (
            <div className="sider-menu" style={{width: siderWidth}}>
                <div className="toggle-collapsed" onClick={this.toggleSiderMenu}>
                    <Icon type="ellipsis"/>
                </div>
                <Menu
                    key="Menu"
                    theme="dark"
                    mode="inline"
                    inlineCollapsed = {isCollapsed}
                    {...menuProps}
                    onOpenChange={this.handleOpenChange}
                    selectedKeys={selectedKeys}
                    style={{ padding: '16px 0', width: '100%' }}
                >
                    {this.getNavMenuItems(menuData)}
                </Menu>
            </div>
        );
    }
}
