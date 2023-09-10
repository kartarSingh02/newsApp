import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
        <div style={{display:"flex",position:"absolute",right:'0',justifyContent:'flex-end'}}>
        <span className="badge rounded-pill bg-danger">{source}</span>
        </div>
          <img src={!imageUrl?"https://www.livemint.com/lm-img/img/2023/08/31/600x338/parliament_1693474263743_1693474270468.jpg":imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-body-secondary">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>  
      </div>
    )
  }
}

export default NewsItem
