import { FiDownload } from 'react-icons/fi';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { StringExtractor } from '../../../../_utils/StringExtractor';
import axios from 'axios';

/**
 * 앨범 내 단건 사진 다운로드 버튼
 * @param {string}
 * @returns
 */
export default function DownloadBtn({ selectedPhoto }) {
    // 사진 다운로드 버튼 핸들러
    const handleDownloadBtnClick = async () => {
        const postId = window.location.pathname.split('/')[2];
        const fileName = StringExtractor.extractFileName(selectedPhoto);
        const result = await axios
            .get(`/api/file?postId=${postId}&fileName=${fileName}`, {
                responseType: 'blob',
            })
            .then(response => response.data);
        const fileBlob = new Blob([result], {
            type: 'application/octet-stream',
        });
        const tempFileURL = URL.createObjectURL(fileBlob);
        const $aElement = document.createElement('a');

        $aElement.download = fileName;
        $aElement.href = tempFileURL;
        $aElement.hidden = true;

        $aElement.click();
        $aElement.remove();

        URL.revokeObjectURL(tempFileURL);
    };

    return <Button onClick={() => handleDownloadBtnClick()} content={<FiDownload className='text-3xl' />} />;
}
