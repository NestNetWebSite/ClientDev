import axios from 'axios';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { MaterialReactTable, type MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { AiOutlineUserDelete } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';
import { Box, Button, Tooltip } from '@mui/material';
import ExecutiveAddModal from './ExecutiveAddModal.tsx';
import ExecutiveModifyModal from './ExecutiveModifyModal.tsx';
import getExecutiveList from '../_lib/getExecutiveList.ts';

interface Executive {
    id: number;
    year: number;
    name: string;
    studentId: string;
    role: string;
    priority: number;
}

export default function ExecutivesTable() {
    const queryClient = useQueryClient();

    const pathname = useLocation().pathname;

    const [executiveToBeModified, setExecutiveToBeModified] = useState<Executive | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);

    console.log(executiveToBeModified);

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['executives', pathname.split('/')[2] === 'executives' ? 'current' : 'former'],
        queryFn: getExecutiveList,
        retry: false,
        refetchOnWindowFocus: false,
        throwOnError: true,
    });

    const { mutate: deleteExecutiveMutate } = useMutation({
        mutationFn(id: number) {
            return axios.delete(`/api/executive-info/delete?executive-id=${id}`);
        },

        onSuccess() {
            window.alert('성공적으로 삭제하였습니다.');
            return queryClient.invalidateQueries({ queryKey: ['executives', 'current'], exact: true });
        },

        onError() {
            window.alert('삭제하는 데 실패하였습니다. 관리자에게 문의해주세요.');
        },
    });

    const columns = useMemo<MRT_ColumnDef<Executive>[]>(
        () => [
            {
                accessorKey: 'id',
                header: '아이디',
                size: 150,
            },
            {
                accessorKey: 'year',
                header: '연도',
                size: 150,
            },
            {
                accessorKey: 'name',
                header: '이름',
                size: 200,
            },
            {
                accessorKey: 'studentId',
                header: '학번',
                size: 150,
            },
            {
                accessorKey: 'role',
                header: '직책',
                size: 150,
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: data?.dtoList ?? [],
        positionActionsColumn: 'last',
        enableEditing: true,
        renderRowActions: ({ row }) => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
                <Tooltip title='수정'>
                    <button
                        className={'p-1 text-blue-500'}
                        onClick={() => {
                            setIsModifyModalOpen(true);
                            setExecutiveToBeModified(row.original);
                        }}
                    >
                        <GoPencil className={'size-6'} />
                    </button>
                </Tooltip>
                <Tooltip title='삭제'>
                    <button
                        className={'p-1 text-red-500'}
                        onClick={() => {
                            if (window.confirm('정말로 삭제하시겠습니까?')) {
                                deleteExecutiveMutate(row.original?.id);
                            }
                        }}
                    >
                        <AiOutlineUserDelete className={'size-6'} />
                    </button>
                </Tooltip>
            </Box>
        ),
        renderTopToolbarCustomActions: () => (
            <Button
                variant='contained'
                onClick={() => {
                    setIsAddModalOpen(true);
                }}
            >
                임원 추가
            </Button>
        ),
        state: {
            isLoading: isLoading || isFetching,
        },
    });

    return (
        <>
            <div className={'px-7 py-5'}>
                <MaterialReactTable table={table} />
            </div>
            <ExecutiveAddModal
                isModalOpen={isAddModalOpen}
                closeModal={() => {
                    setIsAddModalOpen(false);
                }}
            />
            <ExecutiveModifyModal
                {...executiveToBeModified}
                isModalOpen={isModifyModalOpen}
                closeModal={() => {
                    setIsModifyModalOpen(false);
                }}
            />
        </>
    );
}
