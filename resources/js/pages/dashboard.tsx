import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Administrador',
        href: '/products/dashboard',
    }, 
];

export default function Dashboard() {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inicio" />
            <div>
                <h1 className='text-2xl font-bold'>Bienvenido al panel de administración</h1>
            </div>
        </AppLayout>
    );
}
