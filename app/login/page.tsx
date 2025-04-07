"use client";
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/auth';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
    password: Yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('La contraseña es requerida'),
});

export default function LoginPage() {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: LoginSchema,
        onSubmit: async (values) => {
            const result = await login(values);
            if (result) {
                localStorage.setItem('user', JSON.stringify(result));
                localStorage.setItem('token', result.access_token);
                document.cookie = `accessToken=${result.user.access_token}; path=/`;
                window.location.href = '/users';

            }
        },
    });

    return (
        <div className="flex min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8 h-screen">
            <div className="w-full max-w-sm space-y-10">
                <div>
                    <img
                        alt="Your Company"
                        src="https://www.gruposalinas.com/Content/iconos/LogoGS-main.svg"
                        className="mx-auto h-10 w-auto"
                    />
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <div className="col-span-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="Correo electrónico"
                                autoComplete="email"
                                aria-label="Correo electrónico"
                                className={`block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                                    }`}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className="-mt-px">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                placeholder="Contraseña"
                                autoComplete="current-password"
                                aria-label="Contraseña"
                                className={`block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-600 sm:text-sm/6 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                                    }`}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
                            ) : null}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-yellow-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:opacity-50"
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {formik.isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}