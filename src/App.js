import "./App.css";
import {
  Form,
  Button,
  Card,
  ListGroup,
  Navbar,
  Container,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [apiUser, setApiUser] = useState({});
  const [apiMatchid, setApiMatchId] = useState([]);
  const [apimatch4, setMatch4] = useState();
  const [name, setName] = useState();
  const submit = () => {
    axios
      .get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=RGAPI-ffa5b4ca-c307-46d6-bc51-c8b1504c9154`
      )
      .then((response) => {
        setApiUser(response.data);
      })
      .catch((error) => {
        alert("에러");
      })
      .finally(() => {
        console.log("test");
      });
    console.log(apiUser.puuid);

    axios
      .get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${apiUser.puuid}/ids?start=0&count=10&api_key=RGAPI-ffa5b4ca-c307-46d6-bc51-c8b1504c9154`
      )
      .then((response) => {
        setApiMatchId(response.data);
      })
      .catch((error) => {
        alert("에러2");
      })
      .finally(() => {
        console.log("test");
      });
    console.log(apiMatchid);

    for (var i = 0; i < apiMatchid.length; i++) {
      axios
        .get(
          `https://asia.api.riotgames.com/lol/match/v5/matches/${apiMatchid[i]}?api_key=RGAPI-ffa5b4ca-c307-46d6-bc51-c8b1504c9154`
        )
        .then((response) => {
          setMatch4(response.data);
        })
        .catch((error) => {
          alert("에러2");
        })
        .finally(() => {
          console.log("test");
        });
      console.log(apimatch4);
    }
  };

  const handleOnChange = (e) => {
    console.log(e.target.name + ": " + e.target.value);
    setName(e.target.value);
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="#home">홈</Nav.Link>
            <Nav.Link href="#features">챔피언 분석</Nav.Link>
            <Nav.Link href="#pricing">전적검색</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <input
              type="text"
              name="userName"
              onChange={handleOnChange}
              style={{ borderRadius: 5, borderStyle: "none", marginRight: 3 }}
            ></input>
            <Button variant="light" onClick={submit}>
              Search
            </Button>
          </Form>
        </Container>
      </Navbar>

      <Container>
        <Row style={{ marginTop: 34 }}>
          <Col xs={3}>
            <Card
              style={{
                width: "20rem",
                display: "inline-block",
                marginBottom: 10,
              }}
            >
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSymcYUE7YgaHMcJSbJxyByw2Ri5yt00s83MQ&usqp=CAU"
              />
              <Card.Body>
                <Card.Title>{apiUser.name}</Card.Title>
                <Card.Text>{apiUser.puuid}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            {apiMatchid.map((item, index) => (
              <Card style={{ width: "60rem", marginBottom: 10 }} key={index}>
                <Card.Body>
                  <Card.Title>{item}</Card.Title>
                  <Card.Text>빈 공백</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default App;
