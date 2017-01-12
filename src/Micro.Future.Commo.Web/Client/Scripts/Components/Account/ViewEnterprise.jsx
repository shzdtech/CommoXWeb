import React from 'react';
import Label from './Label';
import EmailVerfication from './EmailVerfication';
import Dropdown from './Dropdown';
import moment from 'moment';

class ViewEnterprise extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.componentRendered && this.props.componentRendered();
    }

    render() {
        let list = [];
        let {enterpriseInfo} = this.props;
        if (enterpriseInfo) {
            for (var key in enterpriseInfo) {
                let info = enterpriseInfo[key];
                if (info.type === 'date') {
                    info.value = moment(info.value).format('YYYY-MM-DD');
                } else if (info.type === 'select' && info.value !== null && info.value !== undefined) {
                    info.value = info.options.filter((o) => { return o.value === info.value })[0].label;
                }
                list.push(<Label key={info.key} info={info} />);
            }
        }
        return <div>
            {list}
        </div>
    }
}

module.exports = ViewEnterprise;