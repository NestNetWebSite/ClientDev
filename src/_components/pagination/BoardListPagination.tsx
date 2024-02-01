import { useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import queryString from 'query-string';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { RiSkipRightLine, RiSkipLeftLine } from 'react-icons/ri';

export default function BoardListPagination({ totalItemsCount }: { totalItemsCount: number }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get('page') ?? '1');

    return (
        <div>
            <Pagination
                totalItemsCount={totalItemsCount}
                onChange={(targetPage: number) => {
                    const parsed = queryString.parse(window.location.search);
                    setSearchParams({ ...parsed, page: String(targetPage) });
                }}
                activePage={currentPage}
                itemsCountPerPage={12}
                pageRangeDisplayed={Math.ceil(totalItemsCount / 12)}
                prevPageText={<AiOutlineLeft />}
                firstPageText={<RiSkipLeftLine className={'h-6 w-6'} />}
                nextPageText={<AiOutlineRight />}
                lastPageText={<RiSkipRightLine className={'h-6 w-6'} />}
                innerClass={'py-5 flex justify-center'}
                itemClass={
                    'flex h-9 w-9 items-center justify-center rounded-full text-lg text-gray-500 [&:not(&.active)]:hover:text-slate-950 [&:not(&.active)]:hover:underline [&:not(&.active)]:hover:decoration-2 [&:not(&.active)]:hover:underline-offset-4'
                }
                activeLinkClass={'font-bold text-slate-950 underline decoration-2 underline-offset-4'}
            />
        </div>
    );
}
