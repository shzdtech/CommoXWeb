import React, {PropTypes} from 'react';
import Chain from './Chain';
import {receiveChainList, confirmChain} from '../../Actions';
import {SIGNALR_ADDRESS} from '../../appSettings';

class ChainList extends React.Component {
    constructor() {
        super();
    }

    render() {
        let {chains, confirmChain, manageChain} = this.props;
        return <div className='chain-list'>
            {chains && chains.length > 0 ? <div className='title'>匹配详情：</div> : null}
            {
                chains.map((chain) => {
                    return <Chain key={chain.chainId} chain={chain} confirmChain={confirmChain} manageChain={manageChain}/>;
                })
            }
        </div>;
    }

    componentDidMount() {
        var connection = $.hubConnection(SIGNALR_ADDRESS, { useDefaultPath: false });
        var chainHub = connection.createHubProxy('chainHub');

        connection.logging = true;
        console.log("connection.hub.start");
        connection.start().done(function () {
            console.log("start done");
            chainHub.invoke('callOnChainChanged');
        }).fail(function (error) { console.log('Could not Connect!'); });
        chainHub.on('onRequirementChainChanged', (requimentInfoList) => {
            this.props.onReceiveChainList(requimentInfoList);
            console.log(requimentInfoList);
        });

    }

}

module.exports = ChainList;