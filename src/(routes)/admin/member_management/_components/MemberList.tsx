import { useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable, type MRT_Row, type MRT_ColumnDef } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RiPencilFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import {
    AUTHORITY_ENG_TO_KOR,
    AUTHORITY_KOR_TO_ENG,
    AVAIL_AUTHORITY,
    WINDOW_ALERT_MESSAGE,
} from '../../../../_constants/constants';
import { IEditProps, IMember } from '../../type';

// 동아리원 목록
export default function MemberList() {
    const columns = useMemo<MRT_ColumnDef<IMember>[]>(
        () => [
            {
                accessorKey: 'name',
                header: '성명',
                enableEditing: false,
                size: 50,
                maxSize: 50,
            },
            {
                accessorKey: 'loginId',
                header: '아이디',
                enableEditing: false,
                size: 50,
                maxSize: 50,
            },
            {
                accessorKey: 'emailAddress',
                header: '이메일',
                enableEditing: false,
                size: 50,
                maxSize: 50,
            },
            {
                accessorKey: 'studentId',
                header: '학번',
                enableEditing: false,
                size: 50,
                maxSize: 50,
            },
            {
                accessorKey: 'grade',
                header: '학년',
                enableEditing: false,
                size: 50,
                maxSize: 50,
            },
            {
                accessorKey: 'graduateYear',
                header: '졸업년도',
                enableEditing: false,
                size: 50,
                maxSize: 50,
            },
            {
                accessorKey: 'memberAuthority',
                header: '권한',
                editVariant: 'select',
                editSelectOptions: AVAIL_AUTHORITY,
                size: 50,
                maxSize: 50,
                muiEditTextFieldProps: {
                    select: true,
                    // error: !!validationErrors?.state,
                    // helperText: validationErrors?.state,
                },
            },
        ],
        [],
    );

    // call READ hook
    const {
        data: fetchedUsers = [],
        isError: isLoadingUsersError,
        isFetching: isFetchingUsers,
        isLoading: isLoadingUsers,
    } = useGetUsers();
    // call UPDATE hook
    const { mutateAsync: updateUser, isPending: isUpdatingUser } = useUpdateUser();
    // call DELETE hook
    const { mutateAsync: deleteUser, isPending: isDeletingUser } = useDeleteUser();

    // 권한 수정 핸들러
    const handleMemberEditSave = async ({ row, values }: IEditProps) => {
        if (confirm(WINDOW_ALERT_MESSAGE.authorityChange(row, values))) {
            const updatedMemberId = row.original.id;
            await updateUser({ updatedMemberId, updatedValues: values });
            table.setEditingRow(null);
        }
    };

    // 로그인 정보 로컬 스토리지 삭제
    const removeIsLoggedIn = () => {
        localStorage.removeItem('isLoggedIn');
    };
    // 회원 탈퇴 재확인
    const showReconfirm = (inputValue: string, deleteRow: MRT_Row<IMember>) => {
        if (inputValue === deleteRow.original.name) {
            removeIsLoggedIn();
            deleteUser(deleteRow.original);
        } else {
            window.alert('회원 탈퇴에 실패했습니다.');
        }
    };

    // 회원 탈퇴 핸들러
    const handleMemberDelete = (row: MRT_Row<IMember>) => {
        if (window.confirm(WINDOW_ALERT_MESSAGE.memberDeletion(row))) {
            const inputValue = window.prompt(
                `탈퇴를 확정하기 위해, 아래 입력칸에 '${row.original.name}'을(를) 입력하세요.`,
                '',
            );
            showReconfirm(inputValue, row);
        }
    };

    const table = useMaterialReactTable({
        columns,
        data: fetchedUsers,
        editDisplayMode: 'row',
        enableEditing: true,
        // getRowId: row => row.id,
        // onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleMemberEditSave,
        initialState: { density: 'compact' },
        // enableHiding: false,
        positionActionsColumn: 'last',
        muiToolbarAlertBannerProps: isLoadingUsersError
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
        renderRowActions: ({ row, table }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Tooltip title='수정'>
                    <IconButton onClick={() => table.setEditingRow(row)}>
                        <RiPencilFill />
                    </IconButton>
                </Tooltip>
                <Tooltip title='탈퇴'>
                    <IconButton color='error' onClick={() => handleMemberDelete(row)}>
                        <MdDelete />
                    </IconButton>
                </Tooltip>
            </Box>
        ),
        state: {
            isLoading: isLoadingUsers,
            isSaving: isUpdatingUser || isDeletingUser,
            showAlertBanner: isLoadingUsersError,
            showProgressBars: isFetchingUsers,
        },
    });

    return <MaterialReactTable table={table} />;
}

// REST: 동아리원 목록 조회
function useGetUsers() {
    return useQuery<IMember[]>({
        queryKey: ['members'],
        queryFn: async () => {
            const allMembersURL = `/api/manager/member-info`;
            return await axios.get(allMembersURL).then(res => {
                const members: IMember[] = res.data.response.dtoList;

                return members.map(member => ({
                    ...member,
                    memberAuthority: AUTHORITY_ENG_TO_KOR[member.memberAuthority] ?? '-',
                }));
            });
        },
        refetchOnWindowFocus: false,
    });
}

interface IUpdatedMemberProps {
    updatedMemberId: number;
    updatedValues: IMember;
}

// REST: 동아리원 권한 수정
function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ updatedMemberId, updatedValues }: IUpdatedMemberProps) => {
            const authorityChangeURL = `/api/manager/change-authority`;
            return await axios.post(authorityChangeURL, {
                id: updatedMemberId,
                memberAuthority: AUTHORITY_KOR_TO_ENG[updatedValues.memberAuthority],
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
}

// REST: 동아리원 탈퇴
function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: IMember) => {
            const deleteMemberURL = `/api/manager/member-withdraw?member-id=${id}`;
            return await axios.delete(deleteMemberURL);
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['members'] });
        },
    });
}
