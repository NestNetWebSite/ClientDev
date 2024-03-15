import { PAGE_ROUTE } from '../_constants/constants';

export const StringTranslator = {
    // 글 카테코리별 라우팅 전환
    getPostCategoryURL(postCategory: string): string {
        switch (postCategory) {
            case 'NOTICE':
                return PAGE_ROUTE.NOTICE;
            case 'UNIFIED':
                return PAGE_ROUTE.COMMUINTY;
            case 'EXAM':
                return PAGE_ROUTE.EXAM;
            case 'PHOTO':
                return PAGE_ROUTE.PHOTOALBUMS;
            case 'INTRODUCTION':
                return PAGE_ROUTE.ABOUT_ME;
            default:
                return null;
        }
    },
    getPostCategoryKOR(postCategory: string): string {
        // 글 카테코리별 영->한 전환
        switch (postCategory) {
            case 'NOTICE':
                return '공지';
            case 'UNIFIED':
                return '통합';
            case 'EXAM':
                return '족보';
            case 'PHOTO':
                return '사진';
            case 'INTRODUCTION':
                return '소개';
            default:
                return null;
        }
    },
};
