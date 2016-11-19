import React from 'react';

class ContactSideBar extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="contact-side-bar">
            <div className='contact-title' onClick={this.toggleContact.bind(this) }>点击咨询</div>
            <ul>
                <li>
                    <a className='basis' href="http://wpa.qq.com/msgrd?v=3&uin=3545857091&site=qq&menu=yes" target="_blank">
                        <span className='glyphicon glyphicon-question-sign'></span>
                        <span>基差咨询</span>
                    </a>
                </li>
                <li>
                    <a className='finance' href="http://wpa.qq.com/msgrd?v=3&uin=2983743472&site=qq&menu=yes" title="理财咨询" target="_blank">
                        <span className='glyphicon glyphicon-usd'></span>
                        <span>理财咨询</span>
                    </a>
                </li>
                <li>
                    <a className='acceptance' href="http://wpa.qq.com/msgrd?v=3&uin=3545552801&site=qq&menu=yes" title="银承咨询" target="_blank">
                        <span className='glyphicon glyphicon-usd'></span>
                        <span>银承咨询</span>
                    </a>
                </li>
            </ul>
        </div>
    }

    toggleContact() {
        $('.contact-side-bar').toggleClass('open');
    }
}

module.exports = ContactSideBar;