import { omit } from 'lodash';

interface AvatarStyle {
    backgroundColor: string;
    color: string;
}

const avatarStyleInfo: ({ memberAuthority: string } & AvatarStyle)[] = [
    {
        memberAuthority: 'ADMIN',
        backgroundColor: 'red',
        color: 'white',
    },
    {
        memberAuthority: 'PRESIDENT',
        backgroundColor: 'skyblue',
        color: 'white',
    },
    {
        memberAuthority: 'VICE_PRESIDENT',
        backgroundColor: 'skyblue',
        color: 'white',
    },
    {
        memberAuthority: 'MANAGER',
        backgroundColor: 'pink',
        color: 'white',
    },
    {
        memberAuthority: 'GENERAL_MEMBER',
        backgroundColor: '#bef264',
        color: '#18181b',
    },
    {
        memberAuthority: 'ON_LEAVE_MEMBER',
        backgroundColor: 'gray',
        color: 'white',
    },
    {
        memberAuthority: 'GRADUATED_MEMBER',
        backgroundColor: 'lavender',
        color: 'black',
    },
    {
        memberAuthority: 'WAITING_FOR_APPROVAL',
        backgroundColor: '#f1f5f9',
        color: 'black',
    },
    {
        memberAuthority: 'WITHDRAWN_MEMBER',
        backgroundColor: '#f1f5f9',
        color: 'black',
    },
];

export default function getAvatarStyle(memberAuthority: string): AvatarStyle {
    return omit(
        avatarStyleInfo.find(element => element.memberAuthority === memberAuthority),
        ['memberAuthority'],
    );
}
