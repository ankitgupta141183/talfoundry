import React from "react";
import Pagination from "react-js-pagination";

function PaginationComponent(props) {
    const { activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onChange = () => { } } = props
    return (

        totalItemsCount > itemsCountPerPage && <Pagination
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={onChange}
            hideFirstLastPages={true}
            prevPageText={"⟨ Previous"}
            nextPageText={"Next ⟩"}
        />
    )
}

export default PaginationComponent