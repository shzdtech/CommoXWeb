import React from 'react';

class Toastr extends React.Component {
    constructor() {
        super();
    }

    componentDidMount(){
        const {options, hideToastr} = this.props;

        if(options.autoClose){
            setTimeout(()=>{
                hideToastr();
            }, options.duation);
        }
    }

    render() {
        const {options, hideToastr} = this.props;
        if (this.props.options.show) {
            return <div className='toast-container'>          
                <div className={'toast ' + options.toastType} onClick={hideToastr}>
                 <span className="toast-close-button" role="button" onClick={hideToastr}>×</span>
                    {options.message}
                </div>
            </div>
        }
        return null;
    }
}

module.exports = Toastr;