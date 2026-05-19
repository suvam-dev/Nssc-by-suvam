export default function NonRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="flex-1 flex flex-col">
            {children}
        </main>
    );
}
