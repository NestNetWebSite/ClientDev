export default function handleHttpError(statusCode) {
    switch (statusCode) {
        case 401:
            window.alert('로그인 후 볼 수 있는 컨텐츠입니다. 로그인 후 다시 시도해 주세요.');
            break;
        case 403:
            window.alert('접근이 거부되었습니다. 해당 페이지를 보기 위한 권한이 없습니다.');
            break;
        case 404:
            window.alert('해당 페이지를 찾을 수 없습니다.');
            break;
        case 500:
            window.alert('요청사항을 처리하는 데 문제가 발생했습니다. 관리자에게 문의해주세요.');
            break;
        default:
            console.log('Unhandled HTTP Error: Status code ' + statusCode);
            break;
    }
}
