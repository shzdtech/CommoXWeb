import React from 'react';
import FilterList from './FilterList';
import Requirements from './Requirement/Requirements';

class Home extends React.Component {
    constructor() {
        super();
        this.searchByFilter = this.searchByFilter.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selectedFilters.length !== this.props.selectedFilters.length) {
            this.searchByFilter();
        }
    }

    render() {
        return <div>
            <FilterList />
            <Requirements {...this.props} fetchRequirements={this.searchByFilter}/>
        </div>;
    }

    searchByFilter() {
        let searchCriteria = {
            pageNo: this.props.pageNo,
            pageSize: this.props.pageSize
        };
        this.props.selectedFilters.forEach((f) => {
            if (f.key === 'tradeAmount') {
                searchCriteria['startTradeAmount'] = parseFloat(f.selectedItems[0].value) * 0.8;
                searchCriteria['endTradeAmount'] = parseFloat(f.selectedItems[0].value) * 1.2;
            } else {
                searchCriteria[f.key] = f.selectedItems[0].value;
            }
        })
        this.props.searchByFilter(searchCriteria);
    }
}

module.exports = Home;