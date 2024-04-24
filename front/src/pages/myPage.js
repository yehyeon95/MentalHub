import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Profile from '../components/profile';
import Summary from '../components/summary';
import MyPosts from '../components/myposts';
import MyAnswers from '../components/myanswers';
/**
 * myPage입니다. 유저의 기본 정보가 들어가며 요약, 내글, 내답변을 요약해서 볼수있으며, 유저의 기본정보변경, 로그아웃, 회원탈퇴, 관리자권한신청을 할수있습니다.
 * 또한 react-bootstrap 을 활용하여 <Container>, <Row>, <Col> , <Button> 들의 속성을 사용해보았습니다. div와 달리 명확하게 보이는게 장점인 것 같습니다.
 */
const MyPage = () => {
    const [activeComponent, setActiveComponent] = useState('Summary');
    return (
        <div className="container mx-auto">
            <div>
                <Profile />
            </div>
            <div>
                <Row>
                    <Col style={{ padding: '20px' }}>
                        <Button
                            variant="primary"
                            onClick={() => setActiveComponent('Summary')}
                            style={{ display: 'block', marginBottom: '30px', marginLeft: '30px' }}
                        >
                            요약
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setActiveComponent('MyPosts')}
                            style={{ display: 'block', marginBottom: '30px', marginLeft: '30px' }}
                        >
                            게시글
                        </Button>
                        <Button
                            variant="primary"
                            onClick={() => setActiveComponent('MyAnswers')}
                            style={{ display: 'block', marginBottom: '30px', marginLeft: '30px' }}
                        >
                            답변
                        </Button>
                    </Col>
                    <Col xs={9} style={{ padding: '20px' }}>
                        {activeComponent === 'Summary' && <Summary />}
                        {activeComponent === 'MyPosts' && <MyPosts />}
                        {activeComponent === 'MyAnswers' && <MyAnswers />}
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MyPage;
