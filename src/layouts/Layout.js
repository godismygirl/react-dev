import React from 'react';
import './index.less';

const Layout = (props) => {
    return <div className="layout">{props.children}</div>
}

Layout.Header = (props) => {
    return <div className="layout-header">{props.children}</div>
}

Layout.Sider = (props) => {
    return <div className="layout-sider">{props.children}</div>
}

Layout.Content = (props) => {
    return <div className="layout-content">{props.children}</div>
}

export default Layout;