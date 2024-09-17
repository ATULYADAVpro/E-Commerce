import React from 'react';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left half - equally divided in large screens */}
            <div className="lg:flex hidden lg:w-1/2 items-center justify-center bg-black px-12">
                <div className="max-w-md space-y-6 text-center text-primary-foreground">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Welcome to Shopping
                    </h1>
                </div>
            </div>

            {/* Right half - equally divided in large screens */}
            <div className="flex w-full lg:w-1/2 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    );
}
