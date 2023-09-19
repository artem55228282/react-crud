import {useState} from "react";
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {XMarkIcon} from "@heroicons/react/24/solid";

import {Modal, Snackbar, TextField} from "@mui/material";
import Box from '@mui/material/Box';
import {UIButton} from "../components/ui/UIButton/UIButton";

import {ModalBoxStyles} from "../constants/ModalBoxStyles";

import {TUser} from "../models/types";
import {useSnackbar} from "../hooks/useSnackBar";
export function UsersPage() {

    const snackbar = useSnackbar()

    const defaultForm = {
        id: 0,
        name: '',
        surname: '',
        email: ''
    }

    const [users, setUsers] = useState<TUser[]>([])
    const [isModal, setModal] = useState<boolean>(false);

    const validationSchema = Yup.object({
        name: Yup.string().required('Имя обязательно'),
        surname: Yup.string().required('Фамилия обязательна'),
        email: Yup.string().email('Неправильный формат email').required('Email обязателен'),
    });


    const [initialValues, setInitialValues] = useState(defaultForm)
    const handleSubmit = (values: typeof initialValues) => {
        if (!values.id) {
            values.id = new Date().getTime()
            setUsers([ values, ...users ])
            snackbar.openSnackbar('Юзер успешно создан')
        }else {
            const arrayWithModifiedUser = users.map((user) => {
                if (user.id === values.id) return values
                return user
            })
            setUsers(arrayWithModifiedUser)
            snackbar.openSnackbar(`Юзер c ID: ${values.id} успешно изменен`)
        }

        setModal(false)

    };


    const handleCloseModal = () => {
        setModal(false);
        setInitialValues(defaultForm)
    };

    const handleOpenCreateModal = () => {
        setModal(true)
    }

    const editUser = (user: TUser) => {
        // @ts-ignore
        setInitialValues(user)
        setModal(true)
    }

    const handleDeleteUserById = (id: number | undefined) => {
        if (id === undefined) return
        const arrayWithoutDeleteUser = users.filter((user) => user.id !== id )
        setUsers(arrayWithoutDeleteUser)
        snackbar.openSnackbar(`Юзер с ID: ${id} удален`)
    }


    return (
        <div className="mx-auto max-w-xl">
            <div className="my-10 px-6 py-10 rounded-3xl border border-gray-300 space-y-6">
                <div className="flex justify-end">
                        <UIButton color="primary" onClick={handleOpenCreateModal}>Создать юзера</UIButton>
                </div>
                <div>
                    {users.length > 0 ? (
                        <div>
                            <h3 className="text-lg font-bold">Список юзеров</h3>
                            <div className="space-y-3 py-4">
                                {users.map((user) => (
                                    <div key={user.id} className="p-4 bg-gray-50 rounded-md flex justify-between items-center">
                                        <div className="space-y-2">
                                            <div className="flex gap-1">
                                                <p className="text-gray-500 text-medium">ID :</p>
                                                <p>{user.id}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <p className="text-gray-500 text-medium">Имя :</p>
                                                <p>{user.name}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <p className="text-gray-500 text-medium">Фамилия :</p>
                                                <p>{user.surname}</p>
                                            </div>
                                            <div className="flex gap-1">
                                                <p className="text-gray-500 text-medium">E-mail :</p>
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <UIButton color="danger" size="sm" onClick={() => handleDeleteUserById(user.id)}>Удалить</UIButton>
                                            <UIButton color="warning" size="sm" onClick={() => editUser(user)}>Изменить</UIButton>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    ) : (
                        <div className="py-2 bg-red-50">
                            <p className="text-center">Создайте юзера</p>
                        </div>

                    )}
                    </div>

                </div>
                <Modal
                    open={isModal}
                    onClose={handleCloseModal}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{...ModalBoxStyles, width: 550}}>
                        <div className="flex justify-end">
                            <XMarkIcon className="w-6 h-6 cursor-pointer" onClick={handleCloseModal}/>
                        </div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({values, handleChange, handleBlur}) => (
                                <Form className="space-y-4 py-4">
                                    <div>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label="Имя"
                                            variant="outlined"
                                            size={"small"}
                                            fullWidth
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-600 text-sm"/>
                                    </div>

                                   <div>
                                       <TextField
                                           id="surname"
                                           name="surname"
                                           label="Фамилия"
                                           variant="outlined"
                                           size={"small"}
                                           fullWidth
                                           value={values.surname}
                                           onChange={handleChange}
                                           onBlur={handleBlur}
                                       />
                                       <ErrorMessage name="surname" component="div" className="text-red-600 text-sm"/>
                                   </div>

                                    <div>
                                        <TextField
                                            id="email"
                                            name="email"
                                            label="Email"
                                            variant="outlined"
                                            size={"small"}
                                            fullWidth
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm"/>
                                    </div>
                                    <div className="py-2 flex w-full gap-4">
                                        <UIButton className="flex-1" onClick={handleCloseModal}>
                                            Отмена
                                        </UIButton>
                                        <UIButton className="flex-1" type="submit" color="primary">
                                            {values.id ? 'Изменить':'Создать'}
                                        </UIButton>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </Box>
                </Modal>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    message={snackbar.message}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right"
                    }} />
            </div>
        )
    }