import React from 'react';

class Toastr extends React.Component {
    constructor() {
        super();
        this.autoHideToastr = this.autoHideToastr.bind(this);
    }

    componentDidMount() {
        this.autoHideToastr();
    }

    componentDidUpdate(prevProps, prevState) {
        this.autoHideToastr();
    }

    autoHideToastr() {
        const {options, hideToastr} = this.props;

        if (options.autoClose && options.show) {
            setTimeout(() => {
                hideToastr();
            }, options.duration);
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