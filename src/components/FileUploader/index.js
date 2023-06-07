import React from "react";

import { Box, Button, SvgIcon } from "@mui/material";
import handleUpload from "../../firebase/handle-upload";
import handleDelete from "../../firebase/handle-delete";
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import HandThumbUpIcon from '@heroicons/react/24/solid/CheckCircleIcon';


function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                {props.value == 100 ? <SvgIcon color="success" > <HandThumbUpIcon /> </SvgIcon> : <Typography fontSize={18} variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>}
            </Box>
        </Box>
    );
}

const FileUploader = ({
    setDisableSubmit,
    firebaseFolderName,
    setPreviewUrl,
    setCurrentFile,
    id
}) => {
    const [fileUpload, setFileUpload] = React.useState(null);
    const [progress, onProgress] = React.useState(0);
    const [success, onSuccess] = React.useState(false);
    const uploadImage = async () => {
        // window.alert("ok");
        setDisableSubmit(true);

        // console.log("RUN TO CLICK EVENT", options);
        await handleUpload({
            file: fileUpload,
            // setPercent: setPercent,
            firebaseFolderName: firebaseFolderName,
            onProgress: onProgress,
            onSuccess: onSuccess,
            setCurrentFile: setCurrentFile,
        });

        // setFileUpload(null);
    };

    React.useEffect(() => {
       if(fileUpload != null) {
        uploadImage();
       }
    }, [fileUpload]);

    return (
        <>
            <div className="mb-3">
                <div className="flex items-center flex-col justify-center w-full">
                    <label for={id} className="flex flex-col items-center justify-center w-full m-3 h-[100px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10  mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Bấm để tải </span> hoặc kéo thả </p>
                        </div>
                        <input id={id} type="file" className="hidden" onChange={(e) => {
                            const file = e.target.files[0];
                            setFileUpload(file);
                            const reader = new FileReader();
                            reader.onload = () => {
                                setPreviewUrl(reader.result);
                            };
                            reader.readAsDataURL(file);

                        }} />
                    </label>
                        <Box sx={{ width: '100%',  p: 1 }}>
                            <LinearProgressWithLabel value={progress} />
                        </Box>
                </div>
            </div>
        </>
    );
};

export default React.memo(FileUploader);
