// COMPONENT: 회원가입 요청 목록
import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FaHandshakeSimple, FaHandshakeSimpleSlash } from 'react-icons/fa6';
import axios from 'axios';
import {
    AUTHORITY_ENG_TO_KOR,
    AUTHORITY_KOR_TO_ENG,
    TABLE_COL_NAME,
    WINDOW_ALERT_MESSAGE,
} from '../../../../_constants/constants';
import { ISignupReq } from '../../type';

export default function SignupReqList() {
    const columns = useMemo(() => TABLE_COL_NAME.signup, []);

    // GET: 회원가입요청 조회
    const {
        data: fetchedSignupReqs = [],
        isError: isLoadingSignupReqsError,
        isFetching: isFetchingSignupReqs,
        isLoading: isLoadingSignupReqs,
    } = useGetSignupReqs();

    // POST: 회원가입요청 승인
    const { mutateAsync: approveReq, isPending: isApprovingReq } = useApproveReq();
    // HANDLER: 회원가입 요청 승인 핸들러
    const handleReqApprove = async ({ original }) => {
        if (window.confirm(WINDOW_ALERT_MESSAGE.signupApproval(original))) {
            approveReq({ signupReq: original });
        }
    };

    // POST: 회원가입요청 거절
    const { mutateAsync: rejectReq, isPending: isDeletingReq } = useRejectReq();
    // HANDLER: 회원가입 요청 거절 핸들러
    const handleReqReject = ({ original }) => {
        if (window.confirm(WINDOW_ALERT_MESSAGE.signupReject(original))) {
            rejectReq({ signupReq: original });
        }
    };

    // 테이블 속성 정의
    const table = useMaterialReactTable({
        columns,
        data: fetchedSignupReqs,
        // getRowId: row => row.id,
        initialState: { density: 'compact' },
        enableEditing: true,
        enableFilters: false,
        enableHiding: false,
        positionActionsColumn: 'last', // 버튼 위치
        muiToolbarAlertBannerProps: isLoadingSignupReqsError
            ? {
                  color: 'error',
                  children: 'Error loading data',
              }
            : undefined,
        muiTableContainerProps: {
            sx: {
                minHeight: '400px',
            },
        },
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Tooltip title='승인'>
                    <IconButton color='success' onClick={() => handleReqApprove(row)}>
                        <FaHandshakeSimple />
                    </IconButton>
                </Tooltip>
                <Tooltip title='거절'>
                    <IconButton color='error' onClick={() => handleReqReject(row)}>
                        <FaHandshakeSimpleSlash />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        state: {
            isLoading: isLoadingSignupReqs,
            isSaving: isApprovingReq || isDeletingReq,
            showAlertBanner: isLoadingSignupReqsError,
            showProgressBars: isFetchingSignupReqs,
        },
    });

    return <MaterialReactTable table={table} />;
}

// GET: 회원가입 요청 목록 조회
function useGetSignupReqs() {
    return useQuery<ISignupReq[]>({
        queryKey: ['signups'],
        queryFn: async () => {
            const signupReqsURL = `/api/manager/signup-request`;
            return await axios.get(signupReqsURL).then(res => {
                const signupRequests: ISignupReq[] = res.data.response.dtoList;

                return signupRequests.map(req => ({
                    ...req,
                    memberAuthority: AUTHORITY_ENG_TO_KOR[req.memberAuthority] ?? '-',
                }));
            });
        },
        refetchOnWindowFocus: false,
    });
}

interface ISignupProps {
    signupReq: ISignupReq;
}
// POST: 회원가입 요청 승인
function useApproveReq() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ signupReq }: ISignupProps) => {
            const approveReqURL = `/api/manager/approve-signup`;
            return await axios.post(approveReqURL, {
                loginId: signupReq.loginId,
                memberAuthority: AUTHORITY_KOR_TO_ENG[signupReq.memberAuthority],
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['signups'] });
        },
    });
}

// POST: 회원가입 요청 거절
function useRejectReq() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ signupReq }: ISignupProps) => {
            const rejectReqURL = `/api/manager/reject-signup`;
            return await axios.post(rejectReqURL, {
                loginId: signupReq.loginId,
                memberAuthority: AUTHORITY_KOR_TO_ENG[signupReq.memberAuthority],
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['signups'] });
        },
    });
}
