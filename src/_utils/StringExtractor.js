export const StringExtractor = {
    extractFileName: url => {
        const parts = url.split(/[\\/]/);

        return parts[parts.length - 1];
    },
};
