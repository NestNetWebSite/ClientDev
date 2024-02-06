import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LOGO_URL from '/public/_assets/images/nestnet-logo.png';
import Dropdown from './Dropdown';
import AuthStatusArea from './authStatusArea/AuthStatusArea.tsx';

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
                pathname: '/history',
            },
            { label: '교수님 소개', pathname: '/professor' },
            { label: '동아리 회칙', pathname: '/regulations' },
            {
                label: '현 임원 소개',
                pathname: '/executives',
            },
            {
                label: '전 임원 소개',
                pathname: '/former_executives',
            },
        ],
    },

    {
        label: '게시판',
        navItems: [
            {
                label: '갤러리',
                pathname: '/photo-album',
            },
            {
                label: '통합 게시판',
                pathname: '/community',
            },
            { label: '족보 게시판', pathname: '/exam' },
        ],
    },

    {
        label: '생활',
        navItems: [
            { label: '공지사항', pathname: '/notice' },
            { label: '자기 소개', pathname: '/about_me' },
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
            className={'z-10 flex h-[4.68rem] w-full justify-between border-b border-b-gray-200 bg-white p-4 shadow-sm'}
        >
            <div className={'flex flex-1 items-center justify-center'}>
                <Link to={'/'}>
                    <img className={'w-36'} src={LOGO_URL} alt={'NestNetLogo'} />
                </Link>
            </div>
            <ul className={'relative flex flex-1 items-center justify-center gap-x-24'}>
                {navItemsInformation.map(itemInfo => {
                    if (itemInfo.label === '스터디') {
                        return (
                            <li
                                key={itemInfo.label}
                                className={'cursor-pointer font-semibold transition-all hover:text-rose-700'}
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
                                <span className={'cursor-pointer font-semibold transition-all hover:text-rose-700'}>
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
            <AuthStatusArea />
        </nav>
    );
}
