'use client';

import { Suspense } from 'react';
import { LoginContent } from './components';

const LoginPage = () => (
    <div className="min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold text-white">CaloriePal</h1>
            <Suspense>
                <LoginContent />
            </Suspense>
        </div>
    </div>
);

export default LoginPage;
