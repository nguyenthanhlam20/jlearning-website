import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import BookOpenIcon from '@heroicons/react/24/solid/BookOpenIcon';
import QuestionMarkCircleIcon from '@heroicons/react/24/solid/QuestionMarkCircleIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import FaceSmileIcon from '@heroicons/react/24/solid/FaceSmileIcon';
import NewspaperIcon from '@heroicons/react/24/solid/NewspaperIcon';
import PhoneIcon from '@heroicons/react/24/solid/PhoneIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Tổng quan',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Khóa học',
    path: '/authen/courses',
    icon: (
      <SvgIcon fontSize="small">
        <BookOpenIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Bài kiểm tra',
    path: '/authen/tests',
    icon: (
      <SvgIcon fontSize="small">
        <QuestionMarkCircleIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Tin tức',
    path: '/authen/blogs',
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Hỗ trợ',
    path: '/authen/supports',
    icon: (
      <SvgIcon fontSize="small">
        <PhoneIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Liên hệ',
    path: '/authen/contacts',
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Phản hồi',
    path: '/authen/feedbacks',
    icon: (
      <SvgIcon fontSize="small">
        <FaceSmileIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Cài đặt',
    path: '/authen/settings',
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  
  
];
