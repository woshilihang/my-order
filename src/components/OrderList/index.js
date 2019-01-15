import React, { Component } from 'react'
import OrderItem from '../OrderItem/index'
import { comment } from 'postcss-selector-parser';



class OrderList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    fetch('/mock/orders.json').then(res => {
      console.log(res);
      if (res.ok) {
        res.json().then(data => {
          this.setState({
            data
          })
        })
      }
    })
  }

  handleSubmit  = (id, comment, stars) => {
    /**
     * fetch('/saveComment').then((res) => {})
     */
    
    // 保存到服务器数据库之后然后才对state进行修改
    const newData = this.state.data.map(item => {
      return item.id === id ? {
        ...item, comment, stars, ifCommented: true
      } : item;
    });
    this.setState({
      data: newData
    })
  }

  render() {
    return (
      <div>
        {
          this.state.data.map(item => {
            return (
              <OrderItem key={item.id} data={item} onSubmit={this.handleSubmit} />
            )
          })
        }
      </div>
    )
  }
}

export default OrderList;