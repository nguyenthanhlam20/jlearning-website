import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Button, Stack, Card, SvgIcon } from '@mui/material';
import AppInput from '../../components/AppInput/AppInput';
import React from 'react';

export const CourseTopBar = ({values, setIsOpenModal, handleChangeValue }) => {

  
  return <Card sx={{ p: 2, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;" }}>
    <Stack direction="row" justifyContent="space-between">
      <div className='w-96'>
        <AppInput height={""} title={"searchTerm"} value={values?.searchTerm} handleChangeValue={ handleChangeValue} placeholder={"Tìm kiếm khóa học"} />
      </div>
      <div>
        <Button
          onClick={() => setIsOpenModal(true)}
          className='bg-primary'
          startIcon={(
            <SvgIcon fontSize="small">
              <PlusIcon />
            </SvgIcon>
          )}
          variant="contained"
        >
          Thêm mới khóa học
        </Button>
      </div>
    </Stack>

  </Card>;
};
