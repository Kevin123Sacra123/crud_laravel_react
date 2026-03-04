import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login, register } from '@/routes';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">
                <header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                </header>
                <div>
                    <Card size="sm" className="mx-auto w-full max-w-sm">
                    <CardHeader>
                    <CardTitle className='text-center'>CRUD laravel - React</CardTitle>
                    <CardDescription>
                    pequeño experimento con laravel, react y shad ui
                    </CardDescription>
                </CardHeader>
                    <CardContent className='flex items-center justify-center'>
                            <nav className="flex items-center justify-end gap-4">
                            {auth.user ? (
                                    <Link href={route('products.index')} className="" > <Button>Ver Productos</Button> </Link>
                                ) : (
                                    <>
                                        <Link href={login()} className="">
                                            <Button>
                                                Iniciar sesión
                                            </Button>
                                        </Link>
                                        {canRegister && (
                                            <Link href={register()} className="">
                                                <Button>
                                                    Registrar
                                                </Button>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </nav>
                    </CardContent>
                    <CardFooter>
                        
                    </CardFooter>
                </Card>
                </div>
                <div className="hidden h-14.5 lg:block"></div>
            </div>

            
        </>
    );
}
