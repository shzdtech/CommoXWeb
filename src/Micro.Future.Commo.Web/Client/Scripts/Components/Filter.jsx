import React from 'react'; 

const Filter = React.createClass({
  render: function(){
    var items =  this.props.items.map(function(item) {
                return <li key={item.id}>
                    <a>
                        <span>{item.name}</span>
                    </a>
                </li>
            }); 
     return <li>
        <span>{this.props.title}</span>
        <ul>
           {items}
        </ul>
    </li>;
  }
});

module.exports = Filter;