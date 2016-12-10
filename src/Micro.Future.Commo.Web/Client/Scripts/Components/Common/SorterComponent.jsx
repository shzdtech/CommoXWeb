import React from 'React';

class SorterComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className='sorter-container'>
            <span>排序</span>
            <ul>
                {
                    this.props.sorters.map((s) => {
                       return <li key={s.id} onClick={()=>this.props.sort(s.key)}>
                            <a className={'sorter ' + (s.sortOrder ? 'active' : '')}>
                                {s.name}
                                {s.sortOrder ? <span className={'glyphicon ' + (s.sortOrder === 'asc' ?  'glyphicon-arrow-up' : 'glyphicon-arrow-down')}></span> : null}
                            </a>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}

module.exports = SorterComponent;