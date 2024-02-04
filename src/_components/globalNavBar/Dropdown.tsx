import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useDropdown from '../../_hooks/useDropdown';

interface Props {
    isDropdownOpen: boolean;
    closeDropdown: () => void;
    navItems: { label: string; pathname: string }[];
}

export default function Dropdown({ isDropdownOpen, closeDropdown, navItems }: Props) {
    const ulRef = useRef<HTMLUListElement>(null);
    const navigate = useNavigate();

    const handleSubItemClick = useCallback((pathname: string) => {
        navigate(pathname);
        closeDropdown();
    }, []);

    useDropdown(ulRef, isDropdownOpen, closeDropdown);

    return (
        <ul
            className={
                'absolute left-1/2 z-50 flex w-[11.5rem] -translate-x-1/2 translate-y-3 flex-col gap-y-1 rounded-xl border border-gray-300 bg-white p-4 shadow'
            }
            ref={ulRef}
            onClick={event => {
                event.stopPropagation();
            }}
        >
            {navItems.map(subItem => {
                return (
                    <li
                        key={subItem.label}
                        className={
                            'cursor-pointer rounded-xl px-2 py-1 text-[0.95rem] font-semibold transition-all hover:bg-red-50'
                        }
                        onClick={() => {
                            handleSubItemClick(subItem.pathname);
                        }}
                    >
                        {subItem.label}
                    </li>
                );
            })}
        </ul>
    );
}
