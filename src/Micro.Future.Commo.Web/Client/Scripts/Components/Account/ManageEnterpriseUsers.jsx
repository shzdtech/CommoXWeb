import React from 'react';

class ManageEnterpriseUsers extends React.Component {

    constructor() {
        super();
    }

    componentDidMount() {
        this.props.getEnterpriseUser();
    }

    render() {

        let rows = this.props.enterpriseUsers.map((u)=>{
            return <tr key={u.userId}>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td><span className='btn' onClick={() => this.props.onDeleteEnterpriseUser(u.userId) }>删除</span></td>
            </tr>
        });

        return <div className='enterprise-users-container'>
            <table>
                <thead>
                    <tr>
                        <td>
                            用户名
                        </td>
                        <td>
                            用户邮箱
                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    }
}

module.exports = ManageEnterpriseUsers;