import { useState } from "react";

export const useSnackbar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const handleOpen = (msg: string) => {
        setOpen(true);
        setMessage(msg);

        setTimeout(() => {
            setOpen(false);
        },3000)
    };

    return {
        open,
        message,
        openSnackbar: handleOpen,
        anchorOrigin: {
            vertical: "top",
            horizontal: "left"
        },
        ContentProps: {
            "aria-describedby": "message-id"
        }
    };
};