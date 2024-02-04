import { useMemo, useState } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RiPencilFill } from 'react-icons/ri';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import {
    AUTHORITY_ENG_TO_KOR,
    AUTHORITY_KOR_TO_ENG,
    TABLE_COL_NAME,
    WINDOW_ALERT_MESSAGE,
} from '../../../../_constants/constants';

/**
 * 동아리원 목록
 * @returns
 */
export default function MemberList() {
    const [validationErrors, setValidationErrors] = useState({});
    const columns = useMemo(validationErrors => TABLE_COL_NAME.member(validationErrors), [validationErrors]);

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
    const handleMemberEditSave = async ({ row, values, table }) => {
        if (window.confirm(WINDOW_ALERT_MESSAGE.authorityChange(row, values))) {
            const updateMemberId = row.id;
            await updateUser({ updateMemberId, updateValues: values });
            table.setEditingRow(null);
        }
    };

    // 회원 탈퇴 재확인
    const showReconfirm = (inputValue, deleteRow) => {
        if (inputValue === deleteRow.original.name) {
            deleteUser(deleteRow.original);
        } else {
            window.alert('회원 탈퇴에 실패했습니다.');
        }
    };

    // 회원 탈퇴 핸들러
    const handleMemberDelete = row => {
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
        getRowId: row => row.id,
        onEditingRowCancel: () => setValidationErrors({}),
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

    return (
        <>
            <MaterialReactTable table={table} />
        </>
    );
}

// REST: 동아리원 목록 조회
function useGetUsers() {
    return useQuery({
        queryKey: ['members'],
        queryFn: async () => {
            const allMembersURL = `/api/manager/member-info`;
            return await axios.get(allMembersURL).then(res => {
                const members = res.data.response.dtoList;

                return members.map(member => ({
                    ...member,
                    memberAuthority: AUTHORITY_ENG_TO_KOR[member.memberAuthority] ?? '-',
                }));
            });
        },
        refetchOnWindowFocus: false,
    });
}

// REST: 동아리원 권한 수정
function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ updateMemberId, updateValues }) => {
            const authorityChangeURL = `/api/manager/change-authority`;
            return await axios.post(authorityChangeURL, {
                id: updateMemberId,
                memberAuthority: AUTHORITY_KOR_TO_ENG[updateValues.memberAuthority],
            });
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries(['members']);
        },
    });
}

// REST: 동아리원 탈퇴
function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async member => {
            const deleteMemberURL = `/api/manager/member-withdraw?member-id=${member.id}`;
            return await axios.delete(deleteMemberURL);
        },
        // 클라이언트 업데이트
        onSuccess: () => {
            queryClient.invalidateQueries(['members']);
        },
    });
}
