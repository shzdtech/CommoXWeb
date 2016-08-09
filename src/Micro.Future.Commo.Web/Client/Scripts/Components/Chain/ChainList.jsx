import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Chain from './Chain';
import {receiveChainList, fetchChains} from '../../Actions';
import {SIGNALR_ADDRESS} from '../../appSettings';

class ChainList extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div>
            {
                this.props.chains.map((chain) => {
                    return <Chain key={chain.chainId} chain={chain} />;
                })
            }
        </div>;
    }

    componentWillMount() {
        this.props.fetchChains();
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

const mapStateToProps = (state, ownProps) => {
    return {
        chains: state.chains
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onReceiveChainList: (chainList) => dispatch(receiveChainList(chainList)),
        fetchChains: () => {
            dispatch(fetchChains());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChainList);