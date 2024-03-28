export const StringCombinator = {
    // 이미지 경로 조합
    getImageURL: (saveFilePath: string, saveFileName: string): string => {
        // TEST
        const imageRootURL = `/api/image`;
        // const imageRootURL = `/api`;

        return `${imageRootURL}/${saveFilePath}/${saveFileName}`;
    },

    // 날짜 정보 조합
    getFormatDate(createdTime: number[]) {
        return `${createdTime[0]}/${createdTime[1]}/${createdTime[2]}`;
    },

    // 최근 글 url 경로 조합
    getRecentPostPath(category: string, postId: number) {
        return `${category}/${postId}`;
    },
};
