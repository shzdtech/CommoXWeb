import defaultSorters from '../../Models/Sorters';
import {UPDATE_REQUIREMENT_SORTER} from '../../Constants/ActionTypes';


export default (state = defaultSorters, action) => {
    switch (action.type) {
        case UPDATE_REQUIREMENT_SORTER:{
            return state.map((s)=>{
                 if(action.sortKey === s.key){
                     if(s.sortOrder === 'desc'){
                         return Object.assign({}, s, {sortOrder: 'asc'});
                     }else{
                         return Object.assign({}, s, {sortOrder: 'desc'});
                     }
                 }else{
                     return Object.assign({}, s, {sortOrder: null});
                 }
            });     
        }
        default:
            return state;
    }
}