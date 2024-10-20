// COMPONENT: 사진 다운로드 버튼
import { FiDownload } from 'react-icons/fi';
import { CircleActivationButton as Button } from '../../../../_components/button/CircleActivationButton';
import { StringExtractor } from '../../../../_utils/StringExtractor';
import { IExistingFileDto } from '../../types';
import axios from 'axios';

export default function DownloadBtn({ selectedPhoto }: { selectedPhoto: IExistingFileDto }) {
    // 사진 다운로드 버튼 핸들러
    const handleDownloadBtnClick = async () => {
        const fileName = StringExtractor.extractFileName(selectedPhoto.originalFileName);
        const downloadedFile = await axios
            .get(`/api/file?fileId=${selectedPhoto.id}`, {
                responseType: 'blob',
            })
            .then(response => response.data)
            .catch(() => window.alert('사진 저장에 실패하였습니다.'));

        if (downloadedFile) {
            const fileBlob = new Blob([downloadedFile], {
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
