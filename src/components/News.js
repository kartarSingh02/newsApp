import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

  constructor(){
    super();
    console.log("this is constructor from new component");
    this.state={
      articles: [],
      loading:false,
      page:1
    }
  }

  async componentDidMount(){
    console.log("this is component did mount");
    let url ="https://newsapi.org/v2/top-headlines?country=in&apiKey=35749f66b1e144deb943d93c2198862e&page=1&pageSize=20"
    let data = await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
      articles:parsedData.articles,
      totalResults:parsedData.totalResults
      })
  }

  handlePrevClick = async () => {
    console.log("PREVIOUS")
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=35749f66b1e144deb943d93c2198862e&page=${this.state.page - 1}&pageSize=20`
    let data = await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page - 1,
      articles:parsedData.articles  
    })
  }

  handleNextClick = async () => {
    console.log("NEXT")
    if(this.state.page + 1 > Math.ceil(this.state.totalResults/20)){

    }
    else{
    let url =`https://newsapi.org/v2/top-headlines?country=in&apiKey=35749f66b1e144deb943d93c2198862e&page=${this.state.page + 1}&pageSize=20`
    let data = await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
      page:this.state.page + 1,
      articles:parsedData.articles  
    })
    }
  }

  render() {
    return (
      <div className="container my-3">
        <h1>NewsDekho - Top Headlines</h1>
          <div className='row'>
          {/* here we are using the map its kind of iterator which iterates through each items */}
          {/* just a random comment to check whether mail got change on git or not */}
            {this.state.articles.map((element)=>{
                return  <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
      </div>
    )
  }
}

export default News
