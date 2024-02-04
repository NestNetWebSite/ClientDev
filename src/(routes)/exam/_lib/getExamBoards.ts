import axios from 'axios';
import { QueryFunction } from '@tanstack/react-query';

interface ExamBoard {
    id: number;
    subject: string;
    professor: string;
    year: number;
    semester: string | number;
    examType: string;
    userName: string;
}

interface ExamSearchFilter {
    year: string;
    semester: string | number;
    examType: string;
    subject: string;
    professor: string;
}

const getExamBoards: QueryFunction<
    {
        totalSize: number;
        dtoList: ExamBoard[];
    },
    [_1: string, _2: string, _3: ExamSearchFilter & { currentPage: number }]
> = ({ queryKey }) => {
    const searchFilter = queryKey[2];

    const { year, semester, examType, subject, professor, currentPage } = searchFilter;
    return axios
        .get(
            `/api/exam-collection-post?${Number(year) === 0 ? '' : `year=${year}&`}${
                Number(semester) === 0 ? '' : `semester=${semester}&`
            }${examType === '' ? '' : `examType=${examType}&`}${subject === '' ? '' : `subject=${subject}&`}${
                professor === '' ? '' : `professor=${professor}&`
            }page=${currentPage - 1}&size=9`,
        )
        .then(response => response.data.response);
};

export default getExamBoards;
