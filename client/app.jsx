import React from 'react';
import { ajax } from 'jquery';
import styled from 'styled-components';
import Reviews from './components/Reviews.jsx';
import StaticRating from './components/StaticRating.jsx';
import StaticVote from './components/StaticVote.jsx';
import Search from './components/Search.jsx';


const Body = styled.div`
font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif;
float: right;
`;

const Container = styled.ul`
display: grid;
grid-template-rows: 49% 2% 49%;
width: 594px;
height: 275px;

border-style: solid;
border-width: 1px;
border-radius: 12px;
border-color: rgb(228, 231, 231);
margin-left: 0px;
`;

const ReviewsHeader = styled.h3`
display: flex;
`;

const HorLine = styled.div`
width: 544px;
border-bottom: 1px solid rgb(228, 231, 231);
`;

const VerLine = styled.div`
height: 15px;
border-left: 1px solid rgb(228, 231, 231);
margin-right: 15px;
margin-top: 5px;
`;

const FlexSpan = styled.span`
display: flex;
flex-direction: row;
margin-right: 15px;
`;

const STAR = styled.div`
color: rgb(0, 166, 153);
font-size: 15px;
margin-top: 2px;
margin-right: 3px;
`;

const FlexRow = styled.div`
display: flex;
flex-direction: row;
`;

class ReviewsModule extends React.Component {
  constructor(props) {
    super(props);
    this.reviews = React.createRef();
    this.state = {
      data: [],
      searchBool: false,
    };
  }

  componentDidMount() {
    this.renderView();
  }

  handleSearchChange(e) {
    e.preventDefault();
    const inValid = /^\s+$/;
    const k = inValid.test(e.target[0].value);
    if (!this.state.searchBool && (e.target[0].value.length > 0) && (!k)) {
      window.scroll({ top: 1440, left: 0, behavior: 'smooth' });
      const originalList = this.state.data.slice();
      const newList = this.state.data.filter(data => data.body.toLowerCase().includes(e.target[0].value.toLowerCase()));
      const searchBool = this.state.searchBool;
      this.setState({
        originalList,
        data: newList,
        searchBool: !searchBool,
        searchVal: e.target[0].value,
      });
      e.target[0].value = '';
    }
  }

  handleBackToOriginalList() {
    this.reviews.current.resetSerPageNum();
    if (this.state.searchBool) {
      const originalList = this.state.originalList;
      const searchBool = this.state.searchBool;
      this.setState({
        data: originalList,
        searchBool: !searchBool,
        searchVal: '',
      });
    }
  }

  renderView() {
    let url = 'http://localhost:3004/api/reviews';
    // let url = 'http://52.52.189.97/api/reviews';
    if (window.location.pathname.length > 1) {
      url += window.location.pathname;
    }
    ajax({
      url,
      method: 'GET',
      success: (data) => {
        const result = data[0];
        const length = result.length;

        // rating, cleanliness, communication, checkin, accuracy, location, value
        let ratings = [0, 0, 0, 0, 0, 0, 0];
        // spaCle, quiRes, stySpa, outHos, amaAme
        let hearts = [0, 0, 0, 0, 0];

        for (let i = 0; i < length; i += 1) {
          ratings[0] += result[i].rating;
          ratings[1] += result[i].cleanliness;
          ratings[2] += result[i].communication;
          ratings[3] += result[i].checkin;
          ratings[4] += result[i].accuracy;
          ratings[5] += result[i].location;
          ratings[6] += result[i].value;
          if (result[i].spaCle === 1) {
            hearts[0] += 1;
          }
          if (result[i].quiRes === 1) {
            hearts[1] += 1;
          }
          if (result[i].stySpa === 1) {
            hearts[2] += 1;
          }
          if (result[i].outHos === 1) {
            hearts[3] += 1;
          }
          if (result[i].amaAme === 1) {
            hearts[4] += 1;
          }
        }

        this.setState({
          data: data[0],
          staticData: {
            ratings: ratings.map((x, i) => {
              if (i === 0) {
                return (x / length).toFixed(2);
              }
              return (x / length).toFixed(1);
            }),
            hearts,
          },
        });
      },
    });
  }

  render() {
    if (!this.state.staticData) {
      return (
        <div> </div>
      );
    }
    if (this.state.staticData) {
      return (
        <Body>
          <h2>Reviews</h2>

          <ReviewsHeader>
            <FlexSpan>
              <FlexRow>
                <STAR>&#9733;</STAR>
                {this.state.staticData.ratings[0]} 
              </FlexRow>
            </FlexSpan>
            <VerLine />
            <div>{this.state.searchBool ? this.state.originalList.length : this.state.data.length} reviews</div>
          </ReviewsHeader>

          {this.state.searchBool ? (<div />) : (
            <Container>
              <StaticRating staticData={this.state.staticData} />
              <HorLine />
              <StaticVote staticData={this.state.staticData} />
            </Container>
          )}

          <Search state={this.state} handleSearchChange={this.handleSearchChange.bind(this)} handleBackToOriginalList={this.handleBackToOriginalList.bind(this)}/>

          <Reviews ref={this.reviews} searchBool={this.state.searchBool} data={this.state.data} staticData={this.state.staticData}/>
        </Body>
      );
    }
  }
}

export default ReviewsModule;
