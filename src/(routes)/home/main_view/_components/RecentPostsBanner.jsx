import { Link } from 'react-router-dom';
import { StringCombinator } from '../../../../_utils/StringCombinator';
import { StringTranslator } from '../../../../_utils/StringTranslator';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';

/**
 * 최근 글 목록 배너
 * @param {Object[], boolean}
 * @returns
 */
export default function RecentPostsBanner({ items: recentPosts, isLoading }) {
    if (isLoading)
        return (
            <div className='absolute left-0 top-0 flex h-full w-full flex-col justify-center pt-4'>
                <LoadingSpinner size={30} />
            </div>
        );

    return (
        <article className='relative h-full w-full p-5'>
            <ul className='h-full w-full text-slate-600'>
                {recentPosts.length === 0 ? (
                    <>
                        <h2 className='font-slate-600 text-[0.8rem]'>
                            최신 게시글이 없습니다.
                            <br />
                            새로운 글을 작성해보세요!
                        </h2>
                    </>
                ) : (
                    recentPosts?.map(post => (
                        <li key={post.id} className='mb-[0.7rem] flex h-[2rem] w-full flex-row hover:text-black'>
                            <span className='bg-home-primary mr-3 mt-[0.2rem] h-[1.3rem] w-fit text-nowrap rounded-md px-2 py-[0.2rem] text-[0.6rem] font-semibold text-white'>
                                {StringTranslator.getPostCategoryKOR(post.postCategory)}
                            </span>
                            <div className='flex w-full flex-col truncate'>
                                <Link
                                    to={StringCombinator.getRecentPostPath(
                                        StringTranslator.getPostCategoryURL(post.postCategory),
                                        post.id,
                                    )}
                                >
                                    <div className='truncate text-[0.8rem]'>{post.title}</div>
                                </Link>
                                <div className='truncate text-[0.65rem]'>
                                    {StringCombinator.getFormatDate(post.createdTime)}
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </article>
    );
}
