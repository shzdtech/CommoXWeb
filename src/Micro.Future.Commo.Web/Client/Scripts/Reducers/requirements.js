import {ADD_REQUIREMENT} from '../Constants/ActionTypes';
import FilterProperty from '../Models/FilterProperty';
import {HOST} from '../appSettings';

const requirements = (state = [], action) => {
    switch (action.type) {
        case ADD_REQUIREMENT: {
            let requirement = {};
            requirement.rules = [];
            action.selectedFilters.forEach((f) => {
                let values = f.selectedItems.map((item) => { return item.value });
                if (f.filterProperty === FilterProperty.Requirement) {
                    requirement[f.key] = values.join(',');
                } else if (f.filterProperty === FilterProperty.Rule) {
                    requirement.rules.push({
                        ruleType: f.ruleType,
                        key: f.title,
                        value: values.join(','),
                        operationType: 2
                    });
                }
            });

            $.post(HOST + 'api/Requirement', requirement);
            return action.selectedFilters
        }
        default:
            return state;
    }
}

export default requirements;