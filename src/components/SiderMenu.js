import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import pathToRegexp from 'path-to-regexp';
import { Link } from 'react-router-dom';
import {observer} from 'mobx-react';
import { urlToList } from '../utils/utils';

const { Sider } = Layout;
const { SubMenu } = Menu;

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type="setting" />,
const getIcon = icon => {
  if (typeof icon === 'string') {
    if (icon.indexOf('http') === 0) {
      return <img src={icon} alt="icon" className={`sider-menu-item-img`} />;
    }
    return <Icon type={icon} />;
  }

  return icon;
};

/**
 * Find all matched menu keys based on paths
 * @param  flatMenuKeys: [/abc, /abc/:id, /abc/:id/info]
 * @param  paths: [/abc, /abc/11, /abc/11/info]
 */
// export const getMenuMatchKeys = (flatMenuKeys, paths) =>
//   paths.reduce(
//     (matchKeys, path) =>
//       matchKeys.concat(flatMenuKeys.filter(item => pathToRegexp(item).test(path))),
//     []
//   );

@observer
export default class SiderMenu extends React.Component {
  constructor(props) {
    super(props);
    //this.flatMenuKeys = getFlatMenuKeys(props.menuData);
    // this.state = {
    //   openKeys: this.getDefaultCollapsedSubMenus(props),
    // };

  }

  componentWillMount(){
    this.props.dataSource.currentPath = this.props.currentPath;
    this.props.dataSource.load();
  }

//   componentWillReceiveProps(nextProps) {
//     const { location } = this.props;
//     if (nextProps.location.pathname !== location.pathname) {
//       this.setState({
//         openKeys: this.getDefaultCollapsedSubMenus(nextProps),
//       });
//     }
//   }

  /**
   * Convert pathname to openKeys
   * /list/search/articles = > ['list','/list/search']
   * @param  props
   */
//   getDefaultCollapsedSubMenus(props) {
//     const {
//       location: { pathname },
//     } = props || this.props;
//     return getMenuMatchKeys(this.props.dataSource.flatMenuKeys, urlToList(pathname));
//   }

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  getMenuItemPath = item => {
    const itemPath = this.conversionPath(item.path);
    const icon = getIcon(item.icon);
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
        onClick={() => this.props.dataSource.goTo(itemPath)}
      >
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  handleLinkClick = (a) => {
    console.log(a)
  }

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
                  {getIcon(item.icon)}
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

  // Get the currently selected menu
//   getSelectedMenuKeys = () => {
//     const {
//       location: { pathname },
//     } = this.props;
//     return getMenuMatchKeys(this.props.dataSource.flatMenuKeys, urlToList(pathname));
//   };

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
    const { menuData } = this.props.dataSource;
    return menuData.some(item => key && (item.key === key || item.path === key));
  };

  handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    // this.setState({
    //   openKeys: moreThanOne ? [lastOpenKey] : [...openKeys],
    // });
    this.props.dataSource.setOpenKeys( moreThanOne? [lastOpenKey] : [...openKeys])
  };

  render() {
    const { logo, onCollapse } = this.props;
    const {menuData, isCollapsed, openKeys, selectedKeys} = this.props.dataSource;  
    // Don't show popup menu when it is been collapsed
    const menuProps = isCollapsed
      ? {}
      : {
          openKeys,
        };
    // if pathname can't match, use the nearest parent's key

    // if (!selectedKeys.length) {
    //   selectedKeys = [openKeys[openKeys.length - 1]];
    // }
    console.log(selectedKeys);
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        breakpoint="lg"
        onCollapse={onCollapse}
        width={256}
        className="sider"
      >
        <div className="logo-area" key="logo">
          <Link to="/">
            <img src={logo} alt="logo" />
            <h1>Ant Design Pro</h1>
          </Link>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(menuData)}
        </Menu>
      </Sider>
    );
  }
}
