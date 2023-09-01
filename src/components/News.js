import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  render() {
    return (
      <div className="container my-3">
        <h2>NewsDekho - Top Headlines</h2>
          <div className='row'>
            <div className='col-md-4'>
              <NewsItem title="news1" description="abhi check kr rhe bs nhi denge news koi"/>
            </div>
            <div className='col-md-4'>
              <NewsItem title="news1" description="abhi check kr rhe bs nhi denge news koi"/>
            </div>
            <div className='col-md-4'>
              <NewsItem title="news1" description="abhi check kr rhe bs nhi denge news koi"/>
            </div>
          </div>
      </div>
    )
  }
}

export default News
