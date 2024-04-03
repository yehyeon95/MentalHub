import { Link } from 'react-router-dom';
import { formatDate } from '../util/util';

const CardComponent = (item) => {
    //console.log('item:', item);
    const data = item.item;
    const modi = data.modified;
    const formattedModDate = formatDate(data.modifiedAt);
    const formattedCreDate = formatDate(data.createdAt);
    return (
        <div className="">
            <div className="container p-4 border text-md border-soGray-light my-4">
                <div className="row"></div>
                <div className="text-[1.2rem] line-clamp-2 break-all font-weight-bold mb-2">
                    <Link to={`/contents/${data.contentId}`}>{data.title}</Link>
                </div>
                <div className="d-flex justify-content-end text-[13px] text-soGray-darker">
                    <span className="font-weight-bold text-soGray-darker mx-1">작성자 : {data.nickname}</span>
                    <time className="mx-1">
                        <span className="text-soGray-darker">
                            {modi ? '수정 시간' : '생성 시간'}: {formattedModDate || formattedCreDate}
                        </span>
                    </time>
                    <span className="font-weight-bold text-soGray-darker mx-1">조회수 : {data.views}</span>
                    <span className="font-weight-bold text-soGray-darker mx-1">
                        {data.type === 'post'
                            ? '일반게시글'
                            : data.type === 'info'
                            ? '정보게시글'
                            : data.type === 'notice'
                            ? '공지게시글'
                            : ''}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default CardComponent;
