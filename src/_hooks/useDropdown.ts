import { RefObject, useEffect } from 'react';

export default function useDropdown(ref: RefObject<HTMLElement>, isDropdownOpen: boolean, onClickOutside: () => void) {
    useEffect(() => {
        const handleOutsideClick = (event: CustomEvent<MouseEvent>) => {
            if (isDropdownOpen && !ref.current.contains(event.target as Node)) {
                onClickOutside();
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);
}
