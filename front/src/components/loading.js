import Spinner from 'react-bootstrap/Spinner';

const Loading = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    );
};

export default Loading;
