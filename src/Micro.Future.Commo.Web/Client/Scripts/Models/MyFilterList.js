import {TEXT} from '../Constants/FilterTypes';
import RequirementType from './RequirementType';
import FilterProperty from './FilterProperty';
import products from './Products';

export default [{
    id: 1001,
    title: '匹配状态',
    key: 'requirementState',
    filterProperty: FilterProperty.Requirement,
    items: [{
        id: 0,
        name: '未匹配',
        value: 0
    }, {
            id: 1,
            name: '已匹配',
            value: 1
        }, {
            id: 2,
            name: '已确认',
            value: 2
        }],
    multipleSelection: false
}, {
        id: 1002,
        title: '订单属性',
        key: 'requirementType',
        filterProperty: FilterProperty.Requirement,
        items: [{
            id: 1,
            name: '采购',
            value: RequirementType.Buy
        }, {
                id: 2,
                name: '销售',
                value: RequirementType.Sell
            }, {
                id: 3,
                name: '购销',
                value: RequirementType.Subsidy
            }]
    },
    {
        id: 1003,
        title: '货物名称',
        filterProperty: FilterProperty.Requirement,
        key: 'productName',
        items: products
    }
];
