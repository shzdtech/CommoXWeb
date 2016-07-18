import React from 'react'; 

const Filter = React.createClass({
  render: function(){
    let items =  this.props.items.map(function(item) {
                return <li key={item.id}>
                    <a>
                        <span>{item.name}</span>
                    </a>
                </li>;
            });
    let rightSelector = null,
        operators = null;
    if(this.props.multipleSelection){
        rightSelector = <div className='right-selector'>
            <span className="multiply">多选</span>
            <span className="togglebtn more">更多</span>
            <span className="togglebtn retract">收起</span>
        </div>;
        operators = <div className='operator-btn'>
            <span className="multiply-submit">提交</span>
            <span className="calloff">取消</span>
        </div>;
    }

     return <li className='filter-category'>
        <span className='title'>{this.props.title + ':'}</span>
        <ul className='items'>
           {items}
        </ul>
        {rightSelector}
        {operators}
    </li>;
  }
});

module.exports = Filter;