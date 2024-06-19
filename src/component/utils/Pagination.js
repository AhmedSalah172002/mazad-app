import React from 'react'
import ReactPaginate from "react-paginate";
import Prev from './Prev';
import Next from './Next';
const Pagination = ({ pageCount, onPress }) => {

    const handlePageClick = (data) => {
        window.scroll(0,0)
        onPress(data.selected + 1)
    };
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<Next />}
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel={<Prev />}
            containerClassName={"pagination justify-content-center align-items-center p-3"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            nextClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
        />
    )
}

export default Pagination
