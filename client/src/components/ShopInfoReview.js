import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  height: auto;
  justify-content: space-between;
`
const ContentDiv = styled.div`
  font-size: 16px;
`
const DateDiv = styled.div`
  font-size: 13px;
  color: #B8B8B8;
  margin-bottom: 10px;
`
const ScoreDiv = styled.div`
font-weight: bold;
`
const StarDiv = styled.div`
  color: #ef5e28;
  margin-right: 5px;
`
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`
const ScoreContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1rem;
`
const NameDiv = styled.div`
  font-size: 18px;
  font-weight: bold;
`
function ShopInfoReview({review}) {
  const userName = (review.user.user_name)
  const slicedName = userName.slice(0,-2)+'**'
  const date = review.createdAt.split('T')[0]
  const stars = ['★','★★','★★★','★★★★','★★★★★']
  console.log(review.score);
  return (
    <Container>
      <ContentContainer>
      <NameDiv>{slicedName}</NameDiv>
    <DateDiv>{date}</DateDiv>
    <ContentDiv>{review.contents}</ContentDiv>
    </ContentContainer>
    <ScoreContainer>
    <StarDiv>{stars[review.score-1]}</StarDiv>
    <ScoreDiv>{review.score}</ScoreDiv>
    </ScoreContainer>
    </Container>
  )
}

export default ShopInfoReview;