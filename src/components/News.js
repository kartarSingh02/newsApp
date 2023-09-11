import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  // document.title = `${this.captializeFirstLetter(props.category)} - NewsDekho`;

  const captializeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } 

  const updateNews = async()=> {
    props.setProgress(10);
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    // this.setState({loading:true})
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData=await data.json();
    props.setProgress(70);
    console.log(parsedData);

    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])
  

  // const handlePrevClick = async () => {
  //   console.log("PREVIOUS")
  //   setPage(page-1);
  //   updateNews();
  // }

  // const handleNextClick = async () => {
  //   console.log("NEXT")
  //   // this.setState({page:this.state.page + 1});
  //   setPage(page+1);
  //   updateNews();
  // }

  const fetchMoreData = async() => {
    // this.setState({page: this.state.page + 1 });
    setPage(page+1);
    const url =`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    let data = await fetch(url);
    let parsedData=await data.json();
    console.log(parsedData);
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <>
        <h1 className='text-center' style={{margin:'30px 0'}}>NewsDekho - Top {captializeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner/>}

        {/* adding infinite scroll */}
         <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          // loader={state.loading && <Spinner/>}
        >
        <div className="container">
          <div className='row'>
          {/* here we are using the map its kind of iterator which iterates through each items */}
          {/* just a random comment to check whether mail got change on git or not */}
            {articles.map((element)=>{
                return  <div className='col-md-4' key={element.url}>
              <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
            })}
          </div>
        </div>
        </InfiniteScroll>

          {/* this is for pagination */}
          {/* <div className="container d-flex justify-content-between">
            <button disabled={state.page<=1} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
            <button disabled={state.page + 1 > Math.ceil(state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
          </div> */}
      </>
    )
}

  News.defaultProps = {
    country:"in",
    pageSize:10,
    category: "general"
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

export default News
