import {useState, useEffect} from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Profile from "../components/profile";
import Summary from "../components/summary";
import MyPosts from "../components/myposts";
import MyAnswers from "../components/myanswers";

const MyPage= () => {

    const [activeComponent, setActiveComponent] = useState('Summary')
    return (
        <div>
            <div>
                <Profile />
            </div>
            <Container fluid style={{ height: '100vh', paddingTop: '20px' }}>
                <Row>
                    {/* <Col xs={3} style={{ backgroundColor: '#f8f9fa', padding: '20px' }}> */}
                    <Col style={{ padding: '20px' }}>
                        <Button  variant="primary" onClick={()=>setActiveComponent('Summary')} style={{ display: 'block', marginBottom: '30px' ,marginLeft:'30px' }}>요약</Button>
                        <Button  variant="primary" onClick={()=>setActiveComponent('MyPosts')} style={{ display: 'block', marginBottom: '30px' ,marginLeft:'30px'}}>게시글</Button>
                        <Button  variant="primary" onClick={()=>setActiveComponent('MyAnswers')} style={{ display: 'block', marginBottom: '30px' ,marginLeft:'30px'}}>답변</Button>
                    </Col>
                    <Col xs={9} style={{ padding: '20px' }}>
                        {activeComponent === 'Summary' && <Summary />}
                        {activeComponent === 'MyPosts' && <MyPosts />}
                        {activeComponent === 'MyAnswers' && <MyAnswers />}
                    </Col>
                    {/* </Col> */}
                </Row>
            </Container>
        </div>
    );
}

export default MyPage;