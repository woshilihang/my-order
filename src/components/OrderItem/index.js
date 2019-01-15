import React, { Component } from 'react'
import './style.css'

class OrderItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stars: props.data.stars || 0,
      editing: false,
      comment: props.data.comment || ''
    }
  }

  render() {
    const {shop, product, price, picture, ifCommented} = this.props.data;
    return (
      <div className="orderItem">
      {/* BEM命名方式 B代表快信心，哪个层级之下，picConatiner代表element */}
        <div className="orderItem__picContainer">
          <img alt="" className="orderItem__pic" src = {picture} />
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="orderItem__shop">{shop}</div>
          <div className="orderItem__detail">
            <div className="orderItem_price">{price}</div>
            <div>
              {
                ifCommented ? (
                  <button className="orderItem__btn orderItem__btn--grey">已评价</button>
                ) : (
                  <button className="orderItem__btn orderItem__btn--red" onClick={this.handleOpenEditArea.bind(this)}>评价</button>
                )
              }
            </div>
          </div>
        </div>
        {this.state.editing ? this.renderEditArea() : null}
      </div>
    )
  }
  renderEditArea() {
    return (
      <div className="orderItem_commentContainer">
        <textarea onChange={this.handleCommentChange}  value={this.state.comment} className="orderItem_comment"></textarea>
        {this.renderStars()}
        <button  className="orderItem__btn orderItem___btn--red" onClick={this.handleSubmitComment}>提交</button>
        <button className="orderItem__btn orderItem__btn--grey" onClick={this.handleCancelComment.bind(this)}>取消</button>
      </div>
    )
  }

  // 提评论响应事件函数
  handleSubmitComment = () => {
    const { id } = this.props.data;
    const { comment, stars } = this.state;
    this.setState({
      editing: false
    })
    this.props.onSubmit(id, comment, stars);
  }

  handleOpenEditArea() {
    // console.log(this)
    this.setState({
      editing: true
    })
  }

  handleCommentChange(event) {
    this.setState({
      comment: event.target.value
    })
  }

  handleStars(stars) {
    console.log(stars);
    this.setState({
      stars: stars
    })
  }

  // 取消评论操作
  handleCancelComment() {
    this.setState({
      editing: false,
      comment: this.props.data.comment ||  '',
      stars: this.props.data.stars || 0
    })
  }


  renderStars() {
    const { stars } = this.state
    return (
      <div>
        {
          [1,2,3,4,5].map((item, index) => {
            const lightClass = stars > item-1 ? "orderItem__star--light" : ""
            return (
              <span key={index} className={"orderItem__star "+lightClass} onClick={this.handleStars.bind(this, item)}>★</span>
            )
          })
        }
      </div>
    )
  }
}


export default OrderItem;