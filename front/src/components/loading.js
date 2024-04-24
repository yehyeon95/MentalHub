import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <Spinner animation="border" role="status"></Spinner>
            <strong>Loading...</strong>
        </div>
    );
};

export default Loading;
