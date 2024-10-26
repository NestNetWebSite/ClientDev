// COMPONENT: 최신 글 배너
import { Link } from 'react-router-dom';
import { StringCombinator } from '../../../../_utils/StringCombinator';
import { StringTranslator } from '../../../../_utils/StringTranslator';
import LoadingSpinner from '../../../../_components/loadingSpinner/LoadingSpinner';
import { INewPost } from '../../type';

interface IProps {
    items: INewPost[];
    isLoading: boolean;
}

export default function RecentPostsBanner({ items: recentPosts, isLoading }: IProps) {
    if (isLoading)
        return (
            <div className='relative top-1/4 text-center'>
                <LoadingSpinner size={30} />
            </div>
        );

    return (
        <ul className='h-full w-full px-[0.8rem] text-slate-600'>
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
                    <li key={post.id} className='mb-[0.2rem] flex w-full flex-row hover:text-primary'>
                        <span className='mr-3 mt-[0.2rem] h-[1.2rem] w-fit text-nowrap rounded-md bg-primary px-2 py-[0.2rem] text-[0.6rem] font-semibold text-white'>
                            {StringTranslator.getPostCategoryKOR(post.postCategory)}
                        </span>
                        <div className='flex w-full flex-col truncate'>
                            <Link
                                to={StringCombinator.getRecentPostPath(
                                    StringTranslator.getPostCategoryURL(post.postCategory),
                                    post.id,
                                )}
                            >
                                <div className='truncate text-[0.75rem]'>{post.title}</div>
                            </Link>
                            <div className='truncate text-[0.6rem]'>
                                {StringCombinator.getFormatDate(post.createdTime)}
                            </div>
                        </div>
                    </li>
                ))
            )}
        </ul>
    );
}
