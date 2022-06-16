import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  border: 2px solid rgb(21,64,99);
  border-radius: 0.5rem;
  margin-bottom: 2rem;
`;
const ShopNameDiv = styled.div`
  font-size: larger;
  font-weight: bold;
`
const DateDiv = styled.div`
  font-size: small;
  color: rgb(85,85,85);
  margin-bottom: 1rem;
`
const Img = styled.img`
  width: 4em;
  height: 4em;
  margin: 1em;
`;
const Div = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: column;
  width: 70%;
  margin-right: 2rem;
`;
const DeleteBtn = styled.div`
  color: black;
`;
const Button = styled.button`
  margin: 1em;
  width: 7em;
  height: 2em;
  background-color: rgb(21,64,99);
  color: white;
  border-radius: 0.5rem;
  align-self: flex-start;
  :hover{
    transform: scale(1.05);
    background-color: tomato;
  }
`;
function ReviewInfo({ data, getReviewData }) {
  const [image, setImage] = useState([]);
  const [loding, setLoding] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  const getImage = useCallback(async () => {
    const parsing = await JSON.parse(data.image_src);
    if (parsing.length !== 0) {
      setImage(parsing);
    }else {
      setImage([{location: '/img/default.png', key:1}])
    }
    setLoding(true);
  }, []);
  const clickDeleteBtn = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/review/id/${data.id}`, {
        withCredentials: true,
      })
      .then((resp) => {
        const keys = image.map((el) => el.key);
        for (let i = 0; i < keys.length; i++) {
          axios
            .delete(`${process.env.REACT_APP_API_URL}/${keys[i]}`, {
              withCredentials: true,
            })
            .then((resp) => {
              console.log(resp);
              getReviewData();
            });
        }
      });
  };
  useEffect(() => {
    getImage();
  }, [getImage]);
  return (
    <Container>
      {loding ? (
        <>
          <div>
            {image.map((img) => {
              return <Img src={img.location} key={img.key} />;
            })}
          </div>
          <Div>
            <ShopNameDiv>{data.shop_name}</ShopNameDiv>
            <DateDiv>{data.createdAt}</DateDiv>
            <div>{data.contents}</div>
          </Div>
          <Button onClick={clickDeleteBtn}>리뷰 삭제</Button>
        </>
      ) : null}
    </Container>
  );
}

export default ReviewInfo;
