import React from 'react';
import ReplaceRequirement from './ReplaceRequirement';
import Popup from '../Common/Popup';
import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 1
};

class ReplaceRequirementsPopup extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <Popup title='请选择合适的需求替换' onClosePopup={()=>{this.props.cancelReplaceRequirement()}}>
            <div className='requirement-list'>
                <Masonry
                    className={'my-gallery-class'} // default ''
                    options={masonryOptions} // default {}
                    disableImagesLoaded={false} // default false
                    updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                    {
                        this.props.replaceRequirement.requirements.map((r) => {
                            return <ReplaceRequirement key={r.requirementId}
                                requirement={r}
                                index={this.props.replaceRequirement.index}
                                requirementId={this.props.replaceRequirement.requirementId}
                                chainId={this.props.replaceRequirement.chainId}
                                replaceRequirementAction={this.props.replaceRequirementAction} />
                        })
                    }
                </Masonry>
            </div>
        </Popup>
    }
}

module.exports = ReplaceRequirementsPopup;