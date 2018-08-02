import React from 'react';

export default class UserView extends React.PureComponent {
    render(){
        let h = this.props.history
        console.log(h)
        return (
            <div>this is user view</div>
        )
    }
}