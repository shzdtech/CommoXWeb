import React from 'react';
import FormItem from '../Form/FormItem';
import Trade from './Trade';

class ManageTrade extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        let selectedItem = this.props.formItem.items.filter((i)=>{
            return i.selected;
        });
        this.props.onFormItemSelected(this.props.formItem, selectedItem.length > 0 ? selectedItem[0] : this.props.formItem.items[0]);
    }

    render() {
        let {formItem, trades, onFormItemSelected, updateToNextState} = this.props;

        return <div className='trade-list-manager-container'>
            <FormItem formItem={formItem} onFormItemSelected={onFormItemSelected} />
            <div className='trade-list-container'>
               {
                trades.map((t)=>{
                       return <Trade key={t.tradeId} trade={t} updateToNextState={updateToNextState} isMine={formItem.isMine}/>
                   })
               }
            </div>
        </div>
    }
}

module.exports = ManageTrade;