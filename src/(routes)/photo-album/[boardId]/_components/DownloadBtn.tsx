import { FiDownload } from 'react-icons/fi';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { StringExtractor } from '../../../../_utils/StringExtractor';
import axios from 'axios';

interface IProps {
    selectedPhoto: string;
}

export default function DownloadBtn({ selectedPhoto }: IProps) {
    // 사진 다운로드 버튼 핸들러
    const handleDownloadBtnClick = async () => {
        const boardId = window.location.pathname.split('/')[2];
        const fileName = StringExtractor.extractFileName(selectedPhoto);
        const downloadFile = await axios
            .get(`/api/file?postId=${boardId}&fileName=${fileName}`, {
                responseType: 'blob',
            })
            .then(response => response.data)
            .catch(() => window.alert('사진 저장에 실패하였습니다.'));

        if (downloadFile) {
            const fileBlob = new Blob([downloadFile], {
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
        }
    };

    return <Button onClick={() => handleDownloadBtnClick()} content={<FiDownload className='text-3xl' />} />;
}
