import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import Masonry from 'react-masonry-component';
import FilterList from '../FilterList';
import Requirement from '../Common/Requirement';
import SorterComponent from '../Common/SorterComponent';

const masonryOptions = {
    transitionDuration: 1
};

class Requirements extends React.Component {

    constructor(props) {
        super(props);
        this.getRequirement = this.getRequirement.bind(this);
    }

    componentWillMount() {
        this.searchByFilter();
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.filters.filter((f) => { return f.selected }).length !== this.props.filters.filter((f) => { return f.selected }).length) {
            this.searchByFilter();
        }else if(prevProps.sorters !== this.props.sorters){
             this.searchByFilter();
        }
    }

    searchByFilter() {
        let searchCriteria = {
            pageNo: this.props.pageNo,
            pageSize: this.props.pageSize
        };
        this.props.filters.forEach((f) => {
            if (f.selected) {
                if (f.key === 'tradeAmount') {
                    searchCriteria['startTradeAmount'] = parseFloat(f.selectedItems[0].value) * 0.8;
                    searchCriteria['endTradeAmount'] = parseFloat(f.selectedItems[0].value) * 1.2;
                } else {
                    let values = f.selectedItems.map((i) => { return i.value; });
                    searchCriteria[f.key] = values.join(',');
                }
            }
        })

        this.props.sorters.map((s)=>{
            if(s.sortOrder){
                searchCriteria.orderByField = s.key;
                searchCriteria.orderBy = s.sortOrder
            }
        });

        this.props.searchByFilter(searchCriteria);
    }

    render() {
        const {requirements, isDemo, filters, sorters} = this.props;
        return <div className='requirement-list'>
            <FilterList filters={filters} />
            <SorterComponent sorters={sorters} sort={(key) => this.props.sortRequirement(key)} />
            <Masonry
                className={'my-gallery-class'} // default ''
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                >
                {
                    requirements.map((requirement) => {
                        return this.getRequirement(requirement);
                    }) }
            </Masonry>
            <div className='clearfix'></div>
        </div>;
    }

    getRequirement(requirement) {
        if (!requirement) {
            return;
        }

        let operators = null;
        if (this.props.isDemo) {
            operators = null
        } else {
            if (requirement.state === 0) {
                operators = <span className='no-action'>匹配中，请等候...</span>
            } else {
                operators = <Link to={'/requirement/' + requirement.requirementId + '/chains'} className='btn' onClick={() => this.props.fetchChains(requirement.requirementId) }>查看匹配详情</Link>;
            }
        }

        return <Requirement requirement={requirement} key={requirement.requirementId} deleteRequirement={this.props.deleteRequirement} updateExpandState={this.props.updateExpandState}>{operators}</Requirement>
    }
}

module.exports = Requirements;