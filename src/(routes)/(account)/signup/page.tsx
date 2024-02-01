import axios from 'axios';
import { omit } from 'lodash';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { AnimatePresence, motion } from 'framer-motion';
import AccountInputs from './_component/AccountInputs';
import EmailAuthenticationInputs from './_component/EmailAuthenticationInputs';
import PersonalInformationInputs from './_component/PersonalInformationInputs';
import GraduateInput from './_component/GraduateInput';
import StudentInputs from './_component/StudentInputs';

interface FormData {
    loginId: string;
    loginPassword: string;
    confirmPassword: string;
    name: string;
    emailAddress: string;
    authenticationCode: string;
    graduated: boolean;
    graduateYear: number | null;
    studentId: string | null;
    grade: number | null;
    memberAuthority: string;
}

export default function Page() {
    const methods = useForm<FormData>({ mode: 'onBlur' });

    const [isEmailAuthenticated, setIsEmailAuthenticated] = useState(false);

    const [graduates, setGraduates] = useState(false);

    const navigate = useNavigate();

    const checkEmailAuthenticated = useCallback(() => {
        setIsEmailAuthenticated(prevState => !prevState);
    }, []);

    useEffect(() => {
        methods.unregister(['graduateYear']);
    }, []);

    const handleRadioButtonClick: MouseEventHandler = useCallback(event => {
        if ((event.target as HTMLInputElement).value === 'yes') {
            methods.resetField('grade');
            methods.resetField('studentId');
            methods.setValue('memberAuthority', 'GENERAL_MEMBER');
            methods.unregister(['grade', 'studentId']);
            setGraduates(true);
        } else {
            methods.resetField('graduateYear');
            methods.unregister(['graduateYear']);
            setGraduates(false);
        }
    }, []);

    const onSubmit: SubmitHandler<FormData> = async data => {
        if (!isEmailAuthenticated) {
            window.alert('이메일 인증을 완료해주세요.');
            return;
        }

        const signUpData: Omit<FormData, 'authenticationCode' | 'confirmPassword'> = omit(data, [
            'confirmPassword',
            'authenticationCode',
        ]);

        if (graduates) {
            signUpData.graduated = true;
            signUpData.grade = null;
            signUpData.studentId = null;
            signUpData.graduateYear = Number(signUpData.graduateYear);
        } else {
            signUpData.graduated = false;
            signUpData.graduateYear = null;
            signUpData.grade = Number(signUpData.grade);
        }

        try {
            const response = await axios.post(`/auth/signup`, signUpData);
            window.alert(response.data.response);
            navigate('/signin', { replace: true });
        } catch (error) {
            // @ts-ignore
            const errorMessage = error.response.data.error.message;
            window.alert(errorMessage);
        }
    };

    return (
        <main>
            <FormProvider {...methods}>
                <form className={'w-full p-8'} onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className={'mb-12 flex w-full flex-col gap-y-8'}>
                        <AccountInputs />
                        <EmailAuthenticationInputs
                            isEmailAuthenticated={isEmailAuthenticated}
                            checkEmailAuthenticated={checkEmailAuthenticated}
                        />
                        <PersonalInformationInputs onRadioButtonClick={handleRadioButtonClick} />
                        <hr />
                        <AnimatePresence mode={'wait'} initial={false}>
                            {graduates ? (
                                <motion.div
                                    key={'graduateInput'}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1.0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'linear', ease: 'linear' }}
                                >
                                    <GraduateInput />
                                </motion.div>
                            ) : (
                                <motion.div
                                    className={'flex flex-col gap-y-8'}
                                    key={'studentInputs'}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1.0 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: 'linear', ease: 'linear' }}
                                >
                                    <StudentInputs />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    <div className={'w-full'}>
                        <button
                            className={
                                'w-full rounded-xl bg-rose-700 py-3 text-lg font-bold text-white transition-all hover:bg-rose-800 enabled:opacity-100 disabled:opacity-75'
                            }
                            type={'submit'}
                            disabled={methods.formState.isSubmitting}
                        >
                            회원 가입
                        </button>
                    </div>
                </form>
            </FormProvider>
        </main>
    );
}
