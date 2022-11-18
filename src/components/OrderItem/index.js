import React, { Component } from 'react';
import './style.css';

class OrderItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            stars: props.data.stars || 0,
            comment: props.data.comment || "",
        }
    }
    handleOpenEditArea = () => {
        this.setState({
            editing: true
        })
    }
    handleCommentChange = (e) => {
        this.setState({
            comment: e.target.value
        })
    }
    handleClickStars = (stars) => {
        this.setState({
            stars
        })
    }
    handleCancelComment = () => {
        this.setState({
            editing: false,
            stars: this.props.data.stars || 0,
            comment: this.props.data.comment || "",
        })
    }
    handleSubmitComment = () => {
        this.setState({
            editing: false
        })
        const { id } = this.props.data;
        const { comment, stars } = this.state;
        this.props.onSubmit(id, comment, stars)
    }

    renderEditArea() {
        return (
            <div className='orderItem__commentContainer'>
                <textarea value={this.state.comment} onChange={this.handleCommentChange} className='orderItem__comment'></textarea>
                {this.renderStars()}
                <button onClick={this.handleSubmitComment} className='orderItem__btn orderItem__btn--red'>提交</button>
                <button onClick={this.handleCancelComment} className='orderItem__btn orderItem__btn--grey'>取消</button>
            </div>
        )
    }

    renderStars() {
        const { stars } = this.state
        return (
            <div>
                {
                    [1, 2, 3, 4, 5].map((item, index) => {
                        const lightClass = stars >= item ? "orderItem__star--light" : ""
                        return (
                            <span className={"orderItem__star " + lightClass}
                                key={index}
                                onClick={this.handleClickStars.bind(this, item)}>★</span>
                        )
                    })
                }
            </div>
        )
    }
    render() {
        const { shop, product, price, picture, ifCommented } = this.props.data;
        return (
            <div className='orderItem'>
                <div className='orderItem__picContainer'>
                    <img className='orderItem__pic' src={picture} alt='' />
                </div>
                <div className='orderItem__content'>
                    <div className='orderItem__product'>{product}</div>
                    <div className='orderItem__shop'>{shop}</div>
                    <div className='orderItem__detail'>
                        <div className='orderItem__price'>{price}</div>
                        <div>
                            {ifCommented ? (
                                <button className='orderItem__btn orderItem__btn--grey'>已评价</button>
                            ) : (

                                <button onClick={this.handleOpenEditArea} className='orderItem__btn orderItem__btn--red'>评价</button>
                            )}

                        </div>
                    </div>
                </div>
                {this.state.editing ? this.renderEditArea() : null}
            </div>
        );
    }



}

export default OrderItem;