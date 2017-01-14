import React from 'react';
import {Link} from 'react-router';
import Label from './Label';
import EmailVerfication from './EmailVerfication';
import Dropdown from './Dropdown';
import moment from 'moment';

class ViewEnterprise extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.userInfo.roles.filter((r) => { return r === 'Admin' }).length == 0 &&
        this.props.componentRendered && this.props.componentRendered();
    }

    render() {
        let returnButton = null;
        if (this.props.userInfo.roles.filter((r) => { return r === 'Admin' }).length > 0) {
            returnButton = <div className='back-to'><Link to="/authEnterprise" className='btn'>返回</Link></div>
        }

        let list = [];
        let {enterpriseInfo} = this.props;
        if (enterpriseInfo) {
            for (var key in enterpriseInfo) {
                let info = enterpriseInfo[key];
                if (info.type === 'date') {
                    info.value = moment(info.value).format('YYYY-MM-DD');
                } else if (info.type === 'select' && info.value !== null && info.value !== undefined) {
                    var selected = info.options.filter((o) => { return o.value === info.value });
                    if(selected.lenght>0){
                        info.value = selected[0].label;
                    }
                }
                list.push(<Label key={info.key} info={info} />);
            }
        }
        return <div className="view-enterprise-container">
            {returnButton}
            {list}
        </div>
    }
}

module.exports = ViewEnterprise;