export const StringCombinator = {
    // 이미지 경로 조합
    getImageURL: image => {
        const imageRootURL = `${import.meta.env.VITE_APP_SERVER}/image`;

        // TEST
        return `/${image.saveFilePath}/${image.saveFileName}`;
        // return `${imageRootURL}/${image.saveFilePath}/${image.saveFileName}`;
    },

    // 날짜 정보 조합
    getFormatDate(createdTime) {
        return `${createdTime[0]}-${createdTime[1]}-${createdTime[2]}`;
    },

    // 최근 글 url 경로 조합
    getRecentPostPath(category, postId) {
        return `${category}/${postId}`;
    },
};
