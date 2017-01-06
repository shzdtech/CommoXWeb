import React from 'react';
import ReplaceRequirement from './ReplaceRequirement';
import FilterList from '../FilterList';
import Popup from '../Common/Popup';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 1
};

class SelectRequirementsPopup extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {filters} = this.props;
        return <Popup title='请选择需求' onClosePopup={()=>{this.props.cancelSelectRequirement()}}>
            <div className='requirement-list'>
                <FilterList filters={filters} />
                <Masonry
                    className={'my-gallery-class'} // default ''
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                    {
                        this.props.selectRequirement.requirements.map((r) => {
                            return <ReplaceRequirement key={r.requirementId}
                                requirement={r}
                                index={this.props.selectRequirement.index}
                                requirementId={this.props.selectRequirement.requirementId}
                                actionName="选择需求"
                                replaceRequirementAction={this.props.selectRequirementAction} />
                        })
                    }
                </Masonry>
            </div>
        </Popup>
    }
}

module.exports = SelectRequirementsPopup;