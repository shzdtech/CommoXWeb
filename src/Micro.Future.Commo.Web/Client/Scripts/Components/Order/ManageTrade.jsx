import React from 'react';

class ManageTrade extends React.Component {
    constructor() {
        super();
        this.getRow = this.getRow.bind(this);
    }

    componentDidMount() {
        if (this.props.getAllTrades) {
            this.props.getAllTrades();
        }
    }

    render() {
        const {trades} = this.props;
        let header = <div className='enterprise-list-header'>
            <div className='column'>企业名称</div>
            <div className='column'>企业邮箱</div>
            <div className='column'>法人代表</div>
            <div className='column'>联系人</div>
            <div className='column'>联系方式</div>
            <div className='column'>审批</div>
        </div>

        let contents = orders.map((e) => {
            return this.getRow(e);
        });

        return <div className='enterprise-table'>
            {header}
            {contents}
        </div>
    }

    getRow(enterprise) {
        const {authenticateEnterprise} = this.props;
        return <div key={enterprise.enterpriseId}>
            <div className='column'>{enterprise.name}</div>
            <div className='column'>{enterprise.emailAddress}</div>
            <div className='column'>{enterprise.legalRepresentative}</div>
            <div className='column'>{enterprise.contracts}</div>
            <div className='column'>{enterprise.mobilePhone}</div>
            <div className='column'>
                <span className='btn' onClick={()=>authenticateEnterprise(enterprise.enterpriseId, 2) }>通过</span>
                <span className='btn calloff' onClick={()=>authenticateEnterprise(enterprise.enterpriseId, 3) }>拒绝</span>
            </div>
        </div>
    }
}

module.exports = ManageTrade;