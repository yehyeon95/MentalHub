const Pagination = ({ pageInfo, currentPage, onClickPage }) => {
    return (
        <ul className="pagination mt-2.5 mb-7 px-4">
            <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <button className="page-link" onClick={() => onClickPage('이전')}>
                    Previous
                </button>
            </li>
            {Array.from({ length: +pageInfo.pageInfo.total_pages }).map((el, i) => {
                return (
                    <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => onClickPage(i + 1)}>
                            {i + 1}
                        </button>
                    </li>
                );
            })}
            <li className={`page-item ${pageInfo.pageInfo.total_pages === currentPage && 'disabled'}`}>
                <button className="page-link" onClick={() => onClickPage('다음')}>
                    Next
                </button>
            </li>
        </ul>
    );
};

export default Pagination;
