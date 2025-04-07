"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getUsers, updateUser, registerUser, deleteUser } from "@/app/services/user";

export default function UserForm() {
    const [users, setUsers] = useState<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        status: boolean;
    }[]>([]);

    const [editingUser, setEditingUser] = useState<typeof initialValues & { id?: number } | null>(null);

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        status: true
    };

    const validationSchema = Yup.object({
        firstName: Yup.string().required("El nombre es obligatorio"),
        lastName: Yup.string().required("El apellido es obligatorio"),
        email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
        password: Yup.string().when("id", {
            is: (id: number | undefined) => !id,
            then: (schema: Yup.StringSchema) => schema.required("La contraseña es obligatoria"),
            otherwise: (schema: Yup.StringSchema) => schema
        })
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const data = await getUsers();
        setUsers(data);
    };

    const handleSubmit = async (values: typeof initialValues, { resetForm }: { resetForm: () => void }) => {
        if (editingUser) {
            await updateUser(values, editingUser.id!);
        } else {
            await registerUser(values);
        }
        await fetchUsers();
        setEditingUser(null);
        resetForm();
    };

    const handleEdit = (user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        status: boolean;
    }) => {
        setEditingUser({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            status: user.status,
            password: "" // No mostramos la contraseña por seguridad
        });
    };

    const handleDelete = async (userId: number) => {
        if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
            await deleteUser(userId);
            await fetchUsers();
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold text-gray-900">
                    {editingUser ? "Editar Usuario" : "Registro de Usuario"}
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    {editingUser ? "Edite la información del usuario" : "Agregue la información del usuario"}
                </p>

                <Formik
                    initialValues={editingUser || initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values }) => (
                        <Form className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            {[
                                { label: "Nombre", name: "firstName" },
                                { label: "Apellido", name: "lastName" },
                                { label: "Correo Electrónico", name: "email", type: "email" },
                                { label: "Contraseña", name: "password", type: "password" },
                            ].map(({ label, name, type = "text" }) => (
                                <div key={name} className="sm:col-span-3">
                                    <label className="block text-sm font-medium text-gray-900">{label}</label>
                                    <div className="mt-2">
                                        <Field
                                            name={name}
                                            type={type}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-1 outline-gray-300 placeholder-gray-400 focus:outline-2 focus:outline-yellow-600 sm:text-sm"
                                            autoComplete="new-password"
                                        />
                                        <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>
                            ))}

                            <div className="sm:col-span-3">
                                <label className="block text-sm font-medium text-gray-900">Estado</label>
                                <div className="mt-2 flex items-center">
                                    <Field
                                        type="checkbox"
                                        name="status"
                                        id="status"
                                        className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-600"
                                    />
                                    <label htmlFor="status" className="ml-2 block text-sm text-gray-900">
                                        {values.status ? "Activo" : "Inactivo"}
                                    </label>
                                </div>
                            </div>

                            <div className="sm:col-span-full flex gap-2">
                                <button
                                    type="submit"
                                    className="block w-[12rem] rounded-md bg-yellow-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                >
                                    {editingUser ? "Actualizar" : "Guardar"}
                                </button>
                                {editingUser && (
                                    <button
                                        type="button"
                                        onClick={() => setEditingUser(null)}
                                        className="block w-[12rem] rounded-md bg-gray-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Tabla de Usuarios */}
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="overflow-hidden ring-1 shadow-sm ring-black/5 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nombre</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Apellido</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Correo</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Estado</th>
                                        <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {users.map((user) => (
                                        <tr key={user.id}>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{user.id}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{user.firstName}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{user.lastName}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">{user.email}</td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {user.status ? 'Activo' : 'Inactivo'}
                                                </span>
                                            </td>
                                            <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                                                <button
                                                    className="text-blue-600 hover:text-blue-900 mr-2"
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-900"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}