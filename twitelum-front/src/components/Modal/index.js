import React, { Component } from 'react'
import PropType from 'prop-types'
import './modal.css'

class Modal extends Component {
    static propTypes = {
        isAberto: PropType.bool,
        fechaModal: PropType.func.isRequired
    }
    render() {
        return (
            <div className={`modal ${this.props.isAberto? 'modal--active': ''}`}
                onClick={this.props.fechaModal}>
                {
                    this.props.isAberto?
                    <div className="modal__wrap">
                         { this.props.children }
                    </div>
                    :''
                }
            </div>
        )
    }
}

export default Modal