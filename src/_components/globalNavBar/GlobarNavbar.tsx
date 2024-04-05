import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dropdown from './Dropdown';
import AuthStatusArea from './authStatusArea/AuthStatusArea.tsx';
import { PAGE_ROUTE } from '../../_constants/constants.ts';

interface NavItem {
    label: string;
    pathname: string;
}

const navItemsInformation: { label: string; pathname?: string; navItems?: NavItem[] }[] = [
    {
        label: '소개',
        navItems: [
            {
                label: '동아리 연혁',
                pathname: `/${PAGE_ROUTE.HISTORY}`,
            },
            { label: '교수님 소개', pathname: `/${PAGE_ROUTE.PROFESSOR}` },
            { label: '동아리 회칙', pathname: `/${PAGE_ROUTE.REGULATIONS}` },
            {
                label: '현 임원 소개',
                pathname: `/${PAGE_ROUTE.EXECUTIVES}`,
            },
            {
                label: '전 임원 소개',
                pathname: `/${PAGE_ROUTE.FORMER_EXECUTIVES}`,
            },
        ],
    },

    {
        label: '게시판',
        navItems: [
            {
                label: '사진 게시판',
                pathname: `/${PAGE_ROUTE.PHOTOALBUMS}`,
            },
            {
                label: '통합 게시판',
                pathname: `/${PAGE_ROUTE.COMMUINTY}`,
            },
            { label: '족보 게시판', pathname: `/${PAGE_ROUTE.EXAM}` },
        ],
    },

    {
        label: '생활',
        navItems: [
            { label: '공지사항', pathname: `/${PAGE_ROUTE.NOTICE}` },
            { label: '자기 소개', pathname: `/${PAGE_ROUTE.ABOUT_ME}` },
            // { label: '출석부', pathname: '/attendance' },
        ],
    },
];

export default function GlobalNavbar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [dropdownTarget, setDropdownTarget] = useState('');

    const closeDropdown = useCallback(() => {
        setIsDropdownOpen(false);
        setDropdownTarget('');
    }, []);

    const controlDropdown = useCallback(
        (target: string) => {
            if (!isDropdownOpen) {
                setIsDropdownOpen(true);
                setDropdownTarget(target);
            } else if (isDropdownOpen && dropdownTarget !== target) {
                setDropdownTarget(target);
            } else if (isDropdownOpen && dropdownTarget === target) {
                setIsDropdownOpen(false);
                setDropdownTarget('');
            }
        },
        [isDropdownOpen, dropdownTarget],
    );

    return (
        <nav
            id={'globalNavbar'}
            className={
                'z-10 flex h-[4.68rem] w-full items-center justify-between border-b border-b-gray-200 bg-white p-4 shadow-sm'
            }
        >
            <Link to={'/'}>
                <div className='h-[4rem] w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[18rem]'>
                    <img
                        className='h-full w-full object-contain'
                        src={'/_assets/images/nestnet-logo-primary.png'}
                        alt={'NestNetLogo'}
                    />
                </div>
            </Link>
            <ul
                className={
                    'relative mx-4 hidden h-10 items-center justify-center gap-x-4 sm:flex sm:gap-x-10 md:gap-x-16 lg:gap-x-20 xl:gap-x-24'
                }
            >
                {navItemsInformation.map(itemInfo => {
                    if (itemInfo.label === '스터디') {
                        return (
                            <li
                                key={itemInfo.label}
                                className={'cursor-pointer font-semibold transition-all hover:text-secondary'}
                            >
                                <Link to={itemInfo.pathname}>{itemInfo.label}</Link>
                            </li>
                        );
                    } else {
                        return (
                            <li
                                key={itemInfo.label}
                                className={'relative'}
                                onClick={(event): void => {
                                    event.stopPropagation();
                                    controlDropdown(itemInfo.label);
                                }}
                            >
                                <span
                                    className={
                                        'h-full w-fit min-w-fit cursor-pointer break-keep text-[1.1rem] font-semibold tracking-widest transition-all hover:text-primary'
                                    }
                                >
                                    {itemInfo.label}
                                </span>
                                <AnimatePresence>
                                    {isDropdownOpen && dropdownTarget === itemInfo.label && (
                                        <Dropdown
                                            isDropdownOpen={isDropdownOpen}
                                            closeDropdown={closeDropdown}
                                            navItems={itemInfo.navItems}
                                        />
                                    )}
                                </AnimatePresence>
                            </li>
                        );
                    }
                })}
            </ul>
            <div className='w-[12rem] md:w-[14rem] lg:w-[16rem] xl:w-[18rem]'>
                <AuthStatusArea />
            </div>
        </nav>
    );
}
