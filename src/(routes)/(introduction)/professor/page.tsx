import {
    LECTURES,
    PROFESSIONAL_EXPERIENCE_1,
    PROFESSIONAL_EXPERIENCE_2,
    RESEARCH_INTERESTS,
} from './_constant/professorInformation.ts';

export default function Page() {
    return (
        <main className={'mx-auto flex w-[55rem] flex-col p-5'}>
            <div className={'mb-6 border-b-2 border-rose-700 pb-2'}>
                <h1 className={'text-3xl font-bold text-rose-700'}>지도교수님 소개</h1>
            </div>
            <div className={'flex flex-col gap-y-20'}>
                <div className={'flex gap-x-9'}>
                    <div className={'w-44'}>
                        <img
                            className={'w-full'}
                            src={'https://software.cbnu.ac.kr/contents/layouts/SOFTWARE/img/sub/prof/prof_lgm.png'}
                            alt={'professor'}
                        />
                    </div>
                    <div className={'flex-1 leading-[1.9]'}>
                        <p>
                            Professor <span className={'font-bold'}>Keon Myung Lee</span> received his BS, MS, and Ph.D.
                            degrees in computer science from KAIST(Korea Institute of Science and Technology), Korea and
                            was a Post-doc fellow in INSA de Lyon, France. He was a visiting professor in University of
                            Colorado at Denver and a visiting scholar in Indiana University, USA. After having an
                            industrial career at Silicon Valley, USA, he joined Dept. of Computer Science, Chungbuk
                            National University, Korea in 1995. Now he is a professor. He serves as the Editor-in-Chief
                            of International Journal of Fuzzy Logic and Intelligent Systems. His principal research
                            interests are in data mining, machine learning, soft computing, big data processing, and
                            intelligent service systems.
                        </p>
                    </div>
                </div>
                <div>
                    <h1 className={'mb-6 text-2xl font-bold text-gray-500'}>Professional Experience</h1>
                    <div>
                        <ul className={'flex flex-col gap-y-2.5'}>
                            {PROFESSIONAL_EXPERIENCE_1.map(professionalExperience => {
                                return (
                                    <li key={professionalExperience.experience} className={'flex gap-x-3.5'}>
                                        <div className={'w-32 text-right'}>
                                            <span className={'font-bold text-rose-700'}>
                                                {professionalExperience.period}
                                            </span>
                                        </div>
                                        <div className={'flex-1'}>
                                            <span className={'font-bold'}>{professionalExperience.experience}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <h1 className={'mb-6 text-2xl font-bold text-gray-500'}>Research Interests</h1>
                    <div>
                        <ul className={'flex flex-col gap-y-2.5'}>
                            {RESEARCH_INTERESTS.map(researchInterest => {
                                return (
                                    <li key={researchInterest} className={'font-bold'}>
                                        {' '}
                                        - {researchInterest}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <h1 className={'mb-6 text-2xl font-bold text-gray-500'}>Lectures</h1>
                    <div>
                        <ul className={'flex flex-col gap-y-2.5'}>
                            {LECTURES.map(lecture => {
                                return (
                                    <li key={lecture} className={'font-bold'}>
                                        {' '}
                                        - {lecture}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <div>
                    <h1 className={'mb-6 text-2xl font-bold text-gray-500'}>Professional Experience</h1>
                    <div>
                        <ul className={'flex flex-col gap-y-2.5'}>
                            {PROFESSIONAL_EXPERIENCE_2.map(professionalExperience => {
                                return (
                                    <li key={professionalExperience.experience} className={'flex gap-x-3.5'}>
                                        <div className={'w-32 text-right'}>
                                            <span className={'font-bold text-rose-700'}>
                                                {professionalExperience.period}
                                            </span>
                                        </div>
                                        <div className={'flex-1'}>
                                            <span className={'font-bold'}>{professionalExperience.experience}</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}
