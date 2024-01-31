export const StringCombinator = {
    // 이미지 경로를 조합하는 함수
    getImageURL: image => {
        const imageRootURL = `${import.meta.env.VITE_APP_SERVER}/image`;

        return `${imageRootURL}/${image.saveFilePath}/${image.saveFileName}`;
    },

    // 날짜 정보를 조합하는 함수
    getFormatDate(createdTime) {
        return `${createdTime[0]}-${createdTime[1]}-${createdTime[2]}`;
    },
};
