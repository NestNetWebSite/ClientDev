export const StringCombinator = {
    // 이미지 경로 조합
    getImageURL: image => {
        const imageRootURL = `/api/image`;

        return `${imageRootURL}/${image.saveFilePath}/${image.saveFileName}`;
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
