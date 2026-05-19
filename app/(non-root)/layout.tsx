import Navbar from "@/components/navbar"
export default function NonRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className="flex-1 flex flex-col">
                {children}
            </main>
        </>
    );
}
