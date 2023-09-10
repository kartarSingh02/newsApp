import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country:"in",
    pageSize:10,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  captializeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 

  constructor(props){
    super(props);
    console.log("this is constructor from new component");
    this.state={
      articles: [],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title = `${this.captializeFirstLetter(this.props.category)} - NewsDekho`;
  }

  async updateNews(){
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=35749f66b1e144deb943d93c2198862e&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading:true})
    let data = await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
      // accesing the articles property from parsed Data
      articles:parsedData.articles,
      totalResults:parsedData.totalResults,
      loading:false
      })
  }

  async componentDidMount(){
    console.log("this is component did mount");
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=35749f66b1e144deb943d93c2198862e&page=1&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles:parsedData.articles,
    //   totalResults:parsedData.totalResults,
    //   loading:false
    //   })
    this.updateNews();
  }

  handlePrevClick = async () => {
    console.log("PREVIOUS")
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=35749f66b1e144deb943d93c2198862e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page - 1,
    //   articles:parsedData.articles,  
    //   loading:false
    // })
    this.setState({page:this.state.page - 1});
    this.updateNews();
  }

  handleNextClick = async () => {
    console.log("NEXT")
    // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
    // let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=35749f66b1e144deb943d93c2198862e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url);
    // let parsedData=await data.json();
    // console.log(parsedData);
    // this.setState({
    //   page:this.state.page + 1,
    //   articles:parsedData.articles,
    //   loading:false  
    // })
    // }
    this.setState({page:this.state.page + 1});
    this.updateNews();
  }

   fetchMoreData = async() => {
    this.setState({page: this.state.page + 1 });
    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=35749f66b1e144deb943d93c2198862e&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    this.setState({
      // accesing the articles property from parsed Data
      articles:this.state.articles.concat(parsedData.articles),
      totalResults:parsedData.totalResults,
      loading:false
      });
  };

  render() {
    return (
      <>
        <h1 className='text-center' style={{margin:'30px 0'}}>NewsDekho - Top {this.captializeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        {/* adding infinite scroll */}
         <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          // loader={this.state.loading && <Spinner/>}
        >
        <div className="container">
          <div className='row'>
          {/* here we are using the map its kind of iterator which iterates through each items */}
          {/* just a random comment to check whether mail got change on git or not */}
            {this.state.articles.map((element)=>{
                return  <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}
          </div>
        </div>
        </InfiniteScroll>

          {/* this is for pagination */}
          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
  }
}

export default News
