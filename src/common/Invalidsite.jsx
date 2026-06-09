import React from "react";

const InvalidSite = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950 flex items-center justify-center px-4">
            {/* Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-red-500/10 blur-3xl"></div>
                <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl"></div>
            </div>

            <div className="relative z-10 w-full max-w-3xl">
                <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 md:p-14 shadow-2xl text-center">

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
                        ● Service Unavailable
                    </div>

                    {/* Icon */}
                    <div className="mt-8 flex justify-center">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v4m0 4h.01M4.93 19h14.14c1.54 0 2.5-1.67 1.73-3L13.73 4c-.77-1.33-2.69-1.33-3.46 0L3.2 16c-.77 1.33.19 3 1.73 3z"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="mt-8 text-4xl md:text-6xl font-extrabold tracking-tight text-white">
                        Website Currently
                        <span className="block bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                            Unavailable
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-6 text-base md:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
                        This website is currently inactive and not accepting requests.
                        Services have been temporarily suspended or are undergoing
                        maintenance.
                    </p>

                    {/* Info Box */}
                    <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
                        <p className="text-slate-400 text-sm md:text-base">
                            If you are the website owner, please contact your administrator
                            or deployment provider to restore service.
                        </p>
                    </div>

                    {/* Error Code */}
                    <div className="mt-8">
                        <span className="rounded-lg border border-white/10 bg-black/30 px-4 py-2 text-sm font-mono text-slate-400">
                            ERROR CODE: SITE_UNAVAILABLE
                        </span>
                    </div>

                    {/* Footer */}
                    <div className="mt-10 border-t border-white/10 pt-6">
                        <p className="text-xs md:text-sm text-slate-500">
                            © {new Date().getFullYear()} All Rights Reserved
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvalidSite;